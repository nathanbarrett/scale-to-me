import { Component, OnInit } from '@angular/core';
import { ElementVisibilityService } from '../../services/element-visibility.service';
import { ScriptsService } from '../../services/scripts.service';
import { MilkyWayService } from '../../services/milky-way.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-milky-way',
  templateUrl: './milky-way.component.html',
  styleUrls: ['./milky-way.component.scss']
})
export class MilkyWayComponent implements OnInit {

  private mapElement: HTMLElement;

  constructor(
    private elementVisibility: ElementVisibilityService,
    private scripts: ScriptsService,
    private milkyWay: MilkyWayService,
    private geolocation: GeolocationService
    ) { }

  ngOnInit() {
    this.scripts.loadMapsLibrary().subscribe({
      complete: () => {
        this.watchMapElement();
      }
    });
  }

  private watchMapElement(): void {
    this.mapElement = document.getElementById('milkyWayMap');
    const watcher$ = this.elementVisibility.watch(this.mapElement).subscribe(visibility => {
      if ((visibility.entering || visibility.exiting || visibility.full) && !this.milkyWay.isMapLoaded()) {
        this.onMapElementVisible();
      }
      if (this.milkyWay.isMapLoaded()) {
        watcher$.unsubscribe();
      }
    });
  }

  private onMapElementVisible(): void {
    this.milkyWay.initMap(this.mapElement, this.geolocation.getLastLocation());
    const autocompleteInput = <HTMLInputElement>document.getElementById('milkyWayAddressInput');
    this.geolocation.bindAutcompleteToInput(autocompleteInput).subscribe(coordinates => {
      this.milkyWay.moveMapCenter(coordinates.latitude, coordinates.longitude);
    });
  }

}
