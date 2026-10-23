import type { Metadata } from "next";
import { Suspense } from "react";
import BabyNamePopularityCalculator from "@/components/calcs/baby/baby-name-popularity-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/baby-name-popularity-calculator";
const TITLE = "Baby Name Popularity Calculator | CalcDigi";
const DESCRIPTION =
  "Check how popular any baby name is by rank and decade. Explore official US Social Security Administration naming data and discover unique alternatives.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Baby Name Popularity & Rank Calculator"
      intro="Lookup official US Social Security Administration popularity rankings and frequency percentiles for thousands of boy and girl baby names. Discover name uniqueness scores and classic naming revival cycles."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={[
        {
          q: "Where does baby name popularity data come from?",
          a: "Official baby name data is published annually by the United States Social Security Administration (SSA), compiling records from all official birth certificate registrations across all 50 states.",
        },
        {
          q: "What is the 100-year rule in baby naming?",
          a: "The 'century rule' or 'grandparent trend' is a well-documented linguistic phenomenon where names that peaked roughly 100 years ago (names of grandparents and great-grandparents) cycle back into fashion as parents seek vintage, timeless classics (such as Theodore, Hazel, Evelyn, and Arthur).",
        },
        {
          q: "Are top 10 names as common today as in past decades?",
          a: "No. Parents today choose from far greater naming diversity. In the 1950s, the #1 boy name (James or Michael) was given to 4%–5% of all baby boys. Today, the #1 name (Liam) represents less than 1% of boys born, meaning even top-ranked names will rarely have duplicates in the same classroom.",
        },
      ]}
      related={[
        { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date" },
        { href: "/calculators/baby/baby-sleep-calculator", icon: "😴", name: "Baby Sleep Schedule" },
        { href: "/calculators/baby/child-height-predictor-calculator", icon: "📏", name: "Child Height Predictor" },
      ]}
      article={
        <>
          <h2>Top 10 US Baby Names (Latest Social Security Data)</h2>
          <DataTable
            head={["Rank", "Boys Top Names", "Girls Top Names", "Dominant Style Trend"]}
            rows={[
              ["#1", "Liam", "Olivia", "Gentle vowels, modern global appeal"],
              ["#2", "Noah", "Emma", "Short two-syllable enduring classics"],
              ["#3", "Oliver", "Charlotte", "Royal vintage elegance"],
              ["#4", "James", "Amelia", "Timeless traditional heritage"],
              ["#5", "Elijah", "Sophia", "Melodic vowel-rich cadence"],
              ["#6", "William", "Mia", "Classic foundational strength"],
              ["#7", "Henry", "Isabella", "Warm heritage revival"],
              ["#8", "Lucas", "Ava", "Bright European aesthetic"],
              ["#9", "Benjamin", "Evelyn", "Sophisticated classic endurance"],
              ["#10", "Theodore", "Luna", "Nature & vintage revival favorites"],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <BabyNamePopularityCalculator />
      </Suspense>
    </CalcPage>
  );
}
