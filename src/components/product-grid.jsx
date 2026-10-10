"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/product-card";

export default function ProductGrid({ products, showSort = false }) {
  const [sort, setSort] = useState("default");
  const sortedProducts = [...products];

  if (sort === "ascending") sortedProducts.sort((first, second) => first.today - second.today);
  if (sort === "descending") sortedProducts.sort((first, second) => second.today - first.today);

  return (
    <>
      {showSort && (
        <label className="sort-control">
          <ChevronDown size={17} aria-hidden="true" />
          <span>সাজান</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="default">ডিফল্ট</option>
            <option value="ascending">দাম: কম থেকে বেশি</option>
            <option value="descending">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      )}
      <div className="product-grid">
        {sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}