import { IMapData } from './map-data'

export interface IMapObject {
  name: string,
  distanceFromSun?: number,
  mapData: IMapData
}
