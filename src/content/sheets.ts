// Grammar summaries as small HTML snippets. Optional u: update id.
import type { Sheet } from "../lib/types";

export const SHEETS: Sheet[] = [
{t:"Verbos regulares", mark:"pink", html:`
<p class="formula">glagol = <b>osnova</b> + <b>nastavak</b><br>trabaj<u>ar</u> → trabaj + <u>o</u> = trabajo</p>
<div class="tbl"><table><thead><tr><th></th><th>-AR</th><th>-ER</th><th>-IR</th></tr></thead><tbody>
<tr><td>yo</td><td>-o</td><td>-o</td><td>-o</td></tr><tr><td>tú</td><td>-as</td><td>-es</td><td>-es</td></tr>
<tr><td>él/ella/usted</td><td>-a</td><td>-e</td><td>-e</td></tr><tr><td>nosotros</td><td>-amos</td><td>-emos</td><td>-imos</td></tr>
<tr><td>vosotros</td><td>-áis</td><td>-éis</td><td>-ís</td></tr><tr><td>ellos/ustedes</td><td>-an</td><td>-en</td><td>-en</td></tr></tbody></table></div>
<p class="hint">-ER i -IR razlikuju se samo u nosotros i vosotros.</p>`},
{t:"Cambio de vocal: la «bota»", mark:"pink", html:`
<p class="formula">f(osnova) = o→ue · e→ie · e→i · u→ue<br>primijeni samo na yo, tú, él, ellos</p>
<div class="boot" aria-label="Bota"><span class="in">duermo</span><span class="out">dormimos</span><span class="in">duermes</span><span class="out">dormís</span><span class="in">duerme</span><span class="in">duermen</span></div>
<p class="hint">Obojana polja čine «čizmu». Nosotros i vosotros su izvan čizme pa ostaju bez promjene.</p>
<p><b>o→ue</b> dormir, volver, almorzar, poder, acostarse · <b>e→ie</b> empezar, querer, preferir, entender, despertarse, sentarse, sentirse, mentir · <b>e→i</b> pedir, repetir, vestirse, decir · <b>u→ue</b> jugar</p>`},
{t:"Verbos irregulares", mark:"pink", html:`
<div class="tbl"><table><thead><tr><th></th><th>ser</th><th>estar</th><th>tener</th><th>ir</th></tr></thead><tbody>
<tr><td>yo</td><td>soy</td><td>estoy</td><td>tengo</td><td>voy</td></tr><tr><td>tú</td><td>eres</td><td>estás</td><td>tienes</td><td>vas</td></tr>
<tr><td>él</td><td>es</td><td>está</td><td>tiene</td><td>va</td></tr><tr><td>nosotros</td><td>somos</td><td>estamos</td><td>tenemos</td><td>vamos</td></tr>
<tr><td>vosotros</td><td>sois</td><td>estáis</td><td>tenéis</td><td>vais</td></tr><tr><td>ellos</td><td>son</td><td>están</td><td>tienen</td><td>van</td></tr></tbody></table></div>
<p>Samo <b>yo</b> je nepravilan: sal<b>go</b>, ha<b>go</b>, <b>sé</b> (saber), di<b>go</b> (decir).</p>`},
{t:"Verbos reflexivos", mark:"pink", html:`
<p class="formula">levantar<u>se</u> → <b>me</b> + levant<b>o</b></p>
<p>1. Makni -se. 2. Konjugiraj normalno. 3. Dodaj zamjenicu ispred.</p>
<p class="formula">me · te · se · nos · os · se</p>
<p>me levanto, te duchas, se lava, nos acostamos, os vestís, se peinan</p>`},
{t:"Ser · estar · hay", mark:"yellow", html:`
<p><b>SER</b> = trajno: tko, što, odakle, zanimanje, karakter. <i>Soy de Zagreb. Es médico. Es aburrido.</i></p>
<p><b>ESTAR</b> = stanje i lokacija. <i>Estoy cansado. El café está en el armario.</i></p>
<p><b>HAY</b> = postojanje: hay + un/una/dos/muchos/imenica. <i>Hay una toalla.</i></p>
<p class="formula">HAY + el/la/los/las = ✗ uvijek greška</p>
<p class="hint">tengo calor / frío / sueño = meni je vruće / hladno / pospan sam. «Estoy caliente» je nepristojno!</p>`},
{t:"Gustar", mark:"yellow", html:`
<p class="formula">(a mí) me · (a ti) te · (a él) le · (a nosotros) nos · (a vosotros) os · (a ellos) les</p>
<p class="formula">+ gusta → jednina ili infinitiv<br>+ gustan → množina</p>
<p><i>Me gusta el café. Me gusta nadar. Me gustan los gatos.</i></p>
<p>Slažem se: <b>también</b> (uz da) / <b>tampoco</b> (uz ne). Ne slažem se: <b>A mí sí</b> / <b>A mí no</b>.</p>`},
{t:"Género y plural", mark:"yellow", html:`
<p class="formula">-o → -a · -or → -ora · -és → -esa · -án → -ana</p>
<p>Isti oblik za oba roda: <b>-ista</b> (periodista), <b>-e / -ante / -ente</b> (estudiante), <b>-a</b> (croata, belga), <b>-í</b> (marroquí).</p>
<p class="formula">plural: samoglasnik + s · suglasnik + es · z → ces</p>
<p><i>libro → libros · reloj → relojes · cruz → cruces</i></p>`},
{t:"Posesivos y demostrativos", mark:"yellow", html:`
<p class="formula">mi/mis · tu/tus · su/sus · nuestro/a(s) · vuestro/a(s) · su/sus</p>
<p class="formula">este (m.) · esta (ž.) · estos (m. mn.) · estas (ž. mn.)</p>
<p class="hint">Mješovita grupa → muški rod: Estos son Ana y Pablo.</p>`},
{t:"Artículos", mark:"yellow", html:`
<p class="formula">određeni: el · la · los · las<br>neodređeni: un · una · unos · unas</p>
<p class="hint">primer / tercer ispred muške imenice: el primer piso, el tercer piso.</p>`},
{t:"La hora", mark:"blue", html:`
<p class="formula">1:xx → Es la una · ostalo → Son las …</p>
<p class="formula">:00 en punto · :15 y cuarto · :30 y media · :45 menos cuarto</p>
<p class="formula">minute ≤ 30 → hora + y + min<br>minute > 30 → (hora+1) + menos + (60−min)</p>
<p><i>2:40 = Son las tres menos veinte.</i></p>
<p>Točno vrijeme: <b>a las</b> ocho. Bez sata: <b>por</b> la mañana. Od-do: <b>desde las</b> 8 <b>hasta las</b> 4 = <b>de</b> 8 <b>a</b> 4.</p>`},
{t:"Números", mark:"blue", html:`
<p class="formula">16–29 = jedna riječ: dieciséis, veintidós<br>31–99 = desetica + y + jedinica: treinta y dos</p>
<p class="formula">100 = cien · 101+ = ciento… · 500 quinientos · 700 setecientos · 900 novecientos</p>
<p class="hint">"y" stoji samo između desetica i jedinica: ciento <b>treinta y dos</b>, dos mil <b>trescientos cincuenta y dos</b>.</p>`},
{t:"Imperativo (tú / usted)", mark:"blue", html:`
<p class="formula">tú = oblik za él: corta, come, abre</p>
<p class="formula">usted = zamijeni samoglasnik: -ar → -e · -er/-ir → -a<br>corte, coma, abra</p>
<p>Za: naredbe, upute, molbe, preporuke.</p>`},
{t:"Pronunciación", mark:"green", html:`
<p class="formula">c + a/o/u = k · c + e/i = θ (s)<br>g + a/o/u = g · g + e/i = h<br>gue/gui = ge/gi · que/qui = ke/ki</p>
<p class="formula">h = tiho · j = h · ll = j · ñ = nj · z = θ (s)</p>
<p><i>casa, cerveza, gato, gente, guitarra, queso, hotel, jefe, llamo, España, zapato</i></p>`},
{t:"¿Qué o cuál?", mark:"green", html:`
<p class="formula">qué + imenica / glagol · cuál + glagol</p>
<p><i>¿Qué libro lees? ¿Qué haces? ¿Cuál es tu número?</i></p>`}
];
