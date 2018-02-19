import {} from '@types/googlemaps'
import * as geolib from 'geolib'
import SolarSystemModel from 'solaris-model'
import * as moment from 'moment'
import isArray from 'lodash/isArray'
import numeral from 'numeral'

import { Bearing } from '../enums/bearing.enum'
import { SolarSystem } from '../data/solar-system-content'
import { IPlanetaryBody } from '../interfaces/planetary-body'
import { IPlanet } from '../interfaces/planet'
import { IMoon } from '../interfaces/moon'
import { ISolarSystem } from '../interfaces/solar-system'
import { ISatellite } from '../interfaces/satellite'
import { IMapObject } from '../interfaces/map-object'
import { SatelliteTrajectoryType } from '../enums/satellite-trajectory-type.enum'
import * as Defaults from '../data/defaults'

export class SolarSystemService {

  bearing: Bearing = Bearing.NorthEast

  map: google.maps.Map

  solarSystem = SolarSystem

  center: google.maps.LatLng

  markerAnimation: google.maps.Animation = google.maps.Animation.DROP

  defaultPlanetZoom = 15

  moonBearningsInverted = false

  lightBeam: google.maps.Polyline

  lightBeamOptions: google.maps.PolylineOptions = {
    strokeColor: '#FFFF00',
    strokeOpacity: 0.9,
    strokeWeight: 10,
    geodesic: true
  }

  lightBeamTimer = 0

  lightBeamTimeout = 86400

  lightBeamInterval: number = null

  lightBeamBearing: Bearing = Defaults.DEFAULT_BEARING

  unitSystemMetric = Defaults.DEFAULT_UNIT_SYSTEM_METRIC

  showMoons = false

  onSunDragEndCallback: Function

  // in meters per second
  speedOfLight = 299800000

  ssModel: any

  markerZIndexCounter = 500

  constructor (map: google.maps.Map) {
    this.map = map
    this.center = new google.maps.LatLng(Defaults.DEFAULT_LAT, Defaults.DEFAULT_LNG)
    // attaching to window here due to an issue
    // https://github.com/skepticalimagination/solaris-model/issues/1
    if (!(<any>window).ssModel) {
      (<any>window).ssModel = new SolarSystemModel();
      (<any>window).ssModel.setTime(moment().format('YYYY-MM-DD'))
    }
    this.ssModel = (<any>window).ssModel
  }

  setAllMarkers (): void {
    this.placeSunMarker()
    this.solarSystem.planets = this.placePlanetAndMoonMarkers(this.solarSystem.planets)
    this.solarSystem.dwarfPlanets = this.placePlanetAndMoonMarkers(this.solarSystem.dwarfPlanets)
    this.placeSatelliteMarkers()
    this.placeInfoBodies()
  }

  placeSunMarker (): void {
    if (this.solarSystem.sun.mapData.marker && this.solarSystem.sun.mapData.marker.getMap() !== this.map) {
      // component was reloaded, place on the newly created map
      this.solarSystem.sun.mapData.marker.setMap(this.map)
      return
    }
    let infoWindowContent = this.getInfoWindowContent(this.solarSystem.sun)
    infoWindowContent = this.insertScaledDiameter(this.solarSystem.sun, infoWindowContent)
    if (this.solarSystem.sun.mapData.marker) {
      this.solarSystem.sun.mapData.marker.setPosition(this.center)
      this.solarSystem.sun.mapData.infoWindow.setContent(infoWindowContent)
      return
    }
    this.solarSystem.sun.mapData.infoWindow = this.createInfoWindow(infoWindowContent)
    this.solarSystem.sun.mapData.marker = this.createMarker(this.solarSystem.sun, this.center, this.solarSystem.sun.mapData.infoWindow)
    this.solarSystem.sun.mapData.marker.setMap(this.map)
  }

