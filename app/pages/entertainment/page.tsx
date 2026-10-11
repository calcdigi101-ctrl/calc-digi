import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("entertainment");

export default function Page() {
  return <CategoryLanding id="entertainment" />;
}
