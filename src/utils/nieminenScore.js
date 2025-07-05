// Nieminen Score -laskenta
export function calculateNieminenScore(data) {
  let score = 0;
  const details = {};

  const pe = data.peRatio;
  if (pe < 10) { score += 3; details.pe = 3; }
  else if (pe < 15) { score += 2; details.pe = 2; }
  else if (pe < 20) { score += 1; details.pe = 1; }
  else { details.pe = 0; }

  const pb = data.pbRatio;
  if (pb < 1) { score += 3; details.pb = 3; }
  else if (pb < 2) { score += 2; details.pb = 2; }
  else if (pb < 3) { score += 1; details.pb = 1; }
  else { details.pb = 0; }

  const roe = data.roe;
  if (roe > 20) { score += 3; details.roe = 3; }
  else if (roe > 10) { score += 2; details.roe = 2; }
  else if (roe > 5) { score += 1; details.roe = 1; }
  else { details.roe = 0; }

  const dividend = data.dividendYield;
  if (dividend > 4) { score += 3; details.dividend = 3; }
  else if (dividend > 2) { score += 2; details.dividend = 2; }
  else if (dividend > 1) { score += 1; details.dividend = 1; }
  else { details.dividend = 0; }

  const analysts = data.analystRating; // esim. "buy", "hold", "sell"
  if (analysts === "buy") { score += 2; details.analysts = 2; }
  else if (analysts === "hold") { score -= 1; details.analysts = -1; }
  else if (analysts === "sell") { score -= 2; details.analysts = -2; }
  else { details.analysts = 0; }

  return { score, details };
}
