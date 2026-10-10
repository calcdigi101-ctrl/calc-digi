import { MortgagePage, mortgageMetadata } from "@/components/flagship/mortgage/MortgagePage";

const PATH = "/calculators/housing/mortgage-calculator";

// Same tool as the finance URL; point search engines at that one to avoid duplicate content.
export const metadata = mortgageMetadata("/calculators/finance/mortgage-calculator");

export default function Page() {
  return <MortgagePage path={PATH} category={{ href: "/pages/housing", label: "Housing" }} />;
}
