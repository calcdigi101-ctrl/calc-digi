import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("internet");

export default function Page() {
  return <CategoryLanding id="internet" />;
}
