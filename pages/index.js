import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setStocks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Head>
        <title>Jukkastocks</title>
      </Head>
      <h1>Nieminen Score (Live)</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {stocks.map((s, i) => (
            <li key={i}>
              <strong>{s.ticker}</strong>: {s.score}/20
              <br />
              <small>PE: {s.pe}, PB: {s.pb}, Yield: {s.dividendYield}%</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
