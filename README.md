# Cruza el Puente

Aplikacija za ponavljanje španjolskog za polaznike škole El Puente (A1.1 → A1.2, a kasnije i dalje): kartice s razmaknutim
ponavljanjem, glagoli kao formule, interaktivna «čizma», brojevi, sat, diktat, priče s prazninama i čitanjem naglas, te gramatika
na jednom mjestu.

Radi na mobitelu i računalu (PWA). Prijava Google računom sprema napredak u oblak (Firebase), pa svatko ima svoj napredak na svim
uređajima. Bez prijave sve radi, ali samo u tom pregledniku.

**Stack:** React 18 · TypeScript (strict) · Vite 5 · čisti CSS s design tokenima · Firebase Auth (Google) + Firestore · Web Push ·
GitHub Pages preko GitHub Actions (Firebase Hosting je pripremljen).

## Pokretanje lokalno

Treba Node 22+.

```bash
npm install
cp .env.example .env.local   # neobavezno: upiši Firebase vrijednosti (vidi dolje)
npm run dev                  # http://localhost:5173/el-puente/
```

Bez `.env.local` aplikacija radi u lokalnom načinu (bez prijave i obavijesti).

| Naredba             | Što radi                                                    |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | razvojni server                                             |
| `npm run check`     | **prije svakog pusha:** typecheck + lint + format + testovi |
| `npm run build`     | produkcijski build u `dist/`                                |
| `npm run preview`   | posluži `dist/` lokalno                                     |
| `npm test`          | testovi (Vitest), `npm run test:watch` za rad               |
| `npm run lint`      | ESLint (`lint:fix` popravlja što može)                      |
| `npm run format`    | Prettier formatira kod (`format:check` samo provjerava)     |
| `npm run typecheck` | TypeScript provjera                                         |

CI (`deploy.yml`) pokreće `npm run check` prije builda, pa neispravan kod ili sadržaj ne ide van.

## Struktura

```
src/
  main.tsx, App.tsx    ulaz i "ljuska" aplikacije (zaglavlje, kartice, trenutni ekran)
  app/                 navigacija (hash rute + tipka natrag), zaglavlje, traka kartica, tema, ErrorBoundary
  features/            jedna mapa po ekranu: home, practice (sesija pitanja), cards, verbs, games, stories,
                       sheets, progress, settings. Komponente i CSS koji pripadaju samo tom ekranu žive tu.
  components/          dijeljene UI komponente (Seg, Hint, SpeakBtn, ConjGrid, Boot, ikone…)
  hooks/               dijeljeni React hookovi (useReader, useSync, useToast)
  lib/                 logika bez Reacta: store i sinkronizacija, SRS, provjera odgovora, glagoli, brojevi, govor, push
  content/             gradivo po razinama (a1.1/, a1.2/), levels.ts, updates.json
  styles/              tokens.css → base.css → layout.css → components.css
scripts/               skripte za GitHub Actions (podsjetnik, obavijest o novom gradivu) + testovi
public/                ikona, manifest, service worker (sw.js)
docs/                  ADDING_CONTENT.md (kako dodati gradivo)
```

Detaljniji vodič (gdje ide nova stvar, konvencije, zamke) je u [`AGENTS.md`](AGENTS.md). Pišemo ga za AI agente, ali vrijedi i za ljude.

## Stil i komponente

- **Čisti CSS + CSS varijable (design tokeni)**, bez UI biblioteke. Izgled "bilježnice" (crtovlje, plava tinta, markeri) i narančasta
  boja škole su posebni. Tailwind, shadcn ili MUI značili bi prepisivanje svega bez stvarne koristi.
- **Tokeni** su u [`src/styles/tokens.css`](src/styles/tokens.css): boje (svijetla i tamna tema), razmaci `--sp-*`, radijusi
  `--r-*`, veličine fonta `--fs-*`, `--tap` (44 px). Boje se nikad ne pišu izravno u komponente.
