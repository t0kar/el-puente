// Grammar summaries as small HTML snippets. Optional u: update id, lvl: level.
// Required: cat (Chuleta section, see SheetCat in lib/types.ts) and hr (one plain Croatian line: when / why you use this).
// Every sheet explains itself for a beginner: a Croatian sentence per rule, translations of key examples (<i>…</i> = prijevod).
// Building blocks (styled in styles/components.css):
//   <p class="formula">…</p>                          one-line formula
//   <div class="tbl"><table class="para">…</table></div>   paradigm table (forms in <i> = tap to hear)
//   <ul class="rules"><li><code>rule</code><span>explanation + example</span></li></ul>   rule rows
//   <span class="words"><i>a</i><i>b</i></span>          word chips (one <i> per word, each tappable)
//   <p class="sub">…</p> small section heading · <p class="hint">…</p> side note
// widget:"boot" adds the interactive «bota» (components/Boot.tsx) after the html; its verbs come from verbs.ts
//   <div class="duo">…two tables…</div>                 side by side on wide screens
import type { Sheet } from "../../lib/types";

export const SHEETS: Sheet[] = [
{t:"Verbos regulares", mark:"pink", cat:"verbos", hr:"Kako se pravilni glagoli mijenjaju po osobama u sadašnjem vremenu: trabajo = radim, trabajas = radiš…", html:`
<p>Svaki glagol završava na <b>-ar</b>, <b>-er</b> ili <b>-ir</b>. Makni taj završetak i dodaj nastavak za osobu.</p>
<p class="formula">glagol = <b>osnova</b> + <b>nastavak</b><br>trabaj<u>ar</u> → trabaj + <u>o</u> = trabajo (radim)</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>-AR</th><th>-ER</th><th>-IR</th></tr></thead><tbody>
<tr><th>yo</th><td>-o</td><td>-o</td><td>-o</td></tr><tr><th>tú</th><td>-as</td><td>-es</td><td>-es</td></tr>
<tr><th>él/ella/usted</th><td>-a</td><td>-e</td><td>-e</td></tr><tr><th>nosotros</th><td>-amos</td><td>-emos</td><td class="hl">-imos</td></tr>
<tr><th>vosotros</th><td>-áis</td><td>-éis</td><td class="hl">-ís</td></tr><tr><th>ellos/ustedes</th><td>-an</td><td>-en</td><td>-en</td></tr></tbody></table></div>
<p class="sub">Primjeri</p>
<ul class="rules">
<li><code>hablar</code><span><i>hablo</i> = govorim · <i>hablas</i> = govoriš · <i>hablamos</i> = govorimo</span></li>
<li><code>comer</code><span><i>como</i> = jedem · <i>come</i> = jede · <i>comemos</i> = jedemo</span></li>
<li><code>vivir</code><span><i>vivo</i> = živim · <i>vive</i> = živi · <i>vivimos</i> = živimo</span></li>
</ul>
<p class="hint">-ER i -IR razlikuju se samo u nosotros i vosotros (označeno). Zamjenicu (yo, tú…) obično ne govorimo: nastavak već kaže tko radi.</p>`},
{t:"Cambio de vocal: la «bota»", mark:"pink", cat:"verbos", widget:"boot", hr:"Neki glagoli mijenjaju samoglasnik u osnovi: dormir → duermo (spavam).", html:`
<p>Kod nekih glagola samoglasnik u osnovi se promijeni: <b>o→ue</b>, <b>e→ie</b>, <b>e→i</b> ili <b>u→ue</b>. Nastavci ostaju pravilni.</p>
<p class="formula">mijenja se samo osnova, i to samo u yo, tú, él, ellos</p>
<ul class="rules">
<li><code>o → ue</code><span><i>duermo</i> = spavam · ali <i>dormimos</i> = spavamo (bez promjene)</span></li>
<li><code>e → ie</code><span><i>quiero</i> = želim · ali <i>queremos</i> = želimo</span></li>
<li><code>e → i</code><span><i>pido</i> = naručujem · ali <i>pedimos</i> = naručujemo</span></li>
<li><code>u → ue</code><span><i>juego</i> = igram (samo jugar)</span></li>
</ul>
<p class="hint">Zašto «čizma»? Ako u tablici zaokružiš oblike koji se mijenjaju (yo, tú, él, ellos), dobiješ oblik čizme. Nosotros i vosotros su izvan čizme. Isprobaj ispod.</p>`},
{t:"Verbos irregulares", mark:"pink", cat:"verbos", hr:"Najvažniji glagoli koji ne prate pravila. Njih treba naučiti napamet.", html:`
<div class="tbl"><table class="para"><thead><tr><th></th><th>ser <small>biti</small></th><th>estar <small>biti</small></th><th>tener <small>imati</small></th><th>ir <small>ići</small></th></tr></thead><tbody>
<tr><th>yo</th><td><i>soy</i></td><td><i>estoy</i></td><td><i>tengo</i></td><td><i>voy</i></td></tr><tr><th>tú</th><td><i>eres</i></td><td><i>estás</i></td><td><i>tienes</i></td><td><i>vas</i></td></tr>
<tr><th>él</th><td><i>es</i></td><td><i>está</i></td><td><i>tiene</i></td><td><i>va</i></td></tr><tr><th>nosotros</th><td><i>somos</i></td><td><i>estamos</i></td><td><i>tenemos</i></td><td><i>vamos</i></td></tr>
<tr><th>vosotros</th><td><i>sois</i></td><td><i>estáis</i></td><td><i>tenéis</i></td><td><i>vais</i></td></tr><tr><th>ellos</th><td><i>son</i></td><td><i>están</i></td><td><i>tienen</i></td><td><i>van</i></td></tr></tbody></table></div>
<p class="hint">Ser i estar oba znače «biti». Kada koji, vidi «Ser · estar · hay».</p>
<p class="sub">Samo yo je nepravilan, ostalo je pravilno</p>
<ul class="rules">
<li><code>salir</code><span>izaći · <i>salgo</i> = izlazim (ali <i>sales</i>, <i>sale</i>…)</span></li>
<li><code>hacer</code><span>raditi, činiti · <i>hago</i> = radim</span></li>
<li><code>saber</code><span>znati · <i>sé</i> = znam</span></li>
<li><code>poner</code><span>staviti · <i>pongo</i> = stavljam</span></li>
</ul>
<p class="hint"><b>decir</b> (reći): <i>digo</i>, a u čizmi još i e→i: <i>dices, dice, dicen</i> (nosotros: <i>decimos</i>).</p>`},
{t:"Verbos reflexivos", mark:"pink", cat:"verbos", hr:"Povratni glagoli (sa -se), kao hrvatski «se»: levantarse = ustati se, me levanto = ustajem se.", html:`
<p>Kad radnju radiš sam sebi (tuširaš se, oblačiš se), glagol ima <b>-se</b> na kraju. U rečenici se taj «se» mijenja po osobi i ide <b>ispred</b> glagola.</p>
<p class="formula">levantar<u>se</u> → <b>me</b> + levant<b>o</b> = me levanto (ustajem se)</p>
<ol class="steps"><li>Makni <b>-se</b>.</li><li>Konjugiraj normalno.</li><li>Dodaj zamjenicu ispred.</li></ol>
<div class="tbl"><table class="para"><thead><tr><th></th><th>jednina</th><th>množina</th></tr></thead><tbody>
<tr><th>1.</th><td><i>me levanto</i> <small>ustajem se</small></td><td><i>nos acostamos</i> <small>idemo spavati</small></td></tr>
<tr><th>2.</th><td><i>te duchas</i> <small>tuširaš se</small></td><td><i>os vestís</i> <small>oblačite se</small></td></tr>
<tr><th>3.</th><td><i>se lava</i> <small>pere se</small></td><td><i>se peinan</i> <small>češljaju se</small></td></tr></tbody></table></div>`},
{t:"Ser · estar · hay", mark:"yellow", cat:"usos", hr:"Tri načina za «biti / ima»: tko si (ser), kako si i gdje si (estar), što postoji (hay).", html:`
<ul class="rules">
<li><code>SER</code><span>trajno: tko, što, odakle, zanimanje, karakter<br><i>Soy de Zagreb.</i> = Iz Zagreba sam. <i>Es médico.</i> = On je liječnik. <i>Es aburrido.</i> = Dosadan je (takav je).</span></li>
<li><code>ESTAR</code><span>stanje sada i gdje se nešto nalazi<br><i>Estoy cansado.</i> = Umoran sam. <i>El café está en el armario.</i> = Kava je u ormaru.</span></li>
<li><code>HAY</code><span>«ima», nešto postoji: hay + un/una/dos/muchos/imenica<br><i>Hay una toalla.</i> = Ima jedan ručnik.</span></li>
</ul>
<p class="formula">HAY + el/la/los/las = ✗ uvijek greška</p>
<p class="hint">Hay kaže <b>da</b> nešto postoji (nova informacija), estar kaže <b>gdje</b> je nešto što već znamo: <i>Hay un gato.</i> → <i>El gato está en el sofá.</i></p>
<p class="hint">tengo calor / frío / sueño = vruće mi je / hladno mi je / pospan sam. «Estoy caliente» je nepristojno!</p>`},
{t:"Gustar", mark:"yellow", cat:"usos", hr:"Kako reći da ti se nešto sviđa: me gusta = sviđa mi se.", html:`
<p>Gustar radi kao hrvatski «sviđati se»: ono što se sviđa je subjekt. Zato kažemo <i>me gusta</i> (sviđa <b>mi</b> se), a ne «yo gusto».</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>jednina</th><th>množina</th></tr></thead><tbody>
<tr><th>1.</th><td><small>(a mí)</small> <i>me</i> <small>meni</small></td><td><small>(a nosotros)</small> <i>nos</i> <small>nama</small></td></tr>
<tr><th>2.</th><td><small>(a ti)</small> <i>te</i> <small>tebi</small></td><td><small>(a vosotros)</small> <i>os</i> <small>vama</small></td></tr>
<tr><th>3.</th><td><small>(a él / ella)</small> <i>le</i> <small>njemu / njoj</small></td><td><small>(a ellos)</small> <i>les</i> <small>njima</small></td></tr></tbody></table></div>
<ul class="rules">
<li><code>gusta</code><span>+ jedna stvar ili glagol · <i>Me gusta el café.</i> = Sviđa mi se kava. <i>Me gusta nadar.</i> = Volim plivati.</span></li>
<li><code>gustan</code><span>+ više stvari · <i>Me gustan los gatos.</i> = Sviđaju mi se mačke.</span></li>
</ul>
<p class="sub">Odgovor na tuđe mišljenje</p>
<div class="duo">
<div class="tbl"><table class="para"><thead><tr><th colspan="2">Slažem se</th></tr></thead><tbody>
<tr><th>Me gusta.</th><td><i>A mí también.</i> <small>I meni.</small></td></tr><tr><th>No me gusta.</th><td><i>A mí tampoco.</i> <small>Ni meni.</small></td></tr></tbody></table></div>
<div class="tbl"><table class="para"><thead><tr><th colspan="2">Ne slažem se</th></tr></thead><tbody>
<tr><th>Me gusta.</th><td><i>A mí no.</i> <small>Meni ne.</small></td></tr><tr><th>No me gusta.</th><td><i>A mí sí.</i> <small>Meni da.</small></td></tr></tbody></table></div>
</div>`},
{t:"Género y plural", mark:"yellow", cat:"nombres", hr:"Kako od muškog roda napraviti ženski (chico → chica) i od jednine množinu (libro → libros).", html:`
<p class="sub">Ženski rod: promijeni kraj riječi</p>
<ul class="rules">
<li><code>-o → -a</code><span><i>chico</i> → <i>chica</i> = dečko → djevojka</span></li>
<li><code>-or → -ora</code><span><i>profesor</i> → <i>profesora</i> = profesor → profesorica</span></li>
<li><code>-és → -esa</code><span><i>francés</i> → <i>francesa</i> = Francuz → Francuskinja (naglasak nestaje)</span></li>
<li><code>-án → -ana</code><span><i>alemán</i> → <i>alemana</i> = Nijemac → Njemica</span></li>
</ul>
<p class="hint">Isti oblik za oba roda: <b>-ista</b> (periodista), <b>-e / -ante / -ente</b> (estudiante; ali <i>dependiente → dependienta</i>), <b>-a</b> (croata, belga), <b>-í</b> (marroquí). Rod se tada vidi po članu: <i>el periodista</i>, <i>la periodista</i>.</p>
<p class="sub">Množina: dodaj -s ili -es</p>
<ul class="rules">
<li><code>samoglasnik + s</code><span>riječ završava na a, e, i, o, u · <i>libro</i> → <i>libros</i> = knjige</span></li>
<li><code>suglasnik + es</code><span>riječ završava na suglasnik · <i>reloj</i> → <i>relojes</i> = satovi</span></li>
<li><code>z → ces</code><span>z se pretvara u c · <i>cruz</i> → <i>cruces</i> = križevi</span></li>
</ul>`},
{t:"Posesivos y demostrativos", mark:"yellow", cat:"nombres", hr:"Moj, tvoj, njegov (mi, tu, su) i ovaj, ova, ovi (este, esta, estos).", html:`
<p>Posvojna riječ se slaže s onim što <b>posjeduješ</b>, ne s vlasnikom: <i>mis libros</i> = moje knjige (više knjiga → mis).</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>jedna stvar</th><th>više stvari</th></tr></thead><tbody>
<tr><th>yo <small>moj</small></th><td><i>mi</i></td><td><i>mis</i></td></tr>
<tr><th>tú <small>tvoj</small></th><td><i>tu</i></td><td><i>tus</i></td></tr>
<tr><th>él / usted <small>njegov, njezin, Vaš</small></th><td><i>su</i></td><td><i>sus</i></td></tr>
<tr><th>nosotros <small>naš</small></th><td><i>nuestro</i> / <i>nuestra</i></td><td><i>nuestros</i> / <i>nuestras</i></td></tr>
<tr><th>vosotros <small>vaš</small></th><td><i>vuestro</i> / <i>vuestra</i></td><td><i>vuestros</i> / <i>vuestras</i></td></tr>
<tr><th>ellos / ustedes <small>njihov, Vaš</small></th><td><i>su</i></td><td><i>sus</i></td></tr></tbody></table></div>
<p class="hint">Samo naš i vaš imaju i ženski rod: <i>nuestra casa</i> = naša kuća. <i>Su casa</i> može biti njegova, njezina, njihova ili Vaša kuća.</p>
<p class="sub">Ovaj, ova, ovi, ove</p>
<div class="tbl"><table class="para"><thead><tr><th>ovaj…</th><th>muški</th><th>ženski</th></tr></thead><tbody>
<tr><th>jednina</th><td><i>este</i> <small>ovaj</small></td><td><i>esta</i> <small>ova</small></td></tr>
<tr><th>množina</th><td><i>estos</i> <small>ovi</small></td><td><i>estas</i> <small>ove</small></td></tr></tbody></table></div>
<p class="hint">Mješovita grupa → muški rod: <i>Estos son Ana y Pablo.</i> = Ovo su Ana i Pablo.</p>`},
{t:"Artículos", mark:"yellow", cat:"nombres", hr:"el / la = određena, poznata stvar (ta kuća); un / una = bilo koja ili prvi put spomenuta (neka kuća).", html:`
<p>Hrvatski nema članove, španjolski ih stavlja ispred gotovo svake imenice. Član pokazuje rod i broj.</p>
<div class="duo">
<div class="tbl"><table class="para"><thead><tr><th>određeni</th><th>muški</th><th>ženski</th></tr></thead><tbody>
<tr><th>jednina</th><td><i>el</i></td><td><i>la</i></td></tr>
<tr><th>množina</th><td><i>los</i></td><td><i>las</i></td></tr></tbody></table></div>
<div class="tbl"><table class="para"><thead><tr><th>neodređeni</th><th>muški</th><th>ženski</th></tr></thead><tbody>
<tr><th>jednina</th><td><i>un</i></td><td><i>una</i></td></tr>
<tr><th>množina</th><td><i>unos</i> <small>neki</small></td><td><i>unas</i> <small>neke</small></td></tr></tbody></table></div>
</div>
<ul class="rules">
<li><code>un / una</code><span>prvi put spominješ · <i>Tengo un perro.</i> = Imam (jednog) psa.</span></li>
<li><code>el / la</code><span>već znamo o kojem je riječ · <i>El perro se llama Rufo.</i> = (Taj) pas se zove Rufo.</span></li>
</ul>
<p class="hint">primer / tercer ispred muške imenice: <i>el primer piso</i> = prvi kat, <i>el tercer piso</i> = treći kat.</p>`},
{t:"La hora", mark:"blue", cat:"numeros", hr:"Kako reći koliko je sati (Son las dos) i u koliko sati se nešto događa (a las dos).", html:`
<ul class="rules">
<li><code>¿Qué hora es?</code><span>Koliko je sati? → <i>Son las dos.</i> = Dva je sata.</span></li>
<li><code>¿A qué hora…?</code><span>U koliko sati? → <i>A las dos.</i> = U dva sata.</span></li>
</ul>
<ul class="rules">
<li><code>la una</code><span>1 sat je jednina: <i>Es la una.</i> · 12:45 = <i>Es la una menos cuarto</i></span></li>
<li><code>ostalo</code><span>množina: <i>Son las…</i> · 1:45 = <i>Son las dos menos cuarto</i></span></li>
</ul>
<div class="tbl"><table class="para"><tbody>
<tr><th>:00</th><td><i>en punto</i> <small>točno</small></td><th>:15</th><td><i>y cuarto</i> <small>i četvrt</small></td></tr>
<tr><th>:30</th><td><i>y media</i> <small>i pol</small></td><th>:45</th><td><i>menos cuarto</i> <small>manje četvrt</small></td></tr></tbody></table></div>
<ul class="rules">
<li><code>do pola sata</code><span>sat + <b>y</b> + minute · 2:10 = <i>Son las dos y diez.</i></span></li>
<li><code>poslije pola</code><span>sljedeći sat + <b>menos</b> + koliko fali · 2:40 = <i>Son las tres menos veinte.</i> (tri manje dvadeset)</span></li>
</ul>
<ul class="rules">
<li><code>točan sat</code><span><i>a las ocho</i> = u osam</span></li>
<li><code>dio dana</code><span><i>por la mañana</i> = ujutro · <i>por la tarde</i> = popodne · <i>por la noche</i> = navečer</span></li>
<li><code>od – do</code><span><i>desde las ocho hasta las cuatro</i> = <i>de ocho a cuatro</i> = od osam do četiri</span></li>
</ul>`},
{t:"Números", mark:"blue", cat:"numeros", hr:"Kako se slažu brojevi od 16 do 999.", html:`
<ul class="rules">
<li><code>16–29</code><span>pišu se kao jedna riječ · <i>dieciséis</i> (16), <i>veintidós</i> (22)</span></li>
<li><code>31–99</code><span>desetica + y + jedinica · <i>treinta y dos</i> (32)</span></li>
<li><code>100</code><span>točno 100 = <i>cien</i> · 101–199 = <i>ciento…</i> (<i>ciento uno</i> = 101)</span></li>
<li><code>500 · 700 · 900</code><span>nepravilne stotice · <i>quinientos</i>, <i>setecientos</i>, <i>novecientos</i></span></li>
</ul>
<p class="hint">"y" stoji samo između desetica i jedinica: ciento <b>treinta y dos</b> (132), dos mil <b>trescientos cincuenta y dos</b> (2352).</p>`},
{t:"Imperativo regular (tú / usted)", mark:"blue", cat:"imperativo", hr:"Naredbe, upute i molbe s pravilnim glagolima: ¡Corta! = Reži! (ti) · ¡Corte! = Režite! (Vi).", html:`
<p>Imperativ koristiš kad nekome kažeš da nešto napravi: u receptu, uputama, molbi ili savjetu. <b>Tú</b> je za prijatelje, <b>usted</b> za formalno «Vi».</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>-ar</th><th>-er</th><th>-ir</th></tr></thead><tbody>
<tr><th>tú <small>= oblik za él</small></th><td><i>corta</i> <small>reži</small></td><td><i>come</i> <small>jedi</small></td><td><i>abre</i> <small>otvori</small></td></tr>
<tr><th>usted <small>= zamijeni samoglasnik</small></th><td><i>corte</i> <small>režite</small></td><td><i>coma</i> <small>jedite</small></td><td><i>abra</i> <small>otvorite</small></td></tr></tbody></table></div>
<ul class="rules">
<li><code>tú</code><span>isto kao «on radi»: <i>Lola corta</i> → <i>¡Corta, Lola!</i></span></li>
<li><code>usted</code><span>-ar dobiva <b>e</b>, -er/-ir dobivaju <b>a</b>: <i>¡Coma, señor!</i> = Jedite, gospodine!</span></li>
</ul>
<p class="hint">Ovo vrijedi samo za potvrdne naredbe. Niječno je drukčije: <i>no cortes</i> = nemoj rezati; usted ostaje isti: <i>no corte</i>. Nepravilni glagoli (ven, haz, pon…) imaju svoj list.</p>`},
{t:"Pronunciación", mark:"green", cat:"sonidos", hr:"Kako se čitaju slova koja se izgovaraju drukčije nego u hrvatskom.", html:`
<div class="tbl"><table class="para"><thead><tr><th>slovo</th><th>izgovor</th><th>primjer</th></tr></thead><tbody>
<tr><th>c + a/o/u</th><td>k</td><td><i>casa</i></td></tr>
<tr><th>c + e/i</th><td>θ (s)</td><td><i>cerveza</i></td></tr>
<tr><th>g + a/o/u</th><td>g</td><td><i>gato</i></td></tr>
<tr><th>g + e/i</th><td>h</td><td><i>gente</i></td></tr>
<tr><th>gue / gui</th><td>ge / gi</td><td><i>guitarra</i></td></tr>
<tr><th>que / qui</th><td>ke / ki</td><td><i>queso</i></td></tr>
<tr><th>h</th><td>ne čita se</td><td><i>hotel</i></td></tr>
<tr><th>j</th><td>h</td><td><i>jefe</i></td></tr>
<tr><th>ll</th><td>j</td><td><i>llamo</i></td></tr>
<tr><th>ñ</th><td>nj</td><td><i>España</i></td></tr>
<tr><th>z</th><td>θ (s)</td><td><i>zapato</i></td></tr></tbody></table></div>
<p class="hint">θ je kao englesko «th» u «think»: vrh jezika između zubi. U Latinskoj Americi se izgovara kao s.</p>`},
{t:"¿Qué o cuál?", mark:"green", cat:"sonidos", hr:"Oba znače «što / koji», ali idu u različita pitanja.", html:`
<ul class="rules">
<li><code>qué + imenica</code><span>koji? · <i>¿Qué libro lees?</i> = Koju knjigu čitaš?</span></li>
<li><code>qué + glagol</code><span>što? · <i>¿Qué haces?</i> = Što radiš? · definicija: <i>¿Qué es una tumbona?</i> = Što je ležaljka?</span></li>
<li><code>cuál + es / son</code><span>koji? (podatak, izbor) · <i>¿Cuál es tu número?</i> = Koji je tvoj broj? (ne: <i>¿Qué es tu número?</i>)</span></li>
</ul>`}
];
