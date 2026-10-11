import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("physics");

export default function Page() {
  return <CategoryLanding id="physics" />;
}
