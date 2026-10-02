import { getState } from "./store";

let voice: SpeechSynthesisVoice | null = null;
export let esVoices: SpeechSynthesisVoice[] = [];
const voiceListeners = new Set<() => void>();
export const onVoices = (f: () => void) => { voiceListeners.add(f); return () => { voiceListeners.delete(f); }; };

function voiceScore(v: SpeechSynthesisVoice) {
  const n = (v.name || "").toLowerCase(); let s = 0;
  if (/natural|neural|online|premium|enhanced|mejorad|wavenet/.test(n)) s += 50;
  if (/google/.test(n)) s += 30;
  if (/m[oó]nica|jorge|paulina|elvira|[aá]lvaro|dalia/.test(n)) s += 15;
  if (v.lang === "es-ES") s += 20; else if (/^es[-_](mx|us|419)/i.test(v.lang)) s += 8;
  if (v.localService === false) s += 5;
  if (/compact|espeak|eloquence/.test(n)) s -= 40;
  return s;
}
export function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  esVoices = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith("es")).sort((a, b) => voiceScore(b) - voiceScore(a));
  const want = getState().settings.voice;
  voice = esVoices.find(v => v.voiceURI === want) || esVoices[0] || null;
  voiceListeners.forEach(f => f());
}
if (typeof window !== "undefined" && "speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
export const currentVoice = () => voice;

const clean = (t: string) => t.replace(/\([^)]*\)/g, "").replace(/≠/g, ",").replace(/ = /g, ", ").replace(/ \/ /g, ", ").replace(/\.\.\./g, "").replace(/___/g, "...");
export function speak(text: string, slow?: boolean) {
  if (!("speechSynthesis" in window)) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean(text));
    u.lang = "es-ES";
    const v = voice; if (v) u.voice = v;
    u.rate = slow || getState().settings.slow ? 0.75 : 0.95;
    speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}
/** speech the user didn't ask for (new question, revealed answer): only when autoplay is on */
export const autoSpeak = (text: string, slow?: boolean) => (getState().settings.autoplay ? speak(text, slow) : false);
export const stopSpeech = () => { try { speechSynthesis.cancel(); } catch { /* ignore */ } };
