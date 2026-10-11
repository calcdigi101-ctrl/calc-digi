import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("environment");

export default function Page() {
  return <CategoryLanding id="environment" />;
}
