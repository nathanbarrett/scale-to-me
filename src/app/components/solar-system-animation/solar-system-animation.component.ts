import { Component, OnInit, Input } from '@angular/core';

interface SvgPlanet {
  name: string;
  radius: number;
  orbitRadius: number;
  color: string;
  speed: number;
}
@Component({
  selector: 'app-solar-system-animation',
  templateUrl: './solar-system-animation.component.html',
  styleUrls: ['./solar-system-animation.component.scss']
})
export class SolarSystemAnimationComponent implements OnInit {

  @Input() size: number;

  planets: SvgPlanet[] = [
    {
      name: 'Mercury',
      radius: 0.5,
      orbitRadius: 6,
      color: 'lightgrey',
      speed: 3
    },
    {
      name: 'Venus',
      radius: 1.2,
      orbitRadius: 10,
      color: '#FED977',
      speed: 5
    },
    {
      name: 'Earth',
      radius: 1.2,
      orbitRadius: 14,
      color: '#131F6A',
      speed: 6
    },
    {
      name: 'Mars',
      radius: 0.75,
      orbitRadius: 18,
      color: '#C67234',
      speed: 8
    },
    {
      name: 'Jupiter',
      radius: 2.5,
      orbitRadius: 25,
      color: '#D5CFB8',
      speed: 16
    },
    {
      name: 'Saturn',
      radius: 2.3,
      orbitRadius: 35,
      color: '#D8B16D',
      speed: 23
    },
    {
      name: 'Uranus',
      radius: 1,
      orbitRadius: 42,
      color: '#C4EFF2',
      speed: 50
    },
    {
      name: 'Neptune',
      radius: 1.1,
      orbitRadius: 48,
      color: '#3A60FE',
      speed: 30
    }
  ];

  sunSize = 40;

  constructor() {
  }

  ngOnInit() {
    this.planets = this.planets.map(planet => {
      planet.radius = this.size * (planet.radius / 100);
      planet.orbitRadius = this.size * (planet.orbitRadius / 100);
      return {...planet};
    });

    this.sunSize = (this.sunSize * this.size) / 1000;
  }

  generateOrbitPath(orbitRadius: number, clockwise: boolean = true): string {
    const center = this.size / 2;
    const orbitArc = `a${orbitRadius},${orbitRadius}`;
    const orbitPivot = clockwise ? '0,1' : '1,0';
    return `M${center - orbitRadius},${center}
    ${orbitArc}
    0
    ${orbitPivot}
    ${orbitRadius * 2},0
    ${orbitArc}
    0
    ${orbitPivot}
    -${orbitRadius * 2},0`;
  }

}
