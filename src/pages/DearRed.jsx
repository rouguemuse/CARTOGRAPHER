import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedDearRedLetters } from '../data/submissionsStore';
import './DearRed.css';

export default function DearRed() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    setLetters(getPublishedDearRedLetters());
  }, []);

  return (
    <div className="dear-red-container page-padding">
      {/* Header & Purpose Statement */}
      <header className="dear-red-header text-center">
        <span className="small-label" style={{ color: 'var(--color-brass)' }}>
          INTIMATE PRIVATE & EDITORIAL CHANNEL
        </span>
        <h1 className="dear-red-title">Dear Red</h1>
        <p className="dear-red-intro">
          Letters written to the people, storms, and cleared roads we couldn't speak to directly.
        </p>

        <div className="dear-red-actions-top" style={{ marginTop: '2rem' }}>
          <Link to="/dear-red/write" className="btn btn-primary btn-large">
            Write your own letter &rarr;
          </Link>
        </div>
      </header>

      {/* Published Archive List */}
      <section className="dear-red-archive-section">
        <h2 className="section-title text-center" style={{ marginBottom: '2.5rem' }}>
          Published Archive Letters
        </h2>

        {letters.length === 0 ? (
          <div className="dear-red-empty-box text-center">
            <p>No letters have been published yet. All incoming letters enter a private editorial review queue.</p>
            <Link to="/dear-red/write" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Be the first to write a letter
            </Link>
          </div>
        ) : (
          <div className="dear-red-grid">
            {letters.map((letter) => (
              <article key={letter.id} className="dear-red-card">
                <span className="small-label" style={{ color: 'var(--color-brass)' }}>
                  {letter.recipient || 'Dear Red'}
                </span>
                <h3 className="card-letter-title">
                  <Link to={`/dear-red/${letter.public_slug}`}>{letter.title || 'Untitled Letter'}</Link>
                </h3>
                <p className="card-letter-excerpt">
                  "{letter.published_body.slice(0, 180)}..."
                </p>
                <div className="card-letter-footer">
                  <span className="card-author">
                    By: {letter.publication_identity === 'alias' ? (letter.alias || 'Anonymous') : 'Anonymous'}
                  </span>
                  <Link to={`/dear-red/${letter.public_slug}`} className="read-letter-link">
                    Read Letter &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
