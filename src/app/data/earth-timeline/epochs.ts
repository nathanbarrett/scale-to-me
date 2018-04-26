import { Epoch } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Ages from './ages'

export let PaleogeneEpochs: Epoch[] = [
  {
    name: 'Paleocene',
    description: `he Paleocene Epoch is bracketed by two major events in Earth's history. It started with the mass extinction event
     at the end of the Cretaceous, known as the Cretaceous–Paleogene (K–Pg) boundary. This was a time marked by the demise of non-avian
     dinosaurs, giant marine reptiles and much other fauna and flora. The die-off of the dinosaurs left unfilled ecological niches worldwide.
     The Paleocene ended with the Paleocene–Eocene Thermal Maximum, a geologically brief (~0.2 million year) interval characterized by extreme
     changes in climate and carbon cycling.`,
    type: CalendarItemType.Epoch,
    yearsAgo: 66000000,
    yearsAgoEnd: 56000000,
    date: null,
    ages: []
  },
  {
    name: 'Eocene',
    description: `The start of the Eocene is marked by a brief period in which the concentration of the carbon isotope <sup>13</sup>C in the atmosphere
     was exceptionally low in comparison with the more common isotope <sup>12</sup>C. The end is set at a major extinction event called the Grande Coupure
     (the "Great Break" in continuity) or the Eocene–Oligocene extinction event, which may be related to the impact of one or more large bolides
     in Siberia and in what is now Chesapeake Bay.`,
    type: CalendarItemType.Epoch,
    yearsAgo: 56000000,
    yearsAgoEnd: 33900000,
    date: null,
    ages: []
  },
  {
    name: 'Oligocene',
    description: `The Oligocene is often considered an important time of transition, a link between the archaic world of the tropical Eocene and the
     more modern ecosystems of the Miocene. Major changes during the Oligocene included a global expansion of grasslands, and a regression of tropical
     broad leaf forests to the equatorial belt. The start of the Oligocene is marked by a notable extinction event called the Grande Coupure; it featured
     the replacement of European fauna with Asian fauna, except for the endemic rodent and marsupial families.`,
    type: CalendarItemType.Epoch,
    yearsAgo: 33900000,
    yearsAgoEnd: 23030000,
    date: null,
    ages: []
  },
]

export let NeogeneEpochs: Epoch[] = [
  {
    name: 'Miocene',
    description: `As the earth went from the Oligocene through the Miocene and into the Pliocene, the climate slowly cooled towards a series of ice ages.
     The Miocene boundaries are not marked by a single distinct global event but consist rather of regionally-defined boundaries between the warmer
     Oligocene and the cooler Pliocene Epoch. Apes arose and diversified during the Miocene, becoming widespread in the Old World. By the end of this epoch,
     the ancestors of humans had split away from the ancestors of the chimpanzees to follow their own evolutionary path (7.5 to 5.6 million years ago).
     As in the Oligocene before it, grasslands continued to expand and forests to dwindle in extent. In the seas of the Miocene, kelp forests made their
     first appearance and soon became one of Earth's most productive ecosystems.`,
    type: CalendarItemType.Epoch,
    yearsAgo: 23030000,
    yearsAgoEnd: 5333000,
    date: null,
    ages: [...Ages.MioceneAges]
  },
  {
    name: 'Pliocene',
    description: `Oceans continued to be relatively warm during the Pliocene, though they continued cooling. The Arctic ice cap formed, drying the
     climate and increasing cool shallow currents in the North Atlantic. Deep cold currents flowed from the Antarctic. The change to a cooler, dry, 
     seasonal climate had considerable impacts on Pliocene vegetation, reducing tropical species worldwide. Deciduous forests proliferated, coniferous
     forests and tundra covered much of the north, and grasslands spread on all continents (except Antarctica). Tropical forests were limited to a
     tight band around the equator, and in addition to dry savannahs, deserts appeared in Asia and Africa. Both marine and continental faunas were
     essentially modern, although continental faunas were a bit more primitive than today. The first recognizable hominins, the australopithecines,
     appeared in the Pliocene. The land mass collisions meant great migration and mixing of previously isolated species, such as in the Great American
     Interchange. Herbivores got bigger, as did specialized predators.`,
    type: CalendarItemType.Epoch,
    yearsAgo: 5333000,
    yearsAgoEnd: 2588000,
    date: null,
    ages: [...Ages.PlioceneAges]
  },
]

export let QuaternaryEpochs: Epoch[] = [
  {
    name: 'Pleistocene',
    description: `Informally known as the Ice Age the Pleistocene climate was marked by repeated glacial cycles in which continental glaciers pushed
     to the 40th parallel in some places. It is estimated that, at maximum glacial extent, 30% of the Earth's surface was covered by ice. In addition,
     a zone of permafrost stretched southward from the edge of the glacial sheet, a few hundred kilometres in North America, and several hundred in
     Eurasia. The mean annual temperature at the edge of the ice was −6 °C (21 °F); at the edge of the permafrost, 0 °C (32 °F).`,
    type: CalendarItemType.Epoch,
    yearsAgo: 2588000,
    yearsAgoEnd: 11700,
    date: null,
    ages: [...Ages.PleistoceneAges]
  },
  {
    name: 'Holocene',
    description: `The Holocene has seen the growth and impacts of the human species worldwide, including all its written history, development of major
     civilizations, and overall significant transition toward urban living in the present. Human impacts on modern-era Earth and its ecosystems may
     be considered of global significance for future evolution of living species, including approximately synchronous lithospheric evidence, or more
     recently atmospheric evidence of human impacts.`,
    type: CalendarItemType.Epoch,
    yearsAgo: 11700,
    yearsAgoEnd: 0,
    date: null,
    ages: []
  },
]
