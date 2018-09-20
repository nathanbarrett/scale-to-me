import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISolarSystemSelectData, ISolarSystemListItem } from '../../interfaces/solar-system';

@Component({
  selector: 'app-solar-system-select',
  templateUrl: './solar-system-select.component.html',
  styleUrls: ['./solar-system-select.component.scss']
})
export class SolarSystemSelectComponent implements OnInit {

  mapItemColumns: ISolarSystemListItem[][];

  private columns = 2;

  constructor(
    public dialogRef: MatDialogRef<SolarSystemSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISolarSystemSelectData
    ) { }

  ngOnInit() {
    this.mapItemColumns = [];
    let mapItems: ISolarSystemListItem[] = [];
    for (let i = 0; i < this.data.mapItems.length; i++) {
      if (mapItems.length >= this.data.mapItems.length / this.columns) {
        this.mapItemColumns.push(mapItems);
        mapItems = [];
      }
      mapItems.push(this.data.mapItems[i]);
      if (i + 1 === this.data.mapItems.length && mapItems.length) {
        this.mapItemColumns.push(mapItems);
      }
    }
  }

  select(item: ISolarSystemListItem) {
    this.dialogRef.close(item.name);
  }
}
