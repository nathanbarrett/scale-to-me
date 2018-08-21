import { Injectable } from '@angular/core';

interface IScrollWatcher {
  element: HTMLElement;
  callback: Function;
  once: boolean;
  offset?: number;
}
@Injectable({
  providedIn: 'root'
})
export class GridService {

  // be sure to update styles/_variables.scss if you update this
  private screenSizes = {
    xs: 0,
    sm: 425,
    md: 900,
    lg: 1024,
    xl: 1366,
    xxl: 1920
  };

  private scrollWatchers: IScrollWatcher[];

  private scrollListener: EventListenerOrEventListenerObject;

  constructor() {
   }

   isScreenSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'): boolean {
    const sizes = Object.keys(this.screenSizes);
     if (size === sizes[sizes.length - 1]) {
       return window.innerWidth >= this.screenSizes[size];
     }
     return window.innerWidth >= this.screenSizes[size] &&
     window.innerWidth < this.screenSizes[sizes[sizes.indexOf(size) + 1]];
   }

   getScreenSize(): string {
    const sizes: string[] = Object.keys(this.screenSizes);
    for (let i = 0; i < sizes.length - 1; i++) {
      if (window.innerWidth >= this.screenSizes[sizes[i]] &&
        window.innerWidth < this.screenSizes[sizes[i + 1]]) {
          return sizes[i];
      }
    }
    return sizes[sizes.length - 1];
   }
}
