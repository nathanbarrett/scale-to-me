/// <reference types="@types/googlemaps" />
import { Moment } from 'moment';
import { Subscription } from 'rxjs';

export interface IMapData {
  iconUrl: string;
  infoWindowContent: string;
  infoWindowImageUrl?: string;
  /** Additional explainer data for the info window */
  didYouKnow?: string;
  marker?: google.maps.Marker;
  infoWindow?: google.maps.InfoWindow;
  isInfoWindowOpen?: boolean;
}

export interface IMapObject {
  name: string;
  mapData: IMapData;
  /** Average distance from the sun in meters */
  distanceFromSun: number;
}

export interface IPlanetaryBody extends IMapObject {
  /** Planet radius in meters */
  radius: number;
}

export interface IMoon extends IPlanetaryBody {
  distanceFromPlanet: number;
}

export interface IPlanet extends IPlanetaryBody {
  moons?: IMoon[];
}

export interface ISatellite extends IMapObject {
  /** Speed of the satellite in meters per second */
  speed: number;
  /** Unix timestamp of the launch date */
  launchDate: number;
  /** Unix timestamp for when the distance from the sun measurement was taken */
  distanceFromSunDate: number;
  trajectoryType: 'away' | 'orbit';
}

export interface IInfoBody {
  name: string;
  /** Distance from the sun in meters */
  distanceFromSun: number;
  mapData: IMapData;
}

export interface ILightbeam {
  line: google.maps.Polyline;
  start: Moment;
  interval: Subscription;
  infoWindow: google.maps.InfoWindow;
  tracking: boolean;
}

export interface ISolarSystem {
  scale: number;
  speedOfLight: number;
  sun: IPlanetaryBody;
  planets: IPlanetaryBody[];
  dwarfPlanets: IPlanetaryBody[];
  satellites: ISatellite[];
  infoBodies: IInfoBody[];
}
