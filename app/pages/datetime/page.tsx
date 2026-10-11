import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("datetime");

export default function Page() {
  return <CategoryLanding id="datetime" />;
}
