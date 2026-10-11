// A1.2 verbs — same format as ../a1.1/verbs.ts.
import type { Verb } from "../../lib/types";

export const VERBS: Verb[] = [
 {inf:"mudarse", hr:"preseliti se", refl:true, u:"2026-10-06"},
 {inf:"conducir", hr:"voziti (auto)", irr:["conduzco","conduces","conduce","conducimos","conducís","conducen"], note:"samo yo: conduzco", u:"2026-10-06"},
 {inf:"conocer", hr:"poznavati, upoznati", irr:["conozco","conoces","conoce","conocemos","conocéis","conocen"], note:"samo yo: conozco", u:"2026-10-06"},
 {inf:"dar", hr:"dati", irr:["doy","das","da","damos","dais","dan"], note:"samo yo: doy", u:"2026-10-06"},
 {inf:"poner", hr:"staviti", irr:["pongo","pones","pone","ponemos","ponéis","ponen"], imp:["pon","ponga"], note:"samo yo: pongo", u:"2026-10-06"},
 {inf:"venir", hr:"doći", irr:["vengo","vienes","viene","venimos","venís","vienen"], imp:["ven","venga"], note:"yo: -go; tú, él, ellos: e→ie", u:"2026-10-06"}
];
