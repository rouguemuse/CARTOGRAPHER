import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

export default function Book() {
  return (
    <div className="container archive-page" style={{ padding: '2rem 0 5rem' }}>
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>The Book</span>
      </nav>

      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Forthcoming Manuscript</span>
        <h1 className="page-title">How to Explain Yourself to Wolves</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          The physical manuscript that anchors this digital territory. A book about emotional weather, quiet boundaries, and leaving the audience behind.
        </p>
      </header>

      <div style={{ width: 'min(100%, 68ch)', marginInline: 'auto' }}>
        <div className="archive-card archive-card--red" style={{ marginBottom: '2.5rem', padding: '2rem' }}>
          <span className="archive-catalog-label">Publication Overview</span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--paper)', marginBottom: '1rem' }}>
            What will you do when the road asks for your name?
          </h2>
          <p style={{ fontSize: 'var(--text-reading)', color: 'var(--paper)', opacity: 0.95, margin: 0 }}>
            An investigation into the compulsion to explain ourselves, the exhaustion of self-justification, and the peace that arrives when you stop trying to convince the weather to stay warm.
          </p>
        </div>

        <div className="article-body" style={{ fontSize: 'var(--text-reading)', lineHeight: '1.75' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>About the Manuscript</h3>
          <p>
            <em>How to Explain Yourself to Wolves</em> combines personal essay, field notes, recovered object inventories, and altered definitions to chart the geography of non-verbal boundaries.
          </p>
          <p>
            Divided into five main territories—The Red Coat, The Red Thread, The Red Crane, The Red Letter, and The Compass—the book traces the journey from performance to stillness.
          </p>
        </div>

        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--card)', border: '1px solid var(--paper-line)', borderRadius: '4px' }}>
          <h3 className="card-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Join the Book List</h3>
          <SignupForm />
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/journey" className="btn btn-primary btn-large">
            Experience the Digital Journey &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
