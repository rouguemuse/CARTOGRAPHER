import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import DOMPurify from 'dompurify';

function StoryCard({ article }) {
  return (
    <div style={{
      marginBottom: '6rem', 
      paddingBottom: '4rem',
      borderBottom: '1px solid var(--color-charcoal-light)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      {/* Title block */}
      <div style={{textAlign: 'center'}}>
        <span className="archive-small-label" style={{color: 'var(--red-bright)', marginBottom: '1rem', display: 'block'}}>
          {article.isFeatured ? '★ Featured Story' : 'Story'}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', 
          fontSize: '3rem', 
          marginBottom: '1rem',
          color: 'var(--color-charcoal)'
        }}>
          {article.title}
        </h2>
        <div style={{fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-charcoal-light)'}}>
          By {article.author} • {article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown Date'}
        </div>
      </div>
      
      {article.coverImage && (
        <div style={{width: '100%', maxHeight: '400px', overflow: 'hidden', margin: '2rem 0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}>
          <img src={article.coverImage} alt={article.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}

      {/* Content */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1.2rem',
        color: 'var(--color-charcoal)',
        lineHeight: '1.8',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body) }} />
      </div>
    </div>
  );
}

export default function Stories() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, 'articles'), 
          where('collection', '==', 'Stories from the Archive'),
          where('status', '==', 'published')
        );
        const querySnapshot = await getDocs(q);
        const arts = [];
        querySnapshot.forEach((doc) => {
          arts.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by featured first, then date
        arts.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.createdAt?.seconds - a.createdAt?.seconds;
        });
        
        setArticles(arts);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="archive-page" style={{background: 'var(--color-parchment-light)', color: 'var(--color-charcoal)', minHeight: '100vh'}}>
      <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem', maxWidth: '900px'}}>
        <div style={{textAlign: 'center', marginBottom: '8rem'}}>
          <h1 style={{fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-charcoal)'}}>Stories from the Archive</h1>
          <p style={{fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-charcoal-light)', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
            Essays, field reports, and narrative histories recovered from the Cartographer's expedition.
          </p>
        </div>

        <div>
          {loading ? (
            <p style={{textAlign: 'center', color: 'var(--color-charcoal-light)'}}>Retrieving documents...</p>
          ) : articles.length === 0 ? (
            <p style={{textAlign: 'center', fontStyle: 'italic', color: 'var(--color-charcoal-light)'}}>The archives are currently empty.</p>
          ) : (
            articles.map(article => <StoryCard key={article.id} article={article} />)
          )}
        </div>
      </div>
    </div>
  );
}
