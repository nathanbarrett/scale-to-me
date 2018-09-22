import { Injectable } from '@angular/core';
import { Observable, Observer, interval } from 'rxjs';
import { environment } from '../../environments/environment';

interface IScriptStatus {
  url: string;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  loadedScripts: IScriptStatus[] = [];

  constructor() { }

  load(url: string, async: boolean = true, defer: boolean = true): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      if (this.isScriptLoading(url)) {
        const interval$ = interval(100).subscribe(times => {
          if (times > 30) {
            interval$.unsubscribe();
            return;
          }
          if (this.isScriptLoaded(url)) {
            observer.next(url);
            observer.complete();
          }
        });
        return;
      }
      if (this.isScriptLoaded(url)) {
        observer.next(url);
        observer.complete();
        return;
      }
      this.loadedScripts.push({
        url,
        loaded: false
      });
      const el = document.createElement('script');
      el.src = url;
      el.async = async;
      el.defer = defer;
      el.onload = () => {
        this.loadedScripts = this.loadedScripts.map(status => {
          if (status.url === url) {
            status.loaded = true;
          }
          return status;
        });
        observer.next(url);
        observer.complete();
      };
      el.onerror = () => {
        this.loadedScripts = this.loadedScripts.filter(status => status.url !== url);
        observer.error(url);
        observer.complete();
      };
      document.body.appendChild(el);
    });
  }

  loadMapsLibrary(): Observable<string> {
    const url = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
    return this.load(url);
  }

  isScriptLoaded(url: string): boolean {
    for (const status of this.loadedScripts) {
      if (status.url === url) {
        return status.loaded;
      }
    }
    return false;
  }

  isScriptLoading(url: string): boolean {
    for (const status of this.loadedScripts) {
      if (status.url === url) {
        return !status.loaded;
      }
    }
    return false;
  }
}
