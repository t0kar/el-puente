import { useEffect, useMemo, useRef, useState } from "react";
import { setPlayer, stopUtter, utter } from "../lib/speech";
import { getState } from "../lib/store";
import { splitSentences } from "../lib/reader";

// Read-along player: speaks a text sentence by sentence (reliable pause / skip / speed on every browser)
// and reports the current sentence and, when the voice sends word boundaries, the current word.

export type ReadStatus = "idle" | "playing" | "paused";
export const RATES: [number, string][] = [
  [0.7, "Lento"],
  [0.9, "Normal"],
  [1.1, "Rápido"],
];
const RATE_KEY = "el-puente-read-rate";
const initialRate = () => {
  try {
    const v = Number(localStorage.getItem(RATE_KEY));
    if (RATES.some(r => r[0] === v)) return v;
  } catch {
    /* ignore */
  }
  return getState().settings.slow ? 0.7 : 0.9;
};

export const useReader = (text: string) => {
  const sentences = useMemo(() => splitSentences(text), [text]);
  const [status, setStatus] = useState<ReadStatus>("idle");
  const [idx, setIdx] = useState(0);
  const [word, setWord] = useState<[number, number] | null>(null);
  const [rate, setRateState] = useState(initialRate);
  // live values for callbacks (avoid stale closures)
  const r = useRef({ status: "idle" as ReadStatus, idx: 0, from: -1, rate });

  const finish = () => {
    Object.assign(r.current, { status: "idle", idx: 0, from: -1 });
    setStatus("idle");
    setIdx(0);
    setWord(null);
    setPlayer(false);
  };
  const interrupted = () => {
    r.current.status = "paused";
    setStatus("paused");
    setPlayer(false);
  };

  /** speak sentence i, optionally starting at absolute offset `from` inside it */
  const run = (i: number, from = -1) => {
    const s = sentences[i];
    if (!s) return finish();
    const off = from > s.start && from < s.end ? from : s.start;
    Object.assign(r.current, { status: "playing", idx: i, from: off });
    setStatus("playing");
    setIdx(i);
    setWord(null);
    setPlayer(true, interrupted);
    utter(text.slice(off, s.end), {
      rate: r.current.rate,
      onWord: (ci, cl) => {
        const a = off + ci;
        let b = cl ? a + cl : a;
        if (!cl) while (b < s.end && !/[\s,.;:!?…»]/.test(text[b])) b++;
        r.current.from = a;
        setWord([a, b]);
      },
      onEnd: () => {
        if (r.current.status !== "playing") return;
        if (i + 1 < sentences.length) run(i + 1);
        else finish();
      },
    });
  };

  const play = () => {
    const c = r.current;
    if (c.status !== "playing") run(c.idx, c.status === "paused" ? c.from : -1);
  };
  const pause = () => {
    if (r.current.status !== "playing") return;
    r.current.status = "paused";
    stopUtter();
    setPlayer(false);
    setStatus("paused");
  };
  const toggle = () => (r.current.status === "playing" ? pause() : play());
  const stop = () => {
    stopUtter();
    finish();
  };
  const goTo = (i: number) => {
    const c = r.current;
    i = Math.max(0, Math.min(sentences.length - 1, i));
    if (c.status === "playing") run(i);
    else {
      Object.assign(c, { idx: i, from: -1 });
      setIdx(i);
      setWord(null);
    }
  };
  const prev = () => goTo(r.current.idx - 1);
  const next = () => goTo(r.current.idx + 1);
  /** start reading at the sentence that contains this text offset */
  const seek = (offset: number) => {
    const i = sentences.findIndex(s => offset < s.end);
    run(i < 0 ? sentences.length - 1 : i);
  };
  const setRate = (v: number) => {
    r.current.rate = v;
    setRateState(v);
    try {
      localStorage.setItem(RATE_KEY, String(v));
    } catch {
      /* ignore */
    }
    if (r.current.status === "playing") run(r.current.idx, r.current.from); // continue from the current word at the new speed
  };

  useEffect(() => {
    const vis = () => {
      if (document.visibilityState === "hidden") pause();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      document.removeEventListener("visibilitychange", vis);
      stopUtter();
      setPlayer(false);
    };
  }, [text]);

  return { sentences, status, idx, word, rate, sentence: sentences[idx], play, pause, toggle, stop, prev, next, seek, setRate };
};
export type Reader = ReturnType<typeof useReader>;
