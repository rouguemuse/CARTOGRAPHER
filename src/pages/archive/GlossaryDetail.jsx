import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { glossaryTerms as seedTerms } from '../../data/glossaryData';
import SlugNotFound from '../../components/SlugNotFound';

export default function GlossaryDetail() {
  const { termSlug } = useParams();
  const [termData, setTermData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerm = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'glossary_terms'),
          where('slug', '==', termSlug),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setTermData(snap.docs[0].data());
          setLoading(false);
          return;
        }

        const local = seedTerms.find(t => t.slug === termSlug);
        setTermData(local || null);
      } catch (err) {
        console.warn("Firestore lookup failed, using seed glossary term:", err);
        const local = seedTerms.find(t => t.slug === termSlug);
        setTermData(local || null);
      } finally {
        setLoading(false);
      }
    };

    fetchTerm();
  }, [termSlug]);

  if (loading) {
    return (
      <div className="container archive-page" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p className="page-introduction">Retrieving Vocabulary Definition...</p>
      </div>
    );
  }

  if (!termData) {
    return (
      <SlugNotFound 
        resourceName="Glossary Term" 
        backPath="/archive/glossary" 
        backLabel="Back to Glossary" 
      />
    );
  }

  return (
    <article className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* High Contrast Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive" style={{ color: 'var(--color-brass)' }}>The Archive</Link>
        <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
        <Link to="/archive/glossary" style={{ color: 'var(--color-brass)' }}>Glossary</Link>
        <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
        <span style={{ color: '#F1E9D6', fontWeight: 600 }}>{termData.term}</span>
      </nav>

      <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
        <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(222, 205, 169, 0.18)', paddingBottom: '1.5rem' }}>
          <span className="archive-catalog-label" style={{ color: 'var(--color-storm-blue)' }}>{termData.category}</span>
          <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '0.75rem', color: '#F1E9D6' }}>
            {termData.term}
          </h1>
          <p className="page-introduction" style={{ margin: 0, fontStyle: 'italic', fontSize: 'var(--text-reading-large)', color: '#C8BEA7' }}>
            "{termData.shortDefinition}"
          </p>
        </header>

        {/* Extended Definition */}
        {termData.extendedDefinition && (
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="archive-catalog-label">Extended Interpretation</span>
            <p style={{ fontSize: 'var(--text-reading)', lineHeight: '1.75', color: '#C8BEA7' }}>
              {termData.extendedDefinition}
            </p>
          </div>
        )}

        {/* First Appearance (High Contrast Light Callout Box) */}
        {termData.firstAppearance && (
          <div 
            className="archive-light-box"
            style={{ 
              padding: '1.25rem 1.5rem', 
              backgroundColor: '#f4f6f8', 
              color: '#121615',
              borderLeft: '4px solid var(--color-storm-blue)', 
              borderRadius: '4px', 
              marginBottom: '2.5rem' 
            }}
          >
            <span className="archive-catalog-label" style={{ color: '#004085' }}>First Appearance</span>
            <p style={{ margin: 0, fontSize: 'var(--text-reading)', color: '#121615', fontWeight: 600 }}>
              {termData.firstAppearance}
            </p>
          </div>
        )}

        {/* Related Manuscript Excerpt */}
        {termData.relatedExcerpt && (
          <blockquote 
            style={{ 
              padding: '1.5rem 2rem', 
              margin: '2.5rem 0', 
              borderLeft: '3px solid var(--color-storm-blue)', 
              fontStyle: 'italic', 
              fontSize: 'var(--text-reading)', 
              backgroundColor: 'rgba(222, 205, 169, 0.08)',
              color: '#F1E9D6',
              borderRadius: '2px'
            }}
          >
            "{termData.relatedExcerpt}"
          </blockquote>
        )}

        {/* Cross-Links to Related Terms & Objects */}
        {termData.relatedTerms && termData.relatedTerms.length > 0 && (
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(222, 205, 169, 0.15)', marginBottom: '2rem' }}>
            <span className="archive-catalog-label">Related Terms</span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {termData.relatedTerms.map((tSlug) => (
                <Link 
                  key={tSlug} 
                  to={`/archive/glossary/${tSlug}`}
                  className="btn"
                  style={{ fontSize: 'var(--text-xs)', padding: '0.35rem 0.75rem', textTransform: 'capitalize', color: '#F1E9D6', borderColor: 'rgba(222, 205, 169, 0.25)' }}
                >
                  {tSlug.replace(/-/g, ' ')} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}

        <footer style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(222, 205, 169, 0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/archive/glossary" className="text-link" style={{ color: 'var(--color-brass)' }}>
            &larr; Back to Glossary
          </Link>
          <Link to="/journey" className="btn btn-primary">
            Begin the Journey
          </Link>
        </footer>
      </div>
    </article>
  );
}
