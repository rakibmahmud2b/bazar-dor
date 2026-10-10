import SiteHeader from "@/components/site-header";
import PriceTicker from "@/components/price-ticker";
import { getCategories, getProducts } from "@/lib/bazardor.mjs";

export default async function SiteChrome() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);
  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <>
      <SiteHeader categories={categories} banglaDate={banglaDate} />
      <PriceTicker products={products} />
    </>
  );
}