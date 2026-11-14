import React from "react";

interface GpaScaleRow {
  grade: string;
  percent: string;
  standard: string;
  honors: string;
  ap: string;
}

const SCALE_DATA: GpaScaleRow[] = [
  { grade: "A+", percent: "97% – 100%", standard: "4.00", honors: "4.50", ap: "5.00" },
  { grade: "A", percent: "93% – 96%", standard: "4.00", honors: "4.50", ap: "5.00" },
  { grade: "A-", percent: "90% – 92%", standard: "3.70", honors: "4.20", ap: "4.70" },
  { grade: "B+", percent: "87% – 89%", standard: "3.30", honors: "3.80", ap: "4.30" },
  { grade: "B", percent: "83% – 86%", standard: "3.00", honors: "3.50", ap: "4.00" },
  { grade: "B-", percent: "80% – 82%", standard: "2.70", honors: "3.20", ap: "3.70" },
  { grade: "C+", percent: "77% – 79%", standard: "2.30", honors: "2.80", ap: "3.30" },
  { grade: "C", percent: "73% – 76%", standard: "2.00", honors: "2.50", ap: "3.00" },
  { grade: "D", percent: "65% – 69%", standard: "1.00", honors: "1.50", ap: "2.00" },
  { grade: "F", percent: "Below 65%", standard: "0.00", honors: "0.00", ap: "0.00" },
];

export function StandardGpaScaleTable() {
  return (
    <section className="my-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎓</span> Standard 4.0 &amp; Weighted 5.0 GPA Scale Conversion Chart
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Authoritative grade point conversion schedule used by high school registrars, college admissions officers, and university clearinghouses. Maps letter grades and percentage intervals to standard unweighted 4.0 scales, weighted Honors (+0.5), and Advanced Placement (AP) / International Baccalaureate (IB) / Dual Enrollment (+1.0) credit benchmarks.
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[620px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-slate-100 dark:bg-slate-800 px-3.5 py-3 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-700 whitespace-nowrap"
              >
                Letter Grade
              </th>
              <th scope="col" className="px-3.5 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                Percentage Range
              </th>
              <th scope="col" className="px-3.5 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                Standard 4.0 Scale
              </th>
              <th scope="col" className="px-3.5 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap bg-amber-50/60 dark:bg-amber-950/20">
                Honors (+0.5)
              </th>
              <th scope="col" className="px-3.5 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap bg-indigo-50/60 dark:bg-indigo-950/20">
                AP / IB / College (+1.0)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {SCALE_DATA.map((row) => (
              <tr key={row.grade} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap"
                >
                  <span className="inline-flex items-center justify-center min-w-[28px] rounded px-1.5 py-0.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                    {row.grade}
                  </span>
                </th>
                <td className="px-3.5 py-2.5 text-center text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                  {row.percent}
                </td>
                <td className="px-3.5 py-2.5 text-center font-bold text-slate-900 dark:text-white">
                  {row.standard}
                </td>
                <td className="px-3.5 py-2.5 text-center font-bold text-amber-700 dark:text-amber-300 bg-amber-50/30 dark:bg-amber-950/10">
                  {row.honors}
                </td>
                <td className="px-3.5 py-2.5 text-center font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/30 dark:bg-indigo-950/10">
                  {row.ap}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>Standards: <strong>AACRAO &amp; College Board</strong> Grading Guidelines</span>
        <span className="italic">💡 Weighted scales apply exclusively to designated honors and advanced placement curriculums</span>
      </div>
    </section>
  );
}
