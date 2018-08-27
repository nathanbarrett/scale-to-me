/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as geolib from 'geolib';
import moment, { Moment } from 'moment';

import { ScriptsService } from '../services/scripts.service';
import * as SolarSystem from '../interfaces/solar-system';
import * as defaults from '../data/defaults';
import { Bearing } from '../enums/bearing.enum';

interface Lightbeam {
  line: google.maps.Polyline;
  path: google.maps.MVCArray<google.maps.LatLng>;
  start: Moment;
  running: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SolarSystemService {

  map: google.maps.Map;

  private solarSystem: SolarSystem.ISystem;

  private mapOptions: google.maps.MapOptions = {
    center: {lat: defaults.DEFAULT_LAT, lng: defaults.DEFAULT_LNG},
    zoom: defaults.DEFAULT_MAP_ZOOM,
    mapTypeControl: false,
    streetViewControl: false,
    rotateControl: false
  };

  private center: google.maps.LatLng;

  private bearing: Bearing = defaults.DEFAULT_BEARING;

  private mapDataFetchChecks = 0;

  private unitSystemMetric = true;

  private lightbeam: Lightbeam;

  constructor(private http: HttpClient, private scripts: ScriptsService) { }

  initializeMap(mapElement: HTMLElement): void {
    forkJoin(
      this.scripts.loadMapsLibrary(),
      this.getSolarSystemData()
    ).pipe(
      catchError(err => err)
    ).subscribe(data => {
      this.center = new google.maps.LatLng(defaults.DEFAULT_LAT, defaults.DEFAULT_LNG);
      this.map = new google.maps.Map(mapElement, this.mapOptions);
      this.solarSystem = data[1];
      this.createMapObjects();
    });
  }

  private getSolarSystemData(): Observable<object> {
    return this.http.get('assets/data/solar-system.json');
  }

  private createMapObjects(): void {
    this.solarSystem.sun.mapData.marker = this.createMapObjectMarker(this.solarSystem.sun, {
      position: this.center,
      draggable: true
    });
    this.solarSystem.sun.mapData.marker.addListener('dragend', (event: google.maps.MouseEvent) => {
      this.moveCenter(event.latLng.lat(), event.latLng.lng());
    });
    this.solarSystem.sun.mapData.infoWindow = this.createMapObjectInfoWindow(this.solarSystem.sun);
    const planetTypes = ['planets', 'dwarfPlanets'];
    for (const planetType of planetTypes) {
      this.solarSystem[planetType].forEach((planet: SolarSystem.IPlanet) => {
        planet.mapData.marker = this.createMapObjectMarker(planet);
        planet.mapData.infoWindow = this.createMapObjectInfoWindow(planet);
      });
    }
    this.solarSystem.satellites.forEach(satellite => {
      satellite.mapData.marker = this.createMapObjectMarker(satellite);
      satellite.mapData.infoWindow = this.createMapObjectInfoWindow(satellite);
    });
  }

  /** Put in either a new center or new bearing or both to update the placement of all map objects.
   * Otherwise will use default center and bearing. */
  placeMapObjects(): void {
    if (!this.solarSystem || !this.solarSystem.sun) {
      if (this.mapDataFetchChecks > 20) {
        console.error('Was not able to fetch map data. Cannot place objects.');
        return;
      }
      this.mapDataFetchChecks++;
      setTimeout(() => {
        this.placeMapObjects();
      }, 100);
      return;
    }
    this.solarSystem.sun.mapData.marker.setPosition(this.center);
    if (!this.solarSystem.sun.mapData.marker.getMap()) {
      this.solarSystem.sun.mapData.marker.setMap(this.map);
    }
    for (const planetType of ['planets', 'dwarfPlanets']) {
      this.solarSystem[planetType].forEach((planet: SolarSystem.IPlanet) => {
        planet.mapData.marker.setPosition(
          this.calculatePlanetCoordinates(planet, this.center, this.bearing)
        );
        if (!planet.mapData.marker.getMap()) {
          planet.mapData.marker.setMap(this.map);
        }
      });
    }
    this.solarSystem.satellites.forEach(satellite => {
      satellite.mapData.marker.setPosition(
        this.calculateSatelliteCoordinates(satellite, this.center, this.bearing)
      );
      if (!satellite.mapData.marker.getMap()) {
        satellite.mapData.marker.setMap(this.map);
      }
    });
  }

  showSunInfoWindow(): void {
    this.closeAllInfoWindows();
    this.solarSystem.sun.mapData.infoWindow.open(this.map, this.solarSystem.sun.mapData.marker);
  }

  /** Rotates the map objects by 45 degrees */
  rotateMapObjects(): Bearing {
    const bearingOrder: Bearing[] = [
      Bearing.NorthEast,
      Bearing.East,
      Bearing.SouthEast,
      Bearing.South,
      Bearing.SouthWest,
      Bearing.West,
      Bearing.NorthWest,
      Bearing.North
    ];
    this.bearing = bearingOrder.indexOf(this.bearing) === bearingOrder.length - 1 ?
    bearingOrder[0] :
    bearingOrder[bearingOrder.indexOf(this.bearing) + 1];
    this.placeMapObjects();
    return this.bearing;
  }

  /** Moves the position of the sun and all other map objects */
  moveCenter(latitude: number, longitude: number): void {
    this.center = new google.maps.LatLng(latitude, longitude);
    this.placeMapObjects();
    this.map.setCenter(this.center);
    this.map.setZoom(defaults.DEFAULT_MAP_ZOOM);
  }

  setUnitSystemMetric(setToMetric: boolean): void {
    if (this.unitSystemMetric === setToMetric) {
      return;
    }
    this.unitSystemMetric = setToMetric;
    this.solarSystem.sun.mapData.infoWindow.setContent(
      this.createInfoWindowContent(this.solarSystem.sun)
    );
    for (const planetType of ['planets', 'dwarfPlanets']) {
      this.solarSystem[planetType].forEach((planet: SolarSystem.IPlanet) => {
        planet.mapData.infoWindow.setContent(
          this.createInfoWindowContent(planet)
        );
      });
    }
    this.solarSystem.satellites.forEach(satellite => {
      satellite.mapData.infoWindow.setContent(
        this.createInfoWindowContent(satellite)
      );
    });
  }

  isUnitSystemMetric(): boolean {
    return this.unitSystemMetric;
  }

  startLightbeam(): void {

  }

  private parseDynamicContent(object: SolarSystem.IMapObject, content: string): string {
    content = this.parseScaledDistance(object, content);
    if (object['radius']) {
      content = this.parseScaledSize(<SolarSystem.IPlanetaryBody>object, content);
    }
    return content;
  }

  private parseScaledDistance(object: SolarSystem.IMapObject, content: string): string {
    // scaled distance in meters
    let scaledDistance = object.distanceFromSun * this.solarSystem.scale;
    const replaceString = '{{scaledDistance}}';
    if (this.unitSystemMetric) {
      if (scaledDistance < 500) {
        return content.replace(replaceString, this.round(scaledDistance) + ' meters');
      }
      scaledDistance = scaledDistance / 1000;
      return content.replace(replaceString, this.round(scaledDistance) + ' kilometers');
    }
    if (scaledDistance > 804) {
      scaledDistance = geolib.convertUnit('mi', scaledDistance);
      return content.replace(replaceString, scaledDistance + ' miles');
    }
    if (scaledDistance > 100) {
      scaledDistance = geolib.convertUnit('yd', scaledDistance);
      return content.replace(replaceString, this.round(scaledDistance) + ' yards');
    }
    scaledDistance = geolib.convertUnit('ft', scaledDistance);
    return content.replace(replaceString, this.round(scaledDistance) + ' feet');
  }

  private parseScaledSize(object: SolarSystem.IPlanetaryBody, content: string): string {
    // scaled down diameter in meters
    let scaledDiameter =  object.radius * this.solarSystem.scale * 2;
    const replaceString = '{{scaledDiameter}}';
    if (this.unitSystemMetric) {
      if (scaledDiameter > 0.2) {
        return content.replace(replaceString, this.round(scaledDiameter) + ' meters');
      }
      scaledDiameter = scaledDiameter / 100;
      return content.replace(replaceString, this.round(scaledDiameter) + ' centimeters');
    }
    scaledDiameter = geolib.convertUnit('ft', scaledDiameter);
    return content.replace(replaceString, this.round(scaledDiameter) + ' feet');
  }

  private round(number: number, precision: number = 2): number {
    const multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
  }

  private createMapObjectMarker(
    mapObject: SolarSystem.IMapObject,
    markerOptions: google.maps.MarkerOptions = {position: this.center}): google.maps.Marker {
    return new google.maps.Marker({
      map: null,
      icon: {
        size: new google.maps.Size(50, 85),
        url: mapObject.mapData.iconUrl,
        anchor: new google.maps.Point(25, 85),
        origin: new google.maps.Point(0, 0)
      },
      animation: google.maps.Animation.DROP,
      title: mapObject.name,
      ...markerOptions
    });
  }

  private createMapObjectInfoWindow(mapObject: SolarSystem.IMapObject | SolarSystem.IPlanetaryBody): google.maps.InfoWindow {
    const infoWindow = new google.maps.InfoWindow({content: '', maxWidth: 500});
    if (!mapObject.mapData.infoWindowContent) {
      return infoWindow;
    }
    infoWindow.setContent(
      this.createInfoWindowContent(mapObject)
    );
    if (mapObject.mapData.marker) {
      mapObject.mapData.marker.addListener('click', () => {
        if (mapObject.mapData.isInfoWindowOpen) {
          infoWindow.close();
          mapObject.mapData.isInfoWindowOpen = false;
          return;
        }
        this.closeAllInfoWindows();
        mapObject.mapData.infoWindow.open(this.map, mapObject.mapData.marker);
        mapObject.mapData.isInfoWindowOpen = true;
      });
    }
    return infoWindow;
  }

  private createInfoWindowContent(mapObject: SolarSystem.IMapObject): string {
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
    return this.parseDynamicContent(mapObject, content);
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
