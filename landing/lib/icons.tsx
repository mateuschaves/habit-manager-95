import type { ReactNode } from "react";

export type IconName =
  | "water"
  | "run"
  | "food"
  | "book"
  | "sleep"
  | "exercise"
  | "meditate"
  | "study"
  | "exe";

const ICON_RECTS: Record<IconName, ReactNode> = {
  water: (
    <>
      <rect x="6" y="1" width="2" height="2" />
      <rect x="5" y="3" width="4" height="2" />
      <rect x="4" y="5" width="6" height="2" />
      <rect x="3" y="7" width="8" height="4" />
      <rect x="4" y="11" width="6" height="2" />
    </>
  ),
  run: (
    <>
      <rect x="7" y="1" width="3" height="3" />
      <rect x="5" y="4" width="5" height="2" />
      <rect x="3" y="6" width="3" height="2" />
      <rect x="6" y="6" width="4" height="2" />
      <rect x="7" y="8" width="2" height="3" />
      <rect x="9" y="11" width="3" height="2" />
      <rect x="4" y="9" width="3" height="2" />
      <rect x="2" y="11" width="3" height="2" />
    </>
  ),
  food: (
    <>
      <rect x="2" y="2" width="2" height="6" />
      <rect x="5" y="2" width="2" height="6" />
      <rect x="3" y="8" width="2" height="4" />
      <rect x="9" y="2" width="3" height="6" />
      <rect x="10" y="8" width="2" height="4" />
    </>
  ),
  book: (
    <>
      <rect x="2" y="2" width="10" height="10" />
      <rect x="3" y="3" width="8" height="8" fill="#fff" />
      <rect x="7" y="3" width="1" height="8" />
      <rect x="4" y="5" width="2" height="1" />
      <rect x="9" y="5" width="2" height="1" />
    </>
  ),
  sleep: (
    <>
      <rect x="3" y="3" width="6" height="6" />
      <rect x="3" y="3" width="4" height="4" fill="#fff" />
      <rect x="8" y="2" width="3" height="1" />
      <rect x="9" y="3" width="2" height="1" />
      <rect x="8" y="4" width="3" height="1" />
    </>
  ),
  exercise: (
    <>
      <rect x="1" y="5" width="2" height="4" />
      <rect x="3" y="6" width="2" height="2" />
      <rect x="5" y="6" width="4" height="2" />
      <rect x="9" y="6" width="2" height="2" />
      <rect x="11" y="5" width="2" height="4" />
    </>
  ),
  meditate: (
    <>
      <rect x="6" y="1" width="2" height="2" />
      <rect x="5" y="3" width="4" height="3" />
      <rect x="3" y="6" width="8" height="2" />
      <rect x="2" y="8" width="10" height="3" />
    </>
  ),
  study: (
    <>
      <rect x="2" y="3" width="10" height="2" />
      <rect x="6" y="5" width="2" height="3" />
      <rect x="3" y="8" width="8" height="3" />
    </>
  ),
  exe: (
    <>
      <rect x="2" y="2" width="10" height="10" />
      <rect x="3" y="3" width="8" height="8" fill="#c0c0c0" />
      <rect x="3" y="3" width="8" height="2" fill="#000080" />
    </>
  ),
};

export function PixelIcon({ name, color = "#000080" }: { name: IconName; color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={{ flex: "0 0 14px" }}
    >
      <g fill={color}>{ICON_RECTS[name]}</g>
    </svg>
  );
}

export function WindowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="2" width="12" height="10" fill="#fff" stroke="#000" />
      <rect x="1" y="2" width="12" height="3" fill="#000080" />
      <rect x="3" y="7" width="3" height="3" fill="#008000" />
      <rect x="8" y="7" width="3" height="3" fill="#800000" />
    </svg>
  );
}

export function WindowIconSmall() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="2" width="12" height="10" fill="#fff" stroke="#000" />
      <rect x="1" y="2" width="12" height="3" fill="#000080" />
      <rect x="3" y="7" width="2" height="3" fill="#008000" />
      <rect x="9" y="7" width="2" height="3" fill="#800000" />
    </svg>
  );
}
