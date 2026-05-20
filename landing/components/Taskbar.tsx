"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date) {
  return (
    String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0")
  );
}

export function Taskbar() {
  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const tick = () => setClock(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 10000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <nav className="taskbar bezel-raised" aria-label="Barra de tarefas">
      <a className="start-btn bezel-raised" href="#topo">
        <span className="flag" aria-hidden="true">
          <i style={{ background: "#ff0000" }} />
          <i style={{ background: "#00ff00" }} />
          <i style={{ background: "#0000ff" }} />
          <i style={{ background: "#ffff00" }} />
        </span>
        Iniciar
      </a>
      <div className="tasks">
        <a className="bezel-pressed" href="#processos">
          Processos
        </a>
        <a className="bezel-raised" href="#bsod">
          BSOD
        </a>
        <a className="bezel-raised" href="#desempenho">
          Desempenho
        </a>
        <a className="bezel-raised" href="#setup">
          Setup
        </a>
        <a className="bezel-raised" href="#offline">
          Offline
        </a>
      </div>
      <div className="tray bezel-thin-inset">
        <span className="clock-wrap" suppressHydrationWarning>
          {clock || "--:--"}
        </span>
      </div>
    </nav>
  );
}
