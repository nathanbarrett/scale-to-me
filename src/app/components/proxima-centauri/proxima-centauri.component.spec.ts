import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximaCentauriComponent } from './proxima-centauri.component';

describe('ProximaCentauriComponent', () => {
  let component: ProximaCentauriComponent;
  let fixture: ComponentFixture<ProximaCentauriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximaCentauriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximaCentauriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
