import { IPlanetaryBody } from './planetary-body';

export interface IMoon extends IPlanetaryBody {
  distanceFromPlanet: number;
}
