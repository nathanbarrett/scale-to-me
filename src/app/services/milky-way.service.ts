/// <reference types="@types/googlemaps" />

import { Injectable, NgZone } from '@angular/core';
import { ICoordinates } from '../interfaces/map-data';
import * as defaults from '../data/defaults';
import * as geolib from 'geolib';
import { Bearing } from '../enums/bearing.enum';

@Injectable({
  providedIn: 'root'
})
export class MilkyWayService {

  private map: google.maps.Map;

  private quarterMarker: google.maps.Marker;

  private milkyWayOverlay: google.maps.GroundOverlay;

  /** In meters. Scaled down by a factor of 2.6985539488320355e-15 */
  private scaledMilkyWayDiameter = 2553102;

  constructor(private zone: NgZone) { }

  initMap(element: HTMLElement, center?: ICoordinates): void {
    const centerLatLng = new google.maps.LatLng(
      center ? center.latitude : defaults.DEFAULT_LAT,
      center ? center.longitude : defaults.DEFAULT_LNG
      );
    this.map = new google.maps.Map(element, {
      center: centerLatLng,
      zoom: defaults.DEFAULT_MAP_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false
    });
    this.map.addListener('click', event => {
      this.zone.run(() => {
        this.placeQuarter(event.latLng.lat(), event.latLng.lng());
      });
    });
    this.quarterMarker = new google.maps.Marker({
      position: centerLatLng,
      map: null,
      title: 'Solar System US Quarter',
      icon: {
        size: new google.maps.Size(50, 85),
        url: '/assets/map/map-icon-us-quarter.png',
        anchor: new google.maps.Point(25, 85),
        origin: new google.maps.Point(0, 0)
      },
    });
  }

  isMapLoaded(): boolean {
    return !!this.map;
  }

  placeQuarter(latitude: number, longitude: number): void {
    const center = new google.maps.LatLng(latitude, longitude);
    this.quarterMarker.setPosition(center);
    this.quarterMarker.setMap(this.map);
    if (this.isMilkyWayVisible()) {
      const bounds = this.calculateMilkyWayBounds(center);
      this.milkyWayOverlay = this.generateMilkyWayOverlay(bounds);
      this.map.fitBounds(bounds);
      return;
    }
    this.map.setCenter(center);
    this.map.setZoom(20);
  }

  isQuarterPlaced(): boolean {
    return this.quarterMarker && !!this.quarterMarker.getMap();
  }

  isMilkyWayVisible(): boolean {
    return this.milkyWayOverlay && !!this.milkyWayOverlay.getMap();
  }

  showMilkyWay(): void {
    const bounds = this.calculateMilkyWayBounds(this.quarterMarker.getPosition());
    if (!this.milkyWayOverlay) {
      this.milkyWayOverlay = this.generateMilkyWayOverlay(bounds);
    }
    this.map.fitBounds(bounds);
  }

  private calculateMilkyWayBounds(quarterLatLng: google.maps.LatLng): google.maps.LatLngBounds {
    const radius = this.scaledMilkyWayDiameter / 2;
    const cornerDistance = Math.sqrt(Math.pow(radius, 2) + Math.pow(radius, 2));
    /** Offset the center of the milky way slightly so that our solar system sits in an outer leg somewhere */
    const northOffset = 1.15;
    const eastOffset = 1.1;
    const centerCoordinates = {
      latitude: quarterLatLng.lat() * northOffset,
      longitude: quarterLatLng.lng() * eastOffset
    };
    const swCoords = geolib.computeDestinationPoint(centerCoordinates, cornerDistance, Bearing.SouthWest);
    const neCoords = geolib.computeDestinationPoint(centerCoordinates, cornerDistance, Bearing.NorthEast);
    return new google.maps.LatLngBounds(
      {lat: swCoords.latitude, lng: swCoords.longitude},
      {lat: neCoords.latitude, lng: neCoords.longitude}
      );
  }

  private generateMilkyWayOverlay(bounds: google.maps.LatLngBounds): google.maps.GroundOverlay {
    if (this.milkyWayOverlay) {
      this.milkyWayOverlay.setMap(null);
    }
    return new google.maps.GroundOverlay(
      '/assets/map/galaxy.png', bounds, {map: this.map, opacity: 0.5}
      );
  }
}
