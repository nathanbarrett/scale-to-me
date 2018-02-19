import { ISolarSystem } from '../interfaces/solar-system'
import { SatelliteTrajectoryType } from '../enums/satellite-trajectory-type.enum'
import * as moment from 'moment'

export let SolarSystem: ISolarSystem = {
  scale: 0.00000000938,
  sun: {
    name: 'The Sun',
    mapData: {
      marker: null,
      iconUrl: '/assets/map/map-icon-sun.png',
      infoWindowContent: `
      It is now about the size of a hot air balloon. Use the address input above to move it all to a location you are more familiar with.
      You can also drag around the Sun's map icon.<br />
       <a href="https://free3d.com/3d-model/hot-air-balloon-54348.html" style="font-size: 10px" target="_blank">
        Hot Air Balloon Courtesy Of Iridesium
       </a>
      `,
      infoWindow: null,
      infoWindowImageUrl: '/assets/images/comparisons/thesun.png',
      didYouKnow: `The color of the Sun in space is actually mostly white, not yellow or orange.
       The reason it appears yellow or orange on Earth is due to atmospheric scattering, especially when it is low in the sky.`
    },
    radius: 696342000,
    distanceFromSun: 0
  },
  planets: [
    {
      name: 'Mercury',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-mercury.png',
        infoWindowContent: `The smallest and innermost planet is now only {{scaledDiameter}} wide
         and is {{scaledDistance}} from the sun. It's new scaled size is only a little bit bigger than a golf ball.`,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/mercury.png',
        didYouKnow: `Mercury is actually smaller than some moons of our solar system including Ganymede of Jupiter and Titan of Saturn.`
      },
      distanceFromSun: 57900000000,
      radius: 2439000,
    },
    {
      name: 'Venus',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-venus.png',
        infoWindowContent: `The second brightest natural object in the sky after the moon, Venus is {{scaledDiameter}} in diameter
         which is now about half the size of a soccer ball and sits {{scaledDistance}} from The Sun.`,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/venus.png',
        didYouKnow: `While having the second hottest surface temperature in the solar system after The Sun, which is 450C (842F),
         its atmosphere is so dense that it actually crushes CO2 at the surface and turns it into an exotic material called
         "super critical fluid" which is neither a gas or a liquid but has properties of both. Humans could never live on the surface
         of Venus but some have proposed living
         <a href="http://www.bbc.com/future/story/20161019-the-amazing-cloud-cities-we-could-build-on-venus" target="_blank">
          up in the clouds.
         </a>
        `
      },
      distanceFromSun: 108200000000,
      radius: 6051000,
    },
    {
      name: 'Earth',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-earth.png',
        infoWindowContent: `Our beautiful <a href="https://www.youtube.com/watch?v=-pvxKdvuwIw" target="_blank">Pale Blue Dot</a> is only a
         little bit larger than Venus. Coming in at {{scaledDiameter}} wide it is about half the size of a soccer ball and is
         {{scaledDistance}} from The Sun.
        `,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/earth.png',
        didYouKnow: `Earth's first line of defense against harmful radiation from The Sun is its magnetosphere which extends much further
        out than the atmosphere. However, the magnetosphere is not perfectly round. On the north and south poles it plunges back down to
        the Earth making a funnel shape. Occasionally charged particles from The Sun will get trapped in the funnel and fall down to Earth
        and interact with our atmosphere. This is what causes the visual phenomenon called an
        <a href="https://en.wikipedia.org/wiki/Aurora" target="_blank">aurora</a> or northern lights.`
      },
      distanceFromSun: 149600000000,
      radius: 6371000,
      moons: [
        {
          radius: 1738000,
          name: 'Moon',
          distanceFromPlanet: 384400000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-moon.png',
            infoWindowContent: `Our Moon is now around {{scaledDiameter}} wide which is about half the size of a pool ball. It orbits
            around the Earth from a distance of about {{scaledPlanetDistance}}.`,
            infoWindowImageUrl: 'assets/images/comparisons/moon.png',
            infoWindow: null
          }
        }
      ]
    },
    {
      name: 'Mars',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-mars.png',
        infoWindowContent: `The fourth planet from the sun is now scaled down to {{scaledDiameter}} wide which is just a little larger
         than a pool ball. It now orbits The Sun at a distance of {{scaledDistance}}.
        `,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/mars.png',
        didYouKnow: `The largest mountain in the solar system, Olympus Mons, is found in the western hemisphere of Mars. It is two and a
         half times as tall as Mount Everest and is classified as a dormant shield volcano.
        `
      },
      distanceFromSun: 227900000000,
      radius: 3389000,
      moons: [
        {
          radius: 4000,
          name: 'Deimos',
          distanceFromPlanet: 23460000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          radius: 12000,
          name: 'Phobos',
          distanceFromPlanet: 9270000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        }
      ]
    },
    {
      name: 'Jupiter',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-jupiter.png',
        infoWindowContent: `At {{scaledDiameter}} wide Jupiter is about as tall as an average eight year old child. Jupiter is orbiting
         The Sun from {{scaledDistance}} away.`,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/jupiter.png',
        didYouKnow: `NASA's observational satellite Juno was designed to get up close to the planet Jupiter to make detailed observations
        and take <a href="https://www.nasa.gov/mission_pages/juno/images/index.html" target="_blank">high quality pictures</a> of the
        surface. Juno's orbit is highly elliptical because, in order to preserve the equipment and allow time to transmit the information
        back to Earth, it must minimize the amount of time it spends inside of Jupiter's intense radiation fields.`
      },
      distanceFromSun: 778300000000,
      radius: 69911000,
      moons: [
        {
          name: 'Io',
          radius: 1818100,
          distanceFromPlanet: 421800000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Europa',
          radius: 1560700,
          distanceFromPlanet: 671100000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Ganymede',
          radius: 2634100,
          distanceFromPlanet: 1070000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Callisto',
          radius: 2408400,
          distanceFromPlanet: 1882000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Amalthea',
          radius: 83450,
          distanceFromPlanet: 181400000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Himalia',
          radius: 67000,
          distanceFromPlanet: 11461000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Elara',
          radius: 43000,
          distanceFromPlanet: 11741000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Pasiphae',
          radius: 30000,
          distanceFromPlanet: 23624000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Sinope',
          radius: 19000,
          distanceFromPlanet: 23939000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Lysithea',
          radius: 18000,
          distanceFromPlanet: 11717000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Carme',
          radius: 23000,
          distanceFromPlanet: 23404000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Ananke',
          radius: 14000,
          distanceFromPlanet: 21276000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Leda',
          radius: 10000,
          distanceFromPlanet: 11165000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Thebe',
          radius: 49300,
          distanceFromPlanet: 221900000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Adrastea',
          radius: 8200,
          distanceFromPlanet: 129000000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Metis',
          radius: 21500,
          distanceFromPlanet: 128000000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Callirrhoe',
          radius: 4300,
          distanceFromPlanet: 24103000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Themisto',
          radius: 4000,
          distanceFromPlanet: 7284000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Megaclite',
          radius: 2700,
          distanceFromPlanet: 23493000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Taygete',
          radius: 2500,
          distanceFromPlanet: 23280000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Chaldene',
          radius: 1900,
          distanceFromPlanet: 23100000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Harpalyke',
          radius: 2200,
          distanceFromPlanet: 20858000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Kalyke',
          radius: 2600,
          distanceFromPlanet: 23483000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Iocaste',
          radius: 2600,
          distanceFromPlanet: 21060000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Erinome',
          radius: 1600,
          distanceFromPlanet: 23196000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Isonoe',
          radius: 1900,
          distanceFromPlanet: 23155000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Praxidike',
          radius: 3400,
          distanceFromPlanet: 20908000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Autonoe',
          radius: 2000,
          distanceFromPlanet: 24046000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Thyone',
          radius: 2000,
          distanceFromPlanet: 20939000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Hermippe',
          radius: 2000,
          distanceFromPlanet: 21131000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Aitne',
          radius: 1500,
          distanceFromPlanet: 23229000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Eurydome',
          radius: 1500,
          distanceFromPlanet: 22865000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Euanthe',
          radius: 1500,
          distanceFromPlanet: 20797000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Euporie',
          radius: 1000,
          distanceFromPlanet: 19304000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Orthosie',
          radius: 1000,
          distanceFromPlanet: 20720000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Sponde',
          radius: 1000,
          distanceFromPlanet: 23487000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Kale',
          radius: 1000,
          distanceFromPlanet: 23217000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Pasithee',
          radius: 1000,
          distanceFromPlanet: 23004000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Hegemone',
          radius: 1500,
          distanceFromPlanet: 23577000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Mneme',
          radius: 1000,
          distanceFromPlanet: 21035000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Aoede',
          radius: 2000,
          distanceFromPlanet: 23980000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Thelxinoe',
          radius: 1000,
          distanceFromPlanet: 21164000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Arche',
          radius: 1500,
          distanceFromPlanet: 23355000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Kallichore',
          radius: 1000,
          distanceFromPlanet: 23288000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Helike',
          radius: 2000,
          distanceFromPlanet: 21069000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Carpo',
          radius: 1500,
          distanceFromPlanet: 17058000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Eukelade',
          radius: 2000,
          distanceFromPlanet: 23328000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Cyllene',
          radius: 1000,
          distanceFromPlanet: 23809000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Kore',
          radius: 1000,
          distanceFromPlanet: 24543000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Herse',
          radius: 1000,
          distanceFromPlanet: 22983000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2010 J 1',
          radius: 1000,
          distanceFromPlanet: 23314000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2010 J 2',
          radius: 500,
          distanceFromPlanet: 20307000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Dia',
          radius: 2000,
          distanceFromPlanet: 12570000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2016 J 1',
          radius: 3000,
          distanceFromPlanet: 20595000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 18',
          radius: 1000,
          distanceFromPlanet: 20426000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2011 J 2',
          radius: 500,
          distanceFromPlanet: 23329000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 5',
          radius: 2000,
          distanceFromPlanet: 23498000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 15',
          radius: 1000,
          distanceFromPlanet: 22630000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2017 J 1',
          radius: 2000,
          distanceFromPlanet: 23483000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 3',
          radius: 1000,
          distanceFromPlanet: 20224000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 2',
          radius: 1000,
          distanceFromPlanet: 28455000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 4',
          radius: 1000,
          distanceFromPlanet: 23933000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 9',
          radius: 500,
          distanceFromPlanet: 23388000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 10',
          radius: 1000,
          distanceFromPlanet: 23044000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 12',
          radius: 500,
          distanceFromPlanet: 17833000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 16',
          radius: 1000,
          distanceFromPlanet: 20956000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 19',
          radius: 1000,
          distanceFromPlanet: 23535000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2003 J 23',
          radius: 1000,
          distanceFromPlanet: 23566000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2011 J 1',
          radius: 500,
          distanceFromPlanet: 20155000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        }
      ]
    },
    {
      name: 'Saturn',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-saturn.png',
        infoWindowContent: `From here Saturn is {{scaledDiameter}} wide which is about as tall as an average five year old child. It orbits
        The Sun from {{scaledDistance}} away.`,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/saturn.png',
        didYouKnow: `While scientists have yet to prove the exact origin of Saturn's rings there are two competing hypothesis. One is that
        the rings were formed by a moon that was either crushed by Saturn's gravity or destroyed by some other means. The other hypothesis
        is that the rings are the leftover remnants of the nebular material from which our solar system was formed.`
      },
      distanceFromSun: 1427000000000,
      radius: 58232000,
      moons: [
        {
          name: 'Mimas',
          radius: 198200,
          distanceFromPlanet: 185540000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Enceladus',
          radius: 252300,
          distanceFromPlanet: 238040000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Tethys',
          radius: 536300,
          distanceFromPlanet: 294670000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Dione',
          radius: 562500,
          distanceFromPlanet: 377420000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Rhea',
          radius: 764500,
          distanceFromPlanet: 527070000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Titan',
          radius: 2575500,
          distanceFromPlanet: 1221000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Hyperion',
          radius: 133000,
          distanceFromPlanet: 1500000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Iapetus',
          radius: 734500,
          distanceFromPlanet: 3560000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Phoebe',
          radius: 106600,
          distanceFromPlanet: 12947000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Janus',
          radius: 90400,
          distanceFromPlanet: 151460000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Epimetheus',
          radius: 58300,
          distanceFromPlanet: 151410000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Helene',
          radius: 16000,
          distanceFromPlanet: 377420000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Telesto',
          radius: 12000,
          distanceFromPlanet: 294710000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Calypso',
          radius: 9500,
          distanceFromPlanet: 294710000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Atlas',
          radius: 15300,
          distanceFromPlanet: 137670000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Prometheus',
          radius: 46800,
          distanceFromPlanet: 139380000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Pandora',
          radius: 40600,
          distanceFromPlanet: 141720000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Pan',
          radius: 12800,
          distanceFromPlanet: 133580000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Ymir',
          radius: 9000,
          distanceFromPlanet: 23140000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Paaliaq',
          radius: 11000,
          distanceFromPlanet: 15200000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Tarvos',
          radius: 7500,
          distanceFromPlanet: 17983000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Ijiraq',
          radius: 6000,
          distanceFromPlanet: 11124000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Suttungr',
          radius: 3500,
          distanceFromPlanet: 19459000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Kiviuq',
          radius: 8000,
          distanceFromPlanet: 11110000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Mundilfari',
          radius: 3500,
          distanceFromPlanet: 18628000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Albiorix',
          radius: 16000,
          distanceFromPlanet: 16182000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Skathi',
          radius: 4000,
          distanceFromPlanet: 15540000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Erriapus',
          radius: 5000,
          distanceFromPlanet: 17343000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Siarnaq',
          radius: 20000,
          distanceFromPlanet: 18015000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Thrymr',
          radius: 3500,
          distanceFromPlanet: 20314000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Narvi',
          radius: 3500,
          distanceFromPlanet: 19007000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Methone',
          radius: 1600,
          distanceFromPlanet: 194440000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Pallene',
          radius: 2000,
          distanceFromPlanet: 212280000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Polydeuces',
          radius: 1250,
          distanceFromPlanet: 377200000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Daphnis',
          radius: 3000,
          distanceFromPlanet: 136500000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Aegir',
          radius: 3000,
          distanceFromPlanet: 20751000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Bebhionn',
          radius: 3000,
          distanceFromPlanet: 17119000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Bergelmir',
          radius: 3000,
          distanceFromPlanet: 19336000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Bestla',
          radius: 3500,
          distanceFromPlanet: 20192000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Farbauti',
          radius: 2500,
          distanceFromPlanet: 20377000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Fenrir',
          radius: 2000,
          distanceFromPlanet: 22454000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Fornjot',
          radius: 3000,
          distanceFromPlanet: 25146000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Hati',
          radius: 3000,
          distanceFromPlanet: 19846000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Hyrrokkin',
          radius: 4000,
          distanceFromPlanet: 18437000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Kari',
          radius: 3500,
          distanceFromPlanet: 22089000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Loge',
          radius: 3000,
          distanceFromPlanet: 23058000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Skoll',
          radius: 3000,
          distanceFromPlanet: 17665000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Surtur',
          radius: 3000,
          distanceFromPlanet: 22704000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Anthe',
          radius: 1000,
          distanceFromPlanet: 197700000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Jarnsaxa',
          radius: 3000,
          distanceFromPlanet: 18811000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Greip',
          radius: 3000,
          distanceFromPlanet: 18206000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Tarqeq',
          radius: 3500,
          distanceFromPlanet: 18009000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Aegaeon',
          radius: 250,
          distanceFromPlanet: 167500000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2004 S 7',
          radius: 3000,
          distanceFromPlanet: 20999000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2004 S 12',
          radius: 2500,
          distanceFromPlanet: 19878000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2004 S 13',
          radius: 3000,
          distanceFromPlanet: 18404000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2004 S 17',
          radius: 2000,
          distanceFromPlanet: 19447000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2006 S 1',
          radius: 3000,
          distanceFromPlanet: 18790000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2006 S 3',
          radius: 3000,
          distanceFromPlanet: 22096000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2007 S 2',
          radius: 3000,
          distanceFromPlanet: 16725000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2007 S 3',
          radius: 3000,
          distanceFromPlanet: 18975000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2009 S 1',
          radius: 150,
          distanceFromPlanet: 117000000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        }
      ]
    },
    {
      name: 'Uranus',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-uranus.png',
        infoWindowContent: `At {{scaledDiameter}} wide Uranus is a little more than two soccer balls put together. The distance from here
        to The Sun is {{scaledDistance}}.`,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/uranus.png',
        didYouKnow: `Uranus has its own set of rings as well but they orbit vertically instead of horizontally. Why? Because Uranus'
        axial tilt is 97.7 degrees which means that it rotates on its side.`
      },
      distanceFromSun: 2871000000000,
      radius: 25362000,
      moons: [
        {
          name: 'Ariel',
          radius: 578900,
          distanceFromPlanet: 190900000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Umbriel',
          radius: 584700,
          distanceFromPlanet: 266000000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Titania',
          radius: 788900,
          distanceFromPlanet: 436300000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Oberon',
          radius: 761400,
          distanceFromPlanet: 583500000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Miranda',
          radius: 235800,
          distanceFromPlanet: 129900000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Cordelia',
          radius: 20100,
          distanceFromPlanet: 49800000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Ophelia',
          radius: 21400,
          distanceFromPlanet: 53800000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Bianca',
          radius: 25700,
          distanceFromPlanet: 59200000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Cressida',
          radius: 39800,
          distanceFromPlanet: 61800000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Desdemona',
          radius: 32000,
          distanceFromPlanet: 62700000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Juliet',
          radius: 46800,
          distanceFromPlanet: 64400000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Portia',
          radius: 67600,
          distanceFromPlanet: 66100000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Rosalind',
          radius: 36000,
          distanceFromPlanet: 69900000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Belinda',
          radius: 40300,
          distanceFromPlanet: 75300000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Puck',
          radius: 81000,
          distanceFromPlanet: 86000000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Caliban',
          radius: 49000,
          distanceFromPlanet: 7231000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Sycorax',
          radius: 75000,
          distanceFromPlanet: 12179000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Prospero',
          radius: 25000,
          distanceFromPlanet: 16256000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Setebos',
          radius: 24000,
          distanceFromPlanet: 17418000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Stephano',
          radius: 10000,
          distanceFromPlanet: 8004000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Trinculo',
          radius: 5000,
          distanceFromPlanet: 8504000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Francisco',
          radius: 6000,
          distanceFromPlanet: 4276000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Margaret',
          radius: 5500,
          distanceFromPlanet: 14345000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Ferdinand',
          radius: 6000,
          distanceFromPlanet: 20901000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Perdita',
          radius: 10000,
          distanceFromPlanet: 76417000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Mab',
          radius: 5000,
          distanceFromPlanet: 97736000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Cupid',
          radius: 5000,
          distanceFromPlanet: 74392000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        }
      ]
    },
    {
      name: 'Neptune',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-neptune.png',
        infoWindowContent: `Coming in at {{scaledDiameter}} wide Neptune is a little less than twice the size of a soccer ball. The
         farthest planet from The Sun is now orbiting from a distance of {{scaledDistance}}.`,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/neptune.png',
        didYouKnow: `Neptune has some of the highest observed wind speeds in the solar system. With no rocky surfaces to slow it down the
         winds on Neptune can reach up to 600 meters per second ( or around 1,342 mph / 2,160 kph ).`
      },
      distanceFromSun: 4497100000000,
      radius: 24622000,
      moons: [
        {
          name: 'Triton',
          radius: 1353400,
          distanceFromPlanet: 354800000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Nereid',
          radius: 170000,
          distanceFromPlanet: 5513000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Naiad',
          radius: 33000,
          distanceFromPlanet: 48227000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Thalassa',
          radius: 41000,
          distanceFromPlanet: 50075000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Despina',
          radius: 75000,
          distanceFromPlanet: 52526000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Galatea',
          radius: 88000,
          distanceFromPlanet: 61953000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Larissa',
          radius: 97000,
          distanceFromPlanet: 73548000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Proteus',
          radius: 210000,
          distanceFromPlanet: 117647000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Halimede',
          radius: 31000,
          distanceFromPlanet: 15728000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Psamathe',
          radius: 20000,
          distanceFromPlanet: 46695000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Sao',
          radius: 22000,
          distanceFromPlanet: 22422000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Laomedeia',
          radius: 21000,
          distanceFromPlanet: 23571000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'Neso',
          radius: 30000,
          distanceFromPlanet: 48387000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        },
        {
          name: 'S/2004 N 1',
          radius: 8000,
          distanceFromPlanet: 105283000,
          mapData: {
            marker: null,
            iconUrl: 'assets/map/map-icon-no-image.png',
            infoWindowContent: `{{scaledDiameter}}`,
            infoWindow: null
          }
        }
      ]
    }
  ],
  dwarfPlanets: [
    {
      name: 'Pluto',
      mapData: {
        marker: null,
        iconUrl: '/assets/map/map-icon-pluto.png',
        infoWindowContent: 'Former planet Pluto is now {{scaledDiameter}} wide and orbits The Sun from about {{scaledDistance}} away.',
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/pluto.png',
        didYouKnow: `Pluto, which has roughly the same surface area as Russia, has been
        <a href="https://www.nasa.gov/feature/new-horizons-top-10-pluto-pics" target="_blank">photographed in detail</a> only recently
        in July of 2015 by New Horizons. Before then the only images we had of Pluto were very low resolution and blurry.`
      },
      distanceFromSun: 6000000000000,
      radius: 1180000,
      moons: [/*I know Pluto has moons. I don't want to mess with it right now.*/]
    }
  ],
  satellites: [
    {
      name: 'Voyager 1',
      speed: 17260,
      mapData: {
        iconUrl: '/assets/map/map-icon-voyager-1.png',
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/voyager1.jpg',
        infoWindowContent: `Voyager 1, launched in September 1977, was one of two satellites sent on a
          <a href="https://en.wikipedia.org/wiki/Grand_Tour_program" target="_blank">Grand Tour</a> of the outer planets of our solar
           system. On August 25th, 2012 Voyager 1 became the first man made object to exit our solar system. In our scaled model it is
           currently {{scaledDistance}} away from the sun and traveling at a rate of {{scaledSpeed}}. Its communication dish is about 34
           nanometers wide which is roughly 1 / 3000th the width of a human hair.`,
        marker: null,
        didYouKnow: `On February 14th, 1990 the Voyager 1 satellite was on its way out of the solar system. At the request of
         of astronomer, author, and public figure Carl Sagan the satellite was commanded to turn around and take one last picture
         of the Earth. What came back was a picture of a tiny blue dot floating in a giant cosmic ocean, referred to as the
         Pale Blue Dot photograph. Sagan was moved by the significance of this picture and it inspired him to write
         <a href="https://www.youtube.com/watch?v=-pvxKdvuwIw" target="_blank">
          these words.
         </a>`
      },
      distanceFromSun: 21100000000000,
      distanceFromSunDate: moment([2018, 1, 2]),
      trajectoryType: SatelliteTrajectoryType.Away,
      launchDate: moment([1977, 9, 5])
    }
  ],
  infoBodies: [
    {
      name: 'Proxima Centauri',
      distanceFromSun: 39924000000000000,
      mapData: {
        marker: null,
        iconUrl: null,
        infoWindow: null,
        infoWindowImageUrl: '/assets/images/comparisons/earth-moon-sun-proxima.png',
        infoWindowContent: `The Sun's closest neighbor is a whopping {{scaledDistance}} away from The Sun. It can't even be placed on this
        map because that is about the same distance as the actual distance between the Earth and the Moon.`,
        didYouKnow: `The fastest speed a man made object has achieved so far is 58,536 km/h by New Horizons. If we scale that down to our
        model that is only traveling around 13 meters per day. Now imagine how long it would take to go to the actual Moon traveling at 13
        meters per day. This is why interstellar travel is not likely with our existing technology.`
      },
    }
  ]
}
