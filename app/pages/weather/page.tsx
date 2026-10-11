import { CategoryLanding, categoryMetadata } from "@/components/site/CategoryLanding";

export const metadata = categoryMetadata("weather");

export default function Page() {
  return <CategoryLanding id="weather" />;
}
