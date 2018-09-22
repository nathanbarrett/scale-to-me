import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkyWayExplainerComponent } from './milky-way-explainer.component';

describe('MilkyWayExplainerComponent', () => {
  let component: MilkyWayExplainerComponent;
  let fixture: ComponentFixture<MilkyWayExplainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkyWayExplainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkyWayExplainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
