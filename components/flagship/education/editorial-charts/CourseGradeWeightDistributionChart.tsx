"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { syllabus: "STEM Engineering", homework: 15, quizzes: 15, midterm: 35, final: 35 },
  { syllabus: "Balanced Standard", homework: 25, quizzes: 25, midterm: 25, final: 25 },
  { syllabus: "Humanities Seminar", homework: 40, quizzes: 20, midterm: 20, final: 20 },
  { syllabus: "Exam Intensive", homework: 10, quizzes: 10, midterm: 40, final: 40 },
];

export function CourseGradeWeightDistributionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Assessment Category Weight Distribution Across Academic Course Models
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Stack allocation of course credit points showing how high-stakes exams vs continuous homework assignments shift risk profiles.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="syllabus" tick={{ fontSize: 10 }} />
            <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="homework" name="Homework" stackId="a" fill="#3b82f6" />
            <Bar dataKey="quizzes" name="Quizzes / Labs" stackId="a" fill="#10b981" />
            <Bar dataKey="midterm" name="Midterms" stackId="a" fill="#f59e0b" />
            <Bar dataKey="final" name="Final Exam" stackId="a" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
