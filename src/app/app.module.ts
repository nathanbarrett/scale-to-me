import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SolarSystemAnimationComponent } from './components/solar-system-animation/solar-system-animation.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SolarSystemExplainerComponent } from './components/solar-system-explainer/solar-system-explainer.component';
import { SolarSystemComponent } from './components/solar-system/solar-system.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatListModule } from '@angular/material';
import { ProximaCentauriComponent } from './components/proxima-centauri/proxima-centauri.component';
import { SolarSystemSelectComponent } from './components/solar-system-select/solar-system-select.component';
import { NgxWindowTokenModule } from 'ngx-window-token';
import { MilkyWayExplainerComponent } from './components/milky-way-explainer/milky-way-explainer.component';
import { MilkyWayComponent } from './components/milky-way/milky-way.component';
import { SolarSystemGlobeComponent } from './components/solar-system-globe/solar-system-globe.component';

@NgModule({
  declarations: [
    AppComponent,
    SolarSystemAnimationComponent,
    NavBarComponent,
    SolarSystemExplainerComponent,
    SolarSystemComponent,
    ProximaCentauriComponent,
    SolarSystemSelectComponent,
    MilkyWayExplainerComponent,
    MilkyWayComponent,
    SolarSystemGlobeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    NgxWindowTokenModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ProximaCentauriComponent,
    SolarSystemSelectComponent
  ]
})
export class AppModule { }
