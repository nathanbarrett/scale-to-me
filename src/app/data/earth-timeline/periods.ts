import { Period } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Epochs from './epochs'

export let PaleoproterozoicPeriods: Period[] = [
  {
    name: 'Siderian',
    type: CalendarItemType.Period,
    yearsAgo: 2500000000,
    yearsAgoEnd: 2300000000,
    date: null,
    epochs: []
  },
  {
    name: 'Rhyacian',
    type: CalendarItemType.Period,
    yearsAgo: 2300000000,
    yearsAgoEnd: 2050000000,
    date: null,
    epochs: []
  },
  {
    name: 'Orosirian',
    type: CalendarItemType.Period,
    yearsAgo: 2050000000,
    yearsAgoEnd: 1800000000,
    date: null,
    epochs: []
  },
  {
    name: 'Statherian',
    type: CalendarItemType.Period,
    yearsAgo: 1800000000,
    yearsAgoEnd: 1600000000,
    date: null,
    epochs: []
  },
]

export let MesoproterozoicPeriods: Period[] = [
  {
    name: 'Calymmian',
    type: CalendarItemType.Period,
    yearsAgo: 1600000000,
    yearsAgoEnd: 1400000000,
    date: null,
    epochs: []
  },
  {
    name: 'Ectasian',
    type: CalendarItemType.Period,
    yearsAgo: 1400000000,
    yearsAgoEnd: 1200000000,
    date: null,
    epochs: []
  },
  {
    name: 'Stenian',
    type: CalendarItemType.Period,
    yearsAgo: 1200000000,
    yearsAgoEnd: 1000000000,
    date: null,
    epochs: []
  },
]

export let NeoproterozoicPeriods: Period[] = [
  {
    name: 'Tonian',
    type: CalendarItemType.Period,
    yearsAgo: 1000000000,
    yearsAgoEnd: 720000000,
    date: null,
    epochs: []
  },
  {
    name: 'Cryogenian',
    type: CalendarItemType.Period,
    yearsAgo: 720000000,
    yearsAgoEnd: 635000000,
    date: null,
    epochs: []
  },
  {
    name: 'Ediacaran',
    type: CalendarItemType.Period,
    yearsAgo: 635000000,
    yearsAgoEnd: 541000000,
    date: null,
    epochs: []
  },
]

export let PaleozoicPeriods: Period[] = [
  {
    name: 'Cambrian',
    type: CalendarItemType.Period,
    yearsAgo: 541000000,
    yearsAgoEnd: 485400000,
    date: null,
    epochs: []
  },
  {
    name: 'Ordovician',
    type: CalendarItemType.Period,
    yearsAgo: 485400000,
    yearsAgoEnd: 443800000,
    date: null,
    epochs: []
  },
  {
    name: 'Silurian',
    type: CalendarItemType.Period,
    yearsAgo: 443800000,
    yearsAgoEnd: 419200000,
    date: null,
    epochs: []
  },
  {
    name: 'Devonian',
    type: CalendarItemType.Period,
    yearsAgo: 419200000,
    yearsAgoEnd: 358900000,
    date: null,
    epochs: []
  },
  {
    name: 'Carboniferous',
    type: CalendarItemType.Period,
    yearsAgo: 358900000,
    yearsAgoEnd: 298900000,
    date: null,
    epochs: []
  },
  {
    name: 'Permian',
    type: CalendarItemType.Period,
    yearsAgo: 298900000,
    yearsAgoEnd: 251902000,
    date: null,
    epochs: []
  },
]

export let MesozoicPeriods: Period[] = [
  {
    name: 'Triassic',
    type: CalendarItemType.Period,
    yearsAgo: 251902000,
    yearsAgoEnd: 201300000,
    date: null,
    epochs: []
  },
  {
    name: 'Jurassic',
    type: CalendarItemType.Period,
    yearsAgo: 201300000,
    yearsAgoEnd: 145000000,
    date: null,
    epochs: []
  },
  {
    name: 'Cretaceous',
    type: CalendarItemType.Period,
    yearsAgo: 145000000,
    yearsAgoEnd: 66000000,
    date: null,
    epochs: []
  },
]

export let CenozoicPeriods: Period[] = [
  {
    name: 'Paleogene',
    type: CalendarItemType.Period,
    yearsAgo: 66000000,
    yearsAgoEnd: 23030000,
    date: null,
    epochs: [...Epochs.PaleogeneEpochs]
  },
  {
    name: 'Neogene',
    type: CalendarItemType.Period,
    yearsAgo: 23030000,
    yearsAgoEnd: 2580000,
    date: null,
    epochs: [...Epochs.NeogeneEpochs]
  },
  {
    name: 'Quaternary',
    type: CalendarItemType.Period,
    yearsAgo: 2580000,
    yearsAgoEnd: 0,
    date: null,
    epochs: [...Epochs.QuaternaryEpochs]
  },
]
