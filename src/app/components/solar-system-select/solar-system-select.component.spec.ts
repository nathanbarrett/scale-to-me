import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSystemSelectComponent } from './solar-system-select.component';

describe('SolarSystemSelectComponent', () => {
  let component: SolarSystemSelectComponent;
  let fixture: ComponentFixture<SolarSystemSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarSystemSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSystemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
