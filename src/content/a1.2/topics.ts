// A1.2 vocabulary — same format as ../a1.1/topics.ts. Topic keys (k) must be unique across all levels.
import type { Topic } from "../../lib/types";

export const TOPICS: Topic[] = [
{k:"transporte", t:"Medios de transporte", hr:"prijevoz, vozila, promet", mark:"blue", v:`
el medio de transporte | prijevozno sredstvo | 2026-10-06 | ej: ¿Qué medio de transporte usas? → Koje prijevozno sredstvo koristiš?
¿Cómo vas al trabajo? | Kako ideš na posao? | 2026-10-06
ir en coche | ići autom (en + prijevozno sredstvo) | 2026-10-06 | ej: Mañana vamos a la playa en coche. → Sutra idemo autom na plažu.
el coche | auto, automobil | 2026-10-06 | ej: Mi padre va al trabajo en coche. → Moj tata ide na posao autom.
la bicicleta = la bici | bicikl | 2026-10-06 | ej: Lola va a clase en bici. → Lola ide na nastavu biciklom.
el autobús = el bus | autobus | 2026-10-06 | ej: El autobús llega a las ocho. → Autobus stiže u osam.
el tren | vlak | 2026-10-06 | ej: Viajo a Madrid en tren. → Putujem u Madrid vlakom.
el avión | avion, zrakoplov | 2026-10-06 | ej: Voy a Barcelona en avión. → Idem u Barcelonu avionom.
el metro | metro, podzemna željeznica | 2026-10-06 | ej: En Madrid voy a todas partes en metro. → U Madridu svugdje idem metroom.
el tranvía | tramvaj | 2026-10-06 | ej: En Zagreb hay muchos tranvías azules. → U Zagrebu ima puno plavih tramvaja.
la motocicleta = la moto | motocikl, motor | 2026-10-06 | ej: Paco tiene una moto roja. → Paco ima crveni motor.
el camión | kamion | 2026-10-06 | ej: El camión de la mudanza está en la calle. → Kamion za selidbu je na ulici.
la furgoneta = la camioneta | kombi | 2026-10-06 | ej: Llevamos las cajas en una furgoneta. → Kutije vozimo u kombiju.
el helicóptero | helikopter | 2026-10-06 | ej: Hay un helicóptero encima del hospital. → Iznad bolnice je helikopter.
el patinete = la patineta | romobil | 2026-10-06 | ej: Muchos jóvenes van al trabajo en patinete. → Mnogi mladi idu na posao romobilom.
los patines | koturaljke, role | 2026-10-06 | ej: Mi hija va al parque en patines. → Moja kći ide u park na rolama.
el globo | balon (i balon na vrući zrak) | 2026-10-06 | ej: Viajar en globo es caro. → Putovati balonom je skupo.
a caballo | na konju | 2026-10-06 | ej: Mi abuelo va al pueblo a caballo. → Moj djed ide u selo na konju.
el conductor / la conductora | vozač / vozačica | 2026-10-06 | ej: El conductor del autobús es muy simpático. → Vozač autobusa je jako simpatičan.
conducir | voziti (auto) | 2026-10-06 | ej: No conduzco, voy en metro. → Ne vozim, idem metroom.
el tráfico | promet, gužva u prometu | 2026-10-06 | ej: Por la mañana hay mucho tráfico. → Ujutro je velika gužva u prometu.
la parada (de autobús) | (autobusna) stanica | 2026-10-06 | ej: La parada está delante de mi casa. → Stanica je ispred moje kuće.
la estación (de tren) | (željeznički) kolodvor; stanica metroa | 2026-10-06 | ej: La estación de tren está lejos del centro. → Kolodvor je daleko od centra.
el billete (de metro, de tren) | karta (za prijevoz) | 2026-10-06 | ej: Un billete de metro, por favor. → Jednu kartu za metro, molim.
la línea (de metro) | linija | 2026-10-06 | ej: Toma la línea dos del metro. → Uzmi liniju dva metroa.
`},
{k:"ciudad", t:"La ciudad y la mudanza", hr:"grad, kvart, selidba, nova rutina", mark:"green", v:`
la calle | ulica | 2026-10-06 | ej: Vivo en la calle Mayor. → Živim u ulici Mayor.
la avenida | avenija, široka ulica | 2026-10-06 | ej: El hotel está en una avenida muy grande. → Hotel je na jako velikoj aveniji.
la cafetería | kafić | 2026-10-06 | ej: Desayuno en una cafetería cerca de casa. → Doručkujem u kafiću blizu kuće.
la mudanza | selidba | 2026-10-06 | ej: Mañana es la mudanza y tengo muchas cajas. → Sutra je selidba i imam puno kutija.
mudarse | preseliti se | 2026-10-06 | ej: Lucía se muda a un piso nuevo. → Lucía se seli u novi stan.
la caja | kutija | 2026-10-06 | ej: Las cajas están en el salón. → Kutije su u dnevnom boravku.
¿Qué tal la mudanza? | Kako ide selidba? | 2026-10-06
todavía no | još ne | 2026-10-06 | ej: ¿Tienes todas las cajas? —Todavía no. → Imaš li sve kutije? — Još ne.
la rutina | rutina | 2026-10-06 | ej: Mi nueva rutina es muy tranquila. → Moja nova rutina je vrlo mirna.
ir a clase | ići na nastavu | 2026-10-06 | ej: Voy a clase los lunes y los miércoles. → Idem na nastavu ponedjeljkom i srijedom.
saber llegar | znati doći (do nekog mjesta) | 2026-10-06 | ej: ¿Sabéis llegar a mi casa? → Znate li doći do moje kuće?
dar la dirección | dati adresu | 2026-10-06 | ej: Te doy mi dirección: calle Mayor, cinco. → Dajem ti svoju adresu: ulica Mayor pet.
dar instrucciones | dati upute | 2026-10-06 | ej: El profesor da instrucciones para el juego. → Profesor daje upute za igru.
`}
];
