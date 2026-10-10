import { BMI_CATEGORIES } from "@/lib/bmi";

const MIN = 15;
const MAX = 40;
const W = 320;
const BAR_Y = 26;
const BAR_H = 16;

const x = (bmi: number) => ((Math.min(Math.max(bmi, MIN), MAX) - MIN) / (MAX - MIN)) * W;

/** Horizontal BMI spectrum (Underweight → Obese) with an animated needle at the user's score. */
export function BmiGauge({ bmi }: { bmi: number }) {
  const px = x(bmi);
  return (
    <svg
      viewBox={`-8 0 ${W + 16} 64`}
      className="w-full overflow-visible"
      role="img"
      aria-label={`BMI scale from ${MIN} to ${MAX}. Your BMI of ${bmi.toFixed(1)} is marked.`}
    >
      <defs>
        <clipPath id="bmi-bar-clip">
          <rect x="0" y={BAR_Y} width={W} height={BAR_H} rx={BAR_H / 2} />
        </clipPath>
      </defs>
      <g clipPath="url(#bmi-bar-clip)">
        {BMI_CATEGORIES.map((c) => {
          const x0 = x(Math.max(c.from, MIN));
          const x1 = x(Math.min(c.to, MAX));
          return <rect key={c.id} x={x0} y={BAR_Y} width={x1 - x0} height={BAR_H} fill={c.color} />;
        })}
      </g>
      {[18.5, 25, 30].map((t) => (
        <text key={t} x={x(t)} y={BAR_Y + BAR_H + 14} textAnchor="middle" className="fill-slate-500 text-[10px] tabular-nums dark:fill-slate-400">
          {t}
        </text>
      ))}
      <text x={0} y={BAR_Y + BAR_H + 14} textAnchor="start" className="fill-slate-400 text-[10px] tabular-nums">
        {MIN}
      </text>
      <text x={W} y={BAR_Y + BAR_H + 14} textAnchor="end" className="fill-slate-400 text-[10px] tabular-nums">
        {MAX}
      </text>
      <g
        style={{ transform: `translateX(${px}px)` }}
        className="transition-transform duration-700 ease-out motion-reduce:transition-none"
      >
        <path d="M -7 6 L 7 6 L 0 18 Z" className="fill-slate-900 dark:fill-white" />
        <rect x={-1.5} y={BAR_Y - 6} width={3} height={BAR_H + 12} rx={1.5} className="fill-slate-900 dark:fill-white" />
      </g>
    </svg>
  );
}
