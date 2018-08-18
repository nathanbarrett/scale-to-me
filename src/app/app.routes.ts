import { Routes } from '@angular/router';
import { SolarSystemComponent } from './components/solar-system/solar-system.component';
import { MilkyWayComponent } from './components/milky-way/milky-way.component';
import { EarthTimelineComponent } from './components/earth-timeline/earth-timeline.component';
import { AtomComponent } from './components/atom/atom.component';

export const routes: Routes = [
  {path: '', component: SolarSystemComponent},
  {path: 'milky-way', component: MilkyWayComponent},
  {path: 'earth-timeline', component: EarthTimelineComponent},
  {path: 'atom', component: AtomComponent}
];
