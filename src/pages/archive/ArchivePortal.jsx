import React from 'react';
import { Link } from 'react-router-dom';
import { fieldGuideEntries } from '../../data/fieldGuideData';
import { inventoryObjects } from '../../data/inventoryData';
import { glossaryTerms } from '../../data/glossaryData';
import './ArchivePortal.css';

export default function ArchivePortal() {
  const featuredEssay = fieldGuideEntries[0];
  const featuredObject = inventoryObjects[0];
  const featuredTerm = glossaryTerms[0];

  return (
    <div className="container archive-portal-page" style={{ padding: '2.5rem 0 6rem' }}>
      
      {/* Editorial Masthead */}
      <header className="archive-portal-masthead">
        <span className="page-kicker">The Cartographer's Archive</span>
        <h1 className="page-title">Three Rooms Outside the Manuscript</h1>
        <p className="page-introduction">
          An atmospheric editorial repository of essays, evidence, and interconnected terms recovered from the territory surrounding <em>How to Explain Yourself to Wolves</em>.
        </p>
      </header>

      {/* THREE DISTINCT ROOM EXPERIENCES */}
      <div className="rooms-container">

        {/* ROOM 1: THE FIELD GUIDE — Long-Form Literary Observation */}
        <section className="portal-room room-field-guide">
          <div className="room-header">
            <span className="room-tag">ROOM I</span>
            <h2 className="room-title">The Field Guide</h2>
            <p className="room-purpose">
              Long-form literary essays and observations about survival patterns, boundary fatigue, emotional weather, and self-justification.
            </p>
          </div>

          <div className="room-featured-content">
            <span className="featured-label">Featured Observation</span>
            <h3 className="featured-title">
              <Link to={`/archive/field-guide/${featuredEssay.slug}`}>{featuredEssay.title}</Link>
            </h3>
            <p className="featured-intro">"{featuredEssay.introObservation}"</p>
            <div className="featured-meta">
              <span>{featuredEssay.eyebrow}</span> • <span>{featuredEssay.relatedChapter}</span>
            </div>
          </div>

          <div className="room-action-bar">
            <Link to="/archive/field-guide" className="btn btn-primary room-btn">
              Open The Field Guide &rarr;
            </Link>
          </div>
        </section>

        {/* ROOM 2: THE INVENTORY — Symbolic Object Catalogue */}
        <section className="portal-room room-inventory">
          <div className="room-header">
            <span className="room-tag">ROOM II</span>
            <h2 className="room-title">The Inventory</h2>
            <p className="room-purpose">
              A museum-like registry of the six symbolic objects carried into the valley. Examine what each item protected and what it costs to carry.
            </p>
          </div>

          <div className="room-featured-content inventory-preview-layout">
            <div className="inventory-preview-img">
              <img src={featuredObject.image} alt={featuredObject.name} width="160" height="160" />
            </div>
            <div>
              <span className="featured-label">{featuredObject.catalogueNumber}</span>
              <h3 className="featured-title">
                <Link to={`/archive/inventory/${featuredObject.slug}`}>{featuredObject.name}</Link>
              </h3>
              <p className="featured-intro">{featuredObject.description}</p>
            </div>
          </div>

          <div className="room-action-bar">
            <Link to="/archive/inventory" className="btn room-btn">
              Examine Object Inventory &rarr;
            </Link>
          </div>
        </section>

        {/* ROOM 3: THE GLOSSARY OF IMPOSSIBLE PLACES — Interconnected Vocabulary */}
        <section className="portal-room room-glossary">
          <div className="room-header">
            <span className="room-tag">ROOM III</span>
            <h2 className="room-title">Glossary of Impossible Places</h2>
            <p className="room-purpose">
              A searchable, interconnected vocabulary mapping the emotional geography, internal offices, and metaphors of the manuscript.
            </p>
          </div>

          <div className="room-featured-content">
            <span className="featured-label">Featured Place</span>
            <h3 className="featured-title">
              <Link to={`/archive/glossary/${featuredTerm.slug}`}>{featuredTerm.term}</Link>
            </h3>
            <p className="featured-intro">{featuredTerm.shortDefinition}</p>
          </div>

          <div className="room-action-bar">
            <Link to="/archive/glossary" className="btn room-btn">
              Consult The Glossary &rarr;
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
