import { Era } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Periods from './periods'


export let ArcheanEras: Era[] = [
  {
    name: 'Eoarchean',
    description: `This is the first era where the Earth has a solid crust. The beginnings of life on Earth have been dated to this era
     in the form of putative fossilized microorganisms found in hydrothermal vent precipitates on the ocean floor.
    `,
    type: CalendarItemType.Era,
    yearsAgo: 4000000000,
    yearsAgoEnd: 3600000000,
    date: null,
    periods: []
  },
  {
    name: 'PaleoArchean',
    description: `The oldest ascertained life form of fossilized bacteria in microbial mats, 3,480 million years old, found in
     Western Australia, is from this era. The first supercontinent Vaalbara formed during this period`,
    type: CalendarItemType.Era,
    yearsAgo: 3600000000,
    yearsAgoEnd: 3200000000,
    date: null,
    periods: []
  },
  {
    name: 'MesoArchean',
    description: `The earliest reefs date from this era, and were probably formed by stromatolites. The surface temperature during
     the Mesoarchean was likely not much higher than modern-day temperatures.[4] Atmospheric carbon dioxide concentration was only
     a few times higher than its pre-industrial value[5], and the Sun's luminosity was only 70% of its current value, cancelling
     out the influence of a greater degree of greenhouse effect that may be operating.`,
    type: CalendarItemType.Era,
    yearsAgo: 3200000000,
    yearsAgoEnd: 2800000000,
    date: null,
    periods: []
  },
  {
    name: 'Neoarch',
    description: `During this era, oxygenic photosynthesis first evolved, releasing an abundance of oxygen, that first reacted with
     minerals and afterward was free to react with greenhouse gases of the atmosphere, leaving the Earth's surface free to radiate
     its energy to space. This is known as the oxygen catastrophe which was to happen later in the Paleoproterozoic from a poisonous
     buildup of oxygen in the atmosphere, released by these oxygen producing photoautotrophs, which evolved earlier in the Neoarchean.`,
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
    description: `It was during this era that the continents first stabilized. Paleontological evidence suggests that the Earth's
     rotational rate during this era resulted in 20 hour days ~1.8 billion years ago, implying a total of ~450 days per year.`,
    type: CalendarItemType.Era,
    yearsAgo: 2500000000,
    yearsAgoEnd: 1600000000,
    date: null,
    periods: [...Periods.PaleoproterozoicPeriods]
  },
  {
    name: 'Mesoproterozoic',
    description: `The Mesoproterozoic was the first period of Earth's history of which a fairly definitive geological record survives.
     Continents existed during the preceding era (the Paleoproterozoic), but little is known about them. The continental masses of the
     Mesoproterozoic were more or less the same ones that exist today.`,
    type: CalendarItemType.Era,
    yearsAgo: 1600000000,
    yearsAgoEnd: 1000000000,
    date: null,
    periods: [...Periods.MesoproterozoicPeriods]
  },
  {
    name: 'Neoproterozoic',
    description: `Many events happened in this era including records for the heaviest glaciation Earth. Some scientists speculate that
    ice sheets formed all the way down to the equator creating a "Snowball Earth". The Neoproterozoic also contains the first record of
    multicellular life.`,
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

    description: `The Paleozoic was a time of dramatic geological, climatic, and evolutionary change. The Cambrian witnessed the most
     rapid and widespread diversification of life in Earth's history, known as the Cambrian explosion, in which most modern phyla first
     appeared. Fish, arthropods, amphibians, anapsids, synapsids, euryapsids, and diapsids all evolved during the Paleozoic. Life began
     in the ocean but eventually transitioned onto land, and by the late Paleozoic, it was dominated by various forms of organisms. Great
     forests of primitive plants covered the continents, many of which formed the coal beds of Europe and eastern North America. Towards
     the end of the era, large, sophisticated diapsids and synapsids were dominant and the first modern plants (conifers) appeared.`,
    type: CalendarItemType.Era,
    yearsAgo: 541000000,
    yearsAgoEnd: 251902000,
    date: null,
    periods: [...Periods.PaleozoicPeriods]
  },
  {
    name: 'Mesozoic',
    description: `This era began in the wake of the Permian–Triassic extinction event, the largest well-documented mass extinction in Earth's
     history, and ended with the Cretaceous–Paleogene extinction event, another mass extinction which is known for having killed off non-avian
     dinosaurs, as well as other plant and animal species. The Mesozoic was a time of significant tectonic, climate and evolutionary activity.
     The era witnessed the gradual rifting of the supercontinent Pangaea into separate landmasses that would eventually move into their current
     positions. The climate of the Mesozoic was varied, alternating between warming and cooling periods. Overall, however, the Earth was hotter
     than it is today. Dinosaurs appeared in the Late Triassic and became the dominant terrestrial vertebrates early in the Jurassic, occupying
     this position for about 135 million years until their demise at the end of the Cretaceous. Birds first appeared in the Jurassic, having evolved
     from a branch of theropod dinosaurs. The first mammals also appeared during the Mesozoic, but would remain small—less than 15 kg (33 lb)—until
     the Cenozoic.`,
    type: CalendarItemType.Era,
    yearsAgo: 251902000,
    yearsAgoEnd: 66000000,
    date: null,
    periods: [...Periods.MesozoicPeriods]
  },
  {
    name: 'Cenozoic',
    description: `The Cenozoic is also known as the Age of Mammals, because of the large mammals that dominate it. The evolution from apes to the 
     modern human (Homo Erectus) occurs. The continents also moved into their current positions during this era.`,
    type: CalendarItemType.Era,
    yearsAgo: 66000000,
    yearsAgoEnd: 0,
    date: null,
    periods: [...Periods.CenozoicPeriods]
  },
]
