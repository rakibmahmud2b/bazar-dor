import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product-grid";
import ProductLoadingState from "@/components/product-loading-state";
import { getCategoryBySlug, getProducts } from "@/lib/bazardor.mjs";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<ProductLoadingState className="route-loading" />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategoryBySlug(slug), getProducts(slug)]);
  if (!category) notFound();

  const relatedCount = new Intl.NumberFormat("bn-BD").format(products.length);

  return (
    <main className="route-main">
      <div className="route-heading">
        <div className="route-heading-main">
          <span className="route-heading-icon" aria-hidden="true">{category.icon}</span>
          <div><span className="route-kicker">পণ্যের বিভাগ</span><h1>{category.nameBn}</h1><p>{relatedCount}টি পণ্যের আজকের বাজারদর</p></div>
        </div>
        <Link className="button button-quiet" href="/"><ArrowLeft size={15} /> হোম পেজ</Link>
      </div>

      {products.length ? <ProductGrid products={products} showSort /> : (
        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">{category.icon}</span>
          <h2>এই বিভাগে পণ্য নেই</h2>
          <p>অন্য বিভাগে আজকের বাজারদর খুঁজে দেখুন।</p>
          <Link className="button button-primary" href="/">হোম পেজে ফিরে যান <ArrowRight size={15} /></Link>
        </div>
      )}
    </main>
  );
}