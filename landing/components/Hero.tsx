import { WindowIcon, WindowIconSmall } from "@/lib/icons";
import { ProcessTable } from "./ProcessTable";
import { Win95Window } from "./Window";

export function Hero() {
  return (
    <Win95Window
      id="topo"
      title="Gerenciador de Hábitos — Habit Manager 95"
      icon={<WindowIcon />}
      controls="full"
      menuBar
    >
      <div className="hero-grid">
        <div>
          <p className="eyebrow">C:\&gt; taskmgr.exe _</p>
          <h1 className="headline">
            Gerencie hábitos
            <br />
            <span className="y">como processos.</span>
          </h1>
          <p className="lead">
            Um habit tracker que parece o Gerenciador de Tarefas do Windows&nbsp;95. Cada
            hábito é um <code>.exe</code> rodando no seu sistema operacional pessoal. Streak
            quebrado retorna um BSOD. <b>Sem cloud, sem culpa, sem mascote.</b>
          </p>
          <div className="cta">
            <a className="w95-btn big primary bezel-raised" href="#download">
              <span>▸ Baixar o app</span>
            </a>
            <a
              className="w95-btn big bezel-raised"
              href="https://github.com/mateuschaves/habit-manager-95"
              target="_blank"
              rel="noopener"
            >
              Ver no GitHub
            </a>
          </div>
          <p className="caption">&gt; taskmgr para a sua vida</p>
        </div>

        <div className="bezel-inset" style={{ background: "var(--hm-surface)", padding: 6 }}>
          <div className="tabs">
            <div className="tab">
              A<u>p</u>licativos
            </div>
            <div className="tab active">
              <u>P</u>rocessos
            </div>
            <div className="tab">
              <u>D</u>esempenho
            </div>
            <div className="tab">
              <u>H</u>istórico
            </div>
          </div>
          <div className="tab-pane bezel-thin-raised">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 5,
                fontSize: 11,
              }}
            >
              <WindowIconSmall />
              <span>9 processos ativos · 1 travado · 1 suspenso</span>
            </div>
            <ProcessTable selIndex={0} />
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 6,
                fontSize: 11,
                flexWrap: "wrap",
              }}
            >
              <span>
                CPU: <b className="mono">67%</b>
              </span>
              <span>•</span>
              <span>
                Mem: <b className="mono">607K / ∞</b>
              </span>
              <span>•</span>
              <span>
                Threads: <b className="mono">9</b>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 8,
                justifyContent: "flex-end",
              }}
            >
              <span className="w95-btn bezel-raised">Prioridade...</span>
              <span className="w95-btn bezel-raised">Propriedades</span>
              <span
                className="w95-btn primary bezel-raised"
                style={{ color: "var(--hm-danger)" }}
              >
                <span>✕ Encerrar processo</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Win95Window>
  );
}
