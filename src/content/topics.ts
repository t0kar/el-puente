// Vocabulary grouped by topic. One line per card:  español | hrvatski
// To mark material from the newest class add a 3rd field with the update id from updates.ts:
//   la camisa | košulja | 2026-10-07
// A new theme = a new object in TOPICS: {k:"key", t:"Título", hr:"opis", mark:"green"|"yellow"|"pink"|"blue", v:`...`}
import type { Topic } from "../lib/types";

export const TOPICS: Topic[] = [
{k:"saludos", t:"Saludos y presentaciones", hr:"pozdravi, upoznavanje", mark:"green", v:`
¡Hola! | Bok!
¡Buenos días! | Dobro jutro! / Dobar dan!
¿Qué tal? | Što ima?
¿Cómo estás? | Kako si?
¿Cómo está usted? | Kako ste?
Muy bien, gracias | Vrlo dobro, hvala
¡Genial! | Super!
¿Y tú? | A ti?
¿Cómo te llamas? | Kako se zoveš?
¿Cómo se llama usted? | Kako se zovete?
Me llamo... | Zovem se...
¿Cuál es tu nombre? | Koje je tvoje ime?
¿Cómo te apellidas? | Kako se prezivaš?
¿Cuál es tu apellido? | Koje je tvoje prezime?
¿De dónde eres? | Odakle si?
¿De dónde es usted? | Odakle ste?
Soy de... | Ja sam iz...
Mucho gusto | Drago mi je
encantado / encantada | drago mi je (oduševljen/a)
igualmente | također, isto tako
Este es... / Esta es... | Ovo je... (predstavljanje)
Le presento al señor... | Predstavljam vam gospodina...
el señor / la señora | gospodin / gospođa
¿Por qué aprendes español? | Zašto učiš španjolski?
Aprendo español porque... | Učim španjolski jer...
quiero viajar a España | želim putovati u Španjolsku
quiero conocer nuevas personas | želim upoznati nove ljude
¿Me das tu teléfono? | Mogu li dobiti tvoj broj?
¿Cuál es tu número de móvil? | Koji je tvoj broj mobitela?
¿Me das tu Insta? | Daš mi svoj Instagram?
la arroba | et (znak @)
el domicilio actual | trenutno prebivalište
`},
{k:"frases", t:"Frases útiles", hr:"korisne fraze i male riječi", mark:"green", v:`
¿Qué significa...? | Što znači...?
Por favor, espera | Molim te, pričekaj
Por favor, espere | Molim vas, pričekajte
¡Gracias por el consejo! | Hvala na savjetu!
¡Felicidades! | Čestitam!
¡Buen viaje! | Sretan put!
por supuesto | naravno
me alegro | veselim se, drago mi je
eso es todo | to je sve
no como nunca | nikad ne jedem
estoy bromeando | šalim se
casi lo olvido | skoro sam zaboravio
no me acuerdo | ne sjećam se
tengo vergüenza | sram me je
la vergüenza ajena | susramlje
tiene sentido | ima smisla
no cuenta | ne računa se
se nota | vidi se, primijeti se
desafortunadamente | nažalost
para terminar | za kraj
me encanta | obožavam
me gustaría probar... | volio bih probati...
soy pésimo en... | jako sam loš u...
mira | pogledaj
pero | ali
ahora | sada
entonces | onda, pa
como | kao
casi | skoro
tal vez = quizás | možda
igual | isto, jednako
simple | jednostavno
bastante | dosta
ningún | nijedan
aquello | ono
mismo / misma | isti / ista
algunos / algunas | neki / neke
ambos | oboje
más | plus, više
menos | minus, manje
sí | da
si | ako
Yo también | I ja
Yo tampoco | Ni ja
A mí también | I meni
A mí tampoco | Ni meni
`},
{k:"preguntas", t:"Preguntas", hr:"upitne riječi", mark:"green", v:`
¿Cuándo? | Kada?
¿Cuánto? | Koliko?
¿Con quién? | S kim?
¿Dónde? | Gdje?
¿De qué trata? | O čemu se radi?
¿Qué pides? | Što naručuješ?
¿Qué haces en tu tiempo libre? | Što radiš u slobodno vrijeme?
¿Qué hiciste el finde? | Što si radio za vikend?
¿A qué te dedicas? | Čime se baviš?
¿Cuál es tu profesión? | Koje je tvoje zanimanje?
¿Tiene hijos? | Ima li djece?
¿En qué tipo de vivienda vive? | U kakvom stanu živi?
¿Qué desayunas normalmente? | Što obično doručkuješ?
¿Cuál es tu desayuno favorito? | Koji je tvoj omiljeni doručak?
¿Cuál es tu plato favorito? | Koje je tvoje najdraže jelo?
¿Algo para beber? | Nešto za piće?
`},
{k:"familia", t:"Familia y relaciones", hr:"obitelj, prijatelji, bračno stanje", mark:"yellow", v:`
el padre / la madre | otac / majka
el hermano / la hermana | brat / sestra
el hijo / la hija | sin / kći
el abuelo / la abuela | djed / baka
mi abuelo | moj djed
el nieto / la nieta | unuk / unuka
el tío / la tía | stric, ujak / strina, teta
el primo / la prima | bratić / sestrična
los primos | bratići i sestrične
el sobrino / la sobrina | nećak / nećakinja
el esposo / la esposa | muž / žena
el marido = el esposo | muž
la mujer = la esposa | žena
el suegro / la suegra | svekar, punac / svekrva, punica
el cuñado / la cuñada | šogor / šogorica
el novio / la novia | dečko / cura
los novios | dečko i cura
la pareja | par, partner
prometido / prometida | zaručnik / zaručnica
casado / casada | oženjen / udana
soltero / soltera | neoženjen / neudana
divorciado / divorciada | razveden / razvedena
viudo / viuda | udovac / udovica
del primer matrimonio | iz prvog braka
los amigos | prijatelji
los vecinos | susjedi
los conocidos | poznanici
el compañero de piso | cimer
la gente | ljudi
Es tres años menor que su hermana | Tri godine je mlađi od sestre
el huésped / la huésped | gost / gošća
`},
{k:"profesiones", t:"Profesiones", hr:"zanimanja", mark:"yellow", v:`
el camarero / la camarera | konobar / konobarica
el profesor / la profesora | profesor / profesorica
el estudiante / la estudiante | student / studentica
el presidente / la presidenta | predsjednik / predsjednica
el economista / la economista | ekonomist / ekonomistica
el director de empresa | direktor firme
el cantante | pjevač
el jugador de baloncesto | košarkaš
el pintor | slikar
el actor / la actriz | glumac / glumica
el limpiador | čistač
el ama de casa | kućanica
el abogado | odvjetnik
el médico | liječnik
el maestro | učitelj
el taxista | taksist
el peluquero | frizer
el piloto | pilot
el dentista | zubar
el futbolista | nogometaš
el policía | policajac
el cocinero | kuhar
el periodista | novinar
el cartero | poštar
el cajero | blagajnik
el dependiente | prodavač (u trgovini)
el vendedor | prodavač
el bombero | vatrogasac
el entrenador | trener
el corredor | trkač
el delantero | napadač
la entrevista de trabajo | razgovor za posao
`},
{k:"nacionalidades", t:"Países y nacionalidades", hr:"države, nacionalnosti", mark:"yellow", v:`
el país | država
la ciudad | grad
mexicano / mexicana | Meksikanac / Meksikanka
francés / francesa | Francuz / Francuskinja
español / española | Španjolac / Španjolka
alemán / alemana | Nijemac / Njemica
canadiense | Kanađanin / Kanađanka
estadounidense | Amerikanac / Amerikanka
marroquí | Marokanac / Marokanka
croata | Hrvat / Hrvatica
belga | Belgijanac / Belgijanka
`},
{k:"describir", t:"Describir: carácter y estado", hr:"pridjevi, osjećaji, stanja", mark:"yellow", v:`
Estoy feliz cuando... | Sretan sam kada...
feliz | sretan / sretna
alegre | veseo
bien | dobro
mal | loše
cansado / cansada | umoran / umorna
descansado | odmoran
emocionado / emocionada | uzbuđen / uzbuđena
nervioso / nerviosa | nervozan / nervozna
decepcionado | razočaran
estar orgulloso | biti ponosan
estar aburrido | biti znuđen (dosađivati se)
ser aburrido | biti dosadan (karakter)
estar listo | biti spreman, gotov
ser listo | biti pametan
tengo sueño | pospan sam
tengo frío ≠ tengo calor | hladno mi je ≠ vruće mi je
estar sentado | sjediti
pequeño | mali
gordo | debeo
rubio | plavokos
joven | mlad
viejo / vieja | star / stara
rico | bogat (i ukusan)
ser rico ≠ ser pobre | biti bogat ≠ biti siromašan
peligroso / peligrosa | opasan / opasna
estricto / estricta | strog / stroga
tramposo | varalica
metiche | nametljivac, zabadalo
el genio | genij
borracho | pijan
verdadero | istinit
común | čest, zajednički
antiguo | star, drevan
largo | dug
un día largo | dug dan
lleno | pun
fácil ≠ difícil | lagano ≠ teško
insoportable | nepodnošljivo
`},
{k:"tiempo", t:"Números, hora y calendario", hr:"vrijeme, dani, godišnja doba", mark:"blue", v:`
¿Qué hora es? | Koliko je sati?
¿A qué hora...? | U koliko sati...?
en punto | točno (sati)
y cuarto | i četvrt
y media | i pol
menos cuarto | manje četvrt
el mediodía | podne
la medianoche | ponoć
de la mañana | ujutro
de la tarde | popodne
de la noche | navečer
por la mañana | ujutro (bez točnog sata)
la madrugada | zora, rano jutro
La clase empieza a las nueve | Nastava počinje u devet
La clase termina a las diez y cuarto | Nastava završava u deset i petnaest
desde las ocho hasta las cuatro | od osam do četiri
de ocho a cuatro | od osam do četiri
temprano = pronto | rano
tarde | kasno
llegar tarde | doći kasno, zakasniti
después | poslije
a veces | ponekad
de vez en cuando | s vremena na vrijeme
cada día | svaki dan
un rato | kratko, neko vrijeme
hace tres horas | prije tri sata
pasado mañana | prekosutra
de ayer | od jučer
el lunes | ponedjeljak
el martes | utorak
el miércoles | srijeda
el jueves | četvrtak
el viernes | petak
el sábado | subota
el domingo | nedjelja
el fin de semana (el finde) | vikend
la primavera | proljeće
el verano | ljeto
el otoño | jesen
el invierno | zima
las estaciones del año | godišnja doba
hace frío | hladno je
cien | sto
mil | tisuću
primero | prvi
segundo | drugi
tercero | treći
cuarto | četvrti
quinto | peti
sexto | šesti
séptimo | sedmi
octavo | osmi
noveno | deveti
décimo | deseti
`},
{k:"rutina", t:"La rutina diaria", hr:"dnevna rutina, povratni glagoli", mark:"pink", v:`
me levanto | ustajem
me ducho | tuširam se
me lavo los dientes | perem zube
me visto | oblačim se
desayuno | doručkujem
voy al trabajo | idem na posao
voy a la facultad | idem na fakultet
asisto a clases | pohađam nastavu
almuerzo | ručam
descanso | odmaram
cocino | kuham
ceno | večeram
me baño | kupam se
me acuesto | idem u krevet
duermo | spavam
levantarse | ustati se
despertarse | probuditi se
lavarse | oprati se
lavarse los dientes | prati zube
lavarse la cara | prati lice
ducharse | tuširati se
bañarse | kupati se
afeitarse | brijati se
peinarse | češljati se
maquillarse | šminkati se
vestirse | obući se
acostarse | leći (u krevet)
sentarse | sjesti
sentirse | osjećati se
casarse | vjenčati se
`},
{k:"ocio", t:"Tiempo libre y deporte", hr:"hobiji, sport, izlasci", mark:"pink", v:`
En mi tiempo libre... | U slobodno vrijeme...
quedo con amigos | nalazim se s prijateljima
quedar con amigos | družiti se s prijateljima
hago senderismo | planinarim
hablo español | pričam španjolski
enseño español | podučavam španjolski
como pizza | jedem pizzu
veo el mar | gledam more
corro | trčim
escucho música | slušam glazbu
estudio | učim
hago ejercicio en el gimnasio | vježbam u teretani
voy al cine | idem u kino
me gusta montar en bici | volim voziti bicikl
jugar al fútbol | igrati nogomet
el fútbol | nogomet
la cancha | igralište
el gimnasio | teretana
el equipo | tim, ekipa
el entrenamiento | trening
hacer deporte | baviti se sportom
los deportes de riesgo | adrenalinski sportovi
hacer natación | baviti se plivanjem
nadar | plivati
correr | trčati
caminar | hodati
pasear | šetati
a pie | pješice
bailar | plesati
cantar | pjevati
cantar en un coro | pjevati u zboru
tocar el piano | svirati klavir
tocar un instrumento | svirati instrument
la música | glazba
leer un libro | čitati knjigu
ver películas o series | gledati filmove ili serije
chatear | dopisivati se
ir de compras | ići u kupovinu
ir de excursión | ići na izlet
tomar algo | popiti nešto
la barbacoa | roštilj
el chisme | trač
el chiste | vic, šala
`},
{k:"casa", t:"La casa: habitaciones", hr:"stan, sobe, što se radi u njima", mark:"blue", v:`
el piso = el apartamento | stan
la vivienda | stan, mjesto stanovanja
el edificio | zgrada
el chalet adosado | kuća u nizu
la planta (del edificio) | kat
la planta baja | prizemlje
el ático | potkrovlje
En mi piso hay... | U mom stanu ima...
Mi piso tiene... | Moj stan ima...
la habitación | prostorija, soba
el salón | dnevni boravak
el dormitorio | spavaća soba
la cocina | kuhinja
el comedor | blagovaonica
el cuarto de baño | kupaonica
el aseo | WC
el balcón | balkon
la terraza | terasa
el garaje | garaža
el jardín | vrt
el patio | dvorište
el sótano | podrum
el pasillo | hodnik
el recibidor | predsoblje
el trastero | spremište
el cuarto de lavandería | praonica rublja
la pared | zid (u kući)
la puerta | vrata
la ventana | prozor
las vistas | pogled
la calefacción central | centralno grijanje
el aire acondicionado | klima uređaj
lavar los platos | prati suđe
lavar la ropa | prati rublje
planchar | peglati
limpiar | čistiti
tomar el sol | sunčati se
mirar la calle | gledati ulicu
aparcar el coche | parkirati auto
guardar cosas | spremati stvari
organizar cajas | organizirati kutije
cuidar las plantas | brinuti se za biljke
regar las plantas | zalijevati biljke
pasar de una habitación a otra | prelaziti iz sobe u sobu
`},
{k:"muebles", t:"Muebles y objetos de casa", hr:"namještaj, kuhinja, kupaonica", mark:"blue", v:`
el mueble | komad namještaja
el sofá | kauč
el sillón | fotelja
la mesa | stol
la mesita | stolić
la silla | stolica
el taburete | stolac
el puf | tabure
la estantería | polica za knjige
el estante | polica
la cómoda | komoda
el armario | ormar
el cajón | ladica
el zapatero | ormarić za cipele
la cama | krevet
el colchón | madrac
la almohada | jastuk
el cojín | ukrasni jastuk
la mesita de noche | noćni ormarić
la alfombra | tepih
las cortinas | zavjese
la lámpara | lampa
la luz | svjetlo
encender ≠ apagar | uključiti ≠ isključiti
el cuadro | slika
el marco de fotos | okvir za slike
el jarrón | vaza
el espejo | ogledalo
el reloj | sat
la planta | biljka
la televisión | televizor
el frigorífico = la nevera | hladnjak
el horno | pećnica
el microondas | mikrovalna
la vitrocerámica | staklokeramička ploča
el lavavajillas | perilica posuđa
el fregadero | sudoper
el grifo | slavina
el lavabo | umivaonik
la ducha | tuš
la bañera | kada
el inodoro = el váter | WC školjka
la toalla | ručnik
la tumbona | ležaljka
la llave | ključ
el paraguas | kišobran
las gafas = los lentes | naočale
las gafas de sol | sunčane naočale
el zapato | cipela
el gorro | zimska kapa
la gorra | šilterica
la bolsa | vrećica
el bolso | torba
la mochila | ruksak
`},
{k:"clase", t:"Clase y oficina", hr:"učionica, škola, računalo", mark:"blue", v:`
el aula | učionica
la pizarra | ploča
el proyector | projektor
el tablón de anuncios | oglasna ploča
la papelera | koš za smeće
el escritorio | radni stol
el ordenador | računalo
la computadora | kompjuter
el portátil | laptop
la pantalla | ekran
los altavoces | zvučnici
el libro | knjiga
el cuaderno | bilježnica
la página | stranica
el lápiz | olovka
el rotulador | marker
el estuche | pernica
la regla | ravnalo
el borrador | spužva, gumica
la goma de borrar | gumica za brisanje
el examen | ispit
aprobar el examen | proći ispit
el ejercicio | zadatak, vježba
el error | greška
el ejemplo | primjer
el instituto | gimnazija, srednja škola
leer en voz alta | čitati na glas
deletrear | slovkati
`},
{k:"lugar", t:"Dónde está: lugares y posición", hr:"prijedlozi mjesta, grad, smjer", mark:"blue", v:`
encima de | na (vrhu)
sobre | na
debajo de | ispod
entre | između
dentro de | unutar
fuera de | izvan
detrás de | iza
delante de | ispred
al lado | uz, pokraj
lejos ≠ cerca | daleko ≠ blizu
a la izquierda | lijevo
a la derecha | desno
el lugar | mjesto
el barrio | kvart
fuera de la ciudad | izvan grada
la panadería | pekara
la salida ≠ la entrada | izlaz ≠ ulaz
el muro | zid (vanjski)
las murallas | zidine
la cruz | križ
la tierra | zemlja
el mar | more
la playa de arena | pješčana plaža
la pradera | livada
la finca | imanje
`},
{k:"comida", t:"Comida y bebida", hr:"hrana, voće, piće, doručak", mark:"green", v:`
los alimentos = la comida | hrana
saludable | zdrav
el desayuno | doručak
el almuerzo | ručak
la cena | večera
el pan | kruh
el panecillo | pecivo
las tostadas | tost
el pan con mantequilla | kruh s maslacem
el pan con mermelada | kruh s marmeladom
los cereales | pahuljice
la proteína en polvo | proteinski prah
los huevos | jaja
el huevo cocido | kuhano jaje
el huevo frito | jaje na oko
el huevo revuelto | kajgana
el queso | sir
el jamón | šunka, pršut
el chorizo | kobasica (chorizo)
los embutidos | narezak (mesni)
el pollo | piletina
el cerdo | svinja
el hueso | kost
el pescado | riba (jelo)
los chipirones | male lignje
la hamburguesa | hamburger
el arroz | riža
la patata = la papa | krumpir
la sopa | juha
la fruta | voće
el plátano | banana
la cereza | višnja, trešnja
la sandía | lubenica
el melón | dinja
el melocotón | breskva
el aguacate | avokado
los arándanos | borovnice
la zanahoria | mrkva
la cebolla | luk
el ajo | češnjak
el diente de ajo | češanj češnjaka
los pimientos | paprike
el pepino | krastavac
la aceituna | maslina
el aceite de oliva | maslinovo ulje
el vinagre | ocat
la miel | med
el maní | kikiriki
la leche | mlijeko
la leche de vaca | kravlje mlijeko
el café con leche | kava s mlijekom
el cacao | kakao
el zumo = el jugo | sok
el zumo de naranja | sok od naranče
el batido | smoothie, frape
el agua mineral | mineralna voda
el refresco | gazirani sok
la cerveza | pivo
la pajita | slamka
delicioso | ukusno
asqueroso | odvratno
no está bueno | nije fino
grasoso | mastan
la sopa está caliente | juha je vruća
`},
{k:"restaurante", t:"En el restaurante", hr:"naručivanje, pribor, jela", mark:"green", v:`
¿Qué van a tomar de primero? | Što ćete za predjelo?
de segundo | za glavno jelo
de postre | za desert
para beber | za piće
para llevar | za van
¡Buen provecho! | Dobar tek!
¡Yo invito! | Ja častim!
la sopa de marisco | juha od plodova mora
la ensalada mixta | miješana salata
la tortilla de patatas | španjolska tortilja
la merluza al horno | pečeni oslić
el filete de pollo a la plancha | pileći file na žaru
el vino de la casa | kućno vino
el helado | sladoled
las natillas | puding (krema)
la tarta de queso | torta od sira
el arroz con leche | sutlijaš
el plato | tanjur
el vaso | čaša
la copa | čaša za vino
la taza | šalica
la jarra | vrč
la cuchara | žlica
la cucharilla | žličica
el tenedor | vilica
el cuchillo | nož
el mantel | stolnjak
la servilleta | salveta
el precio | cijena
`},
{k:"recetas", t:"Cocinar y recetas", hr:"kuhanje, recept, kuhinjski pribor", mark:"pink", v:`
la receta | recept
cocinar | kuhati
añadir | dodati
agregar = añadir | dodati
poner | staviti
retirar | izvaditi, povući
mezclar | miješati
mezclado | pomiješano
cortar | rezati
pelar | guliti
la batidora | blender, mikser
el rallador | ribež
la cucharadita | žličica (mjera)
`},
{k:"hotel", t:"Viajes y hotel", hr:"putovanje, hotel, plaćanje", mark:"blue", v:`
viajar | putovati
el equipaje | prtljaga
solo alojamiento | samo smještaj
media pensión | polupansion
pensión completa | puni pansion
todo incluido | all inclusive
la recepción | recepcija
el número de habitación | broj sobe
la tarjeta llave | kartica za sobu
el ascensor | lift
el minibar | minibar
la caja fuerte | sef
el servicio de habitaciones | posluga u sobu
la factura | račun
pagar | platiti
pagar en efectivo | platiti gotovinom
pagar con tarjeta | platiti karticom
`},
{k:"cuerpo", t:"Cuerpo y salud", hr:"tijelo, bol, bolest", mark:"pink", v:`
el brazo | ruka
la mano | šaka
el codo | lakat
duele | boli
me duele | boli me
enfermo / enferma | bolestan / bolesna
tiene fiebre | ima temperaturu
desmayarse | onesvijestiti se
`},
{k:"verbos", t:"Verbos útiles", hr:"glagoli koji nisu u drugim grupama", mark:"pink", v:`
trabajar | raditi
comer | jesti
vivir | živjeti
ser | biti (identitet)
tener | imati
ir | ići
salir | izaći
volver | vratiti se
repetir | ponoviti
dormir | spavati
escuchar | slušati
mirar | gledati
conocer | znati, upoznati
puedes | možeš
entiendo / entiendes | razumijem / razumiješ
almorzar | ručati
preferir | preferirati, više voljeti
saber | znati; imati okus
decir | reći
mentir | lagati
empezar | početi
empezar = comenzar | početi
montar | voziti (bicikl, konja)
borrar | izbrisati
jugar | igrati
abrir ≠ cerrar | otvoriti ≠ zatvoriti
esperar | čekati, očekivati
cambiar de | promijeniti
encontrar | naći
esconder | sakriti
abandonar | napustiti
huir | pobjeći
escapar | pobjeći (bijeg)
burlarse de | rugati se
dudar | sumnjati
la duda | nedoumica, sumnja
inventar | izmisliti
comprobar | provjeriti
pedir | moliti (za), naručiti
señalar | pokazati, označiti
lograr | uspjeti
conseguir | dobiti, postići
heredar | naslijediti
llamar la atención | privući pažnju
invitar | pozvati, častiti
repartir | podijeliti
sobornar | podmititi
el soborno | mito
a propósito | namjerno
`},
{k:"varios", t:"Varios: animales y más", hr:"životinje i ostale riječi", mark:"yellow", v:`
los gatos | mačke
el perro / la perra | pas / kuja
la vaca | krava
las hormigas | mravi
el fuego | vatra
la guerra | rat
el éxito | uspjeh
la vida | život
el algodón | pamuk
las preguntas íntimas | osobna pitanja
`}
];
