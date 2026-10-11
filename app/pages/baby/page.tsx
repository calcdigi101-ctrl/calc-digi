import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("baby");

export default function Page() {
  return <CategoryLanding id="baby" />;
}