  placePlanetAndMoonMarkers (planets: IPlanet[]): IPlanet[] {
    return planets.map(planet => {
      const planetLatLng = this.calculatePlanetPosition(planet)
      const infoWindowContent = this.getPlanetInfoWindowContent(planet)
      if (planet.mapData.marker && planet.mapData.marker.getMap() !== this.map) {
        planet.mapData.marker.setMap(this.map)
        planet.mapData.marker.setPosition(planetLatLng)
      } else if (planet.mapData.marker) {
        planet.mapData.marker.setPosition(planetLatLng)
        planet.mapData.infoWindow.setContent(infoWindowContent)
      } else {
        planet.mapData.infoWindow = this.createInfoWindow(infoWindowContent)
        planet.mapData.marker = this.createMarker(planet, planetLatLng, planet.mapData.infoWindow)
        planet.mapData.marker.setMap(this.map)
      }
      if (!isArray(planet.moons)) {
        planet.moons = []
        return planet
      }
      planet.moons = planet.moons.map(moon => {
        if (moon.mapData.marker && moon.mapData.marker.getMap() !== this.map) {
          moon.mapData.marker.setMap(this.showMoons ? this.map : null)
          return moon
        }
        const moonLatLng = this.calculateMoonPosition(planet, moon)
        const moonInfoWindowContent = this.getMoonInfoWindowContent(moon)
        if (moon.mapData.marker) {
          moon.mapData.marker.setPosition(moonLatLng)
          moon.mapData.infoWindow.setContent(moonInfoWindowContent)
          return moon
        }
        moon.mapData.infoWindow = this.createInfoWindow(moonInfoWindowContent)
        moon.mapData.marker = this.createMarker(moon, moonLatLng, moon.mapData.infoWindow)
        moon.mapData.marker.setMap(this.showMoons ? this.map : null)
        return moon
      })
      return planet
    })
  }

  placeSatelliteMarkers (): void {
    this.solarSystem.satellites = this.solarSystem.satellites.map(satellite => {
      const satelliteLatLng = this.calculateSatellitePosition(satellite)
      const infoWindowContent = this.getSatelliteInfoWindowContent(satellite)
      if (satellite.mapData.marker && satellite.mapData.marker.getMap() !== this.map) {
        satellite.mapData.marker.setMap(this.map)
        return satellite
      }
      if (satellite.mapData.marker) {
        satellite.mapData.marker.setPosition(satelliteLatLng)
        satellite.mapData.infoWindow.setContent(infoWindowContent)
        return satellite
      }
      satellite.mapData.infoWindow = this.createInfoWindow(infoWindowContent)
      satellite.mapData.marker = this.createMarker(satellite, satelliteLatLng, satellite.mapData.infoWindow)
      satellite.mapData.marker.setMap(this.map)
      return satellite
    })
  }

  placeInfoBodies (): void {
    // these are going to be highly custom, each one has varying behavior
    // start to break this apart once you start adding more
    this.solarSystem.infoBodies.forEach(body => {
      if (body.name === 'Proxima Centauri') {
        const content = this.getInfoBodyInfoWindowContent(body)
        body.mapData.infoWindow = new google.maps.InfoWindow({content})
      }
    })
  }

  insertScaledDiameter (body: IPlanetaryBody, content: string): string {
    return content.replace('{{scaledDiameter}}', this.getScaledDiameter(body))
  }

  insertScaledDistance (object: IMapObject, content: string): string {
    if (!object.distanceFromSun) {
      return content
    }
    return content.replace('{{scaledDistance}}', this.getScaledDistance(object))
  }

  insertScaledMoonPlanetDistance (moon: IMoon, content: string): string {
    if (!moon.distanceFromPlanet) {
      return content
    }
    return content.replace('{{scaledPlanetDistance}}', this.getScaledMoonPlanetDistance(moon))
  }

  insertScaledSpeed (satellite: ISatellite, content: string): string {
    if (!satellite.speed) {
      return content
    }
    return content.replace('{{scaledSpeed}}', this.getScaledSpeed(satellite.speed))
  }

