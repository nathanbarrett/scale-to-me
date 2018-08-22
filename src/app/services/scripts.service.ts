import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  loadedScripts: string[] = [];

  constructor() { }

  load(url: string, async: boolean = true, defer: boolean = true): Observable<string> {
    return Observable.create((observer) => {
      if (this.loadedScripts.indexOf(url) >= 0) {
        observer.error('Scripts already loaded');
        observer.complete();
        return;
      }
      const el = document.createElement('script');
      el.src = url;
      el.async = async;
      el.defer = defer;
      el.onload = () => {
        observer.next(url);
        observer.complete();
      };
      el.onerror = () => {
        observer.error(url);
        observer.complete();
      };
      document.body.appendChild(el);
    });
  }

  loadMapsLibrary(): Observable<string> {
    if (typeof google !== 'undefined') {
      throw new Error('Maps library already loaded!');
    }
    const url = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    return this.load(url);
  }
}
