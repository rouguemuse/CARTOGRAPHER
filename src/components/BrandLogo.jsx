import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo() {
  return (
    <Link to="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
      <img src="/media/wolves-logo.png" alt="How to Explain Yourself to Wolves" style={{ height: '36px', width: 'auto' }} />
      <span className="site-title" style={{ fontFamily: 'var(--font-display)', color: 'inherit', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
        How to Explain Yourself to Wolves
      </span>
    </Link>
  );
}
