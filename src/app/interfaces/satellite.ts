import { IMapObject } from './map-object'
import { IPlanet } from './planet'
import { SatelliteTrajectoryType } from '../enums/satellite-trajectory-type.enum'
import { Moment } from 'moment'

// some satellites orbit planets, some do not
export interface ISatellite extends IMapObject {
  planet?: IPlanet,
  distanceFromPlanet?: number
  speed?: number,
  trajectoryType: SatelliteTrajectoryType,
  distanceFromSunDate?: Moment,
  launchDate?: Moment
}
