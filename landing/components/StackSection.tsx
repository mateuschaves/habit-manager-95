import { Win95Window } from "./Window";

export function StackSection() {
  return (
    <Win95Window id="stack" title="Propriedades do Sistema">
      <div className="section-head">
        <span className="idx">specs / stack.sys</span>
        <h2>Construído pra durar 30 anos</h2>
      </div>
      <div className="bezel-inset" style={{ background: "#fff" }}>
        <table className="spec">
          <tbody>
            <tr>
              <td>Runtime</td>
              <td>
                <b>Expo 55</b> + <b>React Native 0.83</b>
              </td>
            </tr>
            <tr>
              <td>Linguagem</td>
              <td>
                <b>TypeScript 5.9</b>
              </td>
            </tr>
            <tr>
              <td>Persistência</td>
              <td>
                React Context + <b>expo-sqlite</b> (fallback in-memory p/ web)
              </td>
            </tr>
            <tr>
              <td>Notificações</td>
              <td>
                <b>expo-notifications</b> — single-source-of-truth
              </td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>
                <b>styled-components/native</b> + tema dinâmico por paleta
              </td>
            </tr>
            <tr>
              <td>Fontes</td>
              <td>
                <b>Pixelify Sans</b> (UI) + <b>VT323</b> (mono)
              </td>
            </tr>
            <tr>
              <td>Testes</td>
              <td>
                <b>Jest</b> + Testing Library — <b>88 testes verdes</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="legend-tip">
        4 temas: Classic Win95 · Plum · Hot Dog Stand · High Contrast Black.
      </p>
    </Win95Window>
  );
}
