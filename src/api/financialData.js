// Esimerkki: Haetaan dataa FMP:ltä ja Polygonilta
export async function fetchFinancialData(ticker) {
  const polygonKey = process.env.REACT_APP_POLYGON_API_KEY;
  const fmpKey = process.env.REACT_APP_FMP_API_KEY;

  const peUrl = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${ticker}?apikey=${fmpKey}`;
  const priceUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-07-01/2024-07-01?adjusted=true&sort=asc&limit=365&apiKey=${polygonKey}`;
  const rsiUrl = `https://api.polygon.io/v1/indicators/rsi/${ticker}?timespan=day&window=14&series_type=close&apiKey=${polygonKey}`;

  const [peData, priceData, rsiData] = await Promise.all([
    fetch(peUrl).then(res => res.json()),
    fetch(priceUrl).then(res => res.json()),
    fetch(rsiUrl).then(res => res.json())
  ]);

  return { peData, priceData, rsiData };
}
