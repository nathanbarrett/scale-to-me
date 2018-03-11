import { Injectable } from '@angular/core';
import * as $ from 'jquery'
import 'fullcalendar'



@Injectable()
export class EarthTimelineCalendarService {

  calendarEl: JQuery

  constructor() { }

  createCalendar(id: string) {
    this.calendarEl = $(id).fullCalendar({

    })
  }
}
