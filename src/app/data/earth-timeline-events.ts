import { CalendarItem } from '../interfaces/calendar-item';
import { events } from './earth-timeline/events';
import { eons } from './earth-timeline/eons';

export let EarthTimelineEvents: CalendarItem[] = [
  ...eons,
  ...events,
];
