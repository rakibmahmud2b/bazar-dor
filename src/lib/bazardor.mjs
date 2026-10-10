const API_BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request(path) {
  let lastError;

  for (const base of API_BASES) {
    try {
      const response = await fetch(`${base}${path}`, {
        signal: AbortSignal.timeout(8000),
      });

      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`BazarDor API returned ${response.status}`);

      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("BazarDor API is unavailable");
}

export async function getProducts(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const products = await request(`/products${query}`);
  return Array.isArray(products) ? products : [];
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  return product ? request(`/products/${product.id}`) : null;
}

export async function getCategories() {
  const categories = await request("/categories");
  return Array.isArray(categories) ? categories : [];
}

export async function getCategoryBySlug(slug) {
  return request(`/categories/${encodeURIComponent(slug)}`);
}

export function formatTaka(amount) {
  return `${new Intl.NumberFormat("bn-BD").format(amount)} টাকা`;
}

export function formatUnit(unit) {
  return {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  }[unit] ?? "প্রতি একক";
}

export function getPriceSummary(product) {
  const marketPrices = product.markets.flatMap(({ min, max }) => [min, max]);
  const minimum = Math.min(...marketPrices);
  const maximum = Math.max(...marketPrices);

  return {
    minimum,
    maximum,
    average: Math.round(marketPrices.reduce((total, price) => total + price, 0) / marketPrices.length),
  };
}