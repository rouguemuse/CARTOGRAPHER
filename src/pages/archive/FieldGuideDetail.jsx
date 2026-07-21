import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { fieldGuideEntries as seedEntries } from '../../data/fieldGuideData';
import SlugNotFound from '../../components/SlugNotFound';
import './FieldGuideDetail.css';

export default function FieldGuideDetail() {
  const { entrySlug } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      try {
        // Try Firestore first
        const q = query(
          collection(db, 'field_guide_entries'),
          where('slug', '==', entrySlug),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setEntry(snap.docs[0].data());
          setLoading(false);
          return;
        }

        // Fallback to seed data
        const local = seedEntries.find(e => e.slug === entrySlug);
        if (local) {
          setEntry(local);
        } else {
          setEntry(null);
        }
      } catch (err) {
        console.warn("Firestore lookup failed, falling back to seed entry:", err);
        const local = seedEntries.find(e => e.slug === entrySlug);
        setEntry(local || null);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [entrySlug]);

  if (loading) {
    return (
      <div className="fg-detail-container page-padding text-center">
        <p className="fg-detail-intro">Retrieving Field Note...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <SlugNotFound 
        resourceName="Field Guide Entry" 
        backPath="/archive/field-guide" 
        backLabel="Back to Field Guide" 
      />
    );
  }

  return (
    <article className="fg-detail-container page-padding">
      {/* High Contrast Breadcrumbs */}
      <nav className="fg-detail-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/archive">The Archive</Link>
        <span className="crumb-sep">/</span>
        <Link to="/archive/field-guide">Field Guide</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{entry.title}</span>
      </nav>

      {/* Archival Parchment Dossier */}
      <div className="fg-dossier-paper">
        
        {/* Header */}
        <header className="fg-dossier-header">
          <span className="fg-kicker">{entry.eyebrow || 'FIELD NOTE'}</span>
          <h1 className="fg-title">{entry.title}</h1>
          <p className="fg-intro-quote">"{entry.introObservation}"</p>

          <div className="fg-meta-strip">
            <span>{entry.relatedChapter || 'Chapter II: The Forest'}</span>
            <span>&bull;</span>
            <span>Est. 4 min read</span>
          </div>
        </header>

        {/* Structured Observation Cards */}
        <div className="fg-observation-stack">
          
          <div className="fg-obs-card fg-obs-pattern">
            <span className="fg-card-tag">OBSERVED PATTERN</span>
            <p className="fg-card-text">{entry.observedPattern}</p>
          </div>

          <div className="fg-obs-card fg-obs-inside">
            <span className="fg-card-tag">HOW IT FEELS FROM INSIDE</span>
            <p className="fg-card-text">{entry.feltFromInside}</p>
          </div>

          <div className="fg-obs-card fg-obs-mistaken">
            <span className="fg-card-tag">WHAT IT IS OFTEN MISTAKEN FOR</span>
            <p className="fg-card-text">{entry.oftenMistakenFor}</p>
          </div>

        </div>

        {/* Chapter Excerpt */}
        {entry.relatedExcerpt && (
          <blockquote className="fg-chapter-excerpt">
            "{entry.relatedExcerpt}"
            <footer className="fg-excerpt-author">
              — From <em>How to Explain Yourself to Wolves</em> ({entry.relatedChapter})
            </footer>
          </blockquote>
        )}

        {/* Cartographer's Note */}
        {entry.cartographersNote && (
          <div className="fg-cartographer-note">
            <span className="fg-card-tag" style={{ color: '#8b0000' }}>CARTOGRAPHER'S NOTE</span>
            <p className="fg-cart-text">{entry.cartographersNote}</p>
          </div>
        )}

        {/* Connected Vocabulary Cross-Links */}
        {entry.relatedGlossaryTerms && entry.relatedGlossaryTerms.length > 0 && (
          <div className="fg-vocabulary-section">
            <span className="fg-card-tag">CONNECTED VOCABULARY</span>
            <div className="fg-vocab-links-row">
              {entry.relatedGlossaryTerms.map((termSlug) => (
                <Link 
                  key={termSlug} 
                  to={`/archive/glossary/${termSlug}`}
                  className="fg-vocab-btn"
                >
                  {termSlug.replace(/-/g, ' ')} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dossier Footer */}
        <footer className="fg-dossier-footer">
          <Link to="/archive/field-guide" className="btn btn-secondary-dark" style={{ background: '#1c2420', color: '#e6dcc3' }}>
            &larr; Back to The Field Guide
          </Link>
          <Link to="/journey" className="btn btn-primary">
            Begin the Journey &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
