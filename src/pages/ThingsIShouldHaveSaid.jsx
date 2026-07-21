import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedWallStatements, toggleSubmissionReaction } from '../data/submissionsStore';
import './DearRed.css';

export default function ThingsIShouldHaveSaid() {
  const [statements, setStatements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setStatements(getPublishedWallStatements());
  }, []);

  const categories = ['All', 'Love', 'Grief', 'Anger', 'Family', 'Leaving', 'Apology', 'Survival', 'Other'];

  const filteredStatements = selectedCategory === 'All'
    ? statements
    : statements.filter(s => (s.category || 'Other').toLowerCase() === selectedCategory.toLowerCase());

  const handleReaction = (id, reactionType) => {
    const updatedReactions = toggleSubmissionReaction(id, reactionType);
    if (updatedReactions) {
      setStatements(prev => prev.map(s => {
        if (s.id === id) {
          return { ...s, reactions: { ...updatedReactions } };
        }
        return s;
      }));
    }
  };

  return (
    <div className="dear-red-container page-padding">
      <header className="dear-red-header text-center">
        <span className="small-label" style={{ color: 'var(--color-brass)' }}>
          PUBLIC MODERATED WALL
        </span>
        <h1 className="dear-red-title">The Wall of Things Unsaid</h1>
        <p className="dear-red-intro">
          Single sentences released into public air. Every statement is moderated before appearing.
        </p>

        <div className="dear-red-actions-top" style={{ marginTop: '2rem' }}>
          <Link to="/things-unsaid/submit" className="btn btn-primary btn-large">
            Submit a statement to the wall &rarr;
          </Link>
        </div>
      </header>

      {/* Category Filter Pills */}
      <nav className="wall-category-nav" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary-dark'}`}
            style={{ fontSize: '13px', padding: '0.45rem 1rem' }}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Public Wall Grid of Fragment Cards */}
      <section className="dear-red-grid">
        {filteredStatements.length === 0 ? (
          <div className="dear-red-empty-box text-center" style={{ gridColumn: '1 / -1' }}>
            <p>No statements found in this category.</p>
          </div>
        ) : (
          filteredStatements.map((item) => {
            const rx = item.reactions || { feltThis: 0, survivedThis: 0, wishISaidThis: 0 };
            return (
              <article key={item.id} className="dear-red-card" style={{ borderLeft: '4px solid var(--color-brass)' }}>
                <div>
                  <span className="small-label" style={{ color: 'var(--color-brass)' }}>
                    CATEGORY: {item.category || 'Unsaid'}
                  </span>
                  <p className="card-letter-excerpt" style={{ fontSize: '17px', color: 'var(--color-parchment)', marginTop: '0.75rem' }}>
                    "{item.published_body || item.body}"
                  </p>
                </div>

                <div className="card-letter-footer" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <span className="card-author">
                    — {item.publication_identity === 'alias' ? (item.alias || 'Anonymous') : 'Anonymous'}
                  </span>

                  {/* Anonymous Reactions */}
                  <div className="reaction-buttons-row" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: '100%' }}>
                    <button 
                      className="btn btn-ghost-sm" 
                      onClick={() => handleReaction(item.id, 'feltThis')}
                      style={{ fontSize: '12px', padding: '0.25rem 0.6rem' }}
                      title="I felt this"
                    >
                      I felt this ({rx.feltThis || 0})
                    </button>

                    <button 
                      className="btn btn-ghost-sm" 
                      onClick={() => handleReaction(item.id, 'survivedThis')}
                      style={{ fontSize: '12px', padding: '0.25rem 0.6rem' }}
                      title="I survived this"
                    >
                      I survived this ({rx.survivedThis || 0})
                    </button>

                    <button 
                      className="btn btn-ghost-sm" 
                      onClick={() => handleReaction(item.id, 'wishISaidThis')}
                      style={{ fontSize: '12px', padding: '0.25rem 0.6rem' }}
                      title="I wish I had said this too"
                    >
                      I wish I said this too ({rx.wishISaidThis || 0})
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
