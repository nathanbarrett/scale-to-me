import { Component, OnInit, Input } from '@angular/core';
import scrollMonitor from 'scrollmonitor';

import { SolarSystemService } from '../../services/solar-system.service';
import { GeolocationService } from '../../services/geolocation.service';


@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements OnInit {

  @Input() mapsLoaded: boolean;

  private mapInView = false;

  private mapElement: HTMLElement;

  private scrollWatcher: any;

  constructor(private solarSystem: SolarSystemService, private geolocation: GeolocationService) { }

  ngOnInit() {
    this.mapElement = document.getElementById('solarSystemMap');
    this.scrollWatcher = scrollMonitor.create(this.mapElement);
    this.scrollWatcher.enterViewport(() => {
      if (window.scrollY === 0) {
        return;
      }
      this.onMapElementVisible();
    });
    this.scrollWatcher.fullyEnterViewport(() => {
      this.onMapFullyVisible();
    });
  }

  onMapElementVisible() {
    if (this.solarSystem.map) {
      return;
    }
    this.solarSystem.initializeMap(this.mapElement);
    const addressInput = <HTMLInputElement>document.getElementById('solarSystemAddressInput');
    this.geolocation.bindAutcompleteToInput(addressInput, (latitude: number, longitude: number) => {
      this.placeChanged(latitude, longitude);
    });
  }

  onMapFullyVisible() {
    this.solarSystem.placeMapObjects();
    setTimeout(() => {
      this.solarSystem.showSunInfoWindow();
    }, 1500);
  }

  getClientLocation() {
    if(!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.solarSystem.moveCenter(position.coords.latitude, position.coords.longitude);
    });
  }

  rotateMapObjects() {
    this.solarSystem.rotateMapObjects();
  }

  placeChanged(latitude: number, longitude: number) {
    this.solarSystem.moveCenter(latitude, longitude);
  }

}
