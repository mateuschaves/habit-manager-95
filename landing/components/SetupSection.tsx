import { PixelIcon, type IconName } from "@/lib/icons";
import { Win95Window } from "./Window";

const WIZ_ICONS: IconName[] = ["water", "run", "meditate", "book", "exe"];

export function SetupSection() {
  return (
    <Win95Window id="setup" title="04 · A:\\install.exe">
      <div className="feature rev">
        <div className="copy">
          <div className="section-head">
            <span className="idx">04 / setup.wizard</span>
            <h2>Setup wizard. Cinco minutos.</h2>
            <p>
              Escolha do catálogo, personalize cada <code>.exe</code> — nome, ícone,
              frequência, lembrete, meta — e agende. Sem cadastro. Sem login social. Sem
              opt-in de analytics, porque não tem analytics.
            </p>
          </div>
          <p className="caption">&gt; A:\install.exe</p>
        </div>
        <div className="bezel-inset" style={{ background: "var(--hm-surface)", padding: 8 }}>
          <div style={{ fontSize: 11, marginBottom: 8 }}>
            Setup do Habit Manager 95 — Passo 3 de 4: Personalizar
          </div>
          <div className="wiz">
            <div className="steps">
              <div className="s">1. Bem-vindo</div>
              <div className="s">2. Componentes</div>
              <div className="s on">3. Personalizar</div>
              <div className="s">4. Instalando</div>
            </div>
            <div className="form">
              <div className="field">
                <span>Nome do processo</span>
                <div className="ip bezel-inset">
                  <span className="mono">meditar</span>
                  <span style={{ opacity: 0.5 }}>.exe</span>
                </div>
              </div>
              <div className="field">
                <span>Ícone</span>
                <div className="icon-grid">
                  {WIZ_ICONS.map((name, i) => (
                    <span
                      key={name}
                      className={`ic bezel-raised${i === 0 ? " on" : ""}`}
                    >
                      <PixelIcon name={name} color={i === 0 ? "#fff" : "#000080"} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="field">
                <span>Frequência</span>
                <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
                  <label>● Diário</label>
                  <label>○ Semanal</label>
                  <label>○ Dias específicos</label>
                </div>
              </div>
              <div className="field">
                <span>Lembrete</span>
                <div
                  className="ip bezel-inset"
                  style={{ justifyContent: "space-between" }}
                >
                  <span>07:00</span>
                  <span className="bezel-raised" style={{ padding: "0 4px" }}>
                    ▾
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  justifyContent: "flex-end",
                  marginTop: 4,
                }}
              >
                <span className="w95-btn bezel-raised">&lt; Voltar</span>
                <span className="w95-btn primary bezel-raised">
                  <span>Avançar &gt;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Win95Window>
  );
}
