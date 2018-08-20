import { Component, OnInit } from '@angular/core';
import { GridService } from '../../services/grid.service';

@Component({
  selector: 'app-solar-system-explainer',
  templateUrl: './solar-system-explainer.component.html',
  styleUrls: ['./solar-system-explainer.component.scss']
})
export class SolarSystemExplainerComponent implements OnInit {

  // the size of the svg animation
  solarSystemSize = 500;

  constructor(private gridService: GridService) { }

  ngOnInit() {
    const screenSize = this.gridService.getScreenSize();
    
  }

}
