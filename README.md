# El puente

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

## Besplatni limiti

Firestore Spark: 1 GB, 50 000 čitanja i 20 000 pisanja dnevno. Jedan korisnik ima jedan dokument (~30–60 KB) i piše ga najviše jednom u 2 sekunde dok vježba. To je dovoljno za desetke aktivnih korisnika.

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
