// Grammar summaries as small HTML snippets. Optional u: update id, lvl: level.
// Building blocks (styled in styles.css):
//   <p class="formula">…</p>                          one-line formula
//   <div class="tbl"><table class="para">…</table></div>   paradigm table (forms in <i> = tap to hear)
//   <ul class="rules"><li><code>rule</code><span>example</span></li></ul>   rule + example rows
//   <span class="words"><i>a</i><i>b</i></span>          word chips (one <i> per word, each tappable)
// widget:"boot" adds the interactive «bota» (components/Boot.tsx) after the html; its verbs come from verbs.ts
//   <div class="duo">…two tables…</div>                 side by side on wide screens
import type { Sheet } from "../../lib/types";

export const SHEETS: Sheet[] = [
{t:"Verbos regulares", mark:"pink", html:`
<p class="formula">glagol = <b>osnova</b> + <b>nastavak</b><br>trabaj<u>ar</u> → trabaj + <u>o</u> = trabajo</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>-AR</th><th>-ER</th><th>-IR</th></tr></thead><tbody>
<tr><th>yo</th><td>-o</td><td>-o</td><td>-o</td></tr><tr><th>tú</th><td>-as</td><td>-es</td><td>-es</td></tr>
<tr><th>él/ella/usted</th><td>-a</td><td>-e</td><td>-e</td></tr><tr><th>nosotros</th><td>-amos</td><td>-emos</td><td class="hl">-imos</td></tr>
<tr><th>vosotros</th><td>-áis</td><td>-éis</td><td class="hl">-ís</td></tr><tr><th>ellos/ustedes</th><td>-an</td><td>-en</td><td>-en</td></tr></tbody></table></div>
<p class="hint">-ER i -IR razlikuju se samo u nosotros i vosotros (označeno).</p>`},
{t:"Cambio de vocal: la «bota»", mark:"pink", widget:"boot", html:`
<p class="formula">mijenja se samo osnova, i to samo u yo, tú, él, ellos</p>`},
{t:"Verbos irregulares", mark:"pink", html:`
<div class="tbl"><table class="para"><thead><tr><th></th><th>ser</th><th>estar</th><th>tener</th><th>ir</th></tr></thead><tbody>
<tr><th>yo</th><td><i>soy</i></td><td><i>estoy</i></td><td><i>tengo</i></td><td><i>voy</i></td></tr><tr><th>tú</th><td><i>eres</i></td><td><i>estás</i></td><td><i>tienes</i></td><td><i>vas</i></td></tr>
<tr><th>él</th><td><i>es</i></td><td><i>está</i></td><td><i>tiene</i></td><td><i>va</i></td></tr><tr><th>nosotros</th><td><i>somos</i></td><td><i>estamos</i></td><td><i>tenemos</i></td><td><i>vamos</i></td></tr>
<tr><th>vosotros</th><td><i>sois</i></td><td><i>estáis</i></td><td><i>tenéis</i></td><td><i>vais</i></td></tr><tr><th>ellos</th><td><i>son</i></td><td><i>están</i></td><td><i>tienen</i></td><td><i>van</i></td></tr></tbody></table></div>
<p class="sub">Samo <b>yo</b> je nepravilan:</p>
<ul class="rules">
<li><code>salir</code><span><i>salgo</i></span></li><li><code>hacer</code><span><i>hago</i></span></li>
<li><code>saber</code><span><i>sé</i></span></li><li><code>decir</code><span><i>digo</i></span></li>
</ul>`},
{t:"Verbos reflexivos", mark:"pink", html:`
<p class="formula">levantar<u>se</u> → <b>me</b> + levant<b>o</b></p>
<ol class="steps"><li>Makni <b>-se</b>.</li><li>Konjugiraj normalno.</li><li>Dodaj zamjenicu ispred.</li></ol>
<div class="tbl"><table class="para"><thead><tr><th></th><th>jednina</th><th>množina</th></tr></thead><tbody>
<tr><th>1.</th><td><i>me levanto</i></td><td><i>nos acostamos</i></td></tr>
<tr><th>2.</th><td><i>te duchas</i></td><td><i>os vestís</i></td></tr>
<tr><th>3.</th><td><i>se lava</i></td><td><i>se peinan</i></td></tr></tbody></table></div>`},
{t:"Ser · estar · hay", mark:"yellow", html:`
<ul class="rules">
<li><code>SER</code><span>trajno: tko, što, odakle, zanimanje, karakter<br><i>Soy de Zagreb.</i> <i>Es médico.</i> <i>Es aburrido.</i></span></li>
<li><code>ESTAR</code><span>stanje i lokacija<br><i>Estoy cansado.</i> <i>El café está en el armario.</i></span></li>
<li><code>HAY</code><span>postojanje: hay + un/una/dos/muchos/imenica<br><i>Hay una toalla.</i></span></li>
</ul>
<p class="formula">HAY + el/la/los/las = ✗ uvijek greška</p>
<p class="hint">tengo calor / frío / sueño = meni je vruće / hladno / pospan sam. «Estoy caliente» je nepristojno!</p>`},
{t:"Gustar", mark:"yellow", html:`
<div class="tbl"><table class="para"><thead><tr><th></th><th>jednina</th><th>množina</th></tr></thead><tbody>
<tr><th>1.</th><td><small>(a mí)</small> <i>me</i></td><td><small>(a nosotros)</small> <i>nos</i></td></tr>
<tr><th>2.</th><td><small>(a ti)</small> <i>te</i></td><td><small>(a vosotros)</small> <i>os</i></td></tr>
<tr><th>3.</th><td><small>(a él / ella)</small> <i>le</i></td><td><small>(a ellos)</small> <i>les</i></td></tr></tbody></table></div>
<ul class="rules">
<li><code>gusta</code><span>+ jednina ili infinitiv · <i>Me gusta el café.</i> <i>Me gusta nadar.</i></span></li>
<li><code>gustan</code><span>+ množina · <i>Me gustan los gatos.</i></span></li>
</ul>
<div class="duo">
<div class="tbl"><table class="para"><thead><tr><th colspan="2">Slažem se</th></tr></thead><tbody>
<tr><th>Me gusta.</th><td><i>A mí también.</i></td></tr><tr><th>No me gusta.</th><td><i>A mí tampoco.</i></td></tr></tbody></table></div>
<div class="tbl"><table class="para"><thead><tr><th colspan="2">Ne slažem se</th></tr></thead><tbody>
<tr><th>Me gusta.</th><td><i>A mí no.</i></td></tr><tr><th>No me gusta.</th><td><i>A mí sí.</i></td></tr></tbody></table></div>
</div>`},
{t:"Género y plural", mark:"yellow", html:`
<p class="sub">Ženski rod</p>
<ul class="rules">
<li><code>-o → -a</code><span><i>chico</i> → <i>chica</i></span></li>
<li><code>-or → -ora</code><span><i>profesor</i> → <i>profesora</i></span></li>
<li><code>-és → -esa</code><span><i>francés</i> → <i>francesa</i></span></li>
<li><code>-án → -ana</code><span><i>alemán</i> → <i>alemana</i></span></li>
</ul>
<p class="hint">Isti oblik za oba roda: <b>-ista</b> (periodista), <b>-e / -ante / -ente</b> (estudiante), <b>-a</b> (croata, belga), <b>-í</b> (marroquí).</p>
<p class="sub">Množina</p>
<ul class="rules">
<li><code>samoglasnik + s</code><span><i>libro</i> → <i>libros</i></span></li>
<li><code>suglasnik + es</code><span><i>reloj</i> → <i>relojes</i></span></li>
<li><code>z → ces</code><span><i>cruz</i> → <i>cruces</i></span></li>
</ul>`},
{t:"Posesivos y demostrativos", mark:"yellow", html:`
<div class="tbl"><table class="para"><thead><tr><th></th><th>jedna stvar</th><th>više stvari</th></tr></thead><tbody>
<tr><th>yo</th><td><i>mi</i></td><td><i>mis</i></td></tr>
<tr><th>tú</th><td><i>tu</i></td><td><i>tus</i></td></tr>
<tr><th>él / usted</th><td><i>su</i></td><td><i>sus</i></td></tr>
<tr><th>nosotros</th><td><i>nuestro</i> / <i>nuestra</i></td><td><i>nuestros</i> / <i>nuestras</i></td></tr>
<tr><th>vosotros</th><td><i>vuestro</i> / <i>vuestra</i></td><td><i>vuestros</i> / <i>vuestras</i></td></tr>
<tr><th>ellos / ustedes</th><td><i>su</i></td><td><i>sus</i></td></tr></tbody></table></div>
<div class="tbl"><table class="para"><thead><tr><th>ovaj…</th><th>muški</th><th>ženski</th></tr></thead><tbody>
<tr><th>jednina</th><td><i>este</i></td><td><i>esta</i></td></tr>
<tr><th>množina</th><td><i>estos</i></td><td><i>estas</i></td></tr></tbody></table></div>
<p class="hint">Mješovita grupa → muški rod: <i>Estos son Ana y Pablo.</i></p>`},
{t:"Artículos", mark:"yellow", html:`
<div class="duo">
<div class="tbl"><table class="para"><thead><tr><th>određeni</th><th>muški</th><th>ženski</th></tr></thead><tbody>
<tr><th>jednina</th><td><i>el</i></td><td><i>la</i></td></tr>
<tr><th>množina</th><td><i>los</i></td><td><i>las</i></td></tr></tbody></table></div>
<div class="tbl"><table class="para"><thead><tr><th>neodređeni</th><th>muški</th><th>ženski</th></tr></thead><tbody>
<tr><th>jednina</th><td><i>un</i></td><td><i>una</i></td></tr>
<tr><th>množina</th><td><i>unos</i></td><td><i>unas</i></td></tr></tbody></table></div>
</div>
<p class="hint">primer / tercer ispred muške imenice: <i>el primer piso</i>, <i>el tercer piso</i>.</p>`},
{t:"La hora", mark:"blue", html:`
<ul class="rules">
<li><code>1:xx</code><span><i>Es la una…</i></span></li>
<li><code>ostalo</code><span><i>Son las…</i></span></li>
</ul>
<div class="tbl"><table class="para"><tbody>
<tr><th>:00</th><td><i>en punto</i></td><th>:15</th><td><i>y cuarto</i></td></tr>
<tr><th>:30</th><td><i>y media</i></td><th>:45</th><td><i>menos cuarto</i></td></tr></tbody></table></div>
<ul class="rules">
<li><code>min ≤ 30</code><span>sat + <b>y</b> + minute · <i>Son las dos y diez.</i></span></li>
<li><code>min &gt; 30</code><span>(sat + 1) + <b>menos</b> + (60 − min) · 2:40 = <i>Son las tres menos veinte.</i></span></li>
</ul>
<ul class="rules">
<li><code>točno vrijeme</code><span><i>a las ocho</i></span></li>
<li><code>bez sata</code><span><i>por la mañana</i></span></li>
<li><code>od – do</code><span><i>desde las ocho hasta las cuatro</i> = <i>de ocho a cuatro</i></span></li>
</ul>`},
{t:"Números", mark:"blue", html:`
<ul class="rules">
<li><code>16–29</code><span>jedna riječ · <i>dieciséis</i>, <i>veintidós</i></span></li>
<li><code>31–99</code><span>desetica + y + jedinica · <i>treinta y dos</i></span></li>
<li><code>100</code><span><i>cien</i> · 101+ = <i>ciento…</i></span></li>
<li><code>500 · 700 · 900</code><span><i>quinientos</i>, <i>setecientos</i>, <i>novecientos</i></span></li>
</ul>
<p class="hint">"y" stoji samo između desetica i jedinica: ciento <b>treinta y dos</b>, dos mil <b>trescientos cincuenta y dos</b>.</p>`},
{t:"Imperativo (tú / usted)", mark:"blue", html:`
<div class="tbl"><table class="para"><thead><tr><th></th><th>-ar</th><th>-er</th><th>-ir</th></tr></thead><tbody>
<tr><th>tú <small>= oblik za él</small></th><td><i>corta</i></td><td><i>come</i></td><td><i>abre</i></td></tr>
<tr><th>usted <small>= zamijeni samoglasnik</small></th><td><i>corte</i></td><td><i>coma</i></td><td><i>abra</i></td></tr></tbody></table></div>
<p class="hint">Za naredbe, upute, molbe i preporuke.</p>`},
{t:"Pronunciación", mark:"green", html:`
<div class="tbl"><table class="para"><thead><tr><th>slovo</th><th>izgovor</th><th>primjer</th></tr></thead><tbody>
<tr><th>c + a/o/u</th><td>k</td><td><i>casa</i></td></tr>
<tr><th>c + e/i</th><td>θ (s)</td><td><i>cerveza</i></td></tr>
<tr><th>g + a/o/u</th><td>g</td><td><i>gato</i></td></tr>
<tr><th>g + e/i</th><td>h</td><td><i>gente</i></td></tr>
<tr><th>gue / gui</th><td>ge / gi</td><td><i>guitarra</i></td></tr>
<tr><th>que / qui</th><td>ke / ki</td><td><i>queso</i></td></tr>
<tr><th>h</th><td>tiho</td><td><i>hotel</i></td></tr>
<tr><th>j</th><td>h</td><td><i>jefe</i></td></tr>
<tr><th>ll</th><td>j</td><td><i>llamo</i></td></tr>
<tr><th>ñ</th><td>nj</td><td><i>España</i></td></tr>
<tr><th>z</th><td>θ (s)</td><td><i>zapato</i></td></tr></tbody></table></div>`},
{t:"¿Qué o cuál?", mark:"green", html:`
<ul class="rules">
<li><code>qué + imenica</code><span><i>¿Qué libro lees?</i></span></li>
<li><code>qué + glagol</code><span><i>¿Qué haces?</i></span></li>
<li><code>cuál + glagol</code><span><i>¿Cuál es tu número?</i></span></li>
</ul>`}
];
