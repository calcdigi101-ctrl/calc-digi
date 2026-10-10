import { useId } from "react";
import type { Spectrum } from "./types";

const W = 320;
const BAR_Y = 26;
const BAR_H = 16;

/** Horizontal color-coded scale with an animated needle at the current value. */
export function SpectrumGauge({ spectrum }: { spectrum: Spectrum }) {
  const { min, max, value, segments } = spectrum;
  const clipId = useId();
  const x = (v: number) => ((Math.min(Math.max(v, min), max) - min) / (max - min)) * W;
  const ticks = spectrum.ticks ?? segments.slice(0, -1).map((s) => s.to);
  let from = min;
  return (
    <svg viewBox={`-8 0 ${W + 16} 64`} className="w-full overflow-visible" role="img" aria-label={spectrum.label ?? `Scale from ${min} to ${max}; current value ${value}`}>
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y={BAR_Y} width={W} height={BAR_H} rx={BAR_H / 2} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {segments.map((s) => {
          const x0 = x(from);
          const x1 = x(Math.min(s.to, max));
          from = s.to;
          return (
            <rect key={s.label} x={x0} y={BAR_Y} width={Math.max(0, x1 - x0)} height={BAR_H} fill={s.color}>
              <title>{s.label}</title>
            </rect>
          );
        })}
      </g>
      {[min, ...ticks, max].map((t, i, arr) => (
        <text
          key={`${t}-${i}`}
          x={x(t)}
          y={BAR_Y + BAR_H + 14}
          textAnchor={i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle"}
          className={i === 0 || i === arr.length - 1 ? "fill-slate-400 text-[10px] tabular-nums" : "fill-slate-500 text-[10px] tabular-nums dark:fill-slate-400"}
        >
          {t}
        </text>
      ))}
      <g style={{ transform: `translateX(${x(value)}px)` }} className="transition-transform duration-700 ease-out motion-reduce:transition-none">
        <path d="M -7 6 L 7 6 L 0 18 Z" className="fill-slate-900 dark:fill-white" />
        <rect x={-1.5} y={BAR_Y - 6} width={3} height={BAR_H + 12} rx={1.5} className="fill-slate-900 dark:fill-white" />
      </g>
    </svg>
  );
}
