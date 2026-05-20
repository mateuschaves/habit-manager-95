import { ProcessTable } from "./ProcessTable";
import { Win95Window } from "./Window";

export function ProcessesSection() {
  return (
    <Win95Window id="processos" title="01 · Processos">
      <div className="feature">
        <div className="copy">
          <div className="section-head">
            <span className="idx">01 / process.list</span>
            <h2>
              Cada hábito é um <code>.exe</code> rodando
            </h2>
            <p>
              Tabela densa com PID, memória, uptime e status. <b>Rodando</b>,{" "}
              <b>Pendente</b>, <b>Não responde</b>, <b>Suspenso</b>, <b>Concluído</b> — o
              mesmo vocabulário do Gerenciador de Tarefas, aplicado à sua rotina. Sem
              motivação. Sem mascote.
            </p>
          </div>
          <p className="caption">&gt; taskmgr para a sua vida</p>
        </div>
        <div className="bezel-inset" style={{ background: "var(--hm-surface)", padding: 6 }}>
          <ProcessTable selIndex={6} />
        </div>
      </div>
    </Win95Window>
  );
}
