// Error reports from the app (Firestore `reports/{id}`, written by src/lib/report.ts) → GitHub issues, so the owner gets an e-mail.
// Run by .github/workflows/report-issues.yml every hour.
//   node scripts/report-issues.mjs            (needs FIREBASE_SERVICE_ACCOUNT, GITHUB_TOKEN, GITHUB_REPOSITORY)
//   DRY_RUN=1 node scripts/report-issues.mjs  print the issues, create nothing
import { isMain } from "./lib/push.mjs";

const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
/** md-safe single line */
const one = s =>
  String(s ?? "")
    .replace(/\s+/g, " ")
    .trim();

/** GitHub issue for one report document */
export const issueFor = (id, r) => {
  const c = r.ctx || {};
  const what = c.prompt ? `${one(c.prompt)}${c.answer ? " → " + one(c.answer) : ""}` : one(r.text) || "sin texto";
  const title = clip(`[Reporte] ${c.kind === "general" ? "" : (one(c.tag) || "Pregunta") + ": "}${what}`, 110);
  const rows = [
    ["Tipo", c.kind === "general" ? "general" : one(c.tag)],
    ["Pregunta", one(c.prompt)],
    ["Opciones", Array.isArray(c.options) ? c.options.map(one).join(" · ") : ""],
    ["Respuesta correcta", one(c.answer)],
    ["Nivel", one(c.lvl)],
    ["Id", c.key ? "`" + one(c.key) + "`" : ""],
  ].filter(([, v]) => v);
  const body = [
    "### Comentario",
    "",
    r.text ? "> " + String(r.text).trim().replace(/\n/g, "\n> ") : "_(sin comentario)_",
    "",
    ...(rows.length ? ["### Contexto", "", "| | |", "|---|---|", ...rows.map(([k, v]) => `| ${k} | ${String(v).replace(/\|/g, "\\|")} |`), ""] : []),
    `<sub>${new Date(r.at || Date.now()).toISOString()} · ${one(r.ua)} · report ${id}</sub>`,
  ].join("\n");
  return { title, body, labels: ["reporte"] };
};

const createIssue = async (repo, token, issue) => {
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
    body: JSON.stringify(issue),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  return (await res.json()).number;
};

const run = async () => {
  const { FIREBASE_SERVICE_ACCOUNT, GITHUB_TOKEN, GITHUB_REPOSITORY, DRY_RUN } = process.env;
  if (!FIREBASE_SERVICE_ACCOUNT || !GITHUB_TOKEN || !GITHUB_REPOSITORY) {
    console.log("report-issues: not configured (FIREBASE_SERVICE_ACCOUNT / GITHUB_TOKEN missing) — skipping.");
    return;
  }
  const { initializeApp, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  initializeApp({ credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT)) });
  const db = getFirestore();
  const snap = await db.collection("reports").orderBy("at").limit(50).get();
  let created = 0,
    failed = 0;
  for (const d of snap.docs) {
    const r = d.data();
    if (r.issue) continue;
    const issue = issueFor(d.id, r);
    if (DRY_RUN) {
      console.log(`[dry run] ${issue.title}\n${issue.body}\n`);
      continue;
    }
    try {
      const number = await createIssue(GITHUB_REPOSITORY, GITHUB_TOKEN, issue);
      await d.ref.update({ issue: number });
      created++;
    } catch (e) {
      failed++;
      console.error(`report ${d.id}:`, e?.message || e);
    }
  }
  console.log(`report-issues: ${DRY_RUN ? "[dry run] " : ""}reports ${snap.size} · issues created ${created} · failed ${failed}`);
  if (failed && !created) process.exitCode = 1;
};

if (isMain(import.meta.url))
  run().catch(e => {
    console.error(e);
    process.exitCode = 1;
  });
