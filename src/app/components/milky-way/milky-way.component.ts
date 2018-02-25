import { Component, OnInit } from '@angular/core';
import {} from '@types/googlemaps'
import * as geolib from 'geolib'

import * as Defaults from '../../data/defaults'
import { MapStyles } from '../../data/google-map-styles'



@Component({
  selector: 'app-milky-way',
  templateUrl: './milky-way.component.html',
  styleUrls: ['./milky-way.component.scss']
})
export class MilkyWayComponent implements OnInit {

  map: google.maps.Map

  mapOptions: google.maps.MapOptions = {
    zoom: 18,
    center: {lat: Defaults.DEFAULT_LAT, lng: Defaults.DEFAULT_LNG},
    styles: MapStyles[Defaults.DEFAULT_MAP_STYLE]
  }

  marker: google.maps.Marker

  milkyWayDiameter = 5433145 // in meters

  milkyWayOverlay: google.maps.GroundOverlay

  milkyWayBounds: google.maps.LatLngBounds

  milkyWayVisible = false

  milkyWayOpacity = .5

  autocomplete: google.maps.places.Autocomplete

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('milkyWayMap'), this.mapOptions)
    const defaultCenter = new google.maps.LatLng(Defaults.DEFAULT_LAT, Defaults.DEFAULT_LNG)
    this.setMapElements(defaultCenter)
    this.initAutocomplete()
  }

  setMapElements(position: google.maps.LatLng): void {
    this.placeMarker(position)
    this.milkyWayBounds = this.getMilkyWayBounds(position)
    if (this.milkyWayOverlay) {
      this.milkyWayOverlay.setMap(null)
    }
    this.milkyWayOverlay = new google.maps.GroundOverlay(
      '/assets/map/galaxy.png',
      this.milkyWayBounds,
      {opacity: this.milkyWayOpacity})
    if (this.milkyWayVisible) {
      this.milkyWayOverlay.setMap(this.map)
      this.map.fitBounds(this.milkyWayOverlay.getBounds())
      return
    }
    this.map.setCenter(this.marker.getPosition())
  }

  placeMarker(position: google.maps.LatLng): void {
    if (this.marker) {
      this.marker.setPosition(position)
      return
    }
    this.marker = new google.maps.Marker({
      position,
      animation: google.maps.Animation.DROP,
      map: this.map
    })
  }

  getMilkyWayBounds(center: google.maps.LatLng): google.maps.LatLngBounds {
    const initialPoint: any = {lat: center.lat(), lon: center.lng()}
    const distance = this.milkyWayDiameter / 2
    const computedSW = geolib.computeDestinationPoint(initialPoint, distance, 225)
    const computedNE = geolib.computeDestinationPoint(initialPoint, distance, 45)

    return new google.maps.LatLngBounds(
      {lat: computedSW.latitude, lng: computedSW.longitude},
      {lat: computedNE.latitude, lng: computedNE.longitude})
  }

  toggleMilkyWay(): void {
    this.milkyWayVisible = !this.milkyWayVisible
    this.milkyWayOverlay.setMap(this.milkyWayVisible ? this.map : null)
    if (this.milkyWayVisible) {
      this.map.fitBounds(this.milkyWayOverlay.getBounds())
      let zoom = this.map.getZoom()
      this.map.setZoom(++zoom)
    }
  }

  initAutocomplete (): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('milkyWayAddress'), {
        types: ['geocode']
      })
    this.autocomplete.addListener('place_changed', () => {
      this.autocompleteUpdated()
    })
  }

  autocompleteUpdated (): void {
    const place = this.autocomplete.getPlace()
    this.setMapElements(place.geometry.location)
  }

}
