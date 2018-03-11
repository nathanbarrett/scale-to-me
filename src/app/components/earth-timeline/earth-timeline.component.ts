import { Component, OnInit } from '@angular/core';
import {} from '@types/googlemaps'

import * as Defaults from '../../data/defaults'
import { MapStyles } from '../../data/google-map-styles'

@Component({
  selector: 'app-earth-timeline',
  templateUrl: './earth-timeline.component.html',
  styleUrls: ['./earth-timeline.component.scss']
})
export class EarthTimelineComponent implements OnInit {

  map: google.maps.Map

  directionsService: google.maps.DirectionsService

  directionsDisplay: google.maps.DirectionsRenderer

  originAutocomplete: google.maps.places.Autocomplete

  originPlace: google.maps.places.PlaceResult

  destinationAutocomplete: google.maps.places.Autocomplete

  destinationPlace: google.maps.places.PlaceResult

  constructor() { }

  ngOnInit() {
    this.initMap()
    this.initDrivingServices()
    this.initAutocompletes()
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('earthTimelineMap'), {
      center: {lat: Defaults.DEFAULT_LAT, lng: Defaults.DEFAULT_LNG},
      zoom: 15,
      styles: MapStyles[Defaults.DEFAULT_MAP_STYLE]
    })
  }

  initDrivingServices(): void {
    this.directionsService = new google.maps.DirectionsService
    this.directionsDisplay = new google.maps.DirectionsRenderer
    this.directionsDisplay.setMap(this.map)
  }

  initAutocompletes(): void {
    this.originAutocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('earthTimelineOriginAddress'), {
        types: ['geocode']
      })
    this.originAutocomplete.addListener('place_changed', () => {
      this.originPlace = this.originAutocomplete.getPlace()
      this.getDirections()
    })

    this.destinationAutocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('earthTimelineDestinationAddress'), {
        types: ['geocode']
      })
    this.destinationAutocomplete.addListener('place_changed', () => {
      this.destinationPlace = this.destinationAutocomplete.getPlace()
      this.getDirections()
    })
  }

  getDirections(): void {
    if(!this.originPlace || !this.destinationPlace) {
      return
    }
    this.directionsService.route({
      origin: this.originPlace.geometry.location,
      destination: this.destinationPlace.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      console.log('directions', status, response)
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response)
      }

    })
  }

}
