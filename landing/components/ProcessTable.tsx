import { PixelIcon } from "@/lib/icons";
import { PROCESSES, STATUS } from "@/lib/processes";

export function ProcessTable({ selIndex = -1 }: { selIndex?: number }) {
  return (
    <>
      <div className="col-headers">
        <div>Imagem</div>
        <div className="r">PID</div>
        <div className="r">Memória</div>
        <div className="r">Uptime</div>
        <div>Status</div>
      </div>
      <div className="proc-list bezel-inset">
        {PROCESSES.map((p, i) => {
          const s = STATUS[p.st];
          const sel = i === selIndex;
          return (
            <div key={p.n} className={`proc-row${sel ? " sel" : ""}`}>
              <div>
                <PixelIcon name={p.ic} color={sel ? "#fff" : p.col} />
                <span className="mono">{p.n}</span>
              </div>
              <div className="r">
                <span className="mono">{String(p.pid).padStart(4, "0")}</span>
              </div>
              <div className="r">
                <span className="mono" style={{ whiteSpace: "pre" }}>
                  {p.mem}
                </span>
              </div>
              <div className="r">
                <span className="mono">{p.up}</span>
              </div>
              <div>
                <span className="status">
                  <span className="dot" style={{ background: s.d }} />
                  <span style={{ color: sel ? "#fff" : s.c }}>{s.t}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
