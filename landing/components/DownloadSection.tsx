export function DownloadSection() {
  return (
    <section className="window bezel-raised win" id="download">
      <div className="title-bar">
        <div className="title-bar-text">
          <span>Executar</span>
        </div>
        <div className="title-bar-controls" aria-hidden="true">
          <span className="title-bar-btn bezel-raised">✕</span>
        </div>
      </div>
      <div className="body" style={{ textAlign: "center", padding: "34px 18px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon.png"
          alt="Habit Manager 95"
          width={84}
          height={84}
          className="bezel-raised"
          style={{ padding: 4, background: "#fff" }}
        />
        <h2 style={{ fontSize: 26, margin: "16px 0 6px" }}>Habit Manager 95</h2>
        <p style={{ margin: "0 0 4px", fontSize: 14 }}>Hábitos como processos.</p>
        <p className="caption" style={{ margin: "0 0 22px" }}>
          &gt; instalar agora
        </p>
        <div className="cta" style={{ justifyContent: "center" }}>
          <a
            className="w95-btn big primary bezel-raised"
            href="https://github.com/mateuschaves/habit-manager-95"
            target="_blank"
            rel="noopener"
          >
            <span>▸ Clonar no GitHub</span>
          </a>
          <a
            className="w95-btn big bezel-raised"
            href="https://github.com/mateuschaves/habit-manager-95#começando"
            target="_blank"
            rel="noopener"
          >
            Como rodar
          </a>
        </div>
        <p className="legend-tip" style={{ marginTop: 24 }}>
          Design system + screenshots via claude.ai/design · Fontes: Pixelify Sans &amp;
          VT323 · Licença MIT
        </p>
      </div>
    </section>
  );
}
