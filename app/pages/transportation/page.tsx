import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("transportation");

export default function Page() {
  return <CategoryLanding id="transportation" />;
}
