import { Router, ActivatedRoute, Params } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {} from '@types/googlemaps'
import { SolarSystemService } from '../../services/solar-system.service'
import { Bearing, MapStyle } from '../../enums/bearing.enum'
import * as Defaults from '../../data/defaults'
import * as MapStyles from '../../data/google-map-styles'

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements OnInit, OnDestroy {

  map: google.maps.Map

  autocomplete: google.maps.places.Autocomplete

  place: google.maps.places.PlaceResult

  solarSystemService: SolarSystemService

  queryParams: Params

  defaultMapOptions: google.maps.MapOptions = {
    center: {lat: Defaults.DEFAULT_LAT, lng: Defaults.DEFAULT_LNG},
    zoom: 12
  }

  defaultZoom = 12

  defaultCenter: google.maps.LatLng

  moonZoomThreshold = 20

  bearing: Bearing

  Bearing = Bearing

  selectedBodyName: string = null

  constructor (private activatedRoute: ActivatedRoute, private router: Router) {
    this.queryParams = this.activatedRoute.snapshot.queryParams
  }

  ngOnInit () {
    this.initMap()
    this.initAutocomplete()
  }

  ngOnDestroy () {
    this.solarSystemService.destroyMapObjects()
  }

  initMap (): void {
    this.map = this.createMap()
    this.defaultCenter = this.map.getCenter()
    this.solarSystemService = new SolarSystemService(this.map)
    if (this.queryParams['center']) {
      const latLngLiteral = this.queryParams['center'].split(',')
      const lat = parseFloat(latLngLiteral[0])
      const lng = parseFloat(latLngLiteral[1])
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        const latLng: google.maps.LatLng = new google.maps.LatLng(lat, lng)
        this.solarSystemService.setCenter(latLng)
      }
    }
    this.bearing = this.queryParams['bearing'] ? parseInt(this.queryParams['bearing'], 10) : Defaults.DEFAULT_BEARING
    if (!this.solarSystemService.isValidBearing(this.bearing)) {
      this.bearing = Defaults.DEFAULT_BEARING
    }
    this.solarSystemService.setBearing(this.bearing)
    this.solarSystemService.setAllMarkers()
    this.mapZoomCheck()
    this.solarSystemService.centerOn('The Sun')
    this.solarSystemService.onSunDragEnd((latLng: google.maps.LatLng) => {
      this.updateQueryParams({center: `${latLng.lat()},${latLng.lng()}`})
    })
  }

  initAutocomplete (): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('sunAddress'), {
        types: ['geocode']
      })
    this.autocomplete.addListener('place_changed', () => {
      this.autocompleteUpdated()
    })
  }

  autocompleteUpdated (): void {
    this.place = this.autocomplete.getPlace()
    this.map.setCenter(this.place.geometry.location)
    this.solarSystemService.setCenter(this.place.geometry.location)
    this.updateQueryParams({center: `${this.place.geometry.location.lat()},${this.place.geometry.location.lng()}`})
    this.solarSystemService.setAllMarkers()
  }

  setBearing (bearing: string): void {
    this.bearing = parseInt(bearing, 10)
    this.updateQueryParams({bearing: this.bearing})
    this.solarSystemService.setBearing(this.bearing)
    this.solarSystemService.setAllMarkers()
  }

  updateQueryParams (params?: Params): void {
    this.queryParams = params ? {
      ...this.queryParams,
      ...params
    } : {}
    this.router.navigate([''], {queryParams: this.queryParams})
  }

  createMap (): google.maps.Map {
    const mapOptions: google.maps.MapOptions = {...this.defaultMapOptions}
    if (Defaults.DEFAULT_MAP_STYLE !== MapStyle.Standard) {
      mapOptions.styles = MapStyles[Defaults.DEFAULT_MAP_STYLE]
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions)
    map.addListener('zoom_changed', () => {
      this.mapZoomCheck()
    })
    return map
  }

  mapZoomCheck (): void {
    this.solarSystemService.toggleMoonMarkers(this.map.getZoom() >= this.moonZoomThreshold)
  }

  startLightBeam (): void {
    this.map.setCenter(
      this.solarSystemService.solarSystem.sun.mapData.marker.getPosition()
    )
    this.map.setZoom(17)
    this.solarSystemService.startLightBeam()
  }

  cancelLightBeam (): void {
    this.solarSystemService.cancelLightBeam()
  }

  centerOn (bodyName: string): void {
    this.selectedBodyName = bodyName
    this.solarSystemService.centerOn(bodyName.toLowerCase())
  }

  switchMeasurementSystem (metric: boolean): void {
    this.solarSystemService.switchMeasurementSystem(metric)
  }

  isMeasurementSystemMetric (): boolean {
    return this.solarSystemService && this.solarSystemService.unitSystemMetric
  }

  resetToDefaults (): void {
    this.updateQueryParams(null)
    this.bearing = Defaults.DEFAULT_BEARING
    this.solarSystemService.setCenter(this.defaultCenter)
    this.solarSystemService.setBearing(this.bearing)
    this.map.setCenter(this.solarSystemService.center)
    this.map.setZoom(this.defaultZoom)
    this.solarSystemService.setAllMarkers()
  }

}
