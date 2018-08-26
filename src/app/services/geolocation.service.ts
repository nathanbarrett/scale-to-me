/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';

type PlaceChangedCallback = (latitude: number, longitude: number) => void;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private googleCheckTimes = 0;

  constructor() { }

  bindAutcompleteToInput(
    el: HTMLInputElement,
    onPlaceChange: PlaceChangedCallback,
    options: google.maps.places.AutocompleteOptions = {}): void {
    if (typeof google === 'undefined') {
      if (this.googleCheckTimes > 20) {
        throw new Error('Google Places Library Not Loaded');
      }
      this.googleCheckTimes++;
      setTimeout(() => {
        this.bindAutcompleteToInput(el, onPlaceChange, options);
      }, 100);
      return;
    }
    const autoComplete = new google.maps.places.Autocomplete(el);
    autoComplete.addListener('place_changed', () => {
      onPlaceChange(autoComplete.getPlace().geometry.location.lat(), autoComplete.getPlace().geometry.location.lng());
    });
  }
}
