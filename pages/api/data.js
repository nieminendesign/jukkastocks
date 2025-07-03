export default function handler(req, res) {
  const mockData = [
    { name: "LVMH", ticker: "MC.PA", pe: 22, pb: 5, roe: 0.24, div: 0.015, rating: "buy" },
    { name: "Novo Nordisk", ticker: "NOVO-B.CO", pe: 30, pb: 18, roe: 0.70, div: 0.02, rating: "hold" },
    { name: "Lam Research", ticker: "LRCX", pe: 19, pb: 6, roe: 0.45, div: 0.017, rating: "buy" }
  ];

  const scored = mockData.map((c) => {
    let score = 0;
    if (c.pb < 5) score += 5;
    else if (c.pb < 10) score += 3;
    else score += 1;

    if (c.roe > 0.5) score += 5;
    else if (c.roe > 0.3) score += 3;
    else score += 1;

    if (c.div > 0.015) score += 3;
    else if (c.div > 0.005) score += 2;
    else score += 1;

    if (c.rating === 'buy') score += 2;
    else if (c.rating === 'hold') score -= 1;
    else score -= 2;

    let profile = 'tasapainoinen';
    if (c.pb > 10 && c.roe > 0.4) profile = 'kasvu';
    else if (c.pb < 5 && c.roe < 0.3) profile = 'arvo';

    return { ...c, score, profile };
  });

  res.status(200).json(scored);
}