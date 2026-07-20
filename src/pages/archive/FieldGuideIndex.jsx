import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { fieldGuideEntries as seedEntries } from '../../data/fieldGuideData';

export default function FieldGuideIndex() {
  const [entries, setEntries] = useState(seedEntries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const q = query(
          collection(db, 'field_guide_entries'),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEntries(docs);
        }
      } catch (err) {
        console.warn("Using seed Field Guide entries due to Firestore query state:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '1.75rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>The Field Guide</span>
      </nav>

      {/* Room Header */}
      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
        <span className="page-kicker">Room I — Literary Observations</span>
        <h1 className="page-title">The Field Guide</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          Essays and field observations about survival patterns, boundary fatigue, emotional weather, and the sentences we carry after the conversation ends.
        </p>
      </header>

      {/* Entry List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '68ch', margin: '0 auto' }}>
        {entries.map((entry) => (
          <article key={entry.slug || entry.id} className="archive-card" style={{ padding: '2rem', backgroundColor: '#fdfbf7', borderLeft: '4px solid var(--red)' }}>
            <span className="page-kicker">{entry.eyebrow}</span>
            <h2 className="card-title" style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>
              <Link to={`/archive/field-guide/${entry.slug}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                {entry.title}
              </Link>
            </h2>
            <p className="entry-excerpt" style={{ fontStyle: 'italic', fontSize: 'var(--text-reading)', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              "{entry.introObservation}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px dashed var(--paper-line)' }}>
              <span className="entry-meta">{entry.relatedChapter}</span>
              <Link to={`/archive/field-guide/${entry.slug}`} className="text-link">
                Read Entry &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
