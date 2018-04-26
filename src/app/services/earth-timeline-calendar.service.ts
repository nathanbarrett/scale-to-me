import { Injectable } from '@angular/core';

@Injectable()
export class EarthTimelineCalendarService {

  calendarEl: JQuery

  constructor() { }

  createCalendar(id: string) {
    this.calendarEl = $(id).fullCalendar({

    })
  }
}
