import { Component, type ReactNode } from "react";

/**
 * Last line of defence: a render error shows a friendly screen instead of a blank page.
 * (A class component on purpose — React has no hook for error boundaries; it's the one exception to the arrow-function rule.)
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="wrap">
        <section className="view">
          <div className="card stack" role="alert">
            <h1>Algo ha fallado</h1>
            <p lang="hr">
              Aplikacija je naišla na grešku. Napredak je spremljen. Pokušaj ponovno učitati stranicu. Ako se ponavlja, u Ajustes → Copia de seguridad kopiraj
              kod napretka i javi nam.
            </p>
            <p className="hint">{this.state.error.message}</p>
            <div className="row">
              <button className="btn primary" onClick={() => location.reload()}>
                Recargar
              </button>
              <button
                className="btn ghost"
                onClick={() => {
                  location.hash = "#ajustes";
                  location.reload();
                }}
              >
                Ir a Ajustes
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
