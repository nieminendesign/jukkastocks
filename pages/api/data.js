export default async function handler(req, res) {
  res.status(200).json([
    {
      ticker: "AAPL",
      pe: 24.3,
      pb: 6.1,
      dividendYield: 0.6,
      score: 13
    },
    {
      ticker: "MSFT",
      pe: 32.5,
      pb: 8.4,
      dividendYield: 0.9,
      score: 12
    }
  ]);
}
