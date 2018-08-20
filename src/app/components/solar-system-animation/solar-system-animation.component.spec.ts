import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSystemAnimationComponent } from './solar-system-animation.component';

describe('SolarSystemAnimationComponent', () => {
  let component: SolarSystemAnimationComponent;
  let fixture: ComponentFixture<SolarSystemAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarSystemAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSystemAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a valid orbit path', () => {
    const size = 500;
    const orbitRadius = 40;
    component.size = size;
    const path = component.generateOrbitPath(orbitRadius);
    const expected = `M${(size / 2) - orbitRadius},${size / 2}
    a${orbitRadius},${orbitRadius}
    0
    0,1
    ${orbitRadius * 2},0
    a${orbitRadius},${orbitRadius}
    0
    0,1
    -${orbitRadius * 2},0`;
    expect(path).toEqual(expected);
  });
});
