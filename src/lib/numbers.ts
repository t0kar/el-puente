const U = [
  "cero",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve",
  "veinte",
  "veintiuno",
  "veintidós",
  "veintitrés",
  "veinticuatro",
  "veinticinco",
  "veintiséis",
  "veintisiete",
  "veintiocho",
  "veintinueve",
];
const T: Record<number, string> = { 3: "treinta", 4: "cuarenta", 5: "cincuenta", 6: "sesenta", 7: "setenta", 8: "ochenta", 9: "noventa" };
const HUN = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
export const num = (n: number): string => {
  if (n < 30) return U[n];
  if (n < 100) {
    const t = Math.floor(n / 10),
      u = n % 10;
    return T[t] + (u ? " y " + U[u] : "");
  }
  if (n === 100) return "cien";
  if (n < 1000) {
    const h = Math.floor(n / 100),
      r = n % 100;
    return HUN[h] + (r ? " " + num(r) : "");
  }
  const th = Math.floor(n / 1000),
    r = n % 1000;
  return (th === 1 ? "mil" : num(th) + " mil") + (r ? " " + num(r) : "");
};
export const timeES = (h24: number, m: number, withPeriod: boolean) => {
  const refH = m > 30 ? (h24 + 1) % 24 : h24;
  const h12 = refH % 12 || 12;
  const minPart =
    m === 0 ? "en punto" : m === 15 ? "y cuarto" : m === 30 ? "y media" : m === 45 ? "menos cuarto" : m < 30 ? "y " + num(m) : "menos " + num(60 - m);
  const head = h12 === 1 ? "Es la una" : "Son las " + num(h12);
  let per = "";
  if (withPeriod) per = refH >= 6 && refH < 12 ? " de la mañana" : refH >= 12 && refH < 21 ? " de la tarde" : " de la noche";
  return head + " " + minPart + per;
};
