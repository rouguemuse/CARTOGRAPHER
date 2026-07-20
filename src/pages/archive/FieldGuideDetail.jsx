import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { fieldGuideEntries as seedEntries } from '../../data/fieldGuideData';
import SlugNotFound from '../../components/SlugNotFound';

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
      <div className="container archive-page" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p className="page-introduction">Retrieving Field Note...</p>
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
    <article className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <Link to="/archive/field-guide">Field Guide</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{entry.title}</span>
      </nav>

      <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
        <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem' }}>
          <span className="page-kicker">{entry.eyebrow}</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            {entry.title}
          </h1>
          <p className="page-introduction" style={{ fontStyle: 'italic', fontSize: 'var(--text-reading-large)', color: 'var(--muted)', marginBottom: '1rem' }}>
            "{entry.introObservation}"
          </p>
          <div className="entry-meta" style={{ display: 'flex', gap: '1rem' }}>
            <span>{entry.relatedChapter}</span>
            <span>•</span>
            <span>Est. 4 min read</span>
          </div>
        </header>

        {/* Structured Observation Template */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="archive-card" style={{ padding: '1.5rem', backgroundColor: '#fdfbf7', borderLeft: '4px solid var(--red)' }}>
            <span className="archive-catalog-label">Observed Pattern</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{entry.observedPattern}</p>
          </div>

          <div className="archive-card" style={{ padding: '1.5rem', backgroundColor: '#fdfbf7', borderLeft: '4px solid var(--color-brass)' }}>
            <span className="archive-catalog-label">How It Feels From Inside</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{entry.feltFromInside}</p>
          </div>

          <div className="archive-card" style={{ padding: '1.5rem', backgroundColor: '#fdfbf7', borderLeft: '4px solid var(--muted)' }}>
            <span className="archive-catalog-label">What It Is Often Mistaken For</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)' }}>{entry.oftenMistakenFor}</p>
          </div>
        </div>

        {/* Essay Excerpt / Chapter Excerpt */}
        {entry.relatedExcerpt && (
          <blockquote style={{ padding: '1.5rem 2rem', margin: '2.5rem 0', borderLeft: '3px solid var(--red)', fontStyle: 'italic', fontSize: 'var(--text-reading)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
            "{entry.relatedExcerpt}"
            <footer style={{ marginTop: '0.5rem', fontSize: 'var(--text-xs)', fontStyle: 'normal', color: 'var(--muted)', fontFamily: 'var(--font-ui)' }}>
              — From <em>How to Explain Yourself to Wolves</em> ({entry.relatedChapter})
            </footer>
          </blockquote>
        )}

        {/* Cartographer's Note */}
        {entry.cartographersNote && (
          <div style={{ padding: '1.75rem', backgroundColor: 'var(--card)', border: '1px solid var(--paper-line)', borderRadius: '4px', marginBottom: '3rem' }}>
            <span className="archive-catalog-label">Cartographer's Note</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)', fontStyle: 'italic' }}>
              {entry.cartographersNote}
            </p>
          </div>
        )}

        {/* Related Glossary Terms Cross-Links */}
        {entry.relatedGlossaryTerms && entry.relatedGlossaryTerms.length > 0 && (
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--paper-line)' }}>
            <span className="archive-catalog-label">Connected Vocabulary</span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {entry.relatedGlossaryTerms.map((termSlug) => (
                <Link 
                  key={termSlug} 
                  to={`/archive/glossary/${termSlug}`}
                  className="btn"
                  style={{ fontSize: 'var(--text-xs)', padding: '0.35rem 0.75rem', textTransform: 'capitalize' }}
                >
                  {termSlug.replace(/-/g, ' ')} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}

        <footer style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '2px solid var(--paper-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/archive/field-guide" className="text-link">
            &larr; Back to The Field Guide
          </Link>
          <Link to="/journey" className="btn btn-primary">
            Begin the Journey
          </Link>
        </footer>
      </div>
    </article>
  );
}
