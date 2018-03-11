import { CalendarItemType } from '../enums/calendar-item-type.enum'
import { Moment } from 'moment'

export interface CalendarItem {
  name: string,
  type: CalendarItemType,
  yearsAgo: number,
  date: Moment,
  description?: string,
  content?: string,
  yearsAgoEnd?: number,
  dateEnd?: Moment
}
