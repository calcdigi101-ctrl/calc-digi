"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "blood-pressure",
  title: "Blood Pressure Calculator",
  fields: [
    {
      kind: "number",
      key: "systolic",
      label: "Systolic blood pressure (top number)",
      suffix: "mmHg",
      default: 122,
      min: 70,
      max: 250,
      integer: true,
      hint: "Peak arterial pressure during left ventricular contraction.",
    },
    {
      kind: "number",
      key: "diastolic",
      label: "Diastolic blood pressure (bottom number)",
      suffix: "mmHg",
      default: 78,
      min: 40,
      max: 150,
      integer: true,
      hint: "Resting arterial pressure between heartbeats.",
    },
    {
      kind: "number",
      key: "pulse",
      label: "Resting pulse / heart rate",
      suffix: "bpm",
      default: 68,
      min: 40,
      max: 180,
      integer: true,
    },
  ],
  compute: (v) => {
    const sys = Math.max(60, Math.min(260, Number(v.systolic || 122)));
    const dia = Math.max(30, Math.min(160, Number(v.diastolic || 78)));

    // ACC/AHA 2017 Guidelines
    let stage = "Normal Blood Pressure";
    let stageColor = "#10b981";
    let isEmergency = false;

    if (sys > 180 || dia > 120) {
      stage = "Hypertensive Crisis (Emergency)";
      stageColor = "#dc2626";
      isEmergency = true;
    } else if (sys < 90 || dia < 60) {
      stage = "Hypotension (Low Pressure)";
      stageColor = "#06b6d4";
    } else if (sys >= 140 || dia >= 90) {
      stage = "Stage 2 Hypertension";
      stageColor = "#ef4444";
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      stage = "Stage 1 Hypertension";
      stageColor = "#f59e0b";
    } else if (sys >= 120 && sys <= 129 && dia < 80) {
      stage = "Elevated Blood Pressure";
      stageColor = "#eab308";
    }

    const pulsePressure = sys - dia;
    const map = Math.round(dia + pulsePressure / 3);

    let ppStatus = "Normal Compliance (30–50 mmHg)";
    if (pulsePressure > 60) {
      ppStatus = "Elevated (Arterial Stiffness Risk)";
    } else if (pulsePressure < 30) {
      ppStatus = "Narrowed (Reduced Stroke Volume)";
    }

    return {
      hero: {
        label: "ACC / AHA Clinical Category",
        value: stage,
        sub: `Reading: ${sys} / ${dia} mmHg • Mean Arterial Pressure (MAP): ${map} mmHg`,
      },
      badge: { text: isEmergency ? "Hypertensive Crisis" : "ACC/AHA 2017 Guideline", tone: isEmergency ? "bad" : "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Diastolic Baseline", value: dia, color: "#3b82f6" },
          { name: "Pulse Pressure Wave", value: pulsePressure, color: stageColor },
        ],
      },
      rows: [
        { label: "Blood Pressure Reading", value: `${sys} / ${dia} mmHg`, strong: true },
        { label: "Clinical Classification", value: stage, strong: true },
        { label: "Mean Arterial Pressure (MAP)", value: `${map} mmHg`, strong: true },
        { label: "Pulse Pressure (Systolic - Diastolic)", value: `${pulsePressure} mmHg` },
        { label: "Arterial Compliance Status", value: ppStatus },
        { label: "Vital Organ Perfusion Floor", value: map >= 65 ? "Adequate (≥65 mmHg)" : "Critical Hypoperfusion" },
      ],
      note: {
        text: isEmergency ? (
          <span>
            🚨 <strong>Hypertensive Emergency Alert:</strong> A reading exceeding 180 mmHg systolic and/or 120 mmHg diastolic requires immediate medical consultation. If accompanied by chest pain, shortness of breath, numbness, back pain, or vision changes, call 911 immediately.
          </span>
        ) : (
          <span>
            🩺 <strong>AHA Measurement Standard:</strong> Sit quietly with feet flat on the floor for 5 minutes prior to testing. Keep cuff level with your heart. Avoid caffeine, nicotine, and exercise for 30 minutes prior.
          </span>
        ),
        tone: isEmergency ? "warn" : "info",
      },
    };
  },
};

export default function BloodPressureCalculator() {
  return <CalcEngine config={config} />;
}
