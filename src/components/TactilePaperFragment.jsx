import React from 'react';

export default function TactilePaperFragment({ statement, alias, destinationTag, submittedAt, variant = 0 }) {
  const formatTagLabel = (tag) => {
    switch (tag) {
      case 'to-my-mother': return 'To my mother';
      case 'to-the-wolf': return 'To the wolf';
      case 'to-my-younger-self': return 'To my younger self';
      case 'to-the-person-i-left': return 'To the person I left';
      case 'to-the-person-who-left': return 'To the person who left';
      case 'to-myself': return 'To myself';
      default: return 'Unsaid Fragment';
    }
  };

  // 3 tactile fragment variants (paper scrap, pinned note, typed evidence tag)
  const styles = [
    {
      background: '#fffefa',
      border: '1px solid var(--paper-line)',
      boxShadow: '4px 4px 0 rgba(18,18,18,0.08)',
      transform: 'rotate(-0.8deg)',
      pinColor: 'var(--red)'
    },
    {
      background: '#fcfaf4',
      border: '1px solid #dcd4c0',
      boxShadow: '3px 5px 12px rgba(0,0,0,0.06)',
      transform: 'rotate(0.6deg)',
      pinColor: 'var(--color-brass)'
    },
    {
      background: '#f4f6f8',
      border: '1px solid #c9d2db',
      boxShadow: '4px 3px 0 rgba(0,0,0,0.06)',
      transform: 'rotate(-0.4deg)',
      pinColor: 'var(--color-storm-blue)'
    }
  ];

  const currentStyle = styles[variant % styles.length];

  return (
    <article 
      style={{
        background: currentStyle.background,
        border: currentStyle.border,
        boxShadow: currentStyle.boxShadow,
        transform: currentStyle.transform,
        padding: '1.5rem',
        borderRadius: '4px',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      {/* Decorative Pin / Tape mark */}
      <div 
        style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: currentStyle.pinColor,
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
        aria-hidden="true"
      />

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px dashed var(--paper-line)', paddingBottom: '0.5rem' }}>
        <span className="archive-catalog-label" style={{ margin: 0, fontSize: '0.7rem' }}>
          {formatTagLabel(destinationTag)}
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          {alias || 'Anonymous'}
        </span>
      </header>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-reading)', lineHeight: '1.6', color: 'var(--ink)', margin: '0 0 1rem 0', fontStyle: 'italic' }}>
        "{statement}"
      </p>

      {submittedAt && (
        <footer style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-ui)' }}>
          {new Date(submittedAt).toLocaleDateString()}
        </footer>
      )}
    </article>
  );
}
