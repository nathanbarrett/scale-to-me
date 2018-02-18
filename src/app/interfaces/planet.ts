import { IPlanetaryBody } from './planetary-body'
import { IMoon } from './moon'
import { ISatellite } from './satellite'

export interface IPlanet extends IPlanetaryBody {
  moons?: IMoon[]
  satellites?: ISatellite[]
}
