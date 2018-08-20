import { Component, OnInit } from '@angular/core';

interface INavItem {
  title: string;
  imgUrl: string;
  id: string;
}
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navItems: INavItem[] = [
    {
      title: 'Shrinking down the Solar System and putting it in your neighborhood.',
      imgUrl: '/assets/icons/solar-system-icon.png',
      id: 'navItemSolarSystem'
    },
    {
      title: 'How big is the Milky Way in relation to our Solar System?',
      imgUrl: '/assets/icons/milky-way-icon.png',
      id: 'navItemMilkyWay'
    },
    {
      title: 'The history of the Earth put into one calendar year.',
      imgUrl: '/assets/icons/earth-timeline-icon.png',
      id: 'navItemEarthTimeline'
    },
    {
      title: 'All atoms have a size and a weight. This puts it into perspective.',
      imgUrl: '/assets/icons/atom-icon.png',
      id: 'navItemAtoms'
    }
  ];

  pointer: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.pointer = document.getElementById('navBarArrow');
    setTimeout(() => {
      const navBar = document.getElementById('navBar');
      navBar.classList.add('nav-bar-slide-right');
    }, 1000);
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        this.moveNavPointer();
      });
    });
  }

  moveNavPointer(): void {
    const appHeight = document.getElementById('appBackground').clientHeight;
    const scrollBottom = appHeight - window.innerHeight;
    const pointerTop = Math.round(this.pointer.parentElement.clientHeight * (window.scrollY / scrollBottom));
    if (pointerTop < this.pointer.parentElement.clientHeight - 20) {
      this.pointer.style.top = pointerTop + 'px';
    }
  }

}
