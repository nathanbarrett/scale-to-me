import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkyWayComponent } from './milky-way.component';

describe('MilkyWayComponent', () => {
  let component: MilkyWayComponent;
  let fixture: ComponentFixture<MilkyWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkyWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkyWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
