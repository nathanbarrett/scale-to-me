import { Injectable } from '@angular/core';
import Promise from 'bluebird'

@Injectable()
export class DomScriptLoaderService {

  constructor() { }

  /**
   * Returns a Promise with a boolean value as to whether is was previously loaded or not
   * @param {string} url
   * @returns Promise<boolean>
   */
  load(url: string): Promise<boolean> {
    return new Promise(resolve => {
      if (!document.querySelectorAll(`[src="${url}"]`).length) {
        document.body.appendChild(Object.assign(
          document.createElement('script'), {
            type: 'text/javascript',
            src: url,
            onload: () => resolve(false)
          }));
      } else {
        resolve(true)
      }
    })
  }

}
