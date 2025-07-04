
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticker, setTicker] = useState('');
  const [selectedTicker, setSelectedTicker] = useState('');

  const presetTickers = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA', 'OR.PA'];

  const fetchScore = (symbol) => {
    setLoading(true);
    fetch('/api/data?ticker=' + symbol)
      .then(res => res.json())
      .then(data => {
        setStocks([data]);
        setLoading(false);
      });
  };

  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Head>
        <title>Jukkastocks – Nieminen Score</title>
      </Head>
      <h1>Nieminen Score</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          🔍 Syötä ticker:&nbsp;
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Esim. AAPL"
            style={{ padding: '0.5rem' }}
          />
        </label>
        <button onClick={() => fetchScore(ticker)} style={{ marginLeft: '1rem' }}>Hae</button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label>
          📊 Valitse valmiista:&nbsp;
          <select value={selectedTicker} onChange={(e) => {
            setSelectedTicker(e.target.value);
            fetchScore(e.target.value);
          }}>
            <option value="">-- Valitse --</option>
            {presetTickers.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? <p>Loading...</p> : (
        <ul>
          {stocks.map((s, i) => (
            <li key={i} style={{ marginBottom: '1rem' }}>
              <strong>{s.symbol}</strong> — Score: <strong>{s.score}</strong>/20
              <br />
              <small>PE: {s.pe}, PB: {s.pb}, ROE: {s.roe}%, Dividend Yield: {s.dividendYield}%, Analyst: {s.analystScore}/2</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
