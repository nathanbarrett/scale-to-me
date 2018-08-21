import { CalendarItem } from './calendar-item';

export interface Eon extends CalendarItem {
  hue: number;
  eras: Era[];
}

export interface Era extends CalendarItem {
  periods: Period[];
}

export interface Period extends CalendarItem {
  epochs: Epoch[];
}

export interface Epoch extends CalendarItem {
  ages: CalendarItem[];
}

