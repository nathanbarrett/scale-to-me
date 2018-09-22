/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import { ScriptsService } from './scripts.service';
import { GeolocationService } from './geolocation.service';
import { ICoordinates } from '../interfaces/map-data';
import * as defaults from '../data/defaults';

@Injectable({
  providedIn: 'root'
})
export class MilkyWayService {

  private map: google.maps.Map;

  constructor(private scripts: ScriptsService, private geolocation: GeolocationService) { }

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
  }

  isMapLoaded(): boolean {
    return !!this.map;
  }

  moveMapCenter(latitude: number, longitude: number): void {
    this.map.setCenter(new google.maps.LatLng(latitude, longitude));
  }
}
