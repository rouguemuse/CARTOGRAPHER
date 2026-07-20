import React from 'react';

export default function BrandLogo({ variant = 'archive', className = '' }) {
  return (
    <span className={`brand-logo-content ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <img src="/media/wolves-logo.png" alt="Wolves Logo" style={{ height: '32px', width: 'auto' }} />
      <span className="site-title-text" style={{ fontFamily: 'var(--font-display)', color: 'inherit', fontSize: '1.15rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
        How to Explain Yourself to Wolves
      </span>
    </span>
  );
}
