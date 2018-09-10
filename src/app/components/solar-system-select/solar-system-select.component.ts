import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISolarSystemSelectData, ISolarSystemListItem } from '../../interfaces/solar-system';

@Component({
  selector: 'app-solar-system-select',
  templateUrl: './solar-system-select.component.html',
  styleUrls: ['./solar-system-select.component.scss']
})
export class SolarSystemSelectComponent implements OnInit {

  mapItems: ISolarSystemListItem[];

  constructor(
    public dialogRef: MatDialogRef<SolarSystemSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISolarSystemSelectData
    ) { }

  ngOnInit() {
    this.mapItems = this.data.mapItems;
  }

  select(item: ISolarSystemListItem) {
    this.dialogRef.close(item.name);
  }
}
