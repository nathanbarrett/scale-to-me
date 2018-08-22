import { Component, OnInit } from '@angular/core';
import debounce from 'lodash/debounce';
import { environment } from '../environments/environment';
import { ScriptsService } from './services/scripts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  starCount = 1500;

  constructor(private scriptsService: ScriptsService) {}

  ngOnInit() {
    const drawStarsDebounce = debounce(() => {
      this.drawStars();
    }, 1000);
    window.addEventListener('resize', drawStarsDebounce);
    this.drawStars();
  }

  drawStars(): void {
    const parent = document.getElementById('starField');
    const oldContainer = document.getElementById('starContainer');
    if (oldContainer) {
      parent.removeChild(oldContainer);
    }
    const container = document.createElement('div');
    container.id = 'starContainer';
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '100%';
    for (let j = 0; j < this.starCount; j++) {
      const el = document.createElement('div');
      const size = Math.ceil(Math.random() * 3) + 'px';
      el.className = 'star';
      el.style.width = size;
      el.style.height = size;
      el.style.position = 'absolute';
      el.style.top = Math.round(Math.random() * parent.clientHeight) + 'px';
      el.style.left = Math.round(Math.random() * window.innerWidth) + 'px';
      container.appendChild(el);
    }
    parent.appendChild(container);
  }
}
