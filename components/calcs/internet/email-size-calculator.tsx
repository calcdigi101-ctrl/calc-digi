"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const emailSizeConfig: CalcConfig = {
  id: "email-size-calculator",
  title: "Email Payload, Base64 MIME Overhead & Attachment Limit Calculator",
  fields: [
    { kind: "number", key: "pdfMb", label: "PDF Document Attachments (MB)", default: 12.0, min: 0, max: 100 },
    { kind: "number", key: "imageMb", label: "Image / Media Attachments (MB)", default: 5.0, min: 0, max: 100 },
    { kind: "number", key: "htmlKb", label: "HTML Body & Embedded Signatures (KB)", default: 250, min: 5, max: 5000 },
    { kind: "number", key: "providerLimitMb", label: "Email Provider Attachment Limit (MB)", default: 25, min: 10, max: 100 },
  ],
  presets: [
    { label: "Gmail / Google Workspace (25 MB Limit)", values: { pdfMb: 12.0, imageMb: 5.0, htmlKb: 250, providerLimitMb: 25 } },
    { label: "Microsoft Outlook / Exchange (20 MB Limit)", values: { pdfMb: 10.0, imageMb: 3.5, htmlKb: 300, providerLimitMb: 20 } },
    { label: "Large Pitch Deck & Proposals", values: { pdfMb: 18.0, imageMb: 4.0, htmlKb: 400, providerLimitMb: 25 } },
    { label: "Text-Only Compact Email", values: { pdfMb: 0.0, imageMb: 0.0, htmlKb: 75, providerLimitMb: 25 } },
  ],
  compute: (vals) => {
    const pdf = Math.max(0, Number(vals.pdfMb) || 0);
    const img = Math.max(0, Number(vals.imageMb) || 0);
    const htmlKb = Math.max(1, Number(vals.htmlKb) || 250);
    const limitMb = Math.max(5, Number(vals.providerLimitMb) || 25);

    const rawAttachmentsMb = pdf + img;
    const bodyMb = htmlKb / 1024.0;

    const base64ExpansionFactor = 1.3333;
    const encodedAttachmentsMb = rawAttachmentsMb * base64ExpansionFactor;
    const totalWirePayloadMb = encodedAttachmentsMb + bodyMb + 0.05;
    const base64OverheadMb = encodedAttachmentsMb - rawAttachmentsMb;

    const remainingCapacityMb = Math.max(0, limitMb - totalWirePayloadMb);
    const exceedsLimit = totalWirePayloadMb > limitMb;

    let tone: "good" | "warn" | "bad" = "good";
    let status = "Safe for Transmission";
    if (exceedsLimit) {
      tone = "bad";
      status = `Exceeds ${limitMb} MB Server Boundary (Bounce Risk)`;
    } else if (totalWirePayloadMb > limitMb * 0.85) {
      tone = "warn";
      status = "Close to Limit (Potential Inbound Bounce)";
    }

    return {
      hero: {
        label: "Total Encoded Wire Payload",
        value: `${totalWirePayloadMb.toFixed(2)} MB`,
      },
      badge: {
        text: status,
        tone: tone,
      },
      rows: [
        { label: "Raw Attachment Files (Disks)", value: `${rawAttachmentsMb.toFixed(2)} MB (${pdf} MB PDF + ${img} MB Img)` },
        { label: "HTML Body & CSS Styling", value: `${bodyMb.toFixed(3)} MB (${htmlKb} KB)` },
        { label: "Base64 Encoding Overhead (+33%)", value: `+${base64OverheadMb.toFixed(2)} MB` },
        { label: "Total Wire Payload Size", value: `${totalWirePayloadMb.toFixed(2)} MB`, strong: true },
        { label: "Provider Transmission Ceiling", value: `${limitMb} MB` },
        { label: "Remaining Safe Attachment Margin", value: exceedsLimit ? "0 MB (Over Limit)" : `${remainingCapacityMb.toFixed(2)} MB` },
      ],
      steps: [
        `Raw Binary Attachments = ${pdf} MB (PDF) + ${img} MB (Image) = ${rawAttachmentsMb.toFixed(2)} MB`,
        `Base64 Encoding Expansion (4/3) = ${rawAttachmentsMb.toFixed(2)} * 1.3333 = ${encodedAttachmentsMb.toFixed(2)} MB`,
        `Total Wire Payload = ${encodedAttachmentsMb.toFixed(2)} MB + ${(bodyMb + 0.05).toFixed(2)} MB (Body/Headers) = ${totalWirePayloadMb.toFixed(2)} MB`,
      ],
      chart: {
        type: "donut",
        title: "Email Payload: Raw Attachments vs Base64 MIME Overhead",
        format: "num",
        data: [
          { name: "Raw Attachments", value: Math.max(0.1, parseFloat(rawAttachmentsMb.toFixed(2))), color: "#10b981" },
          { name: "Base64 MIME Overhead", value: Math.max(0.1, parseFloat(base64OverheadMb.toFixed(2))), color: "#f59e0b" },
          { name: "HTML Body & Headers", value: Math.max(0.05, parseFloat(bodyMb.toFixed(2))), color: "#6366f1" },
        ],
      },
    };
  },
};

export default function EmailSizeCalculatorComponent() {
  return <CalcEngine config={emailSizeConfig} />;
}
