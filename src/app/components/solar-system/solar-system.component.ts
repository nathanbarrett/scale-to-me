import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import scrollMonitor from 'scrollmonitor';

import { SolarSystemService } from '../../services/solar-system.service';


@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements OnInit, OnChanges {

  @Input() mapsLoaded: boolean;

  private mapInView = false;

  private mapElement: HTMLElement;

  private scrollWatcher: any;

  constructor(private solarSystem: SolarSystemService) { }

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
    /*
    watcher.enterViewport(() => {
      console.log('element in viewport');
      // this.solarSystem.initializeMap(this.mapElement);
    });
    watcher.fullyEnterViewport(() => {
      console.log('element entirely in viewport');
      // this.solarSystem.placeMapObjects();
    });
    */
  }

  onMapElementVisible() {
    console.log('map element visible in viewport');
    if (this.solarSystem.map) {
      return;
    }
    this.solarSystem.initializeMap(this.mapElement);
  }

  onMapFullyVisible() {
    console.log('map fully visible');
    // TODO initializeMap above is in an async observable so make the below async and fire only
    // after map init
    // this.solarSystem.placeMapObjects();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.mapsLoaded.currentValue && this.mapInView) {

    }
  }

}
