
export default async function handler(req, res) {
  const key = 'azObx60SF5un3u1PrxdLGnXh0rdVWb5M';
  const symbol = req.query.ticker || 'AAPL';

  try {
    const profileRes = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${key}`);
    const quoteRes = await fetch(`https://financialmodelingprep.com/api/v3/ratios-ttm/${symbol}?apikey=${key}`);
    const ratingRes = await fetch(`https://financialmodelingprep.com/api/v4/analyst-estimates?symbol=${symbol}&apikey=${key}`);

    const profile = await profileRes.json();
    const quote = await quoteRes.json();
    const rating = await ratingRes.json();

    const pe = parseFloat(quote[0]?.peRatioTTM) || 0;
    const pb = parseFloat(quote[0]?.priceToBookRatioTTM) || 0;
    const dividendYield = parseFloat(quote[0]?.dividendYielTTM) || 0;
    const roe = parseFloat(quote[0]?.returnOnEquityTTM) * 100 || 0;

    const analystAvg = parseFloat(rating[0]?.ratingAverage) || 0;
    const analystScore = analystAvg >= 4.5 ? 2 : analystAvg >= 3.5 ? 1 : 0;

    let score = 0;
    score += pb < 1.5 ? 5 : pb < 3 ? 4 : pb < 5 ? 3 : pb < 8 ? 2 : 1;
    score += roe > 25 ? 5 : roe > 15 ? 4 : roe > 10 ? 3 : roe > 5 ? 2 : 1;
    score += dividendYield > 4 ? 4 : dividendYield > 2 ? 3 : dividendYield > 1 ? 2 : dividendYield > 0 ? 1 : 0;
    score += pe < 15 ? 3 : pe < 25 ? 2 : pe < 35 ? 1 : 0;
    score += analystScore;

    res.status(200).json({
      symbol,
      pe,
      pb,
      dividendYield,
      roe,
      analystScore,
      score
    });
  } catch (error) {
    res.status(200).json({ symbol, error: true, score: 0 });
  }
}
