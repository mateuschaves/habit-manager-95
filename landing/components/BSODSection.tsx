import { Win95Window } from "./Window";

export function BSODSection() {
  return (
    <Win95Window id="bsod" title="02 · Streak quebrado">
      <div className="feature rev">
        <div className="copy">
          <div className="section-head">
            <span className="idx">02 / 0x000000C0</span>
            <h2>Seu hábito não está respondendo.</h2>
            <p>
              Streaks quebrados retornam um BSOD. Quebrar um streak num app fofinho dá
              culpa; receber um <i>&ldquo;erro fatal&rdquo;</i> dá risada — e,
              paradoxalmente, engaja mais porque é altamente compartilhável. Cada
              screenshot é conteúdo.
            </p>
          </div>
          <p className="caption">&gt; o cliente já tirou print</p>
        </div>
        <div className="bezel-inset" style={{ padding: 2 }}>
          <div className="bsod">
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <span className="badge">Habit Manager</span>
            </div>
            <p style={{ margin: "0 0 14px" }}>
              Um erro fatal ocorreu em <b>meditar.exe</b>. Streak de <b>12 dias</b> foi
              perdido.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              A culpa é compartilhada entre o sistema operacional (você) e o subprocesso
              (também você). Não foi possível recuperar o estado anterior.
            </p>
            <div className="ind" style={{ marginBottom: 14, fontSize: 12 }}>
              <div>*&nbsp; Verifique se o lembrete está agendado corretamente</div>
              <div>*&nbsp; Reduza a meta para um valor sustentável</div>
              <div>*&nbsp; Considere agrupar com outro hábito (habit stacking)</div>
            </div>
            <div className="ind" style={{ marginBottom: 14, fontSize: 11 }}>
              <div>STOP: 0x000000C0 (0x00000000, 0xC0000005, 0x80544E50)</div>
              <div>PROCESS_NAME:&nbsp; meditar.exe</div>
              <div>BUGCHECK_STR:&nbsp; STREAK_BROKEN_INTERRUPT</div>
            </div>
            <p style={{ textAlign: "center", margin: 0, fontSize: 13 }}>
              Toque qualquer lugar da tela para continuar _
            </p>
          </div>
        </div>
      </div>
    </Win95Window>
  );
}
