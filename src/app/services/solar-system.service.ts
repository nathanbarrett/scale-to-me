/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as geolib from 'geolib';
import * as moment from 'moment';

import { ScriptsService } from '../services/scripts.service';
import {
  ISolarSystem,
  ILightbeam,
  IPlanet,
  IPlanetaryBody,
  ISatellite,
  IMapObject,
  ISolarSystemListItem } from '../interfaces/solar-system';
import * as defaults from '../data/defaults';
import { Bearing } from '../enums/bearing.enum';

@Injectable({
  providedIn: 'root'
})
export class SolarSystemService {

  map: google.maps.Map;

  private solarSystem: ISolarSystem;

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

  private lightbeam: ILightbeam;

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
      for (const event of ['zoom_changed', 'dragstart', 'click']) {
        this.map.addListener(event, () => {
          this.disableLightBeamTracking();
        });
      }
      for (const event of ['zoom_changed', 'dragend']) {
        this.map.addListener(event, () => {
          this.moonProximityCheck();
        });
      }
      this.solarSystem = data[1];
      this.createMapObjects();
    });
  }

  private getSolarSystemData(): Observable<object> {
    return this.http.get('assets/data/solar-system.json');
  }

  private moonProximityCheck(): void {
    const earth = <IPlanet>this.getMapObjectByName('Earth');
    const moon = earth.moons[0];
    if (this.map.getBounds().contains(earth.mapData.marker.getPosition()) && this.map.getZoom() >= 18) {
      if (!moon.mapData.marker.getMap()) {
        this.placeMoons(earth);
      }
      return;
    }
    moon.mapData.marker.setMap(null);
  }

  private getMapObjectByName(name: string): IMapObject {
    if (name.indexOf('Sun') >= 0) {
      return this.solarSystem.sun;
    }
    for (const mapObjectType of ['planets', 'dwarfPlanets', 'satellites']) {
      for (const mapObject of this.solarSystem[mapObjectType]) {
        if (mapObject.name === name) {
          return mapObject;
        }
        if (mapObject.moons) {
          for (const moon of mapObject.moons) {
            if (moon.name === name) {
              return moon;
            }
          }
        }
      }
    }
    throw new Error(`Invalid Map Object Name Given: ${name}`);
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
      this.solarSystem[planetType].forEach((planet: IPlanet) => {
        planet.mapData.marker = this.createMapObjectMarker(planet);
        planet.mapData.infoWindow = this.createMapObjectInfoWindow(planet);
        if (planet.name === 'Earth') {
          const moon = planet.moons[0];
          moon.mapData.marker = this.createMapObjectMarker(moon);
          moon.mapData.infoWindow = this.createMapObjectInfoWindow(moon);
        }
      });
    }
    this.solarSystem.satellites.forEach(satellite => {
      satellite.mapData.marker = this.createMapObjectMarker(satellite);
      satellite.mapData.infoWindow = this.createMapObjectInfoWindow(satellite);
    });
  }

  placeMoons(planet: IPlanet): void {
    if (!planet.moons) {
      return;
    }
    const moonBearing = this.getMoonBearing();
    for (const moon of planet.moons) {
      moon.mapData.marker.setPosition(
        this.calculateMoonCoordinates(planet.mapData.marker.getPosition(), moonBearing, moon.distanceFromPlanet)
      );
      moon.mapData.marker.setMap(this.map);
    }
  }

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
      this.solarSystem[planetType].forEach((planet: IPlanet) => {
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
    if (this.isLightbeamRunning()) {
      this.updateLightbeamPosition(true);
    }
    return this.bearing;
  }

  /** Moves the position of the sun and all other map objects */
  moveCenter(latitude: number, longitude: number): void {
    this.center = new google.maps.LatLng(latitude, longitude);
    this.placeMapObjects();
    this.updateLightbeamPosition(true);
    this.map.setCenter(this.center);
    this.map.setZoom(defaults.DEFAULT_MAP_ZOOM);
  }

  setUnitSystem(metric: boolean): void {
    if (this.unitSystemMetric === metric) {
      return;
    }
    this.unitSystemMetric = metric;
    if (this.lightbeam) {
      this.lightbeam.infoWindow.setContent(this.generateLightBeamInfoWindowContent());
    }
    this.solarSystem.sun.mapData.infoWindow.setContent(
      this.createInfoWindowContent(this.solarSystem.sun)
    );
    for (const planetType of ['planets', 'dwarfPlanets']) {
      this.solarSystem[planetType].forEach((planet: IPlanet) => {
        planet.mapData.infoWindow.setContent(
          this.createInfoWindowContent(planet)
        );
        if (planet.moons) {
          for (const moon of planet.moons) {
            if (moon.mapData.infoWindow) {
              moon.mapData.infoWindow.setContent(
                this.createInfoWindowContent(moon)
              );
            }
          }
        }
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
    this.map.setCenter(this.solarSystem.sun.mapData.marker.getPosition());
    this.map.setZoom(defaults.DEFAULT_LIGHTBEAM_ZOOM);
    this.lightbeam = {
      line: new google.maps.Polyline({
        map: this.map,
        path: new google.maps.MVCArray([this.center]),
        strokeColor: 'yellow',
        strokeWeight: 15,
        strokeOpacity: 0.7,
      }),
      start: moment().subtract(5, 'seconds'),
      interval: interval(1000).subscribe(() => {
        this.updateLightbeamPosition();
      }),
      infoWindow: new google.maps.InfoWindow({
        content: this.generateLightBeamInfoWindowContent(),
        disableAutoPan: true
      }),
      tracking: true
    };
    this.closeAllInfoWindows();
    this.lightbeam.infoWindow.open(this.map);
    this.lightbeam.infoWindow.setPosition(this.center);
    this.lightbeam.line.addListener('click', event => {
      this.closeAllInfoWindows();
      this.lightbeam.infoWindow.open(this.map);
      const latLng = this.lightbeam.line.getPath().pop();
      this.lightbeam.infoWindow.setPosition(latLng);
      this.map.setCenter(latLng);
      this.map.setZoom(defaults.DEFAULT_LIGHTBEAM_ZOOM);
      this.lightbeam.tracking = true;
    });
  }

  stopLightbeam(): void {
    this.lightbeam.interval.unsubscribe();
    this.lightbeam.start = null;
    this.lightbeam.line.setMap(null);
    this.lightbeam.infoWindow.close();
  }

  isLightbeamRunning(): boolean {
    return this.lightbeam && this.lightbeam.start !== null;
  }

  getMapObjectsList(): ISolarSystemListItem[] {
    const listItems: ISolarSystemListItem[] = [
      {
        name: 'The Sun',
        image: '/assets/images/sun-list.png'
      }
    ];
    for (const planetType of ['planets', 'dwarfPlanets']) {
      this.solarSystem[planetType].forEach((planet: IPlanet) => {
        listItems.push({
          name: planet.name,
          image: `/assets/images/${planet.name.toLowerCase()}-list.png`
        });
        if (planet.name === 'Earth') {
          const moon = planet.moons[0];
          listItems.push({
            name: moon.name,
            image: `/assets/images/${moon.name.toLowerCase()}-list.png`
          });
        }
      });
    }
    listItems.push({
      name: 'Voyager 1',
      image: '/assets/images/voyager-1-list.png'
    });
    return listItems;
  }

  jumpToMapObject(name: string): void {
    if (name === 'The Sun') {
      return this.goToMapObject(this.solarSystem.sun);
    }
    if (name === 'Moon') {
      const earth = <IPlanet>this.getMapObjectByName('Earth');
      return this.goToMapObject(earth.moons[0]);
    }
    for (const mapObjectType of ['planets', 'dwarfPlanets', 'satellites']) {
      for (const mapObject of this.solarSystem[mapObjectType]) {
        if (mapObject.name === name) {
          return this.goToMapObject(mapObject);
        }
      }
    }
    throw new Error(`Invalid jump name given: ${name}`);
  }

  isMapObjectsPlaced(): boolean {
    return !!this.solarSystem.sun &&
            !!this.solarSystem.sun.mapData.marker &&
            !!this.solarSystem.sun.mapData.marker.getMap();
  }

  isMapLoaded(): boolean {
    return !!this.map;
  }

  private goToMapObject(mapObject: IMapObject): void {
    this.map.setZoom(mapObject.name === 'Moon' ? 21 : defaults.DEFAULT_MAP_ZOOM);
    this.closeAllInfoWindows();
    if (mapObject.name === 'Moon') {
      this.placeMoons(<IPlanet>this.getMapObjectByName('Earth'));
    }
    this.map.setCenter(mapObject.mapData.marker.getPosition());
    mapObject.mapData.infoWindow.open(this.map, mapObject.mapData.marker);
  }

  private updateLightbeamPosition(refresh: boolean = false): void {
    const scaledSpeedOfLight = this.solarSystem.speedOfLight * this.solarSystem.scale;
    const secondsElapsed = moment().diff(this.lightbeam.start, 'seconds');
    const metersTraveled = scaledSpeedOfLight * secondsElapsed;
    const point = geolib.computeDestinationPoint({
      latitude: this.center.lat(),
      longitude: this.center.lng()
    }, metersTraveled, this.bearing);
    const path = refresh ? new google.maps.MVCArray([this.center]) : this.lightbeam.line.getPath();
    const latLng = new google.maps.LatLng(point.latitude, point.longitude);
    path.push(latLng);
    this.lightbeam.line.setPath(path);
    if (this.lightbeam.tracking) {
      this.map.setCenter(latLng);
    }
    this.lightbeam.infoWindow.setPosition(latLng);
  }

  private disableLightBeamTracking(): void {
    if (this.lightbeam) {
      this.lightbeam.tracking = false;
    }
  }

  private generateLightBeamInfoWindowContent(): string {
    // in meters per hour
    const scaledSpeedOfLight = this.solarSystem.speedOfLight * this.solarSystem.scale * 3600;
    const fastestObjectSpeed = 265000000;
    const scaledFastestObjectSpeed = fastestObjectSpeed * this.solarSystem.scale;

    const speedOfLightText = this.unitSystemMetric ?
      Math.round(this.solarSystem.speedOfLight / 1000) + ' kilometers per second' :
      Math.round(geolib.convertUnit('mi', this.solarSystem.speedOfLight)) + ' miles per second';
    const scaledSpeedOfLightText = this.unitSystemMetric ?
      (Math.round(scaledSpeedOfLight / 10) / 100) + ' km/h' :
      (Math.round(geolib.convertUnit('mi', scaledSpeedOfLight) * 100) / 100) + ' mph';
    const fastestObjectSpeedText = this.unitSystemMetric ?
      '265,000 km/h' : '165,000 mph';
    const scaledFastestObjectSpeedText = this.unitSystemMetric ?
      (Math.round(scaledFastestObjectSpeed * 100) / 100) + ' meters per hour' :
      (Math.round(geolib.convertUnit('ft', scaledFastestObjectSpeed) * 100) / 100) + ' feet per hour';
    const speedOfLightDiffText = (Math.round(fastestObjectSpeed / (this.solarSystem.speedOfLight * 3600) * 100000) / 1000) + '%';
    return `
    <div class="text-center">
      <div class="info-window-title">The Speed Of Light</div>
    </div>
    <div class="info-window-content">
      Seems a little slow, doesn't it? From our perspective the speed of light seems
      instantanious ( ${speedOfLightText} ), but compared to the vastness of Space it is not. If the speed of
      light scaled down by the same amount as everything else here then we are looking at
      a light beam traveling at only ${scaledSpeedOfLightText} which is about the speed of a fast jog.
    </div>
    <div class="info-window-dyk-title">Did you know?</div>
    <div class="info-window-dyk-content">
      The fastest man made object (in terms of heliocentric velocity) was NASA's Helios I probe
      launched in 1974. The top speed was ${fastestObjectSpeedText} which is only ${speedOfLightDiffText}
      of the speed of light. Or in this scenario ${scaledFastestObjectSpeedText}
    </div>
    `;
  }

  private parseDynamicContent(object: IMapObject, content: string): string {
    content = this.parseScaledDistance(object, content);
    if (object['radius']) {
      content = this.parseScaledSize(<IPlanetaryBody>object, content);
    }
    if (object['speed']) {
      content = this.parseScaledSpeed(<ISatellite>object, content);
    }
    if (object['distanceFromPlanet']) {
      content = this.parseScaledMoonDistance(object['distanceFromPlanet'], content);
    }
    return content;
  }

  private parseScaledDistance(object: IMapObject, content: string): string {
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

  private parseScaledSize(object: IPlanetaryBody, content: string): string {
    // scaled down diameter in meters
    let scaledDiameter =  object.radius * this.solarSystem.scale * 2;
    const replaceString = '{{scaledDiameter}}';
    if (this.unitSystemMetric) {
      if (scaledDiameter > 0.2) {
        return content.replace(replaceString, this.round(scaledDiameter) + ' meters');
      }
      scaledDiameter = scaledDiameter * 100;
      return content.replace(replaceString, this.round(scaledDiameter) + ' centimeters');
    }
    if (scaledDiameter > 0.33) {
      scaledDiameter = geolib.convertUnit('ft', scaledDiameter);
      return content.replace(replaceString, this.round(scaledDiameter) + ' feet');
    }
    scaledDiameter = geolib.convertUnit('in', scaledDiameter);
    return content.replace(replaceString, this.round(scaledDiameter) + ' inches');
  }

  private parseScaledSpeed(satellite: ISatellite, content: string): string {
    // scaled down speed in meters per second
    let speed = satellite.speed * this.solarSystem.scale;
    const replaceString = '{{scaledSpeed}}';
    if (this.unitSystemMetric) {
      speed = speed * 100 * 60;
      return content.replace(replaceString, this.round(speed) + ' centimeters per minute');
    }
    speed = geolib.convertUnit('in', speed) * 60;
    return content.replace(replaceString, this.round(speed) + ' inches per minute');
  }

  private parseScaledMoonDistance(actualDistance: number, content: string): string {
    const scaledDistance = actualDistance * this.solarSystem.scale;
    let replaceContent = this.round(scaledDistance) + ' meters';
    if (this.isUnitSystemMetric && scaledDistance < 0.2) {
      replaceContent = this.round(scaledDistance * 100) + ' centimeters';
    }
    if (!this.unitSystemMetric) {
      let imperialDistance = geolib.convertUnit('yd', scaledDistance);
      replaceContent = this.round(imperialDistance) + ' yards';
      if (imperialDistance < 0.2) {
        imperialDistance = geolib.convertUnit('in', scaledDistance);
        replaceContent = this.round(imperialDistance) + ' inches';
      }
    }
    return content.replace('{{scaledMoonDistance}}', replaceContent);
  }

  private round(number: number, precision: number = 2): number {
    const multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
  }

  private createMapObjectMarker(
    mapObject: IMapObject,
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

  private createMapObjectInfoWindow(mapObject: IMapObject |  IPlanetaryBody): google.maps.InfoWindow {
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
        if (this.lightbeam && this.lightbeam.start) {
          this.lightbeam.tracking = false;
        }
        mapObject.mapData.infoWindow.open(this.map, mapObject.mapData.marker);
        mapObject.mapData.isInfoWindowOpen = true;
      });
    }
    return infoWindow;
  }

  private createInfoWindowContent(mapObject: IMapObject): string {
    let content = `
      <div class="text-center">
        <div class="info-window-title">${mapObject.name}</div>
      </div>
      <div class="row">
        ${mapObject.mapData.infoWindowImageUrl ?
          `<div class="col">
            <img class="info-window-image" src="${mapObject.mapData.infoWindowImageUrl}" />
           </div>
          `
          : ''}
          <div class="col info-window-content">
            ${mapObject.mapData.infoWindowContent}
          </div>
      </div>
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
    const mapObjectTypes = ['planets', 'dwarfPlanets', 'satellites'];
    for (const planetType of ['planets', 'dwarfPlanets']) {
      this.solarSystem[planetType].forEach((planet: IPlanet) => {
        planet.mapData.infoWindow.close();
        if (planet.moons) {
          for (const moon of planet.moons) {
            if (moon.mapData.infoWindow) {
              moon.mapData.infoWindow.close();
            }
          }
        }
      });
    }
    for (const satellite of this.solarSystem.satellites) {
      satellite.mapData.infoWindow.close();
    }
    if (this.lightbeam) {
      this.lightbeam.infoWindow.close();
    }
  }

  private calculatePlanetCoordinates(planet: IPlanet, center: google.maps.LatLng, bearing: Bearing): google.maps.LatLng {
    const scaledDistance = planet.distanceFromSun * this.solarSystem.scale;
    const startPoint = {
      latitude: center.lat(),
      longitude: center.lng()
    };
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, bearing);
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude);
  }

  private calculateSatelliteCoordinates(
    satellite: ISatellite,
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

  private calculateMoonCoordinates(planetPosition: google.maps.LatLng, bearing: Bearing, distanceFromPlanet: number): google.maps.LatLng {
    const scaledDistance = distanceFromPlanet * this.solarSystem.scale;
    const moonPosition = geolib.computeDestinationPoint({
      latitude: planetPosition.lat(),
      longitude: planetPosition.lng()
    }, scaledDistance, bearing);
    return new google.maps.LatLng(moonPosition.latitude, moonPosition.longitude);
  }

  private getMoonBearing(): Bearing {
    const bearings = [
      Bearing.North,
      Bearing.NorthEast,
      Bearing.East,
      Bearing.SouthEast,
      Bearing.South,
      Bearing.SouthWest,
      Bearing.West,
      Bearing.NorthWest
    ];
    for (let i = 0; i < bearings.length; i++) {
      if (this.bearing === bearings[i]) {
        return i - 2 < 0 ? bearings[bearings.length + (i - 2)] : bearings[i - 2];
      }
    }
    throw new Error(`Invalid map bearing: ${this.bearing}`);
  }
}
