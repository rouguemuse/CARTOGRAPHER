import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function SiteHeader() {
  return (
    <header className="site-header" style={{
      position: 'absolute', top: 0, left: 0, right: 0, 
      padding: '1.5rem', display: 'flex', justifyContent: 'space-between', 
      alignItems: 'center', zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}>
      <div className="header-left">
        <BrandLogo />
      </div>
      <nav className="header-right" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/archive" style={{ color: 'var(--color-charcoal)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Archive</Link>
        <Link to="/library" style={{ color: 'var(--color-charcoal)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Valley Library</Link>
        <Link to="/dear-red" style={{ color: 'var(--color-charcoal)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Dear Red</Link>
        <Link to="/book" style={{ color: 'var(--color-charcoal)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>The Book</Link>
        <Link to="/journey" style={{ color: 'var(--color-bone)', backgroundColor: 'var(--color-blood)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem 1rem', borderRadius: '4px' }}>Begin Journey</Link>
      </nav>
    </header>
  );
}
