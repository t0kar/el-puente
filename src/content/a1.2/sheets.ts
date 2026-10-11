// A1.2 grammar sheets — same format as ../a1.1/sheets.ts.
import type { Sheet } from "../../lib/types";

export const SHEETS: Sheet[] = [
{t:"Imperativo: formas irregulares", mark:"blue", u:"2026-10-06", html:`
<p class="formula">usted = oblik za <b>yo</b> bez -o + <u>a</u><br>teng<u>o</u> → teng<u>a</u> · pong<u>o</u> → pong<u>a</u></p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>tú</th><th>usted</th></tr></thead><tbody>
<tr><th>venir</th><td><i>ven</i></td><td><i>venga</i></td></tr><tr><th>decir</th><td><i>di</i></td><td><i>diga</i></td></tr>
<tr><th>salir</th><td><i>sal</i></td><td><i>salga</i></td></tr><tr><th>hacer</th><td><i>haz</i></td><td><i>haga</i></td></tr>
<tr><th>tener</th><td><i>ten</i></td><td><i>tenga</i></td></tr><tr><th>poner</th><td><i>pon</i></td><td><i>ponga</i></td></tr>
<tr><th>ir</th><td><i>ve</i></td><td class="hl"><i>vaya</i></td></tr><tr><th>ser</th><td><i>sé</i></td><td class="hl"><i>sea</i></td></tr></tbody></table></div>
<p class="hint">Iznimke za usted (označeno): <b>ir → vaya</b>, <b>ser → sea</b>. <i>Vete</i> = idi, odlazi (od <i>irse</i>). <i>Sé</i> (budi) piše se isto kao <i>sé</i> (znam).</p>`},
{t:"Imperativo con -se", mark:"blue", u:"2026-10-06", html:`
<p class="formula">zamjenica ide <b>na kraj</b>: tú + <u>te</u> · usted + <u>se</u><br>ducha + te = <b>dúchate</b> · duche + se = <b>dúchese</b></p>
<div class="tbl"><table class="para"><thead><tr><th></th><th>tú</th><th>usted</th></tr></thead><tbody>
<tr><th>ducharse</th><td><i>dúchate</i></td><td><i>dúchese</i></td></tr>
<tr><th>levantarse</th><td><i>levántate</i></td><td><i>levántese</i></td></tr>
<tr><th>acostarse</th><td><i>acuéstate</i></td><td><i>acuéstese</i></td></tr>
<tr><th>sentarse</th><td><i>siéntate</i></td><td><i>siéntese</i></td></tr></tbody></table></div>
<p class="hint">Naglasak ostaje gdje je bio (<i>levanta</i> → <i>levántate</i>), pa se zbog dodanog sloga piše akcent. Promjena u čizmi ostaje: <i>acuéstate</i>.</p>`},
{t:"¿Cómo vas? en / a", mark:"green", u:"2026-10-06", html:`
<ul class="rules">
<li><code>en + vozilo</code><span><i>Voy al trabajo en metro.</i> · <i>en coche</i>, <i>en tren</i>, <i>en avión</i>, <i>en bici</i></span></li>
<li><code>a pie · a caballo</code><span>iznimke: <i>Voy a clase a pie.</i></span></li>
<li><code>a + el = al</code><span><i>Voy al trabajo.</i> · <i>Voy a la estación.</i></span></li>
<li><code>a casa</code><span>bez člana: <i>Voy a casa.</i> · <i>Voy a clase.</i></span></li>
</ul>
<p class="sub">conducir, conocer: samo <b>yo</b> → -zco</p>
<span class="words"><i>conduzco</i><i>conduces</i><i>conozco</i><i>conoces</i></span>`}
];