- **Dijeljeni stilovi** (gumbi `.btn`, `.chip`, `.card`, `<Seg>`, `.mark`…) su u `components.css`. Stil jednog ekrana je u
  `features/<ekran>/<ekran>.css`.
- **Pristupačnost:** pravi `<button>`, `aria-label` na gumbima sa samo ikonom, `lang="hr"` na hrvatskom tekstu, vidljiv fokus,
  mete od 44 px. ESLint (`jsx-a11y`) pazi na osnovno.
- **Ako zatreba** složeniji widget (dijalog, izbornik), dodaje se samo taj Radix primitiv, a ne cijela biblioteka.

## Konvencije

- **Samo arrow funkcije** (`const X = () => …`), i za komponente i za hookove. ESLint to provjerava. Iznimka je klasna komponenta
  koju React traži (ErrorBoundary).
- Imenovani exporti, bez "barrel" datoteka. Komponente `PascalCase.tsx`, hookovi `useX.ts`, ostalo `camelCase.ts`.
- Test stoji pokraj koda (`x.test.ts`) i testira ponašanje, ne implementaciju.
- Sučelje je na španjolskom, a objašnjenja na hrvatskom (komponenta `<Hint>`).
- Zvuk se ne pušta sam od sebe, osim ako korisnik to uključi.
- Prije pusha: `npm run check`. Za promjene sučelja pogledaj ga na mobitelu (375 px) i na računalu, u svijetloj i tamnoj temi.

## Dodavanje gradiva

Vidi [`docs/ADDING_CONTENT.md`](docs/ADDING_CONTENT.md). Najlakše je u Claude Codeu: pošalji slike bilježnice i napiši
`/nueva-clase`.

## Postavljanje (jednom)

### 1. Firebase (besplatni Spark plan)

1. https://console.firebase.google.com → **Add project** (npr. `el-puente`). Google Analytics nije potreban.
2. **Build → Authentication → Get started → Sign-in method → Google → Enable.**
3. **Authentication → Settings → Authorized domains → Add domain:** `<tvoj-github-username>.github.io`
4. **Build → Firestore Database → Create database** → production mode → regija `eur3` (Europa).
5. **Firestore → Rules** → zalijepi sadržaj datoteke [`firestore.rules`](firestore.rules) → **Publish**.
6. **Project settings (zupčanik) → General → Your apps → Web (`</>`)** → registriraj app. Iz `firebaseConfig` trebaju ti `apiKey`, `authDomain`, `projectId`, `appId`.

Ove vrijednosti nisu tajne (Firebase web config je javan po dizajnu). Podatke štite Firestore pravila: svaki korisnik čita i piše samo svoj dokument `users/{uid}`.

### 2. GitHub

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → Variables → New repository variable**, dodaj četiri varijable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
3. **Actions → Deploy to GitHub Pages → Run workflow** (ili samo pushaj na `main`).

Aplikacija je na `https://<username>.github.io/el-puente/`. Taj link pošalji kolegama.

### 3. Obavijesti (neobavezno)

Postoje dvije vrste push obavijesti. Korisnik ih uključuje u **Ajustes → Notificaciones** (treba prijava):

- **Recordatorio diario:** GitHub Actions ([`remind.yml`](.github/workflows/remind.yml)) svakih 15 minuta šalje podsjetnik onima
  koji taj dan još nisu vježbali, u vrijeme koje su odabrali.
- **Contenido nuevo:** nakon svakog uspješnog deploya ([`notify-content.yml`](.github/workflows/notify-content.yml)) pretplaćeni
  uređaji dobiju obavijest o najnovijem satu iz `updates.json`, jednom po uređaju. Oznaka «Novedades» u aplikaciji radi i bez ovoga.

Postavljanje:

1. Generiraj VAPID ključeve (jednom):
   ```bash
   npx web-push generate-vapid-keys
   ```