  getScaledDiameter (body: IPlanetaryBody): string {
    const scaledCMDiameter = body.radius * 2 * this.solarSystem.scale * 100
    let scaleTo: any[] = [{m: 'meters'}, {yd: 'yards'}]
    if (scaledCMDiameter < 1) {
      scaleTo = [{mm: 'millimeters'}]
    } else if (scaledCMDiameter < 100) {
      scaleTo = [{cm: 'centimeters'}, {in: 'inches'}]
    }
    const convertTo = (!this.unitSystemMetric && scaleTo.length > 1) ? scaleTo[1] : scaleTo[0]
    const convertSymbol = Object.keys(convertTo)[0]
    const converted = geolib.convertUnit(convertSymbol, scaledCMDiameter / 100)
    return numeral(converted).format('0,0.00') + ' ' + convertTo[convertSymbol]
  }

  getScaledDistance (object: IMapObject): string {
    if (!object.distanceFromSun) {
      return ''
    }
    let scaledDistance
    if (this.ssModel.bodies[object.name.toLowerCase()]) {
      scaledDistance = this.calculatePlanetDistance(object.name)
    } else {
      scaledDistance = object.distanceFromSun * this.solarSystem.scale
    }
    let scaleTo: any[] = [{m: 'meters'}, {yd: 'yards'}]
    if (scaledDistance > 1609) {
      scaleTo = [{km: 'kilometers'}, {mi: 'miles'}]
    }
    const convertTo = scaleTo[this.unitSystemMetric ? 0 : 1]
    const convertSymbol = Object.keys(convertTo)[0]
    const converted = geolib.convertUnit(convertSymbol, scaledDistance)
    return `${numeral(converted).format('0,0.00')} ${convertTo[convertSymbol]}`
  }

  getScaledMoonPlanetDistance (moon: IMoon): string {
    if (!moon.distanceFromPlanet) {
      return ''
    }
    const scaledDistance = moon.distanceFromPlanet * this.solarSystem.scale
    let scaleTo: any[] = [{m: 'meters'}, {yd: 'yards'}]
    if (scaledDistance > 1609) {
      scaleTo = [{km: 'kilometers'}, {mi: 'miles'}]
    }
    const convertTo = scaleTo[this.unitSystemMetric ? 0 : 1]
    const convertSymbol = Object.keys(convertTo)[0]
    const converted = geolib.convertUnit(convertSymbol, scaledDistance)
    return `${numeral(converted).format('0,0.00')} ${convertTo[convertSymbol]}`
  }

  getScaledSpeed (speed: number): string {
    // once scaled down these are things that move very slow (typically)
    // so let's scale down to X small units traveled per day
    if (!speed) {
      return ''
    }
    const scaledMetersPerSecond = speed * this.solarSystem.scale
    const scaledMetersPerDay = scaledMetersPerSecond * 60 * 60 * 24
    let scaleTo: any[] = [{m: 'meters'}, {yd: 'yards'}]
    if (scaledMetersPerDay < 1) {
      scaleTo = [{cm: 'centimeters'}, {in: 'inches'}]
    }
    const convertTo = scaleTo[this.unitSystemMetric ? 0 : 1]
    const convertSymbol = Object.keys(convertTo)[0]
    const converted = geolib.convertUnit(convertSymbol, scaledMetersPerDay)
    return `${numeral(converted).format('0,0.00')} ${convertTo[convertSymbol]} per day`

  }

  // preventing darts from being thrown at my head here
  replaceAmericanTerms (content: string): string {
    if (this.unitSystemMetric) {
      content = content.replace('soccer ball', 'football')
        .replace('Soccer ball', 'Football')
    }
    return content
  }

