import React from 'react';
import { Link } from 'react-router-dom';

export default function Library() {
  const shelves = [
    {
      id: 'stories',
      label: 'Shelf I',
      title: 'Stories from the Archive',
      description: 'Narratives, parables, and extended records of the journey.',
      path: '/library/stories',
      highlight: true
    },
    {
      id: 'field-guide',
      label: 'Shelf II',
      title: "Field Guide to Other People's Weather",
      description: 'A growing catalog of the storms and silences we encounter in others.',
      path: '/library/field-guide',
      highlight: false
    },
    {
      id: 'inventory',
      label: 'Shelf III',
      title: 'Inventory of Left Objects',
      description: 'Documentation of what the Cartographer carried and abandoned.',
      path: '/library/inventory',
      highlight: false
    },
    {
      id: 'glossary',
      label: 'Shelf IV',
      title: 'Glossary of Necessary Silence',
      description: 'Words swallowed, mistranslated, or redefined in the valley.',
      path: '/library/glossary',
      highlight: false
    }
  ];

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 4rem' }}>
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
        <Link to="/archive">Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>Valley Library</span>
      </nav>

      <div className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <h1 className="page-title">The Valley Library</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          Essays, field guides, recovered objects, altered definitions, and stories from roads that extend beyond the manuscript.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.75rem'
      }}>
        {shelves.map((shelf) => (
          <Link 
            key={shelf.id} 
            to={shelf.path} 
            className={`archive-card ${shelf.highlight ? 'archive-card--red' : ''}`}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none', height: '100%' }}
          >
            <div>
              <span className="archive-catalog-label">{shelf.label}</span>
              <h3 className="card-title" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{shelf.title}</h3>
              <p className="card-description">{shelf.description}</p>
            </div>
            <div style={{ marginTop: '1.5rem', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Explore Shelf &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
