import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  loadedScripts: string[] = [];

  constructor() { }

  load(url: string, async: boolean = true, defer: boolean = true): Promise<null> {
    return new Promise((resolve, reject) => {
      if (this.loadedScripts.indexOf(url) >= 0) {
        return reject('Script already loaded');
      }
      const script = document.createElement('script');
      script.src = url;
      script.async = async;
      script.defer = defer;
      script.onload = () => {
        this.loadedScripts.push(url);
        resolve(null);
      };
      script.onerror = () => {
        reject('Script unable to load');
      };
      document.body.appendChild(script);
    });
  }
}
