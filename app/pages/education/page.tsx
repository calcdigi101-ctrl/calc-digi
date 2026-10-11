import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("education");

export default function Page() {
  return <CategoryLanding id="education" />;
}
