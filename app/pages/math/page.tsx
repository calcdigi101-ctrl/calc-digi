import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";
import QuickMathCalculator from "@/components/QuickMathCalculator";

export const metadata = categoryMetadata("math");

export default function Page() {
  return (
    <CategoryLanding id="math">
      <div className="qmc-hero-continuation">
        <div className="container">
          <QuickMathCalculator />
        </div>
      </div>
    </CategoryLanding>
  );
}
