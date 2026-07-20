import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container archive-page" style={{ padding: '2rem 0 5rem' }}>
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>About Jayme Volstad</span>
      </nav>

      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Author & Cartographer</span>
        <h1 className="page-title">Jayme Volstad</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          Writer, researcher, and cartographer of emotional weather, silence, and the sentences that arrive after the conversation ends.
        </p>
      </header>

      <div style={{ width: 'min(100%, 68ch)', marginInline: 'auto' }}>
        <div className="archive-figure" style={{ marginBottom: '2rem' }}>
          <img src="/media/New_camera_angle_new_perspective_202607182049.jpeg" alt="Jayme Volstad portrait" />
          <div className="archive-caption">Jayme Volstad in the field territory.</div>
        </div>

        <div className="article-body" style={{ fontSize: 'var(--text-reading)', lineHeight: '1.75' }}>
          <p>
            Jayme Volstad is the author of the forthcoming manuscript <em>How to Explain Yourself to Wolves</em>, a work of narrative nonfiction examining the maps we inherit, the weather we mistake for our own, and the exhausting compulsion to justify ourselves to observers who have already reached their conclusions.
          </p>

          <p>
            Her writing explores boundaries, non-verbal communication, interpersonal weather patterns, and the quiet art of recognizing what belongs to you versus what was left in your arms by someone else.
          </p>

          <h3 className="card-title" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>The Manuscript & The Territory</h3>
          <p>
            This digital platform serves as an interactive companion to the manuscript—a living library of recovered field notes, community submissions, and an interactive journey through the valley.
          </p>
        </div>

        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--paper-line)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/book" className="btn btn-primary">
            Explore the Book
          </Link>
          <Link to="/dear-red" className="btn">
            Write to Red
          </Link>
        </div>
      </div>
    </div>
  );
}
