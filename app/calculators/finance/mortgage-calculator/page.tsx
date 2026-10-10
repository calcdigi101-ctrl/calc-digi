import { MortgagePage, mortgageMetadata } from "@/components/flagship/mortgage/MortgagePage";

const PATH = "/calculators/finance/mortgage-calculator";

export const metadata = mortgageMetadata(PATH);

export default function Page() {
  return <MortgagePage path={PATH} category={{ href: "/pages/finance", label: "Finance" }} />;
}
