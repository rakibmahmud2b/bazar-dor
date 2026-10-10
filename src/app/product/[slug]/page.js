import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/bazardor.mjs";
import { formatTaka, formatUnit, getPriceSummary } from "@/lib/formatters";
import ProductLoadingState from "@/components/product-loading-state";

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<ProductLoadingState className="route-loading" />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?reason=protected&callbackURL=${encodeURIComponent(`/product/${slug}`)}`);

  const summary = getPriceSummary(product);
  const ChangeIcon = product.change.dir === "up" ? ArrowUpRight : product.change.dir === "down" ? ArrowDownRight : Minus;

  return (
    <main className="route-main">
      <Link className="text-link detail-back" href="/"><ArrowLeft size={15} /> সব পণ্যে ফিরে যান</Link>
      <section className="detail-header">
        <div className="detail-title-wrap">
          <span className="detail-product-icon" aria-hidden="true">{product.image}</span>
          <div>
            <span className="route-kicker">{product.categoryIcon} {product.categoryNameBn}</span>
            <h1>{product.nameBn}</h1>
            <p>{formatUnit(product.unit)} · বাজারভিত্তিক আজকের দর</p>
            <div className="detail-tags"><Link className="detail-tag" href={`/category/${product.category}`}>{product.categoryNameBn}</Link><span className="detail-tag">{formatUnit(product.unit)}</span></div>
          </div>
        </div>
        <div className="detail-price-now">
          <span>আজকের গড় দাম</span><strong>{formatTaka(product.today)}</strong>
          <span className={`detail-change change-${product.change.dir}`}><ChangeIcon size={14} /> {new Intl.NumberFormat("bn-BD").format(Math.abs(product.change.pct))}%</span>
        </div>
      </section>

      <section className="detail-summary-grid" aria-label="দামের সারাংশ">
        <div className="price-stat"><span>সর্বনিম্ন দাম</span><strong>{formatTaka(summary.minimum)}</strong></div>
        <div className="price-stat"><span>সর্বোচ্চ দাম</span><strong>{formatTaka(summary.maximum)}</strong></div>
        <div className="price-stat"><span>গড় বাজারদর</span><strong>{formatTaka(summary.average)}</strong></div>
      </section>

      <section>
        <h2 className="detail-section-title">বাজারভিত্তিক আজকের দাম</h2>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead><tr><th>বাজার</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th><th>আজকের গড়</th></tr></thead>
            <tbody>
              {product.markets.map((market) => (
                <tr key={`${market.market}-${market.division}`}>
                  <td><span className="market-name">{market.market}</span><span className="market-division">{market.division}</span></td>
                  <td>{formatTaka(market.min)}</td><td>{formatTaka(market.max)}</td>
                  <td className="market-range">{formatTaka(Math.round((market.min + market.max) / 2))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}