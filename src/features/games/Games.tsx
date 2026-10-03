import { useAppState } from "../../lib/store";
import { gameSessions } from "../../lib/questions";
import type { Mark } from "../../lib/types";
import { useNav } from "../../app/navigation";

export const Games = () => {
  const st = useAppState();
  const { start, go } = useNav();
  const games: [Mark, string, string, string, () => void, string][] = [
    [
      "green",
      "↔",
      "Parejas",
      "Une 6 palabras con su traducción. Contra el reloj.",
      () => go("pairs"),
      st.best.pairs_time ? "Récord: " + st.best.pairs_time + " s" : "",
    ],
    ["green", "60", "Contrarreloj", "60 segundos. ¿Cuántas palabras sabes?", () => go("rush"), st.best.rush ? "Récord: " + st.best.rush : ""],
    ["blue", "♪", "Dictado", "Escucha una frase y escríbela.", () => start(gameSessions.dictation()), ""],
    ["blue", "123", "Números", "Construye, escucha y calcula en español.", () => start(gameSessions.numbers()), ""],
    ["blue", "⌚", "¿Qué hora es?", "Relojes y horas. y / menos / cuarto / media.", () => start(gameSessions.clock()), ""],
    ["yellow", "!", "Reglas rápidas", "ser/estar, hay/está, gusta/gustan, por/a las…", () => start(gameSessions.rules()), ""],
    ["pink", "f(x)", "Fórmula exprés", "10 verbos mezclados, elegir respuesta.", () => start(gameSessions.verbs()), ""],
  ];
  return (
    <section className="view">
      <h1>
        <span className="mark blue">Juegos</span>
      </h1>
      <div className="grid2">
        {games.map(([c, ic, t, d, fn, best]) => (
          <button key={t} className="game" onClick={fn}>
            <span className={"gi " + c}>{ic}</span>
            <span>
              <h3>{t}</h3>
              <span className="hr">{d}</span>
              {best && (
                <>
                  <br />
                  <span className="pill" style={{ marginTop: 6 }}>
                    {best}
                  </span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
