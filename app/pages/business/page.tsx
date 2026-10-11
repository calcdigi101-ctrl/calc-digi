import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("business");

export default function Page() {
  return <CategoryLanding id="business" />;
}