2. GitHub → **Settings → Secrets and variables → Actions**:
   - **Variables:** `VITE_VAPID_PUBLIC_KEY` = Public Key, `VAPID_SUBJECT` = `mailto:tvoj@email.com`
   - **Secrets:** `VAPID_PRIVATE_KEY` = Private Key
3. Firebase → **Project settings → Service accounts → Generate new private key** → cijeli sadržaj JSON datoteke spremi kao secret `FIREBASE_SERVICE_ACCOUNT`. (Ta datoteka je tajna, nemoj je commitati.)
4. Firestore → **Rules** → zalijepi novu verziju [`firestore.rules`](firestore.rules) → **Publish** (pravilo za `users/{uid}/push`).
5. Ponovno pokreni **Deploy to GitHub Pages** da build dobije javni ključ. Provjera: **Actions → Daily reminders** ili
   **New content notification → Run workflow** s uključenim _Dry run_. U logu piše koliko bi obavijesti bilo poslano.

Napomene:

- **iPhone/iPad:** obavijesti rade samo kad je aplikacija dodana na početni zaslon (Safari → Dijeli → Dodaj na početni zaslon), iOS 16.4+.
- GitHub zna zakasniti s pokretanjem nekoliko minuta, zato se podsjetnik šalje u prozoru od 2 sata nakon odabranog vremena, najviše jednom dnevno.
- O satu starijem od 10 dana obavijest se ne šalje.
- GitHub pauzira zakazane workflowe nakon 60 dana bez aktivnosti u repozitoriju. Tada ih ponovno uključi u **Actions**.

### 4. Prelazak na Firebase Hosting (kad poželiš ljepšu adresu)

Pripremljeno je, ali isključeno. Adresa će biti `https://<projekt>.web.app`.

1. Firebase → **Project settings → Service accounts**: napravi ključ servisnog računa koji ima ulogu **Firebase Hosting Admin**
   (ili pokreni `npx firebase-tools init hosting:github`, koji ga sam napravi) i spremi ga kao GitHub secret `FIREBASE_HOSTING_SERVICE_ACCOUNT`.
2. Firebase → **Authentication → Settings → Authorized domains**: dodaj `<projekt>.web.app`.
3. GitHub → **Variables:** dodaj `HOSTING` = `firebase`. Od tada [`deploy-firebase.yml`](.github/workflows/deploy-firebase.yml)
   objavljuje na Firebase (build s `BASE=/`), a GitHub Pages deploy se preskače.
4. Javi kolegama novu adresu. Napredak prijavljenih korisnika je u oblaku, a neprijavljeni na novoj adresi kreću ispočetka
   (localStorage je vezan uz domenu). Prije prelaska mogu prenijeti napredak kodom iz Ajustes → Copia de seguridad.

## Varijable okruženja

| Varijabla                                                                           | Gdje                           | Tajna?                |
| ----------------------------------------------------------------------------------- | ------------------------------ | --------------------- |
| `VITE_FIREBASE_API_KEY`, `_AUTH_DOMAIN`, `_PROJECT_ID`, `_APP_ID`                   | `.env.local`, GitHub Variables | ne (javni web config) |
| `VITE_VAPID_PUBLIC_KEY`, `VAPID_SUBJECT`                                            | `.env.local`, GitHub Variables | ne                    |
| `VAPID_PRIVATE_KEY`, `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_HOSTING_SERVICE_ACCOUNT` | samo GitHub Secrets            | **da**                |
| `HOSTING`                                                                           | GitHub Variables               | ne                    |

Sve s prefiksom `VITE_` završi u kodu u pregledniku, zato tamo nikad ne ide ništa tajno.

## Besplatni limiti

Firestore Spark: 1 GB, 50 000 čitanja i 20 000 pisanja dnevno. Jedan korisnik ima jedan dokument (~30–60 KB) i piše ga najviše jednom u 2 sekunde dok vježba. To je dovoljno za desetke aktivnih korisnika. Podsjetnici dodaju otprilike 2 čitanja po pretplaćenom uređaju svakih 15 minuta (≈ 200 dnevno po uređaju).
