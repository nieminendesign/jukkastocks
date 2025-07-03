import { useState } from 'react';

export default function ScoreCard({ company }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{
      border: '1px solid #444',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: '#222',
      position: 'relative'
    }}
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
    >
      <h3>{company.name} ({company.ticker})</h3>
      <p>Score: {company.score}</p>
      <p>Profile: {company.profile}</p>
      {show && (
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: '#333',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '4px',
          zIndex: 10,
          fontSize: '0.8rem'
        }}>
          <p><strong>P/B:</strong> {company.pb}</p>
          <p><strong>ROE:</strong> {company.roe}</p>
          <p><strong>Dividend:</strong> {company.div}</p>
          <p><strong>Rating:</strong> {company.rating}</p>
        </div>
      )}
    </div>
  );
}