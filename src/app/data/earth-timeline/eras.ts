import { Era } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Periods from './periods'


export let ArcheanEras: Era[] = [
  {
    name: 'Eoarchean',
    type: CalendarItemType.Era,
    yearsAgo: 4560000000,
    yearsAgoEnd: 3500000000,
    date: null,
    periods: []
  },
  {
    name: 'PaleoArchean',
    type: CalendarItemType.Era,
    yearsAgo: 3500000000,
    yearsAgoEnd: 3200000000,
    date: null,
    periods: []
  },
  {
    name: 'MesoArchean',
    type: CalendarItemType.Era,
    yearsAgo: 3200000000,
    yearsAgoEnd: 2800000000,
    date: null,
    periods: []
  },
  {
    name: 'Neoarch',
    type: CalendarItemType.Era,
    yearsAgo: 2800000000,
    yearsAgoEnd: 2500000000,
    date: null,
    periods: []
  },
]

export let ProterozoicEras: Era[] = [
  {
    name: 'Paleoproterozoic',
    type: CalendarItemType.Era,
    yearsAgo: 2500000000,
    yearsAgoEnd: 1600000000,
    date: null,
    periods: [...Periods.PaleoproterozoicPeriods]
  },
  {
    name: 'Mesoproterozoic',
    type: CalendarItemType.Era,
    yearsAgo: 1600000000,
    yearsAgoEnd: 1000000000,
    date: null,
    periods: [...Periods.MesoproterozoicPeriods]
  },
  {
    name: 'Neoproterozoic',
    type: CalendarItemType.Era,
    yearsAgo: 1000000000,
    yearsAgoEnd: 541000000,
    date: null,
    periods: [...Periods.NeoproterozoicPeriods]
  },
]

export let PhanerozoicEras: Era[] = [
  {
    name: 'Paleozoic',
    type: CalendarItemType.Era,
    yearsAgo: 541000000,
    yearsAgoEnd: 251902000,
    date: null,
    periods: [...Periods.PaleozoicPeriods]
  },
  {
    name: 'Mesozoic',
    type: CalendarItemType.Era,
    yearsAgo: 251902000,
    yearsAgoEnd: 66000000,
    date: null,
    periods: [...Periods.MesozoicPeriods]
  },
  {
    name: 'Cenozoic',
    type: CalendarItemType.Era,
    yearsAgo: 66000000,
    yearsAgoEnd: 0,
    date: null,
    periods: [...Periods.CenozoicPeriods]
  },
]
