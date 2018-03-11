import { CalendarItem } from '../../interfaces/calendar-item'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'

export let events: CalendarItem[] = [
  {
    name: 'Proto-Earth Formed',
    type: CalendarItemType.Event,
    description: 'When the first version of Earth fully formed',
    yearsAgo: 4540000000,
    date: null
  }
]
