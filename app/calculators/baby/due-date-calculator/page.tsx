import type { Metadata } from "next";
import { Suspense } from "react";
import DueDateCalculator from "@/components/calcs/baby/due-date-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/due-date-calculator";
const TITLE = "Pregnancy Due Date Calculator | CalcDigi";
const DESCRIPTION =
  "Calculate pregnancy due date from last period or conception date. Get trimester timeline, countdown days, and clinical developmental milestones.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Pregnancy Due Date Calculator"
      intro="Calculate your estimated delivery date (EDD) from your last menstrual period (LMP) or conception date. Get your complete trimester timeline, key pregnancy milestones, and weeks remaining until your baby arrives."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={[
        {
          q: "How is an estimated due date (EDD) calculated?",
          a: "The standard clinical method uses Naegele's Rule: add 280 days (40 weeks) to the first day of your last menstrual period (LMP), adjusting for cycle length differences from the standard 28 days. First-trimester ultrasound dating (measuring crown-rump length before 14 weeks) is considered the most accurate medical dating method.",
        },
        {
          q: "How many babies are actually born on their exact due date?",
          a: "Only approximately 4% of babies are born precisely on their estimated due date. About 80% arrive within two weeks before or after (between 38 and 42 weeks), which clinicians consider normal full-term labor.",
        },
        {
          q: "What defines full-term vs preterm delivery?",
          a: "According to ACOG guidelines: Preterm is before 37 weeks; Early Term is 37 to 38 weeks and 6 days; Full Term is 39 to 40 weeks and 6 days (associated with best infant health outcomes); Late Term is 41 weeks; Post-Term is 42 weeks and beyond.",
        },
        {
          q: "When should I contact my healthcare provider immediately?",
          a: "Contact your OB-GYN or midwife immediately if you experience heavy vaginal bleeding, persistent severe pelvic pain, regular painful contractions before 37 weeks, fluid leakage (water breaking), severe sudden headache with visual disturbances, or noticeable decrease in fetal kicks after 28 weeks.",
        },
      ]}
      related={[
        { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
        { href: "/calculators/baby/baby-sleep-calculator", icon: "😴", name: "Baby Sleep Calculator" },
        { href: "/calculators/baby/diaper-cost-calculator", icon: "👶", name: "Diaper Cost Calculator" },
      ]}
      article={
        <>
          <h2>Clinical Gestational Milestones & Trimester Timeline</h2>
          <p>
            Pregnancy is measured from the first day of your last menstrual period because the exact date of conception
            is rarely known with certainty. The 40-week gestation span is divided into three critical developmental trimesters.
          </p>

          <DataTable
            head={["Trimester", "Gestational Weeks", "Key Maternal & Fetal Developments"]}
            rows={[
              ["First Trimester", "Weeks 1 – 12", "Organogenesis, neural tube closure, detectable embryonic heartbeat at week 6."],
              ["Second Trimester", "Weeks 13 – 27", "Rapid skeletal growth, anatomical development, first maternal kick feelings (quickening)."],
              ["Third Trimester", "Weeks 28 – 40", "Alveolar lung maturation, rapid subcutaneous fat accumulation, maternal antibody transfer."],
            ]}
          />

          <h2>Important Clinical Checkpoints</h2>
          <DataTable
            head={["Milestone", "Week Window", "Diagnostic Assessment"]}
            rows={[
              ["Embryonic Heartbeat", "Week 6 – 7", "Visible on transvaginal or abdominal ultrasound."],
              ["First Trimester Screening", "Week 11 – 14", "Nuchal translucency (NT) ultrasound scan + maternal serum screening."],
              ["Anatomy Scan (Level II)", "Week 18 – 22", "Comprehensive fetal biometric evaluation and physical anatomy survey."],
              ["Glucose Tolerance Screen", "Week 24 – 28", "Gestational diabetes screening protocol."],
              ["Full Term Readiness", "Week 39 – 40", "Surfactant-ready lungs, optimal neurological maturation for birth."],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <DueDateCalculator />
      </Suspense>
    </CalcPage>
  );
}
