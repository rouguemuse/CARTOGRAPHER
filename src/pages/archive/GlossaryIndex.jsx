import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { glossaryTerms as seedTerms } from '../../data/glossaryData';

export default function GlossaryIndex() {
  const [terms, setTerms] = useState(seedTerms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const q = query(
          collection(db, 'glossary_terms'),
          where('status', '==', 'published')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTerms(docs);
        }
      } catch (err) {
        console.warn("Using seed Glossary terms due to Firestore query state:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  const categories = ['All', 'Place', 'Condition', 'Symbol', 'Metaphor'];

  const filteredTerms = terms.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '1.75rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>Glossary of Impossible Places</span>
      </nav>

      {/* Room Header */}
      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Room III — World Vocabulary</span>
        <h1 className="page-title">Glossary of Impossible Places</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          A searchable, interconnected vocabulary mapping the emotional geography, internal offices, and metaphors of <em>How to Explain Yourself to Wolves</em>.
        </p>
      </header>

      {/* Search & Category Filter Controls */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3rem', padding: '1.5rem', backgroundColor: '#f4f6f8', border: '1px solid var(--paper-line)', borderRadius: '4px' }}>
        <div style={{ flex: '1 1 280px' }}>
          <label htmlFor="glossary-search" className="archive-catalog-label" style={{ marginBottom: '0.4rem' }}>Search Vocabulary</label>
          <input 
            id="glossary-search"
            type="text" 
            placeholder="Search places, metaphors, or terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.6rem 0.85rem', border: '1px solid var(--paper-line)', background: 'var(--card)', fontFamily: 'var(--font-body)', borderRadius: '4px' }}
          />
        </div>

        <div>
          <span className="archive-catalog-label" style={{ marginBottom: '0.4rem' }}>Filter by Category</span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : ''}`}
                style={{ fontSize: 'var(--text-xs)', padding: '0.35rem 0.75rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Term List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
        {filteredTerms.map((term) => (
          <Link 
            key={term.slug || term.id} 
            to={`/archive/glossary/${term.slug}`}
            className="archive-card"
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', backgroundColor: '#f4f6f8', borderTop: '4px solid var(--color-storm-blue)' }}
          >
            <span className="archive-catalog-label" style={{ color: 'var(--color-storm-blue)' }}>{term.category}</span>
            <h2 className="card-title" style={{ fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{term.term}</h2>
            <p className="card-description" style={{ fontSize: 'var(--text-sm)', marginBottom: '1.25rem' }}>{term.shortDefinition}</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px dashed var(--paper-line)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--red)' }}>
              Explore Term Definition &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
