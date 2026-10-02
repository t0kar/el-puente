# Dodavanje gradiva

Sve je u `src/content/`. Nakon pusha na `main` GitHub Actions automatski objavi novu verziju.

## 1. Nova "isporuka" gradiva (nakon sata)

U `updates.ts` dodaj unos na kraj liste:

```ts
{ id: "2026-10-07", note: "la ropa, ir a + infinitivo" },
```

Zadnji unos u listi je "zadnji sat". Na početnoj stranici pojavi se kartica **Desde la última clase**, a **Antes de clase** ponavlja baš to gradivo.

## 2. Riječi → `topics.ts`

Svaka linija je jedna kartica: `español | hrvatski | id`. Treće polje je id iz `updates.ts`:

```
la camisa | košulja | 2026-10-07
```

Riječ ide u temu kojoj pripada. Nova tema je novi objekt u `TOPICS`:

```ts
{k:"ropa", t:"La ropa", hr:"odjeća", mark:"blue", v:`
la camisa | košulja | 2026-10-07
`},
```

Pravila:
- Alternative: `el zumo = el jugo` (obje se prihvaćaju), rodovi: `cansado / cansada`, suprotnosti: `fácil ≠ difícil`.
- Napomene u zagradama ne izgovaraju se i ne provjeravaju: `la planta (del edificio)`.
- Ista španjolska riječ smije se pojaviti samo jednom (duplikati se preskaču).
- Napredak je vezan uz španjolski tekst. Ispravak tipfelera u španjolskom resetira tu karticu.

## 3. Glagoli → `verbs.ts`

```ts
{ inf: "llevar", hr: "nositi", u: "2026-10-07" },                     // pravilan
{ inf: "probar", hr: "probati", type: "o-ue", u: "2026-10-07" },      // promjena u čizmi
{ inf: "ponerse", hr: "obući", refl: true, irr: ["pongo", ...] },     // nepravilan: 6 oblika
```

Oblici se računaju automatski (osnova + nastavak, promjena samoglasnika, zamjenica).

## 4. Pravila → `rules.ts`

```ts
["Mañana ___ a comer paella.", ["voy","va","vamos"], 0, "ir a + infinitiv = budućnost.", "2026-10-07"],
```

## 5. Gramatika → `sheets.ts`, priče → `stories.ts`

Priče: praznina je `{opcija|točna*|opcija::objašnjenje}`.

## 6. Razina (A1.1 / A1.2)

Sve bez oznake je **A1.1**. Novo A1.2 gradivo označi s `lvl: "A1.2"`:

```ts
{k:"ropa", t:"La ropa", hr:"odjeća", mark:"blue", lvl:"A1.2", v:`...`},   // tema (sve riječi u njoj)
{ inf: "llevar", hr: "nositi", lvl: "A1.2" },                              // glagol
{ id:"s9", ..., lvl: "A1.2" },                                             // priča / chuleta isto
["Mañana ___ a comer.", ["voy","va"], 0, "ir a + infinitiv.", "2026-10-07", "A1.2"],  // pravilo: 6. polje
```

U Ajustes → Nivel korisnik bira A1.1, A1.2 ili Ambos. Opcija A1.2 je onemogućena dok ne postoji barem jedna stvar označena s A1.2.

