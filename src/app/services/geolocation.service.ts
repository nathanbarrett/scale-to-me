/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ICoordinates } from '../interfaces/map-data';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private lastLocation: ICoordinates;

  constructor() { }

  bindAutcompleteToInput(
    el: HTMLInputElement,
    options: google.maps.places.AutocompleteOptions = {}): Observable<ICoordinates> {
      return Observable.create((observer: Observer<ICoordinates>) => {
        if (typeof google === 'undefined') {
          observer.error('Autocomplete unable to load because google maps not loaded');
          observer.complete();
        }
        const autoComplete = new google.maps.places.Autocomplete(el, options);
        autoComplete.addListener('place_changed', () => {
          observer.next({
            latitude: autoComplete.getPlace().geometry.location.lat(),
            longitude: autoComplete.getPlace().geometry.location.lng()
          });
        });
      });
  }

  getClientLocation(options: PositionOptions = {}): Observable<ICoordinates> {
    return Observable.create((observer: Observer<ICoordinates>) => {
      if (!navigator.geolocation) {
        observer.error('Geolocation not enabled');
        observer.complete();
        return;
      }
      navigator.geolocation.getCurrentPosition(position => {
        this.lastLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        observer.next(this.lastLocation);
      }, error => {
        observer.error(`Unabe to get position. Error code ${error.code}: ${error.message}`);
      }, {});
    });
  }

  getLastLocation(): ICoordinates {
    return this.lastLocation;
  }
}
