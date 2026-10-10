import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatTaka, formatUnit } from "@/lib/formatters";

export default function ProductCard({ product }) {
  const { dir, pct } = product.change;
  const ChangeIcon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : Minus;

  return (
    <Link className="product-card" href={`/product/${product.slug}`}>
      <div className="product-art">
        <span className="product-emoji" aria-hidden="true">{product.image}</span>
        <span className="product-category">{product.categoryNameBn}</span>
        <span className={`change-badge change-${dir}`}>
          <ChangeIcon size={14} strokeWidth={2.5} />
          {new Intl.NumberFormat("bn-BD").format(Math.abs(pct))}%
        </span>
      </div>
      <div className="product-info">
        <h3>{product.nameBn}</h3>
        <p>{formatUnit(product.unit)}</p>
        <div className="product-price-row">
          <span>আজকের দাম</span>
          <strong>{formatTaka(product.today)}</strong>
        </div>
        <span className="card-open-label">দাম দেখুন <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
}