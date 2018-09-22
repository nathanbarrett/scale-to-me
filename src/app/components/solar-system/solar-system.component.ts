import { Component, OnInit, Input } from '@angular/core';

import { SolarSystemService } from '../../services/solar-system.service';
import { GeolocationService } from '../../services/geolocation.service';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialog } from '@angular/material';
import { ProximaCentauriComponent } from '../proxima-centauri/proxima-centauri.component';
import { SolarSystemSelectComponent } from '../solar-system-select/solar-system-select.component';
import { ElementVisibilityService } from '../../services/element-visibility.service';
import { ScriptsService } from '../../services/scripts.service';


@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements OnInit {

  @Input() mapsLoaded: boolean;

  private mapElement: HTMLElement;

  constructor(
    private solarSystem: SolarSystemService,
    private geolocation: GeolocationService,
    private dialog: MatDialog,
    private elementVisibility: ElementVisibilityService,
    private scriptsService: ScriptsService
    ) { }

  ngOnInit() {
    this.scriptsService.loadMapsLibrary().subscribe({
      complete: () => {
        this.watchMapElement();
      }
    });
  }

  private watchMapElement(): void {
    this.mapElement = document.getElementById('solarSystemMap');
    const watcher$ = this.elementVisibility.watch(this.mapElement).subscribe(visibility => {
      if ((visibility.entering || visibility.exiting) && !this.solarSystem.isMapLoaded()) {
        return this.onMapElementVisible();
      }
      if (visibility.full) {
        if (!this.solarSystem.isMapLoaded()) {
          this.onMapElementVisible();
        }
        if (!this.solarSystem.isMapObjectsPlaced()) {
          return this.onMapFullyVisible();
        }
      }
      if (this.solarSystem.map && this.solarSystem.isMapObjectsPlaced()) {
        watcher$.unsubscribe();
      }
    });
  }

  onMapElementVisible() {
    this.solarSystem.initializeMap(this.mapElement);
    const addressInput = <HTMLInputElement>document.getElementById('solarSystemAddressInput');
    this.geolocation.bindAutcompleteToInput(addressInput).subscribe(latLng => {
      this.placeChanged(latLng.latitude, latLng.longitude);
    });
  }

  onMapFullyVisible() {
    this.solarSystem.placeMapObjects();
    setTimeout(() => {
      this.solarSystem.showSunInfoWindow();
    }, 1500);
  }

  getClientLocation() {
    this.geolocation.getClientLocation().subscribe(coords => {
      this.solarSystem.moveCenter(coords.latitude, coords.longitude);
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

  showMapItemsDialog(): void {
    const mapItemsDialogRef = this.dialog.open(SolarSystemSelectComponent, {
      data: {
        mapItems: this.solarSystem.getMapObjectsList()
      }
    });

    mapItemsDialogRef.afterClosed().subscribe((mapObjectName: string) => {
      this.solarSystem.jumpToMapObject(mapObjectName);
    });
  }
}
