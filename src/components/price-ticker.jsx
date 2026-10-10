import Link from "next/link";
import { formatTaka, formatUnit } from "@/lib/formatters";

export default function PriceTicker({ products }) {
  if (!products.length) return null;

  const items = [...products.slice(0, 15), ...products.slice(0, 15)];

  return (
    <div className="ticker-shell" aria-label="আজকের বাজারদর">
      <span className="ticker-label"><span className="live-dot" /> আজকের দর</span>
      <div className="ticker-window">
        <div className="ticker-track">
          {items.map((product, index) => (
            <Link className="ticker-item" href={`/product/${product.slug}`} key={`${product.id}-${index}`} tabIndex={index < 15 ? 0 : -1}>
              <span aria-hidden="true">{product.image}</span>
              <span>{product.nameBn}</span>
              <strong>{formatTaka(product.today)} / {formatUnit(product.unit)}</strong>
              <span className={`ticker-change change-${product.change.dir}`}>
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}
                {new Intl.NumberFormat("bn-BD").format(Math.abs(product.change.pct))}%
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}