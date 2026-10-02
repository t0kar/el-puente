// Service worker: shows daily reminders sent by .github/workflows/remind.yml and opens the app on tap.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data && e.data.text() }; }
  const scope = self.registration.scope;
  e.waitUntil(self.registration.showNotification(d.title || "Cruza el Puente", {
    body: d.body || "¿Repasamos 5 minutos?",
    icon: scope + "favicon.svg",
    badge: scope + "favicon.svg",
    tag: d.tag || "reminder",
    data: { url: d.url || scope },
  }));
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const open = wins.find(w => w.url.startsWith(self.registration.scope));
    if (open) return open.focus();
    return self.clients.openWindow(url);
  })());
});
