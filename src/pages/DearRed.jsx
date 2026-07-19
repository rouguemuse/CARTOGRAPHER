import React from 'react';
import DearRedForm from '../components/DearRedForm';

export default function DearRed() {
  return (
    <div className="container archive-page">
      <div className="archive-masthead" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '2rem' }}>
        <h1>Dear Red</h1>
        <p>Write about the road you cannot read, the weather you cannot name, or the question you keep carrying.</p>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <DearRedForm />
      </div>
    </div>
  );
}
