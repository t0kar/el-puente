// Vocabulary grouped by topic. One line per card:  español | hrvatski  + optional fields (in this order), each after " | ":
//   update id of the class it came from:  2026-10-07
//   level, only when harder than this course level (Ajustes → Expresiones avanzadas can hide it):  A2 | B1 | B2
//   example sentence:  ej: Frase en español. → Hrvatska rečenica.
//   la camisa | košulja | 2026-10-07 | ej: Paco lleva una camisa azul. → Paco nosi plavu košulju.
// A new theme = a new object in TOPICS: {k:"key", t:"Título", hr:"opis", mark:"green"|"yellow"|"pink"|"blue", v:`...`}
import type { Topic } from "../../lib/types";

export const TOPICS: Topic[] = [
{k:"saludos", t:"Saludos y presentaciones", hr:"pozdravi, upoznavanje", mark:"green", v:`
¡Hola! | Bok! | ej: ¡Hola, Lola! ¿Qué tal? → Bok, Lola! Što ima?
¡Buenos días! | Dobro jutro! / Dobar dan! | ej: ¡Buenos días! Un café con leche, por favor. → Dobar dan! Jednu kavu s mlijekom, molim.
¿Qué tal? | Što ima? | ej: ¿Qué tal el trabajo? → Kako je na poslu?
¿Cómo estás? | Kako si?
¿Cómo está usted? | Kako ste?
Muy bien, gracias | Vrlo dobro, hvala
¡Genial! | Super! | ej: ¿Vamos a la playa? ¡Genial! → Idemo na plažu? Super!
¿Y tú? | A ti? | ej: Estoy bien, ¿y tú? → Dobro sam, a ti?
¿Cómo te llamas? | Kako se zoveš?
¿Cómo se llama usted? | Kako se zovete?
Me llamo... | Zovem se... | ej: Me llamo Paco y soy de Zaragoza. → Zovem se Paco i iz Zaragoze sam.
¿Cuál es tu nombre? | Koje je tvoje ime?
¿Cómo te apellidas? | Kako se prezivaš?
¿Cuál es tu apellido? | Koje je tvoje prezime?
¿De dónde eres? | Odakle si?
¿De dónde es usted? | Odakle ste?
Soy de... | Ja sam iz... | ej: Soy de Croacia, de Zagreb. → Ja sam iz Hrvatske, iz Zagreba.
Mucho gusto | Drago mi je | ej: Soy Lola. —Mucho gusto, yo soy Paco. → Ja sam Lola. — Drago mi je, ja sam Paco.
encantado / encantada | drago mi je (oduševljen/a) | ej: Encantada, me llamo Lola. → Drago mi je, zovem se Lola.
igualmente | također, isto tako | ej: Mucho gusto. —Igualmente. → Drago mi je. — Također.
Este es... / Esta es... | Ovo je... (predstavljanje) | ej: Esta es Lola, mi amiga de Francia. → Ovo je Lola, moja prijateljica iz Francuske.
Le presento al señor... | Predstavljam vam gospodina... | ej: Le presento al señor Gómez, mi jefe. → Predstavljam vam gospodina Gómeza, mog šefa.
el señor / la señora | gospodin / gospođa | ej: La señora López es mi vecina. → Gospođa López je moja susjeda.
¿Por qué aprendes español? | Zašto učiš španjolski?
Aprendo español porque... | Učim španjolski jer... | ej: Aprendo español porque me gusta viajar. → Učim španjolski jer volim putovati.
quiero viajar a España | želim putovati u Španjolsku | ej: Quiero viajar a España en verano. → Želim ljeti putovati u Španjolsku.
quiero conocer gente nueva | želim upoznati nove ljude | ej: En Madrid quiero conocer gente nueva. → U Madridu želim upoznati nove ljude.
¿Me das tu teléfono? | Mogu li dobiti tvoj broj?
¿Cuál es tu número de móvil? | Koji je tvoj broj mobitela?
¿Me das tu Insta? | Daš mi svoj Instagram?
la arroba | et (znak @) | ej: Mi correo es paco arroba gmail punto com. → Moj mail je paco et gmail točka com.
el domicilio actual | trenutno prebivalište | A2 | ej: Escribe aquí tu domicilio actual. → Ovdje upiši svoje trenutno prebivalište.
`},
{k:"frases", t:"Frases útiles", hr:"korisne fraze i male riječi", mark:"green", v:`
¿Qué significa...? | Što znači...? | ej: ¿Qué significa «pulpo»? → Što znači «pulpo»?
Por favor, espera | Molim te, pričekaj
Por favor, espere | Molim vas, pričekajte
¡Gracias por el consejo! | Hvala na savjetu!
¡Felicidades! | Čestitam! | ej: ¡Felicidades, Lola! Hoy es tu cumpleaños. → Čestitam, Lola! Danas ti je rođendan.
¡Buen viaje! | Sretan put! | ej: ¿Te vas a Zaragoza? ¡Buen viaje! → Ideš u Zaragozu? Sretan put!
por supuesto | naravno | ej: ¿Me ayudas? —¡Por supuesto! → Pomažeš mi? — Naravno!
me alegro | drago mi je (zbog toga), veseli me | ej: Tengo un trabajo nuevo. —¡Me alegro! → Imam novi posao. — Drago mi je!
eso es todo | to je sve | ej: Un café y un cruasán. Eso es todo. → Jedna kava i kroasan. To je sve.
no como nunca | nikad ne jedem | ej: Yo no como nunca pulpo. → Ja nikad ne jedem hobotnicu.
estoy bromeando | šalim se | ej: ¡Tranquila, Lola, estoy bromeando! → Opusti se, Lola, šalim se!
casi lo olvido | skoro sam zaboravio | ej: ¡Ah, casi lo olvido! Mañana hay clase. → Ah, skoro sam zaboravio! Sutra je nastava.
no me acuerdo | ne sjećam se | ej: No me acuerdo de su nombre. → Ne sjećam se njegova imena.
tengo vergüenza | sram me je | ej: Tengo vergüenza de cantar en público. → Sram me je pjevati pred ljudima.
la vergüenza ajena | susramlje | B1 | ej: ¡Qué vergüenza ajena! → Kakvo susramlje!
tiene sentido | ima smisla | ej: Tu idea tiene sentido, Paco. → Tvoja ideja ima smisla, Paco.
no cuenta | ne računa se | ej: Es práctica, no cuenta para el examen. → To je vježba, ne računa se za ispit.
se nota | vidi se, primjećuje se | ej: Estás cansado, se nota. → Umoran si, vidi se.
desafortunadamente | nažalost | ej: Desafortunadamente, hoy no hay paella. → Nažalost, danas nema paelle.
para terminar | za kraj | ej: Para terminar, Paco prepara un postre. → Za kraj, Paco priprema desert.
me encanta | obožavam | ej: Me encanta la tortilla de Paco. → Obožavam Pacovu tortilju.
me gustaría probar... | volio bih probati... | ej: Me gustaría probar la paella de Paco. → Volio bih probati Pacovu paellu.
soy pésimo en... | jako sam loš u... | A2 | ej: Soy pésimo en matemáticas. → Jako sam loš u matematici.
mira | pogledaj | ej: ¡Mira, Paco está cocinando! → Pogledaj, Paco kuha!
pero | ali | ej: Me gusta el café, pero no el té. → Volim kavu, ali ne čaj.
ahora | sada | ej: Ahora estoy en casa. → Sada sam kod kuće.
entonces | onda, pa | ej: Entonces, ¿vamos al cine? → Onda, idemo u kino?
como | kao | ej: Lola habla español como una española. → Lola govori španjolski kao Španjolka.
casi | skoro | ej: Casi son las nueve. → Skoro je devet sati.
tal vez = quizás | možda | ej: Tal vez voy a la playa mañana. → Možda sutra idem na plažu.
igual | isto, jednako | ej: Tu móvil es igual que el mío. → Tvoj mobitel je isti kao moj.
simple | jednostavan, jednostavno | ej: La receta es muy simple. → Recept je vrlo jednostavan.
bastante | dosta | ej: Hablo español bastante bien. → Govorim španjolski dosta dobro.
ningún | nijedan | ej: Aquí no hay ningún restaurante. → Ovdje nema nijednog restorana.
aquello | ono | ej: ¿Qué es aquello? → Što je ono?
mismo / misma | isti / ista | ej: Paco y Lola tienen la misma edad. → Paco i Lola su iste dobi.
algunos / algunas | neki / neke | ej: Algunos amigos hablan español. → Neki prijatelji govore španjolski.
ambos | oba, obojica, oboje | A2 | ej: Tengo dos hermanos y ambos viven en Zagreb. → Imam dva brata i obojica žive u Zagrebu.
más | plus, više | ej: Paco tiene más brazos que Lola. → Paco ima više krakova nego Lola.
menos | minus, manje | ej: Diez menos tres son siete. → Deset minus tri je sedam.
sí | da | ej: ¿Eres croata? —Sí, soy de Split. → Jesi li Hrvat? — Da, iz Splita sam.
si | ako | ej: Si llueve, no voy a la playa. → Ako pada kiša, ne idem na plažu.
Yo también | I ja | ej: Soy de Zagreb. —Yo también. → Ja sam iz Zagreba. — I ja.
Yo tampoco | Ni ja | ej: No hablo alemán. —Yo tampoco. → Ne govorim njemački. — Ni ja.
A mí también | I meni | ej: Me gusta la playa. —A mí también. → Sviđa mi se plaža. — I meni.
A mí tampoco | Ni meni | ej: No me gusta el frío. —A mí tampoco. → Ne sviđa mi se hladnoća. — Ni meni.
`},
{k:"preguntas", t:"Preguntas", hr:"upitne riječi", mark:"green", v:`
¿Cuándo? | Kada? | ej: ¿Cuándo es tu cumpleaños? → Kada ti je rođendan?
¿Cuánto? | Koliko? | ej: ¿Cuánto cuesta el café? → Koliko košta kava?
¿Con quién? | S kim? | ej: ¿Con quién vives? → S kim živiš?
¿Dónde? | Gdje? | ej: ¿Dónde vive Paco? —En Zaragoza. → Gdje živi Paco? — U Zaragozi.
¿De qué trata? | O čemu se radi? | A2 | ej: ¿De qué trata la película? → O čemu se radi u filmu?
¿Qué pides? | Što naručuješ?
¿Qué haces en tu tiempo libre? | Što radiš u slobodno vrijeme?
¿Qué hiciste el finde? | Što si radio za vikend? | A2
¿A qué te dedicas? | Čime se baviš?
¿Cuál es tu profesión? | Koje je tvoje zanimanje?
¿Tiene hijos? | Ima li djece? (on/ona) = Imate li djece? (usted)
¿En qué tipo de vivienda vive? | U kakvom stanu ili kući živi? (on/ona; usted: živite)
¿Qué desayunas normalmente? | Što obično doručkuješ?
¿Cuál es tu desayuno favorito? | Koji je tvoj omiljeni doručak?
¿Cuál es tu plato favorito? | Koje je tvoje najdraže jelo?
¿Algo para beber? | Nešto za piće?
`},
{k:"familia", t:"Familia y relaciones", hr:"obitelj, prijatelji, bračno stanje", mark:"yellow", v:`
el padre / la madre | otac / majka | ej: La madre de Lola vive en París. → Lolina majka živi u Parizu.
el hermano / la hermana | brat / sestra | ej: Tengo una hermana y dos hermanos. → Imam jednu sestru i dva brata.
el hijo / la hija | sin / kći | ej: Mi hija tiene cinco años. → Moja kći ima pet godina.
el abuelo / la abuela | djed / baka | ej: Mi abuela cocina muy bien. → Moja baka jako dobro kuha.
mi abuelo | moj djed | ej: Mi abuelo tiene ochenta años. → Moj djed ima osamdeset godina.
el nieto / la nieta | unuk / unuka | ej: Mi abuelo juega con su nieta. → Moj djed se igra sa svojom unukom.
el tío / la tía | stric, ujak, tetak / teta, strina, ujna | ej: Mi tía vive en Barcelona. → Moja teta živi u Barceloni.
el primo / la prima | bratić / sestrična | ej: Mi prima es francesa, como Lola. → Moja sestrična je Francuskinja, kao Lola.
los primos | bratići i sestrične | ej: Mis primos viven en Sevilla. → Moji bratići i sestrične žive u Sevilli.
el sobrino / la sobrina | nećak / nećakinja | ej: Mi sobrino tiene tres años. → Moj nećak ima tri godine.
el esposo / la esposa | suprug / supruga | ej: La esposa de Juan es médica. → Juanova supruga je liječnica.
el marido = el esposo | muž | ej: Mi marido es de Zagreb. → Moj muž je iz Zagreba.
la mujer = la esposa | žena, supruga | ej: Mi mujer habla francés. → Moja žena govori francuski.
el suegro / la suegra | svekar, punac / svekrva, punica | ej: Mi suegra prepara una paella fantástica. → Moja punica radi fantastičnu paellu.
el cuñado / la cuñada | šogor / šogorica | ej: Mi cuñado juega al fútbol. → Moj šogor igra nogomet.
el novio / la novia | dečko / cura | ej: Lola tiene novio en Madrid. → Lola ima dečka u Madridu.
los novios | dečko i cura; mladenci | ej: Los novios van al cine. → Dečko i cura idu u kino.
la pareja | par, partner | ej: Mi pareja se llama Ana. → Moja partnerica se zove Ana.
prometido / prometida | zaručnik / zaručnica | ej: Mi prometido es cocinero. → Moj zaručnik je kuhar.
casado / casada | oženjen / udana | ej: Estoy casada y tengo dos hijos. → Udana sam i imam dvoje djece.
soltero / soltera | neoženjen / neudana | ej: Mi hermano está soltero. → Moj brat je neoženjen.
divorciado / divorciada | razveden / razvedena | ej: Mis padres están divorciados. → Moji roditelji su razvedeni.
viudo / viuda | udovac / udovica | ej: Mi abuela es viuda. → Moja baka je udovica.
del primer matrimonio | iz prvog braka | A2 | ej: Tiene dos hijos del primer matrimonio. → Ima dvoje djece iz prvog braka.
los amigos | prijatelji | ej: Los sábados quedo con mis amigos. → Subotom se nalazim s prijateljima.
los vecinos | susjedi | ej: Mis vecinos son muy simpáticos. → Moji susjedi su jako dragi.
los conocidos | poznanici | ej: No son amigos, son conocidos. → Nisu prijatelji, nego poznanici.
el compañero de piso | cimer | ej: Mi compañero de piso es italiano. → Moj cimer je Talijan.
la gente | ljudi | ej: La gente de Zaragoza es muy simpática. → Ljudi u Zaragozi su jako dragi.
Es tres años menor que su hermana | Tri godine je mlađi od sestre
el huésped / la huésped | gost / gošća | A2 | ej: Esta semana tenemos un huésped en casa. → Ovaj tjedan imamo gosta u kući.
`},
{k:"profesiones", t:"Profesiones", hr:"zanimanja", mark:"yellow", v:`
el camarero / la camarera | konobar / konobarica | ej: El camarero trae la paella. → Konobar donosi paellu.
el profesor / la profesora | profesor / profesorica | ej: Mi profesora de español es de Madrid. → Moja profesorica španjolskog je iz Madrida.
el estudiante / la estudiante | student / studentica | ej: Soy estudiante de medicina. → Student sam medicine.
el presidente / la presidenta | predsjednik / predsjednica | ej: La presidenta habla en la tele. → Predsjednica govori na televiziji.
el economista / la economista | ekonomist / ekonomistica | ej: Mi madre es economista en un banco. → Moja majka je ekonomistica u banci.
el director de empresa | direktor tvrtke | ej: Mi padre es director de empresa. → Moj otac je direktor tvrtke.
el cantante | pjevač | ej: Mi hermano es cantante en un grupo. → Moj brat je pjevač u bendu.
el jugador de baloncesto | košarkaš | ej: Mi primo es jugador de baloncesto. → Moj bratić je košarkaš.
el pintor | slikar | ej: Picasso es un pintor muy famoso. → Picasso je jako poznat slikar.
el actor / la actriz | glumac / glumica | ej: Penélope Cruz es una actriz española. → Penélope Cruz je španjolska glumica.
el limpiador | čistač | ej: El limpiador trabaja por la noche. → Čistač radi noću.
el ama de casa | kućanica (ženski rod, ali: el ama) | ej: Mi madre es ama de casa. → Moja majka je kućanica.
el abogado | odvjetnik | ej: Mi hermana es abogada. → Moja sestra je odvjetnica.
el médico | liječnik | ej: El médico trabaja en el hospital. → Liječnik radi u bolnici.
el maestro | učitelj (u osnovnoj školi) | ej: El maestro enseña a los niños. → Učitelj podučava djecu.
el taxista | taksist | ej: El taxista conoce bien la ciudad. → Taksist dobro poznaje grad.
el peluquero | frizer | ej: Los sábados voy al peluquero. → Subotom idem frizeru.
el piloto | pilot | ej: El piloto habla inglés y español. → Pilot govori engleski i španjolski.
el dentista | zubar | ej: Hoy voy al dentista. → Danas idem zubaru.
el futbolista | nogometaš | ej: Mi hijo quiere ser futbolista. → Moj sin želi biti nogometaš.
el policía | policajac (la policía = policija) | ej: El policía está en la calle. → Policajac je na ulici.
el cocinero | kuhar | ej: Paco es cocinero en Zaragoza. → Paco je kuhar u Zaragozi.
el periodista | novinar | ej: Lola es periodista en París. → Lola je novinarka u Parizu.
el cartero | poštar | ej: El cartero llega a las diez. → Poštar dolazi u deset.
el cajero | blagajnik | ej: La cajera del supermercado es muy simpática. → Blagajnica u supermarketu je jako draga.
el dependiente | prodavač (u trgovini) | ej: El dependiente es muy amable. → Prodavač je vrlo ljubazan.
el vendedor | prodavač (općenito) | ej: El vendedor de fruta grita en el mercado. → Prodavač voća viče na tržnici.
el bombero | vatrogasac | ej: El bombero apaga el fuego. → Vatrogasac gasi vatru.
el entrenador | trener | ej: El entrenador habla con el equipo. → Trener razgovara s momčadi.
el corredor | trkač | ej: El corredor llega primero. → Trkač stiže prvi.
el delantero | napadač | A2 | ej: El delantero marca un gol. → Napadač zabija gol.
la entrevista de trabajo | razgovor za posao | ej: Mañana tengo una entrevista de trabajo. → Sutra imam razgovor za posao.
`},
{k:"nacionalidades", t:"Países y nacionalidades", hr:"države, nacionalnosti", mark:"yellow", v:`
el país | država, zemlja | ej: España es un país muy bonito. → Španjolska je jako lijepa zemlja.
la ciudad | grad | ej: Zaragoza es la ciudad de Paco. → Zaragoza je Pacov grad.
mexicano / mexicana | Meksikanac / Meksikanka | ej: Frida es mexicana. → Frida je Meksikanka.
francés / francesa | Francuz / Francuskinja | ej: Lola es francesa, de París. → Lola je Francuskinja, iz Pariza.
español / española | Španjolac / Španjolka | ej: Paco es español, de Zaragoza. → Paco je Španjolac, iz Zaragoze.
alemán / alemana | Nijemac / Njemica | ej: Mi vecino es alemán. → Moj susjed je Nijemac.
canadiense | Kanađanin / Kanađanka | ej: Mi profesora es canadiense. → Moja profesorica je Kanađanka.
estadounidense | Amerikanac / Amerikanka | ej: Mi cuñado es estadounidense, de Texas. → Moj šogor je Amerikanac, iz Teksasa.
marroquí | Marokanac / Marokanka | ej: Mi amigo Ahmed es marroquí. → Moj prijatelj Ahmed je Marokanac.
croata | Hrvat / Hrvatica | ej: Soy croata, de Zagreb. → Ja sam Hrvat, iz Zagreba.
belga | Belgijanac / Belgijanka | ej: Mi jefe es belga. → Moj šef je Belgijanac.
`},
{k:"describir", t:"Describir: carácter y estado", hr:"pridjevi, osjećaji, stanja", mark:"yellow", v:`
Estoy feliz cuando... | Sretan sam kada... | ej: Estoy feliz cuando hace sol. → Sretan sam kad je sunčano.
feliz | sretan / sretna | ej: Paco está muy feliz hoy. → Paco je danas jako sretan.
alegre | veseo | ej: Lola es una persona muy alegre. → Lola je vrlo vesela osoba.
bien | dobro | ej: Hoy estoy muy bien. → Danas sam jako dobro.
mal | loše | ej: Paco cocina mal la pasta. → Paco loše kuha tjesteninu.
cansado / cansada | umoran / umorna | ej: Estoy muy cansada después del trabajo. → Jako sam umorna nakon posla.
descansado | odmoran | ej: Después de las vacaciones estoy descansado. → Nakon godišnjeg odmora sam odmoran.
emocionado / emocionada | uzbuđen / uzbuđena | ej: Lola está emocionada por el viaje. → Lola je uzbuđena zbog putovanja.
nervioso / nerviosa | nervozan / nervozna | ej: Estoy nervioso antes del examen. → Nervozan sam prije ispita.
decepcionado | razočaran | A2 | ej: Paco está decepcionado con su paella. → Paco je razočaran svojom paellom.
estar orgulloso | biti ponosan | A2 | ej: Estoy orgulloso de mi hija. → Ponosan sam na svoju kćer.
estar aburrido | dosađivati se (biti znuđen) | ej: Estoy aburrido en casa. → Dosađujem se kod kuće.
ser aburrido | biti dosadan (karakter) | ej: Esta película es muy aburrida. → Ovaj film je jako dosadan.
estar listo | biti spreman, gotov | ej: Paco, ¿la paella está lista? → Paco, je li paella gotova?
ser listo | biti pametan | ej: Lola es muy lista. → Lola je jako pametna.
tengo sueño | pospan sam | ej: Son las doce y tengo sueño. → Dvanaest je sati i pospan sam.
tengo frío ≠ tengo calor | hladno mi je ≠ vruće mi je | ej: En invierno siempre tengo frío. → Zimi mi je uvijek hladno.
estar sentado | sjediti | ej: Paco está sentado en el sofá. → Paco sjedi na kauču.
pequeño | mali | ej: Mi piso es pequeño. → Moj stan je mali.
gordo | debeo | ej: El gato de Lola es muy gordo. → Lolin mačak je jako debeo.
rubio | plavokos | ej: Mi hermano es rubio. → Moj brat je plavokos.
joven | mlad | ej: Paco es joven y simpático. → Paco je mlad i simpatičan.
viejo / vieja | star / stara | ej: Mi coche es muy viejo. → Moj auto je jako star.
rico | bogat; ukusan (o hrani) | ej: ¡La paella de Paco está muy rica! → Pacova paella je jako ukusna!
ser rico ≠ ser pobre | biti bogat ≠ biti siromašan | ej: Mi tío es rico, pero no es feliz. → Moj ujak je bogat, ali nije sretan.
peligroso / peligrosa | opasan / opasna | ej: Este barrio es peligroso de noche. → Ovaj kvart je opasan noću.
estricto / estricta | strog / stroga | ej: Mi profesora es muy estricta. → Moja profesorica je vrlo stroga.
tramposo | varalica | A2 | ej: ¡No juego contigo, eres un tramposo! → Ne igram s tobom, ti si varalica!
metiche | nametljivac, zabadalo (Lat. Amerika; u Španjolskoj: entrometido) | B1 | ej: Mi vecina es muy metiche. → Moja susjeda gura nos u sve.
el genio | genij | ej: ¡Paco, eres un genio de la cocina! → Paco, ti si genij u kuhinji!
borracho | pijan | ej: Después de la fiesta, mi amigo está borracho. → Nakon zabave moj je prijatelj pijan.
verdadero | istinit, pravi | ej: Es una historia verdadera. → To je istinita priča.
común | čest, zajednički | ej: García es un apellido muy común en España. → García je vrlo često prezime u Španjolskoj.
antiguo | star, drevan | ej: Zaragoza es una ciudad muy antigua. → Zaragoza je vrlo star grad.
largo | dug | ej: Lola tiene el pelo largo. → Lola ima dugu kosu.
un día largo | dug dan | ej: Mañana tengo un día largo. → Sutra imam dug dan.
lleno | pun | ej: El restaurante de Paco está lleno. → Pacov restoran je pun.
fácil ≠ difícil | lak ≠ težak | ej: El español es fácil, ¡el croata es difícil! → Španjolski je lak, hrvatski je težak!
insoportable | nepodnošljiv / nepodnošljiva | A2 | ej: El calor en agosto es insoportable. → Vrućina u kolovozu je nepodnošljiva.
`},
{k:"tiempo", t:"Números, hora y calendario", hr:"vrijeme, dani, godišnja doba", mark:"blue", v:`
¿Qué hora es? | Koliko je sati?
¿A qué hora...? | U koliko sati...? | ej: ¿A qué hora cenas? → U koliko sati večeraš?
en punto | točno (sati) | ej: Son las tres en punto. → Točno je tri sata.
y cuarto | i četvrt | ej: Son las dos y cuarto. → Dva je i četvrt.
y media | i pol | ej: Paco cena a las nueve y media. → Paco večera u devet i pol.
menos cuarto | četvrt do (doslovno: manje četvrt) | ej: Son las ocho menos cuarto. → Četvrt je do osam.
el mediodía | podne | ej: Comemos al mediodía. → Ručamo u podne.
la medianoche | ponoć | ej: Lola vuelve a casa a medianoche. → Lola se vraća kući u ponoć.
de la mañana | ujutro (uz točan sat) | ej: Me levanto a las siete de la mañana. → Ustajem u sedam ujutro.
de la tarde | popodne | ej: Trabajo hasta las cinco de la tarde. → Radim do pet popodne.
de la noche | navečer | ej: Ceno a las nueve de la noche. → Večeram u devet navečer.
por la mañana | ujutro (bez točnog sata) | ej: Por la mañana bebo café con leche. → Ujutro pijem kavu s mlijekom.
la madrugada | rani sati iza ponoći, zora | ej: Llego a casa a las tres de la madrugada. → Dolazim kući u tri iza ponoći.
La clase empieza a las nueve | Nastava počinje u devet
La clase termina a las diez y cuarto | Nastava završava u deset i petnaest
desde las ocho hasta las cuatro | od osam do četiri (duži oblik) | ej: Trabajo desde las ocho hasta las cuatro. → Radim od osam do četiri.
de ocho a cuatro | od osam do četiri (kraći oblik) | ej: La tienda abre de ocho a cuatro. → Trgovina radi od osam do četiri.
temprano = pronto | rano | ej: Mañana me levanto temprano. → Sutra rano ustajem.
tarde | kasno | ej: Los domingos me levanto tarde. → Nedjeljom kasno ustajem.
llegar tarde | doći kasno, zakasniti | ej: Siempre llego tarde a clase. → Uvijek kasnim na nastavu.
después | poslije | ej: Primero trabajo y después voy al gimnasio. → Prvo radim, a poslije idem u teretanu.
a veces | ponekad | ej: A veces como en un restaurante. → Ponekad jedem u restoranu.
de vez en cuando | s vremena na vrijeme | ej: De vez en cuando voy al cine. → S vremena na vrijeme idem u kino.
cada día | svaki dan | ej: Paco cocina cada día. → Paco kuha svaki dan.
un rato | kratko, neko vrijeme | ej: Descanso un rato en el sofá. → Malo se odmaram na kauču.
hace tres horas | prije tri sata | A2 | ej: Paco comió hace tres horas. → Paco je jeo prije tri sata.
pasado mañana | prekosutra | ej: Pasado mañana voy a Zaragoza. → Prekosutra idem u Zaragozu.
de ayer | jučerašnji, od jučer | ej: Este pan es de ayer. → Ovaj kruh je od jučer.
el lunes | ponedjeljak | ej: El lunes tengo clase de español. → U ponedjeljak imam sat španjolskog.
el martes | utorak | ej: El martes voy al gimnasio. → U utorak idem u teretanu.
el miércoles | srijeda | ej: El miércoles Paco cocina paella. → U srijedu Paco kuha paellu.
el jueves | četvrtak | ej: El jueves quedo con amigos. → U četvrtak se nalazim s prijateljima.
el viernes | petak | ej: El viernes por la noche salgo con amigos. → U petak navečer izlazim s prijateljima.
el sábado | subota | ej: El sábado voy al mercado. → U subotu idem na tržnicu.
el domingo | nedjelja | ej: El domingo como con mi familia. → U nedjelju ručam s obitelji.
el fin de semana (el finde) | vikend | ej: ¿Qué haces el fin de semana? → Što radiš za vikend?
la primavera | proljeće | ej: En primavera hay muchas flores. → U proljeće ima puno cvijeća.
el verano | ljeto | ej: En verano vamos a la playa. → Ljeti idemo na plažu.
el otoño | jesen | ej: En otoño llueve mucho. → U jesen pada puno kiše.
el invierno | zima | ej: En invierno bebo mucho chocolate caliente. → Zimi pijem puno tople čokolade.
las estaciones del año | godišnja doba | ej: ¿Cuál es tu estación del año favorita? → Koje je tvoje omiljeno godišnje doba?
hace frío | hladno je | ej: Hoy hace mucho frío. → Danas je jako hladno.
cien | sto | ej: Mi abuela tiene cien años. → Moja baka ima sto godina.
mil | tisuća | ej: El móvil cuesta mil euros. → Mobitel košta tisuću eura.
primero | prvi | ej: Es mi primer día de clase. → To je moj prvi dan nastave.
segundo | drugi | ej: El segundo plato es pescado. → Drugo jelo je riba.
tercero | treći | ej: Paco vive en el tercer piso. → Paco živi na trećem katu.
cuarto | četvrti | ej: Hoy es mi cuarto día en Madrid. → Danas mi je četvrti dan u Madridu.
quinto | peti | ej: Es el quinto café de hoy. → Ovo mi je danas peta kava.
sexto | šesti | ej: Paco es el sexto de ocho hermanos. → Paco je šesti od osmero braće i sestara.
séptimo | sedmi | ej: Lola vive en el séptimo piso. → Lola živi na sedmom katu.
octavo | osmi | ej: Es la octava vez que veo esta película. → Ovaj film gledam već osmi put.
noveno | deveti | ej: Septiembre es el noveno mes del año. → Rujan je deveti mjesec u godini.
décimo | deseti | ej: Mi hijo celebra su décimo cumpleaños. → Moj sin slavi deseti rođendan.
`},
{k:"rutina", t:"La rutina diaria", hr:"dnevna rutina, povratni glagoli", mark:"pink", v:`
me levanto | ustajem | ej: Me levanto a las siete. → Ustajem u sedam.
me ducho | tuširam se | ej: Me ducho por la mañana. → Tuširam se ujutro.
me lavo los dientes | perem zube | ej: Me lavo los dientes después de comer. → Perem zube nakon ručka.
me visto | oblačim se | ej: Me visto rápido y salgo. → Brzo se oblačim i izlazim.
desayuno | doručkujem | ej: Desayuno tostadas con tomate. → Doručkujem tost s rajčicom.
voy al trabajo | idem na posao | ej: Voy al trabajo en autobús. → Na posao idem autobusom.
voy a la facultad | idem na fakultet | ej: Por la mañana voy a la facultad. → Ujutro idem na fakultet.
asisto a clases | pohađam nastavu | ej: Asisto a clases de español los martes. → Utorkom pohađam nastavu španjolskog.
almuerzo | ručam | ej: Almuerzo a las dos con mis compañeros. → Ručam u dva s kolegama.
descanso | odmaram se | ej: Después de comer, descanso un poco. → Nakon ručka se malo odmaram.
cocino | kuham | ej: Cocino pasta para mis amigos. → Kuham tjesteninu za prijatelje.
ceno | večeram | ej: Ceno a las nueve, como en España. → Večeram u devet, kao u Španjolskoj.
me baño | kupam se | ej: En verano me baño en el mar. → Ljeti se kupam u moru.
me acuesto | idem u krevet | ej: Me acuesto a las once. → U krevet idem u jedanaest.
duermo | spavam | ej: Duermo ocho horas cada noche. → Spavam osam sati svake noći.
levantarse | ustati, ustajati | ej: No me gusta levantarme temprano. → Ne volim rano ustajati.
despertarse | probuditi se | ej: Me despierto a las seis y media. → Budim se u šest i pol.
lavarse | oprati se | ej: Antes de comer, me lavo las manos. → Prije jela perem ruke.
lavarse los dientes | prati zube | ej: Mis hijos se lavan los dientes antes de dormir. → Moja djeca peru zube prije spavanja.
lavarse la cara | umiti se, prati lice | ej: Me lavo la cara con agua fría. → Umivam se hladnom vodom.
ducharse | tuširati se | ej: Lola se ducha por la noche. → Lola se tušira navečer.
bañarse | kupati se | ej: Los niños se bañan en la piscina. → Djeca se kupaju u bazenu.
afeitarse | brijati se | ej: Mi padre se afeita cada mañana. → Moj otac se brije svako jutro.
peinarse | češljati se | ej: Lola se peina delante del espejo. → Lola se češlja ispred ogledala.
maquillarse | šminkati se | ej: Mi hermana se maquilla en el baño. → Moja sestra se šminka u kupaonici.
vestirse | obući se | ej: Los niños se visten solos. → Djeca se sama oblače.
acostarse | leći (u krevet) | ej: ¿A qué hora te acuestas? → U koliko sati ideš spavati?
sentarse | sjesti | ej: Paco se sienta al lado de Lola. → Paco sjeda pokraj Lole.
sentirse | osjećati se | ej: Hoy me siento muy bien. → Danas se osjećam jako dobro.
casarse | vjenčati se | ej: Mi hermana se casa en junio. → Moja se sestra udaje u lipnju.
`},
{k:"ocio", t:"Tiempo libre y deporte", hr:"hobiji, sport, izlasci", mark:"pink", v:`
En mi tiempo libre... | U slobodno vrijeme... | ej: En mi tiempo libre leo y paseo. → U slobodno vrijeme čitam i šetam.
quedo con amigos | nalazim se s prijateljima | ej: Los viernes quedo con amigos en un bar. → Petkom se nalazim s prijateljima u baru.
quedar con amigos | družiti se s prijateljima | ej: Me gusta quedar con amigos para cenar. → Volim se s prijateljima naći na večeri.
hago senderismo | planinarim | ej: Los domingos hago senderismo en la montaña. → Nedjeljom planinarim.
hablo español | govorim španjolski | ej: Hablo español con Paco. → Govorim španjolski s Pacom.
enseño español | podučavam španjolski | ej: Enseño español a mis amigos croatas. → Podučavam španjolski svoje hrvatske prijatelje.
como pizza | jedem pizzu | ej: Los viernes como pizza en casa. → Petkom doma jedem pizzu.
veo el mar | vidim more | ej: Desde mi balcón veo el mar. → S balkona vidim more.
corro | trčim | ej: Corro en el parque por la mañana. → Ujutro trčim u parku.
escucho música | slušam glazbu | ej: Escucho música en el autobús. → Slušam glazbu u autobusu.
estudio | učim | ej: Estudio español por la noche. → Navečer učim španjolski.
hago ejercicio en el gimnasio | vježbam u teretani | ej: Hago ejercicio en el gimnasio tres veces por semana. → Vježbam u teretani tri puta tjedno.
voy al cine | idem u kino | ej: Los sábados voy al cine con Lola. → Subotom idem u kino s Lolom.
me gusta montar en bici | volim voziti bicikl | ej: Me gusta montar en bici por la ciudad. → Volim voziti bicikl po gradu.
jugar al fútbol | igrati nogomet | ej: Mis hijos juegan al fútbol los sábados. → Moja djeca subotom igraju nogomet.
el fútbol | nogomet | ej: A Paco le gusta mucho el fútbol. → Paco jako voli nogomet.
la cancha | igralište, teren (u Španjolskoj češće: la pista) | A2 | ej: Jugamos al baloncesto en la cancha del barrio. → Igramo košarku na igralištu u kvartu.
el gimnasio | teretana | ej: El gimnasio está cerca de mi casa. → Teretana je blizu moje kuće.
el equipo | tim, ekipa | ej: Mi equipo favorito es el Real Zaragoza. → Moja omiljena momčad je Real Zaragoza.
el entrenamiento | trening | ej: El entrenamiento empieza a las seis. → Trening počinje u šest.
hacer deporte | baviti se sportom | ej: Lola hace deporte todos los días. → Lola se svaki dan bavi sportom.
los deportes de riesgo | adrenalinski sportovi | A2 | ej: A Paco no le gustan los deportes de riesgo. → Paco ne voli adrenalinske sportove.
hacer natación | baviti se plivanjem | ej: Hago natación dos veces por semana. → Dvaput tjedno idem na plivanje.
nadar | plivati | ej: Paco nada muy bien, ¡claro! → Paco jako dobro pliva, naravno!
correr | trčati | ej: Me gusta correr por la playa. → Volim trčati po plaži.
caminar | hodati | ej: Camino una hora cada día. → Svaki dan hodam sat vremena.
pasear | šetati | ej: Los domingos paseamos por el parque. → Nedjeljom šećemo po parku.
a pie | pješice | ej: Voy al trabajo a pie. → Na posao idem pješice.
bailar | plesati | ej: Lola baila salsa muy bien. → Lola jako dobro pleše salsu.
cantar | pjevati | ej: Paco canta cuando cocina. → Paco pjeva dok kuha.
cantar en un coro | pjevati u zboru | ej: Mi madre canta en un coro. → Moja mama pjeva u zboru.
tocar el piano | svirati klavir | ej: Mi hija toca el piano muy bien. → Moja kći jako dobro svira klavir.
tocar un instrumento | svirati instrument | ej: ¿Tocas algún instrumento? → Sviraš li neki instrument?
la música | glazba | ej: Me encanta la música española. → Obožavam španjolsku glazbu.
leer un libro | čitati knjigu | ej: Antes de dormir, leo un libro. → Prije spavanja čitam knjigu.
ver películas o series | gledati filmove ili serije | ej: Los domingos veo series en el sofá. → Nedjeljom gledam serije na kauču.
chatear | dopisivati se | ej: Chateo con Lola por WhatsApp. → Dopisujem se s Lolom na WhatsAppu.
ir de compras | ići u kupovinu | ej: Lola va de compras los sábados. → Lola subotom ide u kupovinu.
ir de excursión | ići na izlet | ej: Mañana vamos de excursión a la montaña. → Sutra idemo na izlet u planine.
tomar algo | popiti nešto | ej: ¿Vamos a tomar algo después de clase? → Idemo na piće nakon nastave?
la barbacoa | roštilj | ej: En verano hacemos barbacoa en el jardín. → Ljeti pečemo roštilj u vrtu.
el chisme | trač (Lat. Amerika; u Španjolskoj: el cotilleo) | B1 | ej: ¿Sabes el último chisme? → Znaš li najnoviji trač?
el chiste | vic, šala | ej: Paco cuenta chistes muy malos. → Paco priča jako loše viceve.
`},
{k:"casa", t:"La casa: habitaciones", hr:"stan, sobe, što se radi u njima", mark:"blue", v:`
el piso = el apartamento | stan | ej: Paco vive en un piso en Zaragoza. → Paco živi u stanu u Zaragozi.
la vivienda | stan, dom, stambeni prostor | ej: Busco una vivienda cerca del centro. → Tražim stan blizu centra.
el edificio | zgrada | ej: Mi edificio tiene cinco plantas. → Moja zgrada ima pet katova.
el chalet adosado | kuća u nizu | A2 | ej: Lola vive en un chalet adosado con jardín. → Lola živi u kući u nizu s vrtom.
la planta (del edificio) | kat | ej: Vivo en la tercera planta. → Živim na trećem katu.
la planta baja | prizemlje | ej: Mi piso está en la planta baja. → Moj stan je u prizemlju.
el ático | stan na zadnjem katu (često s terasom) | ej: Paco tiene un ático con una terraza grande. → Paco ima stan na zadnjem katu s velikom terasom.
En mi piso hay... | U mom stanu ima... | ej: En mi piso hay dos dormitorios. → U mom stanu su dvije spavaće sobe.
Mi piso tiene... | Moj stan ima... | ej: Mi piso tiene un balcón pequeño. → Moj stan ima mali balkon.
la habitación | soba, prostorija | ej: Mi piso tiene tres habitaciones. → Moj stan ima tri sobe.
el salón | dnevni boravak | ej: Vemos la tele en el salón. → Gledamo televiziju u dnevnom boravku.
el dormitorio | spavaća soba | ej: El dormitorio de Lola es muy bonito. → Lolina spavaća soba je jako lijepa.
la cocina | kuhinja | ej: Paco cocina paella en la cocina. → Paco kuha paellu u kuhinji.
el comedor | blagovaonica | ej: Los domingos comemos en el comedor. → Nedjeljom jedemo u blagovaonici.
el cuarto de baño | kupaonica | ej: El cuarto de baño está al lado del dormitorio. → Kupaonica je pokraj spavaće sobe.
el aseo | WC, zahod | ej: ¿Dónde está el aseo, por favor? → Gdje je WC, molim?
el balcón | balkon | ej: Lola desayuna en el balcón. → Lola doručkuje na balkonu.
la terraza | terasa | ej: En verano comemos en la terraza. → Ljeti jedemo na terasi.
el garaje | garaža | ej: El coche está en el garaje. → Auto je u garaži.
el jardín | vrt | ej: Mi abuela tiene flores en el jardín. → Moja baka ima cvijeće u vrtu.
el patio | dvorište | ej: Los niños juegan en el patio. → Djeca se igraju u dvorištu.
el sótano | podrum | ej: Hay muchas cajas en el sótano. → U podrumu ima puno kutija.
el pasillo | hodnik | ej: El baño está al final del pasillo. → Kupaonica je na kraju hodnika.
el recibidor | predsoblje | ej: Dejo las llaves en el recibidor. → Ostavljam ključeve u predsoblju.
el trastero | spremište | ej: Las bicicletas están en el trastero. → Bicikli su u spremištu.
el cuarto de lavandería | praonica rublja | A2 | ej: La lavadora está en el cuarto de lavandería. → Perilica rublja je u praonici.
la pared | zid (u kući) | ej: Hay un cuadro en la pared. → Na zidu je slika.
la puerta | vrata | ej: Lola cierra la puerta del salón. → Lola zatvara vrata dnevnog boravka.
la ventana | prozor | ej: Por la mañana abro la ventana. → Ujutro otvaram prozor.
las vistas | pogled | ej: Mi piso tiene vistas al mar. → Moj stan ima pogled na more.
la calefacción central | centralno grijanje | ej: Mi edificio tiene calefacción central. → Moja zgrada ima centralno grijanje.
el aire acondicionado | klima-uređaj | ej: En verano ponemos el aire acondicionado. → Ljeti uključujemo klima-uređaj.
lavar los platos | prati suđe | ej: Después de cenar, lavo los platos. → Nakon večere perem suđe.
lavar la ropa | prati rublje | ej: Los sábados lavo la ropa. → Subotom perem rublje.
planchar | glačati, peglati | ej: No me gusta planchar camisas. → Ne volim glačati košulje.
limpiar | čistiti | ej: Los domingos limpio la cocina. → Nedjeljom čistim kuhinju.
tomar el sol | sunčati se | ej: Lola toma el sol en la terraza. → Lola se sunča na terasi.
mirar la calle | gledati ulicu | ej: Mi abuelo mira la calle desde el balcón. → Moj djed gleda ulicu s balkona.
aparcar el coche | parkirati auto | ej: Aparco el coche en el garaje. → Parkiram auto u garaži.
guardar cosas | spremati stvari | ej: Guardo cosas viejas en el trastero. → Spremam stare stvari u spremište.
organizar cajas | organizirati kutije | ej: Paco organiza cajas en el sótano. → Paco organizira kutije u podrumu.
cuidar las plantas | brinuti se za biljke | ej: Mi madre cuida las plantas del balcón. → Moja mama se brine za biljke na balkonu.
regar las plantas | zalijevati biljke | ej: Riego las plantas por la tarde. → Popodne zalijevam biljke.
pasar de una habitación a otra | prelaziti iz sobe u sobu | ej: El gato pasa de una habitación a otra. → Mačak prelazi iz sobe u sobu.
`},
{k:"muebles", t:"Muebles y objetos de casa", hr:"namještaj, kuhinja, kupaonica", mark:"blue", v:`
el mueble | komad namještaja | ej: Tengo muebles nuevos en el salón. → Imam novi namještaj u dnevnom boravku.
el sofá | kauč | ej: Paco duerme la siesta en el sofá. → Paco drijema na kauču.
el sillón | fotelja | ej: Mi abuelo lee en el sillón. → Moj djed čita u fotelji.
la mesa | stol | ej: Las llaves están en la mesa. → Ključevi su na stolu.
la mesita | stolić | ej: Hay un café en la mesita. → Na stoliću je kava.
la silla | stolica | ej: En la cocina hay cuatro sillas. → U kuhinji su četiri stolice.
el taburete | taburet (stolac bez naslona) | ej: En la cocina hay un taburete rojo. → U kuhinji je crveni taburet.
el puf | puf (mekano sjedalo bez naslona) | ej: El perro duerme en el puf. → Pas spava na pufu.
la estantería | regal, polica za knjige | ej: Mis libros están en la estantería. → Moje knjige su na regalu.
el estante | polica | ej: El azúcar está en el estante de arriba. → Šećer je na gornjoj polici.
la cómoda | komoda | ej: Los calcetines están en la cómoda. → Čarape su u komodi.
el armario | ormar | ej: La ropa está en el armario. → Odjeća je u ormaru.
el cajón | ladica | ej: Las cucharas están en el cajón. → Žlice su u ladici.
el zapatero | ormarić za cipele | ej: Los zapatos van en el zapatero. → Cipele idu u ormarić za cipele.
la cama | krevet | ej: Lola lee en la cama. → Lola čita u krevetu.
el colchón | madrac | ej: Este colchón es muy cómodo. → Ovaj madrac je jako udoban.
la almohada | jastuk | ej: Necesito otra almohada. → Treba mi još jedan jastuk.
el cojín | ukrasni jastuk, jastučić | ej: El sofá tiene cinco cojines. → Kauč ima pet ukrasnih jastuka.
la mesita de noche | noćni ormarić | ej: Mi móvil está en la mesita de noche. → Mobitel mi je na noćnom ormariću.
la alfombra | tepih | ej: Hay una alfombra azul en el salón. → U dnevnom boravku je plavi tepih.
las cortinas | zavjese | ej: Por la noche cierro las cortinas. → Navečer navlačim zavjese.
la lámpara | lampa, svjetiljka | ej: Hay una lámpara al lado del sofá. → Pokraj kauča je lampa.
la luz | svjetlo | ej: En mi salón hay mucha luz. → U mom dnevnom boravku ima puno svjetla.
encender ≠ apagar | uključiti, upaliti ≠ isključiti, ugasiti | ej: Enciendo la luz y apago la tele. → Palim svjetlo i gasim televizor.
el cuadro | slika (na zidu) | ej: Hay un cuadro de Paco en el salón. → U dnevnom boravku je Pacova slika.
el marco de fotos | okvir za fotografije | ej: En la mesita hay un marco de fotos. → Na stoliću je okvir za fotografije.
el jarrón | vaza | ej: Hay flores en el jarrón. → U vazi je cvijeće.
el espejo | ogledalo | ej: El espejo está en el cuarto de baño. → Ogledalo je u kupaonici.
el reloj | sat | ej: El reloj de la cocina no funciona. → Sat u kuhinji ne radi.
la planta | biljka | ej: Tengo una planta en la ventana. → Imam biljku na prozoru.
la televisión | televizor, televizija | ej: Vemos la televisión después de cenar. → Nakon večere gledamo televiziju.
el frigorífico = la nevera | hladnjak | ej: La leche está en la nevera. → Mlijeko je u hladnjaku.
el horno | pećnica | ej: Paco pone la pizza en el horno. → Paco stavlja pizzu u pećnicu.
el microondas | mikrovalna (pećnica) | ej: Caliento la leche en el microondas. → Grijem mlijeko u mikrovalnoj.
la vitrocerámica | staklokeramička ploča (za kuhanje) | A2 | ej: Paco cocina en la vitrocerámica. → Paco kuha na staklokeramičkoj ploči.
el lavavajillas | perilica posuđa | ej: Pongo los platos en el lavavajillas. → Stavljam tanjure u perilicu posuđa.
el fregadero | sudoper | ej: Hay muchos platos en el fregadero. → U sudoperu je puno tanjura.
el grifo | slavina | ej: Cierra el grifo, por favor. → Zatvori slavinu, molim te.
el lavabo | umivaonik | ej: Me lavo las manos en el lavabo. → Perem ruke na umivaoniku.
la ducha | tuš | ej: Lola canta en la ducha. → Lola pjeva pod tušem.
la bañera | kada | ej: Mi piso no tiene bañera. → Moj stan nema kadu.
el inodoro = el váter | WC školjka | ej: El cuarto de baño tiene ducha y váter. → Kupaonica ima tuš i WC školjku.
la toalla | ručnik | ej: Necesito una toalla para la playa. → Treba mi ručnik za plažu.
la tumbona | ležaljka | ej: Paco toma el sol en una tumbona. → Paco se sunča na ležaljci.
la llave | ključ | ej: No encuentro la llave de casa. → Ne mogu naći ključ od kuće.
el paraguas | kišobran | ej: Hoy llueve: necesito el paraguas. → Danas pada kiša: treba mi kišobran.
las gafas = los lentes | naočale (los lentes: Lat. Amerika) | ej: Lola lleva gafas para leer. → Lola nosi naočale za čitanje.
las gafas de sol | sunčane naočale | ej: En la playa llevo gafas de sol. → Na plaži nosim sunčane naočale.
el zapato | cipela | ej: Busco mi otro zapato. → Tražim svoju drugu cipelu.
el gorro | zimska kapa | ej: En invierno llevo un gorro. → Zimi nosim kapu.
la gorra | šilterica, kapa sa šiltom | ej: Paco lleva una gorra en la playa. → Paco na plaži nosi šiltericu.
la bolsa | vrećica | ej: ¿Necesita una bolsa? → Trebate li vrećicu?
el bolso | (ženska) torba, torbica | ej: Lola lleva el móvil en el bolso. → Lola nosi mobitel u torbici.
la mochila | ruksak | ej: Mi mochila es muy grande. → Moj ruksak je jako velik.
`},
{k:"clase", t:"Clase y oficina", hr:"učionica, škola, računalo", mark:"blue", v:`
el aula | učionica | ej: El aula tres está en la primera planta. → Učionica tri je na prvom katu.
la pizarra | ploča | ej: La profesora escribe en la pizarra. → Profesorica piše na ploču.
el proyector | projektor | ej: Hoy el proyector no funciona. → Danas projektor ne radi.
el tablón de anuncios | oglasna ploča | ej: El horario está en el tablón de anuncios. → Raspored je na oglasnoj ploči.
la papelera | koš za smeće | ej: La papelera está debajo de la mesa. → Koš za smeće je ispod stola.
el escritorio | radni stol | ej: Mi ordenador está en el escritorio. → Moje računalo je na radnom stolu.
el ordenador | računalo | ej: Lola escribe sus artículos en el ordenador. → Lola piše svoje članke na računalu.
la computadora | računalo (u Latinskoj Americi) | ej: En México dicen «la computadora». → U Meksiku kažu «la computadora».
el portátil | laptop, prijenosno računalo | ej: Llevo el portátil en la mochila. → Laptop nosim u ruksaku.
la pantalla | ekran, zaslon | ej: La pantalla de mi móvil es pequeña. → Ekran mog mobitela je malen.
los altavoces | zvučnici | ej: Los altavoces están encima del escritorio. → Zvučnici su na radnom stolu.
el libro | knjiga | ej: Mi libro de español es azul. → Moja knjiga za španjolski je plava.
el cuaderno | bilježnica | ej: Escribo las palabras nuevas en el cuaderno. → Nove riječi pišem u bilježnicu.
la página | stranica | ej: El ejercicio está en la página veinte. → Zadatak je na dvadesetoj stranici.
el lápiz | olovka (grafitna) | ej: ¿Tienes un lápiz? → Imaš li olovku?
el rotulador | flomaster, marker | ej: Escribo en la pizarra con un rotulador. → Pišem po ploči markerom.
el estuche | pernica | ej: Tengo tres lápices en el estuche. → U pernici imam tri olovke.
la regla | ravnalo | ej: Necesito una regla. → Treba mi ravnalo.
el borrador | spužva za ploču | ej: El borrador está debajo de la pizarra. → Spužva je ispod ploče.
la goma de borrar | gumica za brisanje | ej: Mi goma de borrar es pequeña y blanca. → Moja gumica je mala i bijela.
el examen | ispit | ej: Mañana tenemos un examen. → Sutra imamo ispit.
aprobar el examen | položiti ispit | ej: Paco quiere aprobar el examen de español. → Paco želi položiti ispit iz španjolskog.
el ejercicio | zadatak, vježba | ej: Hacemos el ejercicio dos en parejas. → Radimo drugi zadatak u parovima.
el error | greška | ej: En este ejercicio hay un error. → U ovom zadatku je jedna greška.
el ejemplo | primjer | ej: La profesora da un ejemplo. → Profesorica daje primjer.
el instituto | srednja škola | ej: Mi hija estudia en el instituto. → Moja kći ide u srednju školu.
leer en voz alta | čitati naglas | ej: Lola lee el texto en voz alta. → Lola čita tekst naglas.
deletrear | sricati, slovkati | ej: ¿Puedes deletrear tu apellido? → Možeš li sricati svoje prezime?
`},
{k:"lugar", t:"Dónde está: lugares y posición", hr:"prijedlozi mjesta, grad, smjer", mark:"blue", v:`
encima de | na (vrhu), iznad | ej: El gato está encima de la mesa. → Mačak je na stolu.
sobre | na | ej: El libro está sobre la mesa. → Knjiga je na stolu.
debajo de | ispod | ej: Los zapatos están debajo de la cama. → Cipele su ispod kreveta.
entre | između | ej: El sofá está entre la ventana y la puerta. → Kauč je između prozora i vrata.
dentro de | unutar, u | ej: Las llaves están dentro del bolso. → Ključevi su u torbici.
fuera de | izvan | ej: El perro duerme fuera de casa. → Pas spava izvan kuće.
detrás de | iza | ej: El jardín está detrás de la casa. → Vrt je iza kuće.
delante de | ispred | ej: Paco espera delante del cine. → Paco čeka ispred kina.
al lado de | uz, pokraj | ej: La panadería está al lado del banco. → Pekara je pokraj banke.
lejos ≠ cerca | daleko ≠ blizu | ej: Mi casa está cerca del mar. → Moja kuća je blizu mora.
a la izquierda | lijevo | ej: El baño está a la izquierda. → Kupaonica je lijevo.
a la derecha | desno | ej: La farmacia está a la derecha. → Ljekarna je desno.
el lugar | mjesto | ej: Zaragoza es un lugar muy bonito. → Zaragoza je jako lijepo mjesto.
el barrio | kvart, četvrt | ej: Mi barrio es muy tranquilo. → Moj kvart je jako miran.
fuera de la ciudad | izvan grada | ej: Mis abuelos viven fuera de la ciudad. → Baka i djed mi žive izvan grada.
la panadería | pekara | ej: Compro pan en la panadería. → Kupujem kruh u pekari.
la salida ≠ la entrada | izlaz ≠ ulaz | ej: ¿Dónde está la salida? → Gdje je izlaz?
el muro | zid (vanjski) | ej: El jardín tiene un muro alto. → Vrt ima visok zid.
las murallas | zidine | A2 | ej: Ávila tiene unas murallas muy famosas. → Ávila ima jako poznate zidine.
la cruz | križ | ej: En la iglesia hay una cruz grande. → U crkvi je veliki križ.
la tierra | zemlja (tlo) | ej: Las plantas necesitan agua y tierra. → Biljke trebaju vodu i zemlju.
el mar | more | ej: Paco nada en el mar los domingos. → Paco nedjeljom pliva u moru.
la playa de arena | pješčana plaža | ej: Me gusta la playa de arena. → Sviđa mi se pješčana plaža.
la pradera | livada | A2 | ej: Las vacas comen en la pradera. → Krave pasu na livadi.
la finca | imanje, posjed (na selu) | A2 | ej: Mi abuelo tiene una finca en el campo. → Moj djed ima imanje na selu.
`},
{k:"comida", t:"Comida y bebida", hr:"hrana, voće, piće, doručak", mark:"green", v:`
los alimentos = la comida | hrana, namirnice | ej: Paco compra los alimentos en el mercado. → Paco kupuje namirnice na tržnici.
saludable | zdrav | ej: La fruta es muy saludable. → Voće je vrlo zdravo.
el desayuno | doručak | ej: El desayuno es a las ocho. → Doručak je u osam.
el almuerzo | ručak | ej: Paco prepara el almuerzo para Lola. → Paco priprema ručak za Lolu.
la cena | večera | ej: La cena está lista. → Večera je gotova.
el pan | kruh | ej: Compro pan todos los días. → Svaki dan kupujem kruh.
el panecillo | pecivo | ej: Quiero un panecillo con queso. → Želim pecivo sa sirom.
las tostadas | tost (prepečeni kruh) | ej: Desayuno tostadas con tomate. → Za doručak jedem tost s rajčicom.
el pan con mantequilla | kruh s maslacem | ej: Mi hijo come pan con mantequilla. → Moj sin jede kruh s maslacem.
el pan con mermelada | kruh s marmeladom | ej: Lola desayuna pan con mermelada. → Lola za doručak jede kruh s marmeladom.
los cereales | pahuljice | ej: Los niños comen cereales con leche. → Djeca jedu pahuljice s mlijekom.
la proteína en polvo | proteinski prah | ej: Pongo proteína en polvo en el batido. → Stavljam proteinski prah u frape.
los huevos | jaja | ej: Paco compra doce huevos. → Paco kupuje dvanaest jaja.
el huevo cocido | kuhano jaje | ej: Por la mañana como un huevo cocido. → Ujutro jedem kuhano jaje.
el huevo frito | jaje na oko | ej: Quiero un huevo frito con patatas. → Želim jaje na oko s krumpirom.
el huevo revuelto | kajgana | ej: Lola prepara huevos revueltos. → Lola priprema kajganu.
el queso | sir | ej: Me gusta mucho el queso. → Jako volim sir.
el jamón | šunka, pršut | ej: El jamón serrano es muy rico. → Pršut serrano je jako ukusan.
el chorizo | kobasica (chorizo) | ej: Paco come un bocadillo de chorizo. → Paco jede sendvič s chorizom.
los embutidos | suhomesnati proizvodi, kobasice | ej: En España hay muchos embutidos. → U Španjolskoj ima puno suhomesnatih proizvoda.
el pollo | piletina | ej: Hoy comemos pollo con arroz. → Danas jedemo piletinu s rižom.
el cerdo | svinja; svinjetina (meso) | ej: No como cerdo. → Ne jedem svinjetinu.
el hueso | kost | ej: El perro come un hueso. → Pas jede kost.
el pescado | riba (jelo) | ej: Los viernes como pescado. → Petkom jedem ribu.
los chipirones | male lignje | A2 | ej: Paco no come chipirones, ¡son sus primos! → Paco ne jede male lignje, to su mu rođaci!
la hamburguesa | hamburger | ej: Mi hijo quiere una hamburguesa. → Moj sin želi hamburger.
el arroz | riža | ej: Paco cocina arroz con verduras. → Paco kuha rižu s povrćem.
la patata = la papa | krumpir | ej: Me gustan las patatas fritas. → Volim pomfrit.
la sopa | juha | ej: Mi abuela hace una sopa muy rica. → Moja baka kuha jako finu juhu.
la fruta | voće | ej: Como fruta todos los días. → Svaki dan jedem voće.
el plátano | banana | ej: Lola come un plátano en el tren. → Lola jede bananu u vlaku.
la cereza | trešnja (višnja = la guinda) | ej: En junio hay cerezas. → U lipnju ima trešanja.
la sandía | lubenica | ej: En verano comemos sandía. → Ljeti jedemo lubenicu.
el melón | dinja | ej: El melón está muy dulce. → Dinja je jako slatka.
el melocotón | breskva | ej: Quiero un kilo de melocotones. → Želim kilo breskava.
el aguacate | avokado | ej: Lola pone aguacate en la ensalada. → Lola stavlja avokado u salatu.
los arándanos | borovnice | ej: Como cereales con arándanos. → Jedem pahuljice s borovnicama.
la zanahoria | mrkva | ej: Mi hija no come zanahorias. → Moja kći ne jede mrkvu.
la cebolla | luk | ej: Paco corta la cebolla y llora. → Paco reže luk i plače.
el ajo | češnjak | ej: Paco pone mucho ajo en todo. → Paco stavlja puno češnjaka u sve.
el diente de ajo | češanj češnjaka | ej: Necesito dos dientes de ajo. → Trebam dva češnja češnjaka.
los pimientos | paprike | ej: Compro pimientos rojos y verdes. → Kupujem crvene i zelene paprike.
el pepino | krastavac | ej: El gazpacho lleva pepino. → U gazpacho ide krastavac.
la aceituna | maslina | ej: Me gustan las aceitunas verdes. → Volim zelene masline.
el aceite de oliva | maslinovo ulje | ej: Paco cocina con aceite de oliva. → Paco kuha na maslinovom ulju.
el vinagre | ocat | ej: La ensalada lleva aceite y vinagre. → U salatu idu ulje i ocat.
la miel | med | ej: Tomo el té con miel. → Pijem čaj s medom.
el cacahuete = el maní | kikiriki | ej: Paco come cacahuetes en el bar. → Paco u baru jede kikiriki.
la leche | mlijeko | ej: No tomo leche. → Ne pijem mlijeko.
la leche de vaca | kravlje mlijeko | ej: Mi hijo no toma leche de vaca. → Moj sin ne pije kravlje mlijeko.
el café con leche | kava s mlijekom | ej: Un café con leche, por favor. → Jednu kavu s mlijekom, molim.
el cacao | kakao | ej: Los niños toman cacao por la mañana. → Djeca ujutro piju kakao.
el zumo = el jugo | sok | ej: ¿Quieres un zumo? → Želiš li sok?
el zumo de naranja | sok od naranče | ej: Bebo zumo de naranja cada mañana. → Svako jutro pijem sok od naranče.
el batido | frape, milkshake | ej: Paco toma un batido de fresa. → Paco pije frape od jagode.
el agua mineral | flaširana (mineralna) voda | ej: Un agua mineral sin gas, por favor. → Jednu negaziranu vodu, molim.
el refresco | gazirani sok | ej: Los niños quieren un refresco. → Djeca žele gazirani sok.
la cerveza | pivo | ej: Una cerveza bien fría, por favor. → Jedno hladno pivo, molim.
la pajita | slamka | ej: Lola bebe el batido con pajita. → Lola pije frape na slamku.
delicioso | ukusno | ej: ¡La paella de Paco está deliciosa! → Pacova paella je jako ukusna!
asqueroso | odvratno | ej: Este café está asqueroso. → Ova kava je odvratna.
no está bueno | nije fino | ej: El pescado no está bueno. → Riba nije fina.
grasiento = grasoso | mastan | ej: Esta hamburguesa está muy grasienta. → Ovaj hamburger je jako mastan.
la sopa está caliente | juha je vruća
`},
{k:"restaurante", t:"En el restaurante", hr:"naručivanje, pribor, jela", mark:"green", v:`
¿Qué van a tomar de primero? | Što ćete za prvo jelo?
de segundo | za glavno jelo | ej: De segundo, quiero merluza al horno. → Za glavno jelo želim pečeni oslić.
de postre | za desert | ej: De postre, un helado de chocolate. → Za desert sladoled od čokolade.
para beber | za piće | ej: ¿Y para beber? Agua, por favor. → A za piće? Vodu, molim.
para llevar | za van | ej: Un café para llevar, por favor. → Jednu kavu za van, molim.
¡Buen provecho! | Dobar tek!
¡Yo invito! | Ja častim!
la sopa de marisco | juha od plodova mora | ej: Lola pide la sopa de marisco. → Lola naručuje juhu od plodova mora.
la ensalada mixta | miješana salata | ej: Una ensalada mixta para compartir. → Jednu miješanu salatu za podijeliti.
la tortilla de patatas | španjolska tortilja | ej: La tortilla de patatas de Paco es famosa. → Pacova tortilja od krumpira je poznata.
la merluza al horno | pečeni oslić | ej: Hoy hay merluza al horno. → Danas ima pečenog oslića.
el filete de pollo a la plancha | pileći file na žaru | ej: Para mí, el filete de pollo a la plancha. → Za mene pileći file na žaru.
el vino de la casa | kućno vino | ej: Una copa de vino de la casa, por favor. → Čašu kućnog vina, molim.
el helado | sladoled | ej: Lola quiere un helado de fresa. → Lola želi sladoled od jagode.
las natillas | puding (krema) | ej: De postre hay natillas. → Za desert ima pudinga.
la tarta de queso | torta od sira | ej: De postre quiero tarta de queso. → Za desert želim tortu od sira.
el arroz con leche | sutlijaš | ej: El arroz con leche es un postre típico. → Sutlijaš je tipičan desert.
el plato | tanjur; jelo | ej: Pongo los platos en la mesa. → Stavljam tanjure na stol.
el vaso | čaša | ej: Un vaso de agua, por favor. → Čašu vode, molim.
la copa | čaša za vino | ej: Una copa de vino tinto, por favor. → Čašu crnog vina, molim.
la taza | šalica | ej: Paco bebe café en una taza grande. → Paco pije kavu iz velike šalice.
la jarra | vrč | ej: Una jarra de agua para la mesa. → Vrč vode za stol.
la cuchara | žlica | ej: Necesito una cuchara para la sopa. → Trebam žlicu za juhu.
la cucharilla | žličica | ej: Paco come el helado con una cucharilla. → Paco jede sladoled žličicom.
el tenedor | vilica | ej: ¿Me trae un tenedor, por favor? → Možete li mi donijeti vilicu, molim?
el cuchillo | nož | ej: El cuchillo no corta. → Nož ne reže.
el mantel | stolnjak | ej: El mantel es blanco. → Stolnjak je bijel.
la servilleta | salveta, ubrus | ej: ¿Hay servilletas? → Ima li salveta?
el precio | cijena | ej: ¿Cuál es el precio del menú? → Koja je cijena menija?
`},
{k:"recetas", t:"Cocinar y recetas", hr:"kuhanje, recept, kuhinjski pribor", mark:"pink", v:`
la receta | recept | ej: Paco tiene una receta secreta. → Paco ima tajni recept.
cocinar | kuhati | ej: Paco cocina con sus ocho brazos. → Paco kuha sa svojih osam krakova.
añadir | dodati | ej: Añado sal a la sopa. → Dodajem sol u juhu.
agregar = añadir | dodati | ej: Agrego un poco de leche. → Dodajem malo mlijeka.
poner | staviti | ej: Lola pone azúcar en el café. → Lola stavlja šećer u kavu.
retirar | maknuti, skloniti (s vatre) | ej: Retiro la sopa del fuego. → Mičem juhu s vatre.
mezclar | miješati | ej: Mezclo los huevos con la leche. → Miješam jaja s mlijekom.
mezclado | pomiješano | ej: El arroz está mezclado con verduras. → Riža je pomiješana s povrćem.
cortar | rezati | ej: Corto las patatas para la tortilla. → Režem krumpire za tortilju.
pelar | guliti | ej: Pelo una naranja. → Gulim naranču.
la batidora | blender, mikser | ej: Hago el batido con la batidora. → Frape radim blenderom.
el rallador | ribež | A2 | ej: Necesito el rallador para el queso. → Trebam ribež za sir.
la cucharadita | žličica (mjera) | ej: Pongo una cucharadita de azúcar en el café. → Stavljam žličicu šećera u kavu.
`},
{k:"hotel", t:"Viajes y hotel", hr:"putovanje, hotel, plaćanje", mark:"blue", v:`
viajar | putovati | ej: Lola viaja mucho por su trabajo. → Lola puno putuje zbog posla.
el equipaje | prtljaga | ej: Mi equipaje está en el coche. → Moja prtljaga je u autu.
solo alojamiento | samo smještaj | ej: Es solo alojamiento, sin desayuno. → Samo smještaj, bez doručka.
media pensión | polupansion | ej: Queremos media pensión, por favor. → Želimo polupansion, molim.
pensión completa | puni pansion | ej: El hotel tiene pensión completa. → Hotel nudi puni pansion.
todo incluido | sve uključeno (all inclusive) | ej: Vamos a un hotel todo incluido. → Idemo u all-inclusive hotel.
la recepción | recepcija | ej: Las llaves están en la recepción. → Ključevi su na recepciji.
el número de habitación | broj sobe | ej: ¿Cuál es su número de habitación? → Koji je vaš broj sobe?
la tarjeta llave | kartica za sobu | ej: La tarjeta llave no funciona. → Kartica za sobu ne radi.
el ascensor | dizalo, lift | ej: El ascensor está a la derecha. → Dizalo je desno.
el minibar | minibar | ej: El agua del minibar es muy cara. → Voda iz minibara je jako skupa.
la caja fuerte | sef | ej: Mi pasaporte está en la caja fuerte. → Moja putovnica je u sefu.
el servicio de habitaciones | posluga u sobu | ej: Lola llama al servicio de habitaciones. → Lola zove poslugu u sobu.
la factura | račun (faktura) | ej: ¿Me da la factura, por favor? → Možete li mi dati račun, molim?
pagar | platiti | ej: ¿Dónde pago? → Gdje mogu platiti?
pagar en efectivo | platiti gotovinom | ej: ¿Puedo pagar en efectivo? → Mogu li platiti gotovinom?
pagar con tarjeta | platiti karticom | ej: Paco siempre paga con tarjeta. → Paco uvijek plaća karticom.
`},
{k:"cuerpo", t:"Cuerpo y salud", hr:"tijelo, bol, bolest", mark:"pink", v:`
el brazo | ruka | ej: Me duele el brazo. → Boli me ruka.
la mano | šaka | ej: Lola escribe con la mano izquierda. → Lola piše lijevom rukom.
el codo | lakat | ej: Lola tiene el codo en la mesa. → Lola drži lakat na stolu.
duele | boli | ej: A Paco le duele la cabeza. → Paca boli glava.
me duele | boli me | ej: Me duele mucho la cabeza. → Jako me boli glava.
enfermo / enferma | bolestan / bolesna | ej: Hoy estoy enfermo. → Danas sam bolestan.
tiene fiebre | ima temperaturu | ej: El niño tiene fiebre. → Dijete ima temperaturu.
desmayarse | onesvijestiti se | A2 | ej: Con tanto calor, Lola se desmaya. → Na tolikoj vrućini Lola se onesvijesti.
`},
{k:"verbos", t:"Verbos útiles", hr:"glagoli koji nisu u drugim grupama", mark:"pink", v:`
trabajar | raditi | ej: Paco trabaja en un restaurante de Zaragoza. → Paco radi u restoranu u Zaragozi.
comer | jesti | ej: Los niños comen fruta. → Djeca jedu voće.
vivir | živjeti | ej: Vivo en Zagreb. → Živim u Zagrebu.
ser | biti (identitet) | ej: Lola es periodista. → Lola je novinarka.
tener | imati | ej: Paco tiene ocho brazos. → Paco ima osam krakova.
ir | ići | ej: Voy al mercado con Lola. → Idem na tržnicu s Lolom.
salir | izaći | ej: Salgo de casa a las ocho. → Izlazim iz kuće u osam.
volver | vratiti se | ej: Vuelvo a casa a las seis. → Vraćam se kući u šest.
repetir | ponoviti | ej: ¿Puede repetir, por favor? → Možete li ponoviti, molim?
dormir | spavati | ej: Duermo ocho horas. → Spavam osam sati.
escuchar | slušati | ej: Escucho música en el coche. → Slušam glazbu u autu.
mirar | gledati | ej: Miro por la ventana. → Gledam kroz prozor.
conocer | poznavati, upoznati | ej: ¿Conoces a Lola? → Poznaješ li Lolu?
puedes | možeš | ej: ¿Puedes hablar más despacio? → Možeš li govoriti sporije?
entiendo / entiendes | razumijem / razumiješ | ej: No entiendo la pregunta. → Ne razumijem pitanje.
almorzar | ručati | ej: Almorzamos a las dos. → Ručamo u dva.
preferir | preferirati, više voljeti | ej: Prefiero el té. → Više volim čaj.
saber | znati; imati okus | ej: No sé nadar. → Ne znam plivati.
decir | reći, govoriti | ej: Lola siempre dice la verdad. → Lola uvijek govori istinu.
mentir | lagati | A2 | ej: Paco nunca miente. → Paco nikad ne laže.
empezar | početi | ej: La clase empieza a las seis. → Nastava počinje u šest.
empezar = comenzar | početi | ej: La película comienza a las nueve. → Film počinje u devet.
montar | jahati (konja), voziti (bicikl) | ej: Mi hija monta en bici. → Moja kći vozi bicikl.
borrar | izbrisati | ej: Borro la foto. → Brišem fotografiju.
jugar | igrati (se) | ej: Los niños juegan en el parque. → Djeca se igraju u parku.
abrir ≠ cerrar | otvoriti ≠ zatvoriti | ej: Abro la ventana y cierro la puerta. → Otvaram prozor i zatvaram vrata.
esperar | čekati; nadati se, očekivati | ej: Espero el autobús. → Čekam autobus.
cambiar de | promijeniti | ej: Lola quiere cambiar de trabajo. → Lola želi promijeniti posao.
encontrar | naći | ej: No encuentro mis llaves. → Ne mogu naći ključeve.
esconder | sakriti | A2 | ej: Paco esconde la receta secreta. → Paco skriva tajni recept.
abandonar | napustiti | A2 | ej: Paco no abandona su cocina. → Paco ne napušta svoju kuhinju.
huir | bježati, pobjeći | B1 | ej: El gato huye del perro. → Mačka bježi od psa.
escapar | pobjeći (bijeg) | A2 | ej: Los chipirones escapan de Paco. → Male lignje bježe od Paca.
burlarse de | rugati se | B1 | ej: Los niños se burlan de Paco. → Djeca se rugaju Pacu.
dudar | sumnjati | A2 | ej: Lola duda de todo. → Lola sumnja u sve.
la duda | nedoumica, sumnja | ej: ¿Tienes alguna duda? → Imaš li kakvih nedoumica?
inventar | izmisliti | ej: Paco inventa recetas nuevas. → Paco izmišlja nove recepte.
comprobar | provjeriti | A2 | ej: Compruebo mi correo. → Provjeravam e-poštu.
pedir | tražiti, zamoliti; naručiti | ej: Pido una pizza. → Naručujem pizzu.
señalar | pokazati, označiti | A2 | ej: El niño señala el mapa. → Dijete pokazuje na kartu.
lograr | uspjeti, postići | B1 | ej: Lola logra hablar con el presidente. → Lola uspijeva razgovarati s predsjednikom.
conseguir | dobiti, postići; uspjeti | A2 | ej: Lola consigue un trabajo nuevo. → Lola dobiva novi posao.
heredar | naslijediti | B1 | ej: Paco hereda el restaurante de su abuelo. → Paco nasljeđuje restoran od djeda.
llamar la atención | privući pažnju | A2 | ej: El sombrero de Lola llama la atención. → Lolin šešir privlači pažnju.
invitar | pozvati, častiti | ej: Te invito a un café. → Častim te kavom.
repartir | podijeliti | A2 | ej: Paco reparte la tortilla entre todos. → Paco dijeli tortilju svima.
sobornar | podmititi | B2 | ej: Paco soborna al gato con pescado. → Paco podmićuje mačku ribom.
el soborno | mito | B2 | ej: Paco no acepta el soborno. → Paco ne prihvaća mito.
a propósito | namjerno; usput (rečeno) | A2 | ej: Lo haces a propósito. → To radiš namjerno.
`},
{k:"varios", t:"Varios: animales y más", hr:"životinje i ostale riječi", mark:"yellow", v:`
los gatos | mačke | ej: Los gatos de Lola duermen mucho. → Loline mačke puno spavaju.
el perro / la perra | pas / kuja | ej: Mi perro se llama Toby. → Moj pas se zove Toby.
la vaca | krava | ej: Las vacas dan leche. → Krave daju mlijeko.
las hormigas | mravi | ej: Hay hormigas en la cocina de Paco. → U Pacovoj kuhinji ima mrava.
el fuego | vatra | ej: Paco cocina a fuego lento. → Paco kuha na laganoj vatri.
la guerra | rat | ej: Lola escribe sobre la guerra. → Lola piše o ratu.
el éxito | uspjeh | ej: El restaurante de Paco es un gran éxito. → Pacov restoran je veliki uspjeh.
la vida | život | ej: ¡Así es la vida! → Takav je život!
el algodón | pamuk | A2 | ej: Mi camiseta es de algodón. → Moja majica je od pamuka.
las preguntas íntimas | intimna, vrlo osobna pitanja | A2 | ej: Lola no hace preguntas íntimas. → Lola ne postavlja intimna pitanja.
`}
];
