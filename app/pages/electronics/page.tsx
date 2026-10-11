import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("electronics");

export default function Page() {
  return <CategoryLanding id="electronics" />;
}
