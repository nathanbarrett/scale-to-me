import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSystemExplainerComponent } from './solar-system-explainer.component';
import { SolarSystemAnimationComponent } from '../solar-system-animation/solar-system-animation.component';

describe('SolarSystemExplainerComponent', () => {
  let component: SolarSystemExplainerComponent;
  let fixture: ComponentFixture<SolarSystemExplainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SolarSystemExplainerComponent,
        SolarSystemAnimationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSystemExplainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
