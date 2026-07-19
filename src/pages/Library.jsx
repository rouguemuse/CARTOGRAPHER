import React from 'react';
import { Link } from 'react-router-dom';

export default function Library() {
  return (
    <div className="container archive-page">
      <div className="archive-masthead">
        <h1>The Valley Library</h1>
        <p>Essays, field guides, recovered objects, altered definitions, and stories from beyond the manuscript.</p>
      </div>

      <div className="archive-grid">
        <Link to="/library/stories" className="archive-card archive-card--red">
          <span className="archive-catalog-label" style={{ color: 'var(--paper)', opacity: 0.7 }}>Shelf I</span>
          <h3>Stories from the Archive</h3>
          <p>Narratives, parables, and extended records of the journey.</p>
        </Link>
        
        <Link to="/library/field-guide" className="archive-card">
          <span className="archive-catalog-label">Shelf II</span>
          <h3>Field Guide to Other People's Weather</h3>
          <p>A growing catalog of the storms and silences we encounter in others.</p>
        </Link>

        <Link to="/library/inventory" className="archive-card">
          <span className="archive-catalog-label">Shelf III</span>
          <h3>Inventory of Left Objects</h3>
          <p>Documentation of what the Cartographer carried and abandoned.</p>
        </Link>

        <Link to="/library/glossary" className="archive-card">
          <span className="archive-catalog-label">Shelf IV</span>
          <h3>Glossary of Necessary Silence</h3>
          <p>Words swallowed, mistranslated, or redefined in the valley.</p>
        </Link>
      </div>
    </div>
  );
}
