/// <reference path="../../../../node_modules/@types/jquery/index" />
/// <reference path="../../../../node_modules/fullcalendar/dist/fullcalendar" />
import * as moment from 'moment'
import { Component, OnInit } from '@angular/core';
import { eons } from '../../data/earth-timeline/eons';
import { CalendarItem } from '../../interfaces/calendar-item';
import {} from '@types/bootstrap';

interface FullcalendarEvent {
  title: string,
  start: moment.Moment,
  eventInfo: CalendarItem
  end?: moment.Moment,
  allDay?: boolean,
  color?: string,
  textColor?: string,
}

interface FullcalendarEventSource {
  events: FullcalendarEvent[]
}

@Component({
  selector: 'app-earth-timeline',
  templateUrl: './earth-timeline.component.html',
  styleUrls: ['./earth-timeline.component.scss']
})
export class EarthTimelineComponent implements OnInit {

  secondsPerYear: number

  earthTimelineStart = eons[0].yearsAgo

  selectedCalendarItem: CalendarItem

  constructor() {
    this.secondsPerYear = (60 * 60 * 24 * 365) / this.earthTimelineStart
  }

  ngOnInit() {
    $('#earthTimelineCalendar').fullCalendar({
      eventSources: this.generateEventSources(),
      editable: false,
      defaultDate: moment().endOf('year'),
      defaultView: 'agendaDay',
      eventClick: (calEvent, jsEvent, view) => {
        this.selectedCalendarItem = <CalendarItem>calEvent.eventInfo
        $('#calendarEventModal').modal('show')
      }
    })
  }

  eventClick(event: CalendarItem): void {

  }

  generateEventSources(): FullcalendarEventSource[] {
    let eventSources: FullcalendarEventSource[] = []
    eventSources.push({
      events: this.generateEonEvents()
    })
    let lightness = null
    for (let eon of eons) {
      eventSources.push({
        events: this.generateEvents(eon.eras, eon.hue, 32,' (Era)')
      })
      for (let era of eon.eras){
        eventSources.push({
          events: this.generateEvents(era.periods, eon.hue, 48, ' (Period)', false)
        })
        for (let period of era.periods) {
          eventSources.push({
            events: this.generateEvents(period.epochs, eon.hue,  64, ' (Epoch)', false)
          })
          for (let epoch of period.epochs) {
            eventSources.push({
              events: this.generateEvents(epoch.ages, eon.hue, 80, ' (Age)', false)
            })
          }
        }
      }
    }
    return eventSources
  }

  generateEonEvents(): FullcalendarEvent[] {
    let fullCalendarEvents: FullcalendarEvent[] = []
    for (let eon of eons) {
      fullCalendarEvents.push({
        title: eon.name + ' (Eon)',
        start: this.getCalendarTimeOfEvent(eon.yearsAgo),
        end: this.getCalendarTimeOfEvent(eon.yearsAgoEnd),
        color: `hsl(${eon.hue}, 100%, 16%)`,
        textColor: 'white',
        eventInfo: eon
      })
    }
    return fullCalendarEvents
  }

  generateEvents(
    events: CalendarItem[],
    hue: number, lightness: number,
    nameAppend: string = '',
    textColorWhite = true
  ): FullcalendarEvent[] {
    let fullcalendarEvents: FullcalendarEvent[] = []
    for (let event of events) {
      fullcalendarEvents.push({
        title: event.name + nameAppend,
        start: this.getCalendarTimeOfEvent(event.yearsAgo),
        end: this.getCalendarTimeOfEvent(event.yearsAgoEnd),
        color: `hsl(${hue}, 100%, ${lightness}%)`,
        textColor: textColorWhite ? 'white' : 'black',
        eventInfo: event
      })
    }
    return fullcalendarEvents
  }

  getCalendarTimeOfEvent(yearsAgo: number): moment.Moment {
    let span = this.earthTimelineStart - yearsAgo
    return moment().startOf('year').add(span * this.secondsPerYear, 'seconds')
  }
}
