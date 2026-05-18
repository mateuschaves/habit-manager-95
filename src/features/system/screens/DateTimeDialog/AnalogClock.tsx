import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

interface AnalogClockProps {
  size?: number;
  hours: number;
  minutes: number;
}

export function AnalogClock({ size = 110, hours, minutes }: AnalogClockProps) {
  const r = size / 2;
  const hourAng = (((hours % 12) + minutes / 60) * 30 - 90) * (Math.PI / 180);
  const minAng = (minutes * 6 - 90) * (Math.PI / 180);
  const hx = r + Math.cos(hourAng) * (r * 0.5);
  const hy = r + Math.sin(hourAng) * (r * 0.5);
  const mx = r + Math.cos(minAng) * (r * 0.72);
  const my = r + Math.sin(minAng) * (r * 0.72);

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={r}
        cy={r}
        r={r - 2}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={1.5}
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        const x1 = r + Math.cos(a) * (r - 3);
        const y1 = r + Math.sin(a) * (r - 3);
        const x2 = r + Math.cos(a) * (r - 7);
        const y2 = r + Math.sin(a) * (r - 7);
        return (
          <Line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000000"
            strokeWidth={i % 3 === 0 ? 2 : 1}
          />
        );
      })}
      <Line x1={r} y1={r} x2={hx} y2={hy} stroke="#000000" strokeWidth={3} />
      <Line x1={r} y1={r} x2={mx} y2={my} stroke="#000000" strokeWidth={2} />
      <Circle cx={r} cy={r} r={3} fill="#000000" />
    </Svg>
  );
}
