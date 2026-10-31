import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("finance");

export default function Page() {
  return <CategoryLanding id="finance" />;
}
