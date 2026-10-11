import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("food");

export default function Page() {
  return <CategoryLanding id="food" />;
}
