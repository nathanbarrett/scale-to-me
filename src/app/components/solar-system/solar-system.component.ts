/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import scrollMonitor from 'scrollmonitor';
import * as geolib from 'geolib';

import { IPlanet } from '../../interfaces/planet';
import { ISatellite } from '../../interfaces/satellite';
import { Bearing } from '../../enums/bearing.enum';
import { SolarSystem } from '../../data/solar-system-content';
import * as defaults from '../../data/defaults';
import { IMapObject } from '../../interfaces/map-object';

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements OnInit, OnChanges {

  @Input() googleMapsLoaded: boolean;

  private map: google.maps.Map;

  private mapOptions: google.maps.MapOptions;

  private sun: google.maps.Marker;

  private planets: IPlanet[] = [];

  private satellites: ISatellite[] = [];

  private center: google.maps.LatLng;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('maps status', changes.googleMapsLoaded);
    if (changes.googleMapsLoaded.currentValue) {
      this.initMap();
    }
  }

  initMap(): void {
    this.center = new google.maps.LatLng(defaults.DEFAULT_LAT, defaults.DEFAULT_LNG);
    this.mapOptions = {
      zoom: 15,
      center: this.center
    };
    const ssMap = document.getElementById('solarSystemMap');
    this.map = new google.maps.Map(ssMap, this.mapOptions);
    const watcher = scrollMonitor.create(ssMap);
    watcher.fullyEnterViewport(() => {
      if (!this.sun) {
        this.placeMapObjects(this.center, defaults.DEFAULT_BEARING);
      }
    });
  }

  placeMapObjects(center: google.maps.LatLng, bearing: Bearing): void {
    if (this.sun) {
      this.sun.setPosition(center);
    } else {
      this.sun = new google.maps.Marker({
        map: this.map,
        icon: {
          size: new google.maps.Size(50, 85),
          url: '/assets/map/map-icon-sun-new.png',
          anchor: new google.maps.Point(25, 85),
          origin: new google.maps.Point(0, 0)
        },
        position: center,
        animation: google.maps.Animation.DROP
      });
    }
    if (this.planets.length) {
      this.planets.forEach(planet => {
        planet.mapData.marker.setPosition(
          this.calculateMapCoordinates(planet, center, bearing)
        );
      });
    } else {
      this.planets = SolarSystem.planets.map(planet => {
        planet.mapData.marker = new google.maps.Marker({
            map: this.map,
            icon: {
              size: new google.maps.Size(50, 85),
              url: planet.mapData.iconUrl,
              anchor: new google.maps.Point(25, 85),
              origin: new google.maps.Point(0, 0)
            },
            position: this.calculateMapCoordinates(planet, center, bearing),
            animation: google.maps.Animation.DROP
          });
        return {...planet};
      });
    }
  }

  calculateMapCoordinates(object: IMapObject, center: google.maps.LatLng, bearing: Bearing): google.maps.LatLng {
    const scaledDistance = object.distanceFromSun * SolarSystem.scale;
    const startPoint = {
      latitude: center.lat(),
      longitude: center.lng()
    };
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, bearing);
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude);
  }

}
