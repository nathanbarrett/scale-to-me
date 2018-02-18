import { IPlanetaryBody } from './planetary-body'
import { IPlanet } from './planet'
import { ISatellite } from './satellite'
import { IMapObject } from './map-object'

export interface ISolarSystem {
  scale: number,
  sun: IPlanetaryBody,
  planets: IPlanet[],
  dwarfPlanets: IPlanet[],
  satellites: ISatellite[],
  infoBodies: IMapObject[]
}
