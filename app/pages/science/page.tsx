import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("science");

export default function Page() {
  return <CategoryLanding id="science" />;
}
