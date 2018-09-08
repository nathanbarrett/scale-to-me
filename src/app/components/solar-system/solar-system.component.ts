import { Component, OnInit, Input } from '@angular/core';
import scrollMonitor from 'scrollmonitor';

import { SolarSystemService } from '../../services/solar-system.service';
import { GeolocationService } from '../../services/geolocation.service';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialog } from '@angular/material';
import { ProximaCentauriComponent } from '../proxima-centauri/proxima-centauri.component';


@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements OnInit {

  @Input() mapsLoaded: boolean;

  private mapElementsPlaced = false;

  private mapElement: HTMLElement;

  private scrollWatcher: any;

  constructor(private solarSystem: SolarSystemService, private geolocation: GeolocationService, private dialog: MatDialog) { }

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
    if (this.mapElementsPlaced) {
      return;
    }
    this.solarSystem.placeMapObjects();
    setTimeout(() => {
      this.solarSystem.showSunInfoWindow();
    }, 1500);
    this.mapElementsPlaced = true;
  }

  getClientLocation() {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.solarSystem.moveCenter(position.coords.latitude, position.coords.longitude);
    });
  }

  isUnitSystemMetric(): boolean {
    return this.solarSystem.isUnitSystemMetric();
  }

  setUnitSystemMetric(change: MatRadioChange): void {
    this.solarSystem.setUnitSystem(change.value);
  }

  rotateMapObjects() {
    this.solarSystem.rotateMapObjects();
  }

  placeChanged(latitude: number, longitude: number) {
    this.solarSystem.moveCenter(latitude, longitude);
  }

  toggleLightbeam() {
    if (this.solarSystem.isLightbeamRunning()) {
      return this.solarSystem.stopLightbeam();
    }
    this.solarSystem.startLightbeam();
  }

  isLightbeamRunning(): boolean {
    return this.solarSystem.isLightbeamRunning();
  }

  showProximaCentauriDialog(): void {
    this.dialog.open(ProximaCentauriComponent, {
      closeOnNavigation: true
    });
  }
}
