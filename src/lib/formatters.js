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