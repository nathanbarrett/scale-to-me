import { CalendarItem } from '../../interfaces/calendar-item'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'


export let PlioceneAges: CalendarItem[] = [
  {
    name: 'Piacenzian',
    type: CalendarItemType.Age,
    yearsAgo: 5333000,
    yearsAgoEnd: 2588000,
    date: null,
  },
]

export let PleistoceneAges: CalendarItem[] = [
  {
    name: 'Gelasian',
    type: CalendarItemType.Age,
    yearsAgo: 2580000,
    yearsAgoEnd: 1800000,
    date: null,
  },
  {
    name: 'Calabrian',
    type: CalendarItemType.Age,
    yearsAgo: 1800000,
    yearsAgoEnd: 781000,
    date: null,
  },
  {
    name: 'Ionian',
    type: CalendarItemType.Age,
    yearsAgo: 781000,
    yearsAgoEnd: 126000,
    date: null,
  },
  {
    name: 'Tarantian',
    type: CalendarItemType.Age,
    yearsAgo: 126000,
    yearsAgoEnd: 11700,
    date: null,
  },
]
