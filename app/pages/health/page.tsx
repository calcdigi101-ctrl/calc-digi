import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("health");

export default function Page() {
  return <CategoryLanding id="health" />;
}
