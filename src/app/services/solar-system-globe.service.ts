import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolarSystemGlobeService {

  constructor() { }

  initGlobe(elementId: string): void {
    const viewer = new Cesium.Viewer(elementId);
  }
}
