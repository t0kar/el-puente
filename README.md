# Cruza el Puente

Aplikacija za ponavljanje španjolskog (A1.1 → A1.2): kartice s razmaknutim ponavljanjem, glagoli kao formule, brojevi, sat, diktat, priče s prazninama i gramatika na jednom mjestu.

Radi na mobitelu i računalu. Prijava Google računom sprema napredak u oblak (Firebase), pa svatko ima svoj napredak na svim uređajima. Bez prijave sve radi, ali samo u tom pregledniku.

**Stack:** React 18 + TypeScript + Vite · Firebase Auth (Google) + Firestore · GitHub Pages (GitHub Actions)

## Pokretanje lokalno

```bash
npm install
cp .env.example .env.local   # upiši Firebase vrijednosti (vidi dolje)
npm run dev
```

Bez `.env.local` aplikacija radi u lokalnom načinu (bez prijave).

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

### 3. Dnevni podsjetnici (neobavezno)

Podsjetnik je prava push obavijest: korisnik u **Ajustes → Recordatorio** odabere vrijeme, a GitHub Actions (`.github/workflows/remind.yml`) svakih 15 minuta pošalje obavijest onima koji taj dan još nisu vježbali. Bez ovog koraka aplikacija radi normalno, samo je odjeljak Recordatorio isključen.

1. Generiraj VAPID ključeve (jednom):
   ```bash
   npx web-push generate-vapid-keys
   ```
2. GitHub → **Settings → Secrets and variables → Actions**:
   - **Variables:** `VITE_VAPID_PUBLIC_KEY` = Public Key, `VAPID_SUBJECT` = `mailto:tvoj@email.com`
   - **Secrets:** `VAPID_PRIVATE_KEY` = Private Key
3. Firebase → **Project settings → Service accounts → Generate new private key** → cijeli sadržaj JSON datoteke spremi kao secret `FIREBASE_SERVICE_ACCOUNT`. (Ta datoteka je tajna — ne commitaj je.)
4. Firestore → **Rules** → zalijepi novu verziju [`firestore.rules`](firestore.rules) → **Publish** (dodano pravilo za `users/{uid}/push`).
5. Ponovno pokreni **Deploy to GitHub Pages** (da build dobije javni ključ). Provjera: **Actions → Daily reminders → Run workflow** s uključenim *Dry run* — u logu piše koliko bi obavijesti bilo poslano.

Napomene:
- **iPhone/iPad:** obavijesti rade samo kad je aplikacija dodana na početni zaslon (Safari → Dijeli → Dodaj na početni zaslon), iOS 16.4+.
- GitHub zna zakasniti s pokretanjem nekoliko minuta, zato se obavijest šalje u prozoru od 2 sata nakon odabranog vremena, najviše jednom dnevno.
- GitHub pauzira zakazane workflowe nakon 60 dana bez aktivnosti u repozitoriju — tada ih ponovno uključi u **Actions**.
- Lokalni test logike: `npm run remind:test`.

## Besplatni limiti

Firestore Spark: 1 GB, 50 000 čitanja i 20 000 pisanja dnevno. Jedan korisnik ima jedan dokument (~30–60 KB) i piše ga najviše jednom u 2 sekunde dok vježba. To je dovoljno za desetke aktivnih korisnika. Podsjetnici dodaju otprilike 2 čitanja po pretplaćenom uređaju svakih 15 minuta (≈ 200 dnevno po uređaju).

## Dodavanje gradiva

Vidi [`docs/ADDING_CONTENT.md`](docs/ADDING_CONTENT.md). Sav sadržaj je u `src/content/`.

## Struktura

```
src/
  content/     riječi (topics.ts), glagoli, pravila, priče, gramatika, updates.ts
  lib/         SRS algoritam, provjera odgovora, glagoli, brojevi, sinkronizacija (firebase.ts), store
  components/  Runner (sesija pitanja), UI dijelovi
  views/       Hoy, Tarjetas, Verbos, Juegos, Historias, Chuleta, Progreso, Ajustes
```
