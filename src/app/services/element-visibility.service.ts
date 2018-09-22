import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import scrollMonitor from 'scrollmonitor';

interface IElementVisibility {
  entering: boolean;
  full: boolean;
  exiting: boolean;
  exited: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ElementVisibilityService {

  constructor() { }

  watch(element: HTMLElement, container?: HTMLElement): Observable<IElementVisibility> {
    return Observable.create((observer: Observer<IElementVisibility>) => {
      let monitor = scrollMonitor;
      if (container) {
        monitor = scrollMonitor.createContainer(container);
      }
      const watcher = monitor.create(element);
      watcher.enterViewport(() => {
        observer.next({
          entering: true,
          full: false,
          exiting: false,
          exited: false
        });
      });
      watcher.fullyEnterViewport(() => {
        observer.next({
          entering: false,
          full: true,
          exiting: false,
          exited: false
        });
      });
      watcher.partiallyExitViewport(() => {
        observer.next({
          entering: false,
          full: false,
          exiting: true,
          exited: false
        });
      });
      watcher.exitViewport(() => {
        observer.next({
          entering: false,
          full: false,
          exiting: false,
          exited: true
        });
      });
      return () => {
        watcher.destroy();
      };
    });
  }
}
