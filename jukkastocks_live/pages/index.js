import { useState, useEffect } from 'react';
import ScoreCard from '../components/ScoreCard';

export default function Home() {
  const [market, setMarket] = useState('us');
  const [tab, setTab] = useState('score');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`/api/data?market=${market}`)
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, [market]);

  return (
    <main style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Nieminen Score</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Markkina: </label>
        <select value={market} onChange={(e) => setMarket(e.target.value)}>
          <option value="us">Yhdysvallat</option>
          <option value="eu">Eurooppa</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTab('score')}>Score</button>
        <button onClick={() => setTab('pe')}>P/E</button>
        <button onClick={() => setTab('pb')}>P/B</button>
      </div>
      <div>
        {tab === 'score' && companies.map((c, i) => <ScoreCard key={i} company={c} />)}
        {tab !== 'score' && <p>Tämä näkymä tulossa pian...</p>}
      </div>
    </main>
  );
}