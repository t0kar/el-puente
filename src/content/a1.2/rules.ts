// A1.2 quick rules — same format as ../a1.1/rules.ts.
import type { Rule } from "../../lib/types";

export const RULES: Rule[] = [
{q:"(tú) ¡___ aquí, Lola!", o:["Ven","Venga","Vienes"], a:0, hr:"venir → tú: ven (nepravilno). Usted: venga.", u:"2026-10-06"},
{q:"(tú) ¡___ los deberes ahora!", o:["Haz","Haga","Haces"], a:0, hr:"hacer → tú: haz (nepravilno). Usted: haga.", u:"2026-10-06"},
{q:"(usted) Señor Gómez, ¡___ la maleta aquí, por favor!", o:["ponga","pon","pone"], a:0, hr:"Usted = oblik za yo bez -o + a: pongo → ponga.", u:"2026-10-06"},
{q:"(tú) ¡___ bueno, Paco!", o:["Sé","Sea","Eres"], a:0, hr:"ser → tú: sé (s naglaskom). Usted: sea.", u:"2026-10-06"},
{q:"(usted) ¡___ a la derecha, por favor!", o:["Vaya","Ve","Va"], a:0, hr:"ir → usted: vaya (iznimka). Tú: ve.", u:"2026-10-06"},
{q:"(tú) ¡___ ya, son las siete!", o:["Levántate","Levántese","Te levantas"], a:0, hr:"Refleksivni imperativ: zamjenica ide na kraj: levanta + te = levántate.", u:"2026-10-06"},
{q:"(usted) ¡___ antes de entrar en la piscina!", o:["Dúchese","Dúchate","Se ducha"], a:0, hr:"Usted: duche + se = dúchese (naglasak ostaje na ú).", u:"2026-10-06"},
{q:"Voy al trabajo ___ metro.", o:["en","a","por"], a:0, hr:"Prijevoz: en + vozilo (en metro, en coche, en tren).", u:"2026-10-06"},
{q:"Hoy voy a clase ___ pie.", o:["a","en","de"], a:0, hr:"Iznimke: a pie (pješice), a caballo (na konju).", u:"2026-10-06"},
{q:"(yo) No ___ por la noche.", o:["conduzco","conduco","conduces"], a:0, hr:"conducir → yo: conduzco (kao conocer → conozco).", u:"2026-10-06"}
];