  createMarker (body: IMapObject, position: google.maps.LatLng, infoWindow?: google.maps.InfoWindow): google.maps.Marker {
    const isTheSun = body.name.toLowerCase().indexOf('sun') >= 0
    const marker: google.maps.Marker = new google.maps.Marker({
      icon: body.mapData.iconUrl,
      clickable: true,
      draggable: isTheSun,
      position,
      animation: this.markerAnimation,
      zIndex: --this.markerZIndexCounter,
    })
    if (!infoWindow) {
      return marker
    }
    marker.addListener('click', () => {
      this.showSingularInfoWindow(body.name)
    })
    if (isTheSun) {
      marker.addListener('dragend', (event: google.maps.MouseEvent) => {
        this.setCenter(event.latLng)
        this.setAllMarkers()
        if (this.onSunDragEndCallback) {
          this.onSunDragEndCallback(event.latLng)
        }
      })
    }
    return marker
  }

  createInfoWindow (content: string): google.maps.InfoWindow {
    const infoWindowOptions: google.maps.InfoWindowOptions = {content}
    if (window.innerWidth <= 576) {
      infoWindowOptions.maxWidth = 300
    }
    const infoWindow = new google.maps.InfoWindow(infoWindowOptions)
    return infoWindow
  }

  getPlanetInfoWindowContent (planet: IPlanet): string {
    let content = this.getInfoWindowContent(planet)
    content = this.insertScaledDistance(planet, content)
    content = this.insertScaledDiameter(planet, content)
    return content
  }

  getMoonInfoWindowContent (moon: IMoon): string {
    let content = this.getInfoWindowContent(moon)
    content = this.insertScaledDiameter(moon, content)
    content = this.insertScaledMoonPlanetDistance(moon, content)
    content = this.insertScaledDistance(moon, content)
    return content
  }

  getSatelliteInfoWindowContent (satellite: ISatellite): string {
    let content = this.getInfoWindowContent(satellite)
    content = this.insertScaledDistance(satellite, content)
    content = this.insertScaledSpeed(satellite, content)
    return content
  }

  getInfoWindowContent (object: IMapObject): string {
    const content = `
      <div style="color: #000000;">
        <div class="row">
          <div class="col-12 col-md-6">
            <img class="img-fluid" src="${object.mapData.infoWindowImageUrl}"
                      style="display: inline-block" />
          </div>
          <div class="col-12 col-md-6">
            <div style="width: 100%; text-align: center; margin-top: 10px;">
                <h4 style="color: #000000;">${object.name}</h4>
            </div>
            <p style="font-size: 16px; padding: 10px;">${object.mapData.infoWindowContent}</p>
          </div>
        </div>
        <hr />
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <h5>Did you know?</h5>
             <p>${object.mapData.didYouKnow}</p>
          </div>
        </div>
      </div>
    `
    return this.replaceAmericanTerms(content)
  }

  getInfoBodyInfoWindowContent (infoBody: IMapObject): string {
    let content = `
      <div style="color: #000000">
      <div style="width: 100%; text-align: center;">
        <h4>${infoBody.name}</h4>
      </div>
      <p style="font-size: 16px;">${infoBody.mapData.infoWindowContent}</p>
    `
    if (infoBody.mapData.infoWindowImageUrl) {
      content += `
      <div style="width: 100%; text-align: center;">
        <img src="${infoBody.mapData.infoWindowImageUrl}"
             style="display: inline-block" />
      </div>
      `
    }
    if (infoBody.mapData.didYouKnow) {
      content += `<h5 style="margin-top: 10px;">Did you know?</h5><p>${infoBody.mapData.didYouKnow}</p>`
    }
    content += '</div>'
    content = this.insertScaledDistance(infoBody, content)
    content = this.replaceAmericanTerms(content)
    return content
  }

  switchMeasurementSystem (metric: boolean): void {
    this.unitSystemMetric = metric
    let sunInfoWindowContent = this.getInfoWindowContent(this.solarSystem.sun)
    sunInfoWindowContent = this.insertScaledDiameter(this.solarSystem.sun, sunInfoWindowContent)
    this.solarSystem.sun.mapData.infoWindow.setContent(
      sunInfoWindowContent
    )
    this.updatePlanetsAndMoonsInfoWindows(this.solarSystem.planets)
    this.updatePlanetsAndMoonsInfoWindows(this.solarSystem.dwarfPlanets)
    this.solarSystem.satellites.forEach(satellite => {
      satellite.mapData.infoWindow.setContent(
        this.getSatelliteInfoWindowContent(satellite)
      )
    })
  }

