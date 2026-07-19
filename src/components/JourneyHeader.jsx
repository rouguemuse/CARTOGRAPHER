import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function JourneyHeader() {
  return (
    <header className="journey-header" style={{
      position: 'absolute', top: 0, left: 0, right: 0, 
      padding: '1.5rem', display: 'flex', justifyContent: 'space-between', 
      alignItems: 'center', zIndex: 10
    }}>
      <div className="header-left">
        <BrandLogo />
      </div>
      <nav className="header-right" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/journal" style={{ color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Journal</Link>
        <Link to="/almanac" style={{ color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Almanac</Link>
        <Link to="/endings" style={{ color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Endings</Link>
        <Link to="/archive" style={{ color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px' }}>Exit to Archive</Link>
      </nav>
    </header>
  );
}
