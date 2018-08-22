import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SolarSystemAnimationComponent } from './components/solar-system-animation/solar-system-animation.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SolarSystemExplainerComponent } from './components/solar-system-explainer/solar-system-explainer.component';
import { SolarSystemComponent } from './components/solar-system/solar-system.component';

@NgModule({
  declarations: [
    AppComponent,
    SolarSystemAnimationComponent,
    NavBarComponent,
    SolarSystemExplainerComponent,
    SolarSystemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