  updatePlanetsAndMoonsInfoWindows (planets: IPlanet[]): void {
    planets.forEach(planet => {
      planet.mapData.infoWindow.setContent(
        this.getPlanetInfoWindowContent(planet)
      )
      if (!planet.moons) {
        return
      }
      planet.moons.forEach(moon => {
        if (moon.mapData.infoWindow) {
          moon.mapData.infoWindow.setContent(
            this.getMoonInfoWindowContent(moon)
          )
        }
      })
    })
  }

  calculatePlanetPosition (body: IPlanet): google.maps.LatLng {
    const scaledDistance = this.calculatePlanetDistance(body.name)
    const startPoint = {
      latitude: this.solarSystem.sun.mapData.marker.getPosition().lat(),
      longitude: this.solarSystem.sun.mapData.marker.getPosition().lng()
    }
    const bearing = this.bearing === Bearing.CurrentPositions ? this.calculateCurrentPlanetBearing(body.name) : this.bearing
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, bearing)
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude)
  }

  calculatePlanetDistance (planetName: string): number {
    let coordinates: number[] = [...this.ssModel.bodies[planetName.toLowerCase()].position]
    coordinates = coordinates.map(coord => coord * this.solarSystem.scale)
    return Math.sqrt(Math.pow(coordinates[0], 2) + Math.pow(coordinates[1], 2) + Math.pow(coordinates[2], 2))
  }

  calculateCurrentPlanetBearing (planetName: string): number {
    const coordinates: number[] = this.ssModel.bodies[planetName.toLowerCase()].position
    const x = coordinates[0]
    const y = coordinates[1]
    const bearing = 90 - ((180 / Math.PI) * Math.atan2(y, x))
    return 180 + bearing
  }

  setBearing (bearing: Bearing): void {
    this.bearing = bearing
  }

  setCenter (center: google.maps.LatLng): void {
    this.center = center
  }

  isValidBearing (bearing: Bearing): boolean {
    const bearings: Bearing[] = [
      Bearing.North,
      Bearing.NorthEast,
      Bearing.East,
      Bearing.SouthEast,
      Bearing.South,
      Bearing.SouthWest,
      Bearing.West,
      Bearing.NorthWest,
      Bearing.CurrentPositions,
    ]
    return bearings.indexOf(bearing) >= 0
  }

  showSingularInfoWindow (bodyName: string) {
    this.hideInfoWindowUnlessNameIs(this.solarSystem.sun, bodyName)
    this.solarSystem.planets.forEach(planet => {
      this.hideInfoWindowUnlessNameIs(planet, bodyName)
      if (planet.moons) {
        planet.moons.forEach(moon => {
          this.hideInfoWindowUnlessNameIs(moon, bodyName)
        })
      }
    })
    this.solarSystem.dwarfPlanets.forEach(dwarf => {
      this.hideInfoWindowUnlessNameIs(dwarf, bodyName)
    })
    this.solarSystem.satellites.forEach(satellite => {
      this.hideInfoWindowUnlessNameIs(satellite, bodyName)
    })
    this.solarSystem.infoBodies.forEach(body => {
      this.hideInfoWindowUnlessNameIs(body, bodyName)
    })
  }

  hideInfoWindowUnlessNameIs (object: IMapObject, bodyName: string): void {
    if (!object.mapData.infoWindow) {
      return
    }
    if (bodyName.toLowerCase() === object.name.toLowerCase()) {
      object.mapData.infoWindow.close()
      const options: google.maps.InfoWindowOptions = {
        content: object.mapData.infoWindow.getContent()
      }
      if (window.innerWidth <= 576) {
        options.maxWidth = 300
      }
      object.mapData.infoWindow.setOptions(options)
      object.mapData.infoWindow.open(this.map, object.mapData.marker)
      return
    }
    object.mapData.infoWindow.close()
  }

  centerOn (bodyName: string): void {
    bodyName = bodyName.toLowerCase()
    this.showSingularInfoWindow(bodyName)
    const infoBody = this.solarSystem.infoBodies.find(body => body.name.toLowerCase() === bodyName)
    if (infoBody) {
      return this.centerOnInfoBody(infoBody)
    }
    if (bodyName.toLowerCase().indexOf('moon') >= 0) {
      return this.centerOnTheMoon()
    }
    if (bodyName === 'all') {
      return this.setMapBoundsToAllBodies()
    }
    if (bodyName === 'planets') {
      return this.setMapBoundsToAllPlanets()
    }
    const centerObject: IMapObject = [
      this.solarSystem.sun,
      ...this.solarSystem.planets,
      ...this.solarSystem.satellites,
      ...this.solarSystem.dwarfPlanets
    ].find(object => bodyName === object.name.toLowerCase())

    this.map.setCenter(centerObject.mapData.marker.getPosition())
    this.map.setZoom(this.defaultPlanetZoom)
  }

  centerOnInfoBody (infoBody: IMapObject): void {
    if (infoBody.name === 'Proxima Centauri') {
      infoBody.mapData.infoWindow.setPosition(this.solarSystem.sun.mapData.marker.getPosition())
      this.map.setCenter(this.solarSystem.sun.mapData.marker.getPosition())
      this.map.setZoom(0)
      return
    }
  }

  centerOnTheMoon (): void {
    const earth: IPlanet = this.solarSystem.planets.find(planet => planet.name.toLowerCase().indexOf('earth') >= 0)
    const moon: IMoon = earth.moons[0]
    this.setMapBoundsToPlanetAndMoons(earth)
    moon.mapData.marker.setMap(this.map)
  }

  setMapBoundsToAllPlanets (): void {
    let bounds: google.maps.LatLngBounds = null
    this.solarSystem.planets.forEach(planet => {
      if (!bounds) {
        bounds = new google.maps.LatLngBounds(
          this.solarSystem.sun.mapData.marker.getPosition(),
          planet.mapData.marker.getPosition())
        return
      }
      bounds.extend(planet.mapData.marker.getPosition())
    })
    this.map.fitBounds(bounds)
  }

  setMapBoundsToAllBodies (): void {
    let bounds: google.maps.LatLngBounds = null
    this.solarSystem.planets.forEach(planet => {
      if (!bounds) {
        bounds = new google.maps.LatLngBounds(
          this.solarSystem.sun.mapData.marker.getPosition(),
          planet.mapData.marker.getPosition())
        return
      }
      bounds.extend(planet.mapData.marker.getPosition())
    })
    this.solarSystem.dwarfPlanets.forEach(dwarf => {
      bounds.extend(dwarf.mapData.marker.getPosition())
    })
    this.solarSystem.satellites.forEach(satellite => {
      bounds.extend(satellite.mapData.marker.getPosition())
    })
    this.map.fitBounds(bounds)
  }

  setMapBoundsToPlanetAndMoons (planet: IPlanet): void {
    if (!planet.moons) {
      this.map.setCenter(planet.mapData.marker.getPosition())
      return
    }
    let bounds: google.maps.LatLngBounds = null
    planet.moons.forEach(moon => {
      if (!bounds) {
        bounds = new google.maps.LatLngBounds(planet.mapData.marker.getPosition(), moon.mapData.marker.getPosition())
        return
      }
      bounds.extend(moon.mapData.marker.getPosition())
    })
    this.map.fitBounds(bounds)
  }

  calculateMoonPosition (planet: IPlanet, moon: IMoon): google.maps.LatLng {
    const scaledDistance = Math.round(moon.distanceFromPlanet * this.solarSystem.scale)
    const startPoint = {latitude: planet.mapData.marker.getPosition().lat(), longitude: planet.mapData.marker.getPosition().lng()}
    const moonBearingOffset = this.moonBearningsInverted ? 90 : -90
    let moonBearing = this.bearing + moonBearingOffset
    if (moonBearing < 0) {
      moonBearing = 360 - moonBearing
    }
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, moonBearing)
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude)
  }

  calculateSatellitePosition (satellite: ISatellite): google.maps.LatLng {
    let scaledDistance = Math.round(satellite.distanceFromSun * this.solarSystem.scale)
    const startPoint = {
      latitude: this.solarSystem.sun.mapData.marker.getPosition().lat(),
      longitude: this.solarSystem.sun.mapData.marker.getPosition().lng()
    }
    if (satellite.trajectoryType === SatelliteTrajectoryType.Away && satellite.speed) {
      const metersPerDay = scaledDistance / satellite.launchDate.diff(satellite.distanceFromSunDate, 'days')
      const diffDays = moment().diff(satellite.distanceFromSunDate, 'days')
      scaledDistance += metersPerDay * diffDays
    }
    const computedPoint = geolib.computeDestinationPoint(startPoint, scaledDistance, this.bearing)
    return new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude)
  }

  invertMoonBearings (): boolean {
    this.moonBearningsInverted = !this.moonBearningsInverted
    this.setAllMarkers()
    return this.moonBearningsInverted
  }

  toggleMoonMarkers (show: boolean): void {
    if (!this.showMoons) {
      return
    }
    this.solarSystem.planets.forEach(planet => {
      if (!planet.moons) {
        return
      }
      planet.moons.forEach(moon => {
        moon.mapData.marker.setMap(show ? this.map : null)
      })
    })
  }

  startLightBeam (): void {
    if (this.lightBeamInterval) {
      clearInterval(this.lightBeamInterval)
    }
    this.lightBeamTimer = 0
    this.lightBeamBearing = this.bearing
    this.showSingularInfoWindow('')
    if (this.bearing === Bearing.CurrentPositions) {
      // planets in current positions, go towards Earth
      this.lightBeamBearing = this.calculateCurrentPlanetBearing('earth')
    }
    if (!this.lightBeam) {
      this.lightBeam = new google.maps.Polyline({
        ...this.lightBeamOptions
      })
    }
    this.lightBeamInterval = window.setInterval(() => {
      if (this.lightBeamTimer >= this.lightBeamTimeout) {
        return this.cancelLightBeam()
      }
      this.updateLightBeam(++this.lightBeamTimer)
    }, 1000)
    // start with how far away light would be in half a second, let time interval take over after that
    this.updateLightBeam(0.5)
    this.lightBeam.setMap(this.map)
  }

  cancelLightBeam (): void {
    if (this.lightBeamInterval) {
      clearInterval(this.lightBeamInterval)
    }
    this.lightBeamTimer = 0
    if (this.lightBeam) {
      this.lightBeam.setMap(null)
    }
  }

  isLightBeamRunning (): boolean {
    return !! (this.lightBeam && this.lightBeam.getMap())
  }

  updateLightBeam (secondsElapsed: number): void {
    const scaledSpeed = this.speedOfLight * this.solarSystem.scale
    const distance = scaledSpeed * secondsElapsed
    const startPoint = {
      latitude: this.solarSystem.sun.mapData.marker.getPosition().lat(),
      longitude: this.solarSystem.sun.mapData.marker.getPosition().lng()
    }
    const computedPoint = geolib.computeDestinationPoint(startPoint, distance, this.lightBeamBearing)
    const destinationLatLng = new google.maps.LatLng(computedPoint.latitude, computedPoint.longitude)
    const path: google.maps.LatLng[] = [
      this.solarSystem.sun.mapData.marker.getPosition(),
      destinationLatLng
    ]
    this.lightBeam.setPath(path)
  }

  getSolarSystem (): ISolarSystem {
    return {...this.solarSystem}
  }

  onSunDragEnd (callback: Function) {
    this.onSunDragEndCallback = callback
  }

}
