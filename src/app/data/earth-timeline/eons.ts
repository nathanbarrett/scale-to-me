import { Eon } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Eras from './eras'

export let eons: Eon[] = [
  {
    name: 'Hadean',
    hue: 0,
    description: `The Earth is formed out of debris around the solar protoplanetary disk. There is no life. Temperatures are extremely hot,
     with frequent volcanic activity and hellish environments. The atmosphere is nebular. Possible early oceans or bodies of liquid water.
     The moon is formed around this time, probably due to a protoplanet's collision into Earth.`,
    type: CalendarItemType.Eon,
    yearsAgo: 4540000000,
    yearsAgoEnd: 4000000000,
    date: null,
    eras: []
  },
  {
    name: 'Archean',
    hue: 25,
    description: `Prokaryote life, the first form of life, emerges at the very beginning of this eon, in a process known as abiogenesis.
     The continents of Ur, Vaalbara and Kenorland may have been formed around this time. The atmosphere is composed of volcanic and
      greenhouse gases.`,
    type: CalendarItemType.Eon,
    yearsAgo: 4000000000,
    yearsAgoEnd: 2500000000,
    date: null,
    eras: [...Eras.ArcheanEras]
  },
  {
    name: 'Proterozoic',
    hue: 50,
    description: `Eukaryotes, a more complex form of life, emerge, including some forms of multicellular organisms. Bacteria begin
     producing oxygen, shaping the third and current of Earth's atmospheres. Plants, later animals and possibly earlier forms of fungi form
      around this time. The early and late phases of this eon may have undergone "Snowball Earth" periods, in which all of the planet
       suffered below-zero temperatures. The early continents of Columbia, Rodinia and Pannotia may have formed around this time, in that
        order.`,
    type: CalendarItemType.Eon,
    yearsAgo: 2500000000,
    yearsAgoEnd: 541000000,
    date: null,
    eras: [...Eras.ProterozoicEras]
  },
  {
    name: 'Phanerozoic',
    hue: 75,
    description: `Complex life, including vertebrates, begin to dominate the Earth's ocean in a process known as the Cambrian explosion.
     Pangaea forms and later dissolves into Laurasia and Gondwana. Gradually, life expands to land and all familiar forms of plants, animals
      and fungi begin appearing, including annelids, insects and reptiles. Several mass extinctions occur, among which birds, the
     descendants of dinosaurs, and more recently mammals emerge. Modern animals—including humans—evolve at the most recent phases of this
      eon.`,
    type: CalendarItemType.Eon,
    yearsAgo: 541000000,
    yearsAgoEnd: 0,
    date: null,
    eras: [...Eras.PhanerozoicEras]

  }
]
