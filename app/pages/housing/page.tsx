import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("housing");

export default function Page() {
  return <CategoryLanding id="housing" />;
}
