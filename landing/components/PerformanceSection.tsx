import { PerfGraph } from "./PerfGraph";
import { Win95Window } from "./Window";

export function PerformanceSection() {
  return (
    <Win95Window id="desempenho" title="03 · grafico.exe">
      <div className="feature">
        <div className="copy">
          <div className="section-head">
            <span className="idx">03 / perfmon</span>
            <h2>Performance monitor pra sua vida</h2>
            <p>
              Consistência, foco, streaks. Em verde-fósforo, sobre fundo preto. Gráficos
              pixel-art estilo monitor de recursos — sem confete, sem &ldquo;você arrasou
              hoje!&rdquo;.
            </p>
          </div>
          <p className="caption">&gt; grafico.exe</p>
        </div>
        <div
          className="bezel-inset"
          style={{ background: "#000", padding: 8, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <PerfGraph
            label="Consistência (12 semanas)"
            value="83%"
            color="#00ff00"
            headColor="#00ff00"
            data={[82, 71, 88, 92, 65, 78, 95, 89, 81, 73, 92, 88]}
          />
          <PerfGraph
            label="Foco (últimos 7 dias)"
            value="68%"
            color="#00ffff"
            headColor="#00ffff"
            data={[40, 65, 80, 72, 88, 60, 75]}
          />
          <fieldset className="gbox" style={{ background: "var(--hm-surface)" }}>
            <legend>Totais</legend>
            <div className="totais">
              <span>Streak médio:</span>
              <b>15.6 dias</b>
              <span>Maior streak ativo:</span>
              <b>hidratar.exe (47d)</b>
              <span>Taxa semanal:</span>
              <b>83%</b>
              <span>Travamentos no mês:</span>
              <b>2</b>
              <span>Tempo de atividade:</span>
              <b>219 dias</b>
            </div>
          </fieldset>
        </div>
      </div>
    </Win95Window>
  );
}
