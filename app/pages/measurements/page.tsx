import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("conversion");

export default function Page() {
  return <CategoryLanding id="conversion" />;
}
