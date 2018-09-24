import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSystemGlobeComponent } from './solar-system-globe.component';

describe('SolarSystemGlobeComponent', () => {
  let component: SolarSystemGlobeComponent;
  let fixture: ComponentFixture<SolarSystemGlobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarSystemGlobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSystemGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
