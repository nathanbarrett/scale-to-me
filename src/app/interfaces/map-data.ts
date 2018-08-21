/// <reference types="@types/googlemaps" />

export interface IMapData {
  marker: google.maps.Marker;
  iconUrl: string;
  infoWindowContent: string;
  infoWindow: google.maps.InfoWindow;
  infoWindowImageUrl?: string;
  didYouKnow?: string;
}
