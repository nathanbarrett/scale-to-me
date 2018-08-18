import { CalendarItem } from '../../interfaces/calendar-item'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'

export let MioceneAges: CalendarItem[] = [
  {
    name: 'Aquitanian',
    description: `The base of the Aquitanian (also the base of the Miocene series and the Neogene system) is
     defined as the place in the stratigraphic column at the first appearance of foram species Paragloborotalia
     kugleri, the extinction of calcareous nannoplankton species Reticulofenestra bisecta (which forms the base
     of nannoplankton biozone NN1), and the base of magnetic chronozone C6Cn.2n. The official GSSP for the
     Aquitanian stage lies in the Lemme-Carrosio section near the small village of Carrosio (north of Genoa) in
     northern Italy. The top of the Aquitanian stage (the base of the Burdigalian) is at the first appearance of foram
     species Globigerinoides altiaperturus and the top of magnetic chronozone C6An.`,
    type: CalendarItemType.Age,
    yearsAgo: 23030000,
    yearsAgoEnd: 20440000,
    date: null,
  },
  {
    name: 'Burdigalian',
    description: `The Burdigalian was the first and longest warming period of the Miocene Epoch. The base of the
     Burdigalian is at the first appearance of foram species Globigerinoides altiaperturus and the top of magnetic
     chronozone C6An. As of 2016, an official GSSP for the Burdigalian had not yet been assigned. The top of the
     Burdigalian (the base of the Langhian) is defined by the first appearance of foram species Praeorbulina glomerosa
     and is also coeval with the top of magnetic chronozone C5Cn.1n.`,
    type: CalendarItemType.Age,
    yearsAgo: 20440000,
    yearsAgoEnd: 15970000,
    date: null,
  },
  {
    name: 'Langhian',
    description: `The Langhian was a continuing warming period. The base of the Langhian is defined by the first appearance
     of foraminifer species Praeorbulina glomerosa and is also coeval with the top of magnetic chronozone C5Cn.1n. A GSSP for
     the Langhian stage was not yet established in 2009. The top of the Langhian stage (the base of the Serravallian stage)
     is at the first occurrence of fossils of the nannoplankton species Sphenolithus heteromorphus and is located in magnetic
     chronozone C5ABr.`,
    type: CalendarItemType.Age,
    yearsAgo: 15970000,
    yearsAgoEnd: 13820000,
    date: null,
  },
  {
    name: 'Serravallian',
    description: `The base of the Serravallian is at the first occurrence of fossils of the nannoplankton species Sphenolithus
     heteromorphus and is located in the magnetic chronozone C5ABr.`,
    type: CalendarItemType.Age,
    yearsAgo: 13820000,
    yearsAgoEnd: 11630000,
    date: null,
  },
  {
    name: 'Tortonian',
    description: `The base of the Tortonian stage is at the last common appearance of calcareous nannoplankton Discoaster kugleri
     and planktonic foram Globigerinoides subquadratus.`,
    type: CalendarItemType.Age,
    yearsAgo: 11630000,
    yearsAgoEnd: 7246000,
    date: null,
  },
  {
    name: 'Messinian',
    description: `During the Messinian, around 6 million years ago, the Messinian salinity crisis took place, which brought about
     repeated desiccations of the Mediterranean Sea.`,
    type: CalendarItemType.Age,
    yearsAgo: 7246000,
    yearsAgoEnd: 5333000,
    date: null,
  }
]

export let PlioceneAges: CalendarItem[] = [
  {
    name: 'Zanclean',
    description: `The Zanclean flood marked the beginning of the age and the end of the Messinian, as water poured in from the
     Atlantic Ocean through the Strait of Gibraltar to deluge the Mediterranean Basin and end the Messinian Event, a period
     about 5.96 Ma ago in the Messinian age of the Miocene epoch when the Mediterranean Sea had evaporated partly or completely.`,
    type: CalendarItemType.Age,
    yearsAgo: 5333000,
    yearsAgoEnd: 3600000,
    date: null,
  },
  {
    name: 'Piacenzian',
    description: `The late Piacenzian may be when the genus Homo developed out of the ancestral genus Australopithecus. While the
     oldest known fossils unambiguously identified as Homo habilis date to just after the end of the Piacenzian (2.58 Ma), a fossilized
     jawbone that exhibits traits that are transitional between Australopithecus and Homo habilis was discovered in the Afar Triangle
     in 2015.`,
    type: CalendarItemType.Age,
    yearsAgo: 3600000,
    yearsAgoEnd: 2588000,
    date: null,
  },
]

export let PleistoceneAges: CalendarItem[] = [
  {
    name: 'Gelasian',
    description: `During the Gelasian the ice sheets in the Northern Hemisphere began to grow, which is seen as the beginning of the
     Quaternary ice age.`,
    type: CalendarItemType.Age,
    yearsAgo: 2588000,
    yearsAgoEnd: 1800000,
    date: null,
  },
  {
    name: 'Calabrian',
    description: `The end of the stage is defined by the last magnetic pole reversal (781 ± 5 Ka) and plunge into an ice age and global
     drying possibly colder and drier than the late Miocene (Messinian) through early Pliocene (Zanclean) cold period.`,
    type: CalendarItemType.Age,
    yearsAgo: 1800000,
    yearsAgoEnd: 781000,
    date: null,
  },
  {
    name: 'Chibanian',
    description: `Formally called the Ionian this Age is currently waiting to be be officially ratified by the ICS (International
     Commission on Stratigraphy).`,
    type: CalendarItemType.Age,
    yearsAgo: 781000,
    yearsAgoEnd: 126000,
    date: null,
  },
  {
    name: 'Tarantian',
    description: `Many megafauna became extinct over this age, a trend that continued into the Holocene. The Late Pleistocene contains
     the Upper Paleolithic stage of human development, including the out-of-Africa migration and dispersal of anatomically modern humans
     and the extinction of the last remaining archaic human species.`,
    type: CalendarItemType.Age,
    yearsAgo: 126000,
    yearsAgoEnd: 11700,
    date: null,
  },
]
