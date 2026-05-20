import { Win95Window } from "./Window";

export function OfflineSection() {
  return (
    <Win95Window id="offline" title="05 · C:\\users\\voce">
      <div className="feature">
        <div className="copy">
          <div className="section-head">
            <span className="idx">05 / sqlite.local</span>
            <h2>
              Tudo <span style={{ color: "#c70000" }}>offline.</span> Tudo seu.
            </h2>
            <p>
              Sem cloud. Sem ads. Sem mascote. Seu histórico mora em SQLite no seu
              telefone — e em lugar nenhum mais. Zero requests para servidor.
            </p>
          </div>
          <p className="caption">&gt; C:\users\voce</p>
        </div>
        <fieldset className="gbox" style={{ background: "var(--hm-surface)" }}>
          <legend>Privacidade</legend>
          <ul className="dotlist">
            <li>
              <span className="mk">✓</span>
              <span>
                <b>Data Not Collected</b> — zero analytics no MVP, zero login social.
              </span>
            </li>
            <li>
              <span className="mk">✓</span>
              <span>
                <b>SQLite local</b> + AsyncStorage para settings. 100% offline.
              </span>
            </li>
            <li>
              <span className="mk">✓</span>
              <span>
                <b>Backup via Share</b> — JSON nativo, exportado por você quando quiser.
              </span>
            </li>
            <li>
              <span className="mk">✓</span>
              <span>
                <b>App Tracking Transparency</b> — não solicitado. Não precisa.
              </span>
            </li>
            <li>
              <span className="mk">✓</span>
              <span>
                <b>MIT</b> — código aberto. &ldquo;Por que reservar copyright em algo que
                parece pirataria de 1996.&rdquo;
              </span>
            </li>
          </ul>
        </fieldset>
      </div>
    </Win95Window>
  );
}
