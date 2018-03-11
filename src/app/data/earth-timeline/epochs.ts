import { Epoch } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Ages from './ages'

export let PaleogeneEpochs: Epoch[] = [
  {
    name: 'Paleocene',
    type: CalendarItemType.Period,
    yearsAgo: 66000000,
    yearsAgoEnd: 56000000,
    date: null,
    ages: []
  },
  {
    name: 'Eocene',
    type: CalendarItemType.Period,
    yearsAgo: 56000000,
    yearsAgoEnd: 33900000,
    date: null,
    ages: []
  },
  {
    name: 'Oligocene',
    type: CalendarItemType.Period,
    yearsAgo: 33900000,
    yearsAgoEnd: 23030000,
    date: null,
    ages: []
  },
]

export let NeogeneEpochs: Epoch[] = [
  {
    name: 'Miocene',
    type: CalendarItemType.Period,
    yearsAgo: 23030000,
    yearsAgoEnd: 5333000,
    date: null,
    ages: []
  },
  {
    name: 'Pliocene',
    type: CalendarItemType.Period,
    yearsAgo: 5333000,
    yearsAgoEnd: 2588000,
    date: null,
    ages: [...Ages.PlioceneAges]
  },
]

export let QuaternaryEpochs: Epoch[] = [
  {
    name: 'Pleistocene',
    type: CalendarItemType.Period,
    yearsAgo: 2588000,
    yearsAgoEnd: 11700,
    date: null,
    ages: [...Ages.PleistoceneAges]
  },
  {
    name: 'Holocene',
    type: CalendarItemType.Period,
    yearsAgo: 11700,
    yearsAgoEnd: 0,
    date: null,
    ages: []
  },
]
