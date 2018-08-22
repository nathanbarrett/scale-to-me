/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as geolib from 'geolib';
import moment from 'moment';

import { ScriptsService } from '../services/scripts.service';
import * as SolarSystem from '../interfaces/solar-system';
import * as defaults from '../data/defaults';
import { Bearing } from '../enums/bearing.enum';

@Injectable({
  providedIn: 'root'
})
export class SolarSystemService {

  map: google.maps.Map;

  private solarSystem: SolarSystem.ISystem;

  private mapOptions: google.maps.MapOptions = {
    center: {lat: defaults.DEFAULT_LAT, lng: defaults.DEFAULT_LNG},
    zoom: 15
  };

  private center: google.maps.LatLng;

  private bearing: Bearing = defaults.DEFAULT_BEARING;

  constructor(private http: HttpClient, private scripts: ScriptsService) { }

  initializeMap(mapElement: HTMLElement) {
    forkJoin(
      this.scripts.loadMapsLibrary(),
      this.getSolarSystemData()
    ).pipe(
      catchError(err => err)
    ).subscribe(data => {
      console.log('completed', data);
      this.center = new google.maps.LatLng(defaults.DEFAULT_LAT, defaults.DEFAULT_LNG);
      this.map = new google.maps.Map(mapElement, {
        center: this.center,
        zoom: defaults.DEFAULT_MAP_ZOOM
      });
      this.solarSystem = data[1];
      this.createMapObjects(this.center, this.bearing);
    });
  }

  private getSolarSystemData(): Observable<object> {
    return this.http.get('assets/data/solar-system.json');
  }

  private createMapObjects(center: google.maps.LatLng, bearing: Bearing): void {
    this.solarSystem.sun.mapData.marker = this.createMapObjectMarker(this.solarSystem.sun);
    this.solarSystem.sun.mapData.infoWindow = this.createMapObjectInfoWindow(this.solarSystem.sun);
    const planetTypes = ['planets', 'dwarfPlanets'];
    for (const planetType of planetTypes) {
      this.solarSystem[planetType].forEach((planet: SolarSystem.IPlanet) => {
        planet.mapData.marker = this.createMapObjectMarker(planet);
        planet.mapData.infoWindow = this.createMapObjectInfoWindow(planet);
        planet.mapData.marker.setPosition(
          this.calculatePlanetCoordinates(planet, center, bearing)
        );
      });
    }
    this.solarSystem.satellites.forEach(satellite => {
      satellite.mapData.marker = this.createMapObjectMarker(satellite);
      satellite.mapData.infoWindow = this.createMapObjectInfoWindow(satellite);
      satellite.mapData.marker.setPosition(
        this.calculateSatelliteCoordinates(satellite, center, bearing)
      );
    });
  }

  /** Put in either a new center or new bearing or both to update the placement of all map objects.
   * Otherwise will use default center and bearing. */
  placeMapObjects(center?: google.maps.LatLng, bearing?: Bearing): void {
    if (!this.solarSystem.sun.mapData.marker.getMap()) {
      this.solarSystem.sun.mapData.marker.setMap(this.map);
    }
    const planetTypes = ['planets', 'dwarfPlanets'];
    for (const planetType of planetTypes) {
      this.solarSystem[planetType].forEach((planet: SolarSystem.IPlanet) => {
        if (!planet.mapData.marker.getMap()) {
          planet.mapData.marker.setMap(this.map);
        }
        if (center || bearing) {
          planet.mapData.marker.setPosition(
            this.calculatePlanetCoordinates(planet, center ? center : this.center, bearing ? bearing : this.bearing)
          );
        }
      });
    }
    this.solarSystem.satellites.forEach(satellite => {
      if (!satellite.mapData.marker.getMap()) {
        satellite.mapData.marker.setMap(this.map);
      }
      if (center || bearing) {
        satellite.mapData.marker.setPosition(
          this.calculateSatelliteCoordinates(satellite, center ? center : this.center, bearing ? bearing : this.bearing)
        );
      }
    });
  }

  private createMapObjectMarker(mapObject: SolarSystem.IMapObject): google.maps.Marker {
    return new google.maps.Marker({
      map: null,
      icon: {
        size: new google.maps.Size(50, 85),
        url: mapObject.mapData.iconUrl,
        anchor: new google.maps.Point(25, 85),
        origin: new google.maps.Point(0, 0)
      },
      position: this.center,
      animation: google.maps.Animation.DROP,
      title: mapObject.name
    });
  }

  private createMapObjectInfoWindow(mapObject: SolarSystem.IMapObject): google.maps.InfoWindow {
    const infoWindow = new google.maps.InfoWindow({content: '', maxWidth: 500});
    if (!mapObject.mapData.infoWindowContent) {
      return infoWindow;
    }
    let content = `
      <div class="text-center">
        <div class="info-window-title">${mapObject.name}</div>
        ${mapObject.mapData.infoWindowImageUrl ? `<img class="info-window-image" src="${mapObject.mapData.infoWindowImageUrl}" />` : ''}
      </div>
      <div class="info-window-content">${mapObject.mapData.infoWindowContent}</div>
    `;
    if (mapObject.mapData.didYouKnow) {
      content += `
        <div class="info-window-dyk-title">Did you know?</div>
        <div class="info-window-dyk-content">${mapObject.mapData.didYouKnow}</div>
      `;
    }
    infoWindow.setContent(content);
    if (mapObject.mapData.marker) {
      mapObject.mapData.marker.addListener('click', () => {
        console.log('clicked on ', mapObject);
        if (mapObject.mapData.isInfoWindowOpen) {
          infoWindow.close();
          mapObject.mapData.isInfoWindowOpen = false;
          return;
        }
        this.closeAllInfoWindows();
        mapObject.mapData.infoWindow.open();
        mapObject.mapData.isInfoWindowOpen = true;
      });
    }
    return infoWindow;
  }

  private closeAllInfoWindows(): void {
    this.solarSystem.sun.mapData.infoWindow.close();
    this.solarSystem.sun.mapData.isInfoWindowOpen = false;
    const mapObjectTypes = ['planets', 'dwarfPlanets', 'satellites'];
    for (const mapObjectType of mapObjectTypes) {
      this.solarSystem[mapObjectType].forEach((mapObject: SolarSystem.IMapObject) => {
        if (mapObject.mapData.isInfoWindowOpen) {
          mapObject.mapData.infoWindow.close();
          mapObject.mapData.isInfoWindowOpen = false;
        }
      });
    }
  }

  private calculatePlanetCoordinates(planet: SolarSystem.IPlanet, center: google.maps.LatLng, bearing: Bearing): google.maps.LatLng {
    const scaledDistance = planet.distanceFromSun * this.solarSystem.scale;
    const startPoint = {
      latitude: center.lat(),
      longitude: center.lng()
    };
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, bearing);
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude);
  }

  private calculateSatelliteCoordinates(
    satellite: SolarSystem.ISatellite,
    center: google.maps.LatLng,
    bearing: Bearing
  ): google.maps.LatLng {
    const distanceFromSunDate = moment.unix(satellite.distanceFromSunDate);
    const duration = moment.duration(distanceFromSunDate.diff(moment()));
    const todayDistanceFromSun = satellite.distanceFromSun + (satellite.speed * duration.seconds());
    const scaledDistance = todayDistanceFromSun * this.solarSystem.scale;
    const startPoint = {
      latitude: center.lat(),
      longitude: center.lng()
    };
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, bearing);
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude);
  }
}
