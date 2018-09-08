import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SolarSystemAnimationComponent } from './components/solar-system-animation/solar-system-animation.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SolarSystemExplainerComponent } from './components/solar-system-explainer/solar-system-explainer.component';
import { SolarSystemComponent } from './components/solar-system/solar-system.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MatButtonModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { ProximaCentauriComponent } from './components/proxima-centauri/proxima-centauri.component';

@NgModule({
  declarations: [
    AppComponent,
    SolarSystemAnimationComponent,
    NavBarComponent,
    SolarSystemExplainerComponent,
    SolarSystemComponent,
    ProximaCentauriComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProximaCentauriComponent]
})
export class AppModule { }
