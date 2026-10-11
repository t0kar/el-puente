// A1.2 grammar sheets — same format as ../a1.1/sheets.ts (cat + hr required, explain every rule in Croatian).
import type { Sheet } from "../../lib/types";

export const SHEETS: Sheet[] = [
{t:"Imperativo: formas irregulares", mark:"blue", cat:"imperativo", u:"2026-10-06", hr:"Najčešće naredbe imaju nepravilan oblik: ¡Ven! = Dođi! · ¡Haga! = Napravite!", html:`
<p>Kod ovih glagola tú-oblik je kratak i nepravilan, pa ga treba naučiti napamet. Usted-oblik se lako izvodi iz oblika za <b>yo</b>.</p>
<p class="formula">usted = oblik za <b>yo</b> bez -o + <u>a</u><br>teng<u>o</u> (imam) → teng<u>a</u> · pong<u>o</u> (stavljam) → pong<u>a</u></p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>tú <small>ti</small></th><th>usted <small>Vi</small></th></tr></thead><tbody>
<tr><th>venir <small>doći</small></th><td><i>ven</i> <small>dođi</small></td><td><i>venga</i> <small>dođite</small></td></tr>
<tr><th>decir <small>reći</small></th><td><i>di</i> <small>reci</small></td><td><i>diga</i> <small>recite</small></td></tr>
<tr><th>salir <small>izaći</small></th><td><i>sal</i> <small>izađi</small></td><td><i>salga</i> <small>izađite</small></td></tr>
<tr><th>hacer <small>napraviti</small></th><td><i>haz</i> <small>napravi</small></td><td><i>haga</i> <small>napravite</small></td></tr>
<tr><th>tener <small>imati</small></th><td><i>ten</i> <small>imaj</small></td><td><i>tenga</i> <small>imajte</small></td></tr>
<tr><th>poner <small>staviti</small></th><td><i>pon</i> <small>stavi</small></td><td><i>ponga</i> <small>stavite</small></td></tr>
<tr><th>ir <small>ići</small></th><td><i>ve</i> <small>idi</small></td><td class="hl"><i>vaya</i> <small>idite</small></td></tr>
<tr><th>ser <small>biti</small></th><td><i>sé</i> <small>budi</small></td><td class="hl"><i>sea</i> <small>budite</small></td></tr></tbody></table></div>
<p class="sub">Primjeri</p>
<ul class="rules">
<li><code>tú</code><span><i>¡Ven a mi casa!</i> = Dođi k meni! · <i>¡Pon la mesa!</i> = Postavi stol!</span></li>
<li><code>usted</code><span><i>Venga a las ocho, por favor.</i> = Dođite u osam, molim Vas.</span></li>
</ul>
<p class="hint">Iznimke za usted (označeno): <b>ir → vaya</b>, <b>ser → sea</b>, jer yo-oblik (voy, soy) ne završava na -o. <i>Vete</i> = idi, odlazi (od <i>irse</i>). <i>Sé</i> (budi) piše se isto kao <i>sé</i> (znam).</p>`},
{t:"Imperativo con -se", mark:"blue", cat:"imperativo", u:"2026-10-06", hr:"Naredbe s povratnim glagolima: ¡Levántate! = Ustani! · ¡Siéntese! = Sjednite!", html:`
<p>U naredbi povratna zamjenica ne stoji ispred glagola nego se <b>lijepi na kraj</b>: <b>te</b> za tú, <b>se</b> za usted.</p>
<p class="formula">tú: ducha + <u>te</u> = <b>dúchate</b> (istuširaj se)<br>usted: duche + <u>se</u> = <b>dúchese</b> (istuširajte se)</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>tú <small>ti</small></th><th>usted <small>Vi</small></th></tr></thead><tbody>
<tr><th>ducharse <small>tuširati se</small></th><td><i>dúchate</i></td><td><i>dúchese</i></td></tr>
<tr><th>levantarse <small>ustati</small></th><td><i>levántate</i> <small>ustani</small></td><td><i>levántese</i> <small>ustanite</small></td></tr>
<tr><th>acostarse <small>leći</small></th><td><i>acuéstate</i> <small>lezi</small></td><td><i>acuéstese</i> <small>lezite</small></td></tr>
<tr><th>sentarse <small>sjesti</small></th><td><i>siéntate</i> <small>sjedni</small></td><td><i>siéntese</i> <small>sjednite</small></td></tr></tbody></table></div>
<p class="hint">Zašto akcent? Naglasak ostaje gdje je bio (le-<b>VAN</b>-ta → le-<b>VÁN</b>-ta-te). Kad dodaš slog, to se mora označiti akcentom. Promjena iz «čizme» ostaje: <i>acuéstate</i>, <i>siéntate</i>.</p>`},
{t:"Ir: ¿adónde? y ¿cómo?", mark:"green", cat:"preposiciones", u:"2026-10-06", hr:"Uz glagol ir (ići) idu dva prijedloga: a = kamo ideš, en = čime ideš.", html:`
<p class="formula">ir + <b>a</b> + mjesto + <b>en</b> + prijevoz<br><i>Voy a Madrid en avión.</i> = Idem u Madrid avionom.</p>
<p class="sub">Kamo? → a</p>
<ul class="rules">
<li><code>a + mjesto</code><span><i>Voy a Zagreb.</i> = Idem u Zagreb. · <i>Voy a la estación.</i> = Idem na kolodvor.</span></li>
<li><code>a + el = al</code><span>a i el se spajaju u jednu riječ · <i>Voy al trabajo.</i> = Idem na posao. (nikad «a el»)</span></li>
<li><code>bez člana</code><span><i>Voy a casa.</i> = Idem kući. · <i>Voy a clase.</i> = Idem na nastavu.</span></li>
</ul>
<p class="sub">Čime? → en</p>
<ul class="rules">
<li><code>en + vozilo</code><span>hrvatski kaže «metroom, autom», španjolski <b>en</b> + vozilo, bez člana · <i>Voy en metro.</i> = Idem metroom. · <i>en coche</i> = autom · <i>en bici</i> = biciklom</span></li>
<li><code>a pie · a caballo</code><span>iznimke, jer ne sjediš <b>u</b> vozilu · <i>Voy a pie.</i> = Idem pješice. · <i>a caballo</i> = na konju</span></li>
</ul>
<p class="hint">Pitanja: <i>¿Adónde vas?</i> = Kamo ideš? · <i>¿Cómo vas al trabajo?</i> = Kako (čime) ideš na posao?</p>`},
{t:"Verbos en -zco: conducir, conocer", mark:"pink", cat:"verbos", u:"2026-10-06", hr:"Glagoli na -cer i -cir dobivaju z samo u obliku za yo: conduzco = vozim, conozco = poznajem.", html:`
<p>Samo <b>yo</b> je nepravilan (c → <b>zc</b>). Svi ostali oblici su pravilni.</p>
<p class="formula">condu<u>cir</u> → yo condu<b>zc</b>o · cono<u>cer</u> → yo cono<b>zc</b>o</p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>conducir <small>voziti</small></th><th>conocer <small>poznavati</small></th></tr></thead><tbody>
<tr><th>yo</th><td class="hl"><i>conduzco</i></td><td class="hl"><i>conozco</i></td></tr>
<tr><th>tú</th><td><i>conduces</i></td><td><i>conoces</i></td></tr>
<tr><th>él</th><td><i>conduce</i></td><td><i>conoce</i></td></tr>
<tr><th>nosotros</th><td><i>conducimos</i></td><td><i>conocemos</i></td></tr>
<tr><th>vosotros</th><td><i>conducís</i></td><td><i>conocéis</i></td></tr>
<tr><th>ellos</th><td><i>conducen</i></td><td><i>conocen</i></td></tr></tbody></table></div>
<ul class="rules">
<li><code>yo</code><span><i>No conduzco, voy en metro.</i> = Ne vozim, idem metroom.</span></li>
<li><code>tú</code><span><i>¿Conoces a Lola?</i> = Poznaješ li Lolu?</span></li>
</ul>`}
];
