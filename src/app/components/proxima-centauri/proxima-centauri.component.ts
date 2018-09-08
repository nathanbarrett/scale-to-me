import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-proxima-centauri',
  templateUrl: './proxima-centauri.component.html',
  styleUrls: ['./proxima-centauri.component.scss']
})
export class ProximaCentauriComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProximaCentauriComponent>) { }

  ngOnInit() {
  }

}
