import { Period } from '../../interfaces/timeline-items'
import { CalendarItemType } from '../../enums/calendar-item-type.enum'
import * as Epochs from './epochs'

export let PaleoproterozoicPeriods: Period[] = [
  {
    name: 'Siderian',
    description: `The laying down of the banded iron formations (BIFs) peaked early in this period. BIFs were formed
     as anaerobic algae produced waste oxygen that combined with iron, forming magnetite (Fe3O4, an iron oxide). This
     process cleared iron from the oceans, presumably turning greenish seas clear. Eventually, without an oxygen sink
     in the oceans, the process allowed the buildup of an oxygen-rich atmosphere. This event is known as the oxygen
     catastrophe, which, according to some geologists, triggered the Huronian glaciation.`,
    type: CalendarItemType.Period,
    yearsAgo: 2500000000,
    yearsAgoEnd: 2300000000,
    date: null,
    epochs: []
  },
  {
    name: 'Rhyacian',
    description: `The Bushveld Igneous Complex and other similar intrusions formed during this period. The Huronian
     (Makganyene) global glaciation began at the start of the Rhyacian lasted 100 million years. The first known eukaryotes
     began to evolve and the multicellular Francevillian Group Fossils, at 2.1-Gyr are from the Rhyacian period.`,
    type: CalendarItemType.Period,
    yearsAgo: 2300000000,
    yearsAgoEnd: 2050000000,
    date: null,
    epochs: []
  },
  {
    name: 'Orosirian',
    description: `The later half of the period was an episode of intensive orogeny (mountain building) on virtually all continents.
     Two of the largest known impact events on Earth occurred during the Orosirian. At the very beginning of the period, 2023 Mya,
     a large asteroid collision created the Vredefort impact structure. The event that created the Sudbury Basin structure occurred
     near the end of the period, 1850 Mya.`,
    type: CalendarItemType.Period,
    yearsAgo: 2050000000,
    yearsAgoEnd: 1800000000,
    date: null,
    epochs: []
  },
  {
    name: 'Statherian',
    description: `This period was characterized on most continents by either new platforms or final cratonization of fold belts. By
     the beginning of the Statherian, the supercontinent Columbia had assembled.`,
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
    description: `This period is characterised by expansion of existing platform covers, or by new platforms on recently cratonized
     basements. The supercontinent Columbia broke up during the Calymmian some 1500 Mya.`,
    type: CalendarItemType.Period,
    yearsAgo: 1600000000,
    yearsAgoEnd: 1400000000,
    date: null,
    epochs: []
  },
  {
    name: 'Ectasian',
    description: `This period is interesting for the first evidence of sexual reproduction. The 1.2 billion years old Hunting Formation
     on Somerset Island, Canada, dates from the end of the Ectasian. It contains the microfossils of the multicellular filaments of
     Bangiomorpha pubescens (type of red algae), the first taxonomically resolved eukaryote. This was the first organism that exhibited
     sexual reproduction, which is an essential feature for complex multicellularity. `,
    type: CalendarItemType.Period,
    yearsAgo: 1400000000,
    yearsAgoEnd: 1200000000,
    date: null,
    epochs: []
  },
  {
    name: 'Stenian',
    description: `The supercontinent Rodinia assembled during the Stenian. It would last into the Tonian period. This period includes
     the formation of the Keweenawan Rift at about 1100 Mya.`,
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
    description: `Rifting leading to the breakup of supercontinent Rodinia, which had formed in the mid-Stenian, occurred during this
     period, starting from 900 to 850 Mya. The first large evolutionary radiation of acritarchs occurred during the Tonian. The first
     metazoans (animals) are found in the late Tonian about 800 Mya. A notable example of this is the poriferan-like species Otavia antiqua.`,
    type: CalendarItemType.Period,
    yearsAgo: 1000000000,
    yearsAgoEnd: 720000000,
    date: null,
    epochs: []
  },
  {
    name: 'Cryogenian',
    description: `The Sturtian and Marinoan glaciations occurred during the Cryogenian period, which are the greatest ice ages known to
     have occurred on Earth. These events are the subject of much scientific controversy. The main debate contests whether these glaciations
     covered the entire planet (the so-called "Snowball Earth") or a band of open sea survived near the equator (termed "slushball Earth").`,
    type: CalendarItemType.Period,
    yearsAgo: 720000000,
    yearsAgoEnd: 635000000,
    date: null,
    epochs: []
  },
  {
    name: 'Ediacaran',
    description: `The fossil record from the Ediacaran Period is sparse, as more easily fossilized hard-shelled animals had yet to evolve.
     The Ediacaran biota include the oldest definite multicellular organisms (with specialized tissues), the most common types of which resemble
     segmented worms, fronds, disks, or immobile bags.`,
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
    description: `The Cambrian marked a profound change in life on Earth; prior to the Cambrian, the majority of living organisms on the whole were
     small, unicellular and simple; the Precambrian Charnia being exceptional. Complex, multicellular organisms gradually became more common in the
     millions of years immediately preceding the Cambrian, but it was not until this period that mineralized—hence readily fossilized—organisms became
     common. The rapid diversification of lifeforms in the Cambrian, known as the Cambrian explosion, produced the first representatives of all
     modern animal phyla.`,
    type: CalendarItemType.Period,
    yearsAgo: 541000000,
    yearsAgoEnd: 485400000,
    date: null,
    epochs: []
  },
  {
    name: 'Ordovician',
    description: `Life continued to flourish during the Ordovician as it did in the earlier Cambrian period, although the end of the period was marked
     by the Ordovician–Silurian extinction event. Invertebrates, namely molluscs and arthropods, dominated the oceans. The Great Ordovician
     Biodiversification Event considerably increased the diversity of life. Fish, the world's first true vertebrates, continued to evolve, and those
     with jaws may have first appeared late in the period. Life had yet to diversify on land. About 100 times as many meteorites struck the Earth per
     year during the Ordovician compared with today.`,
    type: CalendarItemType.Period,
    yearsAgo: 485400000,
    yearsAgoEnd: 443800000,
    date: null,
    epochs: []
  },
  {
    name: 'Silurian',
    description: `The base of the Silurian is set at a series of major Ordovician–Silurian extinction events when 60% of marine species were wiped out.
     A significant evolutionary milestone during the Silurian was the diversification of jawed and bony fish. Multi-cellular life also began to appear
     on land in the form of small, bryophyte-like and vascular plants that grew beside lakes, streams, and coastlines, and terrestrial arthropods are
     also first found on land during the Silurian. However, terrestrial life would not greatly diversify and affect the landscape until the Devonian.`,
    type: CalendarItemType.Period,
    yearsAgo: 443800000,
    yearsAgoEnd: 419200000,
    date: null,
    epochs: []
  },
  {
    name: 'Devonian',
    description: `The first significant adaptive radiation of life on dry land occurred during the Devonian. Free-sporing vascular plants began to
     spread across dry land, forming extensive forests which covered the continents. By the middle of the Devonian, several groups of plants had
     evolved leaves and true roots, and by the end of the period the first seed-bearing plants appeared. Various terrestrial arthropods also became
     well-established. Fish reached substantial diversity during this time, leading the Devonian to often be dubbed the "Age of Fish". The first
     ray-finned and lobe-finned bony fish appeared, while the placoderms began dominating almost every known aquatic environment. The ancestors
     of all four-limbed vertebrates (tetrapods) began adapting to walking on land, as their strong pectoral and pelvic fins gradually evolved into legs.`,
    type: CalendarItemType.Period,
    yearsAgo: 419200000,
    yearsAgoEnd: 358900000,
    date: null,
    epochs: []
  },
  {
    name: 'Carboniferous',
    description: `Terrestrial animal life was well established by the Carboniferous period. Amphibians were the dominant land vertebrates, of which
     one branch would eventually evolve into amniotes, the first solely terrestrial vertebrates. Arthropods were also very common, and many (such
     as Meganeura) were much larger than those of today. Vast swaths of forest covered the land, which would eventually be laid down and become the
     coal beds characteristic of the Carboniferous stratigraphy evident today. The atmospheric content of oxygen also reached their highest levels
     in geological history during the period, 35% compared with 21% today, allowing terrestrial invertebrates to evolve to great size.`,
    type: CalendarItemType.Period,
    yearsAgo: 358900000,
    yearsAgoEnd: 298900000,
    date: null,
    epochs: []
  },
  {
    name: 'Permian',
    description: `The Permian witnessed the diversification of the early amniotes into the ancestral groups of the mammals, turtles, lepidosaurs,
     and archosaurs. The world at the time was dominated by two continents known as Pangaea and Siberia, surrounded by a global ocean called
     Panthalassa. The Carboniferous rainforest collapse left behind vast regions of desert within the continental interior. Amniotes, who could
     better cope with these drier conditions, rose to dominance in place of their amphibian ancestors. The Permian (along with the Paleozoic) ended
     with the Permian–Triassic extinction event, the largest mass extinction in Earth's history, in which nearly 90% of marine species and 70% of
     terrestrial species died out. It would take well into the Triassic for life to recover from this catastrophe.`,
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
    description: `The Triassic began in the wake of the Permian–Triassic extinction event, which left the earth's biosphere impoverished; it
     would take well into the middle of this period for life to recover its former diversity. Therapsids and archosaurs were the chief terrestrial
     vertebrates during this time. A specialized subgroup of archosaurs, called dinosaurs, first appeared in the Late Triassic but did not become
     dominant until the succeeding Jurassic Period. The first true mammals, themselves a specialized subgroup of Therapsids, also evolved during
     this period, as well as the first flying vertebrates, the pterosaurs, who like the dinosaurs were a specialized subgroup of archosaurs. The
     vast supercontinent of Pangaea existed until the mid-Triassic, after which it began to gradually rift into two separate landmasses, Laurasia
     to the north and Gondwana to the south.`,
    type: CalendarItemType.Period,
    yearsAgo: 251902000,
    yearsAgoEnd: 201300000,
    date: null,
    epochs: []
  },
  {
    name: 'Jurassic',
    description: `The Jurassic is named after the Jura Mountains within the European Alps, where limestone strata from the period were first
     identified. By the beginning of the Jurassic, the supercontinent Pangaea had begun rifting into two landmasses: Laurasia to the north,
     and Gondwana to the south. This created more coastlines and shifted the continental climate from dry to humid, and many of the arid deserts
     of the Triassic were replaced by lush rainforests. On land, the fauna transitioned from the Triassic fauna, dominated by both dinosauromorph
     and crocodylomorph archosaurs, to one dominated by dinosaurs alone. The first birds also appeared during the Jurassic, having evolved from a
     branch of theropod dinosaurs. Other major events include the appearance of the earliest lizards, and the evolution of therian mammals, including
     primitive placentals. Crocodilians made the transition from a terrestrial to an aquatic mode of life. The oceans were inhabited by marine
     reptiles such as ichthyosaurs and plesiosaurs, while pterosaurs were the dominant flying vertebrates.`,
    type: CalendarItemType.Period,
    yearsAgo: 201300000,
    yearsAgoEnd: 145000000,
    date: null,
    epochs: []
  },
  {
    name: 'Cretaceous',
    description: `The Cretaceous was a period with a relatively warm climate, resulting in high eustatic sea levels that created numerous shallow
     inland seas. These oceans and seas were populated with now-extinct marine reptiles, ammonites and rudists, while dinosaurs continued to dominate
     on land. During this time, new groups of mammals and birds, as well as flowering plants, appeared. The Cretaceous ended with a large mass
     extinction, the Cretaceous–Paleogene extinction event, in which many groups, including non-avian dinosaurs, pterosaurs and large marine reptiles
     died out. The end of the Cretaceous is defined by the abrupt Cretaceous–Paleogene boundary (K–Pg boundary), a geologic signature associated with
     the mass extinction which lies between the Mesozoic and Cenozoic eras.`,
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
    description: `The Paleogene is most notable for being the time during which mammals diversified from relatively small, simple forms into a large
     group of diverse animals in the wake of the Cretaceous–Paleogene extinction event that ended the preceding Cretaceous Period.`,
    type: CalendarItemType.Period,
    yearsAgo: 66000000,
    yearsAgoEnd: 23030000,
    date: null,
    epochs: [...Epochs.PaleogeneEpochs]
  },
  {
    name: 'Neogene',
    description: `During this period, mammals and birds continued to evolve into roughly modern forms, while other groups of life remained relatively
     unchanged. Early hominids, the ancestors of humans, appeared in Africa near the end of the period. Some continental movement took place, the most
     significant event being the connection of North and South America at the Isthmus of Panama, late in the Pliocene. This cut off the warm ocean
     currents from the Pacific to the Atlantic Ocean, leaving only the Gulf Stream to transfer heat to the Arctic Ocean. The global climate cooled
     considerably over the course of the Neogene, culminating in a series of continental glaciations in the Quaternary Period that follows.`,
    type: CalendarItemType.Period,
    yearsAgo: 23030000,
    yearsAgoEnd: 2580000,
    date: null,
    epochs: [...Epochs.NeogeneEpochs]
  },
  {
    name: 'Quaternary',
    description: `The 2.6 million years of the Quaternary represents the time during which recognizable humans existed. Over this short time period,
     there has been relatively little change in the distribution of the continents due to plate tectonics.`,
    type: CalendarItemType.Period,
    yearsAgo: 2580000,
    yearsAgoEnd: 0,
    date: null,
    epochs: [...Epochs.QuaternaryEpochs]
  },
]
