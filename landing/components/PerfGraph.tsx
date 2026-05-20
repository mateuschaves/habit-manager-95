type Props = {
  label: string;
  value: string;
  color: string;
  data: number[];
  headColor: string;
};

export function PerfGraph({ label, value, color, data, headColor }: Props) {
  const max = Math.max(...data);
  return (
    <div className="perf-graph">
      <div className="perf-head" style={{ color: headColor }}>
        <span>{label}</span>
        <span className="mono">{value}</span>
      </div>
      <div className="bezel-inset">
        <div className="grid-l" />
        <div className="bars">
          {data.map((v, i) => (
            <i key={i} style={{ height: `${(v / max) * 100}%`, background: color }} />
          ))}
        </div>
      </div>
    </div>
  );
}
