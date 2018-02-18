import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { routes } from './app.routes'
import { SolarSystemComponent } from '../components/solar-system/solar-system.component'
import { MilkyWayComponent } from '../components/milky-way/milky-way.component'
import { EarthTimelineComponent } from '../components/earth-timeline/earth-timeline.component'
import { AtomComponent } from '../components/atom/atom.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    SolarSystemComponent,
    MilkyWayComponent,
    EarthTimelineComponent,
    AtomComponent
  ]
})
export class AppRoutesModule {
}
