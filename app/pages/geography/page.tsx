import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("geography");

export default function Page() {
  return <CategoryLanding id="geography" />;
}
