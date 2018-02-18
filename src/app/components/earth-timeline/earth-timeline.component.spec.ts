import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthTimelineComponent } from './earth-timeline.component';

describe('EarthTimelineComponent', () => {
  let component: EarthTimelineComponent;
  let fixture: ComponentFixture<EarthTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
