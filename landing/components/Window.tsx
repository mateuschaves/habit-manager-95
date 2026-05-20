import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: ReactNode;
  icon?: ReactNode;
  controls?: "full" | "min-close";
  menuBar?: boolean;
  bodyStyle?: React.CSSProperties;
  children: ReactNode;
};

export function Win95Window({
  id,
  title,
  icon,
  controls = "min-close",
  menuBar = false,
  bodyStyle,
  children,
}: Props) {
  return (
    <section className="window bezel-raised win" id={id}>
      <div className="title-bar">
        <div className="title-bar-text">
          {icon ? (
            <span aria-hidden="true" style={{ display: "inline-flex" }}>
              {icon}
            </span>
          ) : null}
          <span>{title}</span>
        </div>
        <div className="title-bar-controls" aria-hidden="true">
          {controls === "full" ? (
            <>
              <span className="title-bar-btn bezel-raised">_</span>
              <span className="title-bar-btn bezel-raised">▢</span>
              <span className="title-bar-btn bezel-raised" style={{ marginLeft: 2 }}>
                ✕
              </span>
            </>
          ) : (
            <>
              <span className="title-bar-btn bezel-raised">_</span>
              <span className="title-bar-btn bezel-raised">✕</span>
            </>
          )}
        </div>
      </div>
      {menuBar ? (
        <div className="menu-bar">
          <span>
            <u>A</u>rquivo
          </span>
          <span>
            <u>O</u>pções
          </span>
          <span>
            <u>E</u>xibir
          </span>
          <span>
            <u>J</u>anela
          </span>
          <span>
            <u>A</u>juda
          </span>
        </div>
      ) : null}
      <div className="body" style={bodyStyle}>
        {children}
      </div>
    </section>
  );
}
