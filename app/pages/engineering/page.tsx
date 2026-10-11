import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("engineering");

export default function Page() {
  return <CategoryLanding id="engineering" />;
}
