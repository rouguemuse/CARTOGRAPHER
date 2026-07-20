import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import DearRedForm from '../components/DearRedForm';

export default function DearRed() {
  const [publicResponses, setPublicResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicResponses = async () => {
      try {
        const q = query(
          collection(db, 'dear_red_public_responses'),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPublicResponses(docs);
        }
      } catch (err) {
        console.warn("Could not query public responses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicResponses();
  }, []);

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '1.75rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>Dear Red</span>
      </nav>

      {/* Header */}
      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Private Letter Room</span>
        <h1 className="page-title">Dear Red</h1>
        <p className="page-introduction" style={{ fontSize: 'var(--text-reading-large)', fontWeight: 500, color: 'var(--ink)', marginBottom: '0.5rem' }}>
          Write to the version of yourself who kept explaining.
        </p>
        <p className="entry-meta" style={{ fontStyle: 'italic', color: 'var(--muted)', margin: 0 }}>
          Letters for the selves we abandoned while trying to be understood.
        </p>
      </header>

      {/* Disclaimer */}
      <div style={{ padding: '1rem 1.25rem', backgroundColor: 'rgba(181, 152, 90, 0.12)', borderLeft: '3px solid var(--color-brass)', borderRadius: '4px', marginBottom: '3rem', fontSize: 'var(--text-xs)', color: 'var(--muted)', lineHeight: '1.5' }}>
        <strong>Disclaimer:</strong> Dear Red is a literary correspondence project and not therapy, legal advice, crisis counseling, or emergency assistance.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
        
        {/* Left: Writing Form */}
        <div>
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Send a Letter to the Archive</h2>
          <DearRedForm />
        </div>

        {/* Right: Public Correspondence Feed */}
        <div>
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Correspondence from the Cartographer</h2>
          <p className="card-description" style={{ marginBottom: '1.75rem' }}>
            Public responses to anonymized excerpts, shared with explicit author permission.
          </p>

          {loading ? (
            <p className="entry-meta">Loading public correspondence...</p>
          ) : publicResponses.length === 0 ? (
            <div className="archive-card" style={{ padding: '1.75rem', backgroundColor: '#fdfbf7', textAlign: 'center' }}>
              <span className="archive-catalog-label">Quiet Desk</span>
              <p className="card-description" style={{ margin: 0 }}>
                Letters in this room remain private by default. When an author grants explicit permission, anonymized excerpts and responses are gathered here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {publicResponses.map((item) => (
                <article key={item.id} className="archive-card" style={{ padding: '1.75rem', backgroundColor: '#fdfbf7', borderLeft: '4px solid var(--red)' }}>
                  <span className="archive-catalog-label">{item.referenceNumber || 'LETTER EXCERPT'}</span>
                  
                  {/* Anonymized Excerpt */}
                  <blockquote style={{ fontStyle: 'italic', margin: '0 0 1.25rem 0', paddingLeft: '1rem', borderLeft: '2px solid var(--paper-line)', fontSize: 'var(--text-reading)' }}>
                    "{item.publicExcerpt}"
                  </blockquote>

                  {/* Cartographer's Response */}
                  <div style={{ paddingTop: '1rem', borderTop: '1px dashed var(--paper-line)' }}>
                    <span className="archive-catalog-label" style={{ color: 'var(--color-brass)' }}>Response from the Cartographer</span>
                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                      {item.publicResponse}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
