
export default async function handler(req, res) {
  const tickers = ['AAPL', 'MSFT', 'GOOGL'];
  const key = 'VqrBS5P1n3fMGjXetSiiPTMBRSZeNW2I';

  const results = await Promise.all(tickers.map(async (ticker) => {
    const finUrl = `https://api.polygon.io/v2/reference/financials?ticker=${ticker}&limit=1&apiKey=${key}`;

    const fin = await fetch(finUrl).then(r => r.json());

    const metrics = fin.results?.[0]?.metrics || {};

    const pe = parseFloat(metrics.pe_ratio) || 0;
    const pb = parseFloat(metrics.pb_ratio) || 0;
    const dividendYield = parseFloat(metrics.dividend_yield) || 0;

    const score =
      (pb < 3 ? 5 : pb < 5 ? 4 : 2) +
      (dividendYield > 2 ? 5 : dividendYield > 1 ? 3 : 1) +
      (pe < 20 ? 4 : pe < 30 ? 3 : 1);

    return {
      ticker,
      pe,
      pb,
      dividendYield,
      score
    };
  }));

  res.status(200).json(results);
}
