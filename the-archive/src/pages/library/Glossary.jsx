import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function GlossaryEntry({ article }) {
  return (
    <div style={{
      marginBottom: '3rem', 
      paddingBottom: '3rem',
      borderBottom: '1px solid var(--color-charcoal-light)'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', 
        fontSize: '2.5rem', 
        marginBottom: '0.5rem',
        color: 'var(--color-parchment)'
      }}>
        {article.title}
        <span style={{
          fontFamily: 'monospace', 
          fontSize: '1rem', 
          color: 'var(--red-bright)',
          marginLeft: '1rem',
          verticalAlign: 'middle'
        }}>n.</span>
      </h2>
      
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1.2rem',
        color: 'var(--color-bone)',
        lineHeight: '1.6',
        maxWidth: '700px',
        paddingLeft: '2rem',
        borderLeft: '2px solid var(--red-deep)'
      }}>
        <p style={{whiteSpace: 'pre-wrap'}}>{article.body}</p>
        
        {article.excerpt && (
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--color-obsidian)',
            fontSize: '0.9rem',
            color: 'var(--color-charcoal-light)'
          }}>
            <em>Usage:</em> {article.excerpt}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Glossary() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, 'articles'), 
          where('collection', '==', 'Glossary of Necessary Silence'),
          where('status', '==', 'published')
        );
        const querySnapshot = await getDocs(q);
        const arts = [];
        querySnapshot.forEach((doc) => {
          arts.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort alphabetically by title (word)
        arts.sort((a, b) => a.title.localeCompare(b.title));
        
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
    <div className="archive-page" style={{background: 'var(--color-charcoal)', color: 'var(--color-parchment)', minHeight: '100vh'}}>
      <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem', maxWidth: '800px'}}>
        <div style={{marginBottom: '6rem'}}>
          <span className="archive-small-label" style={{color: 'var(--red-bright)'}}>Volume III</span>
          <h1 style={{fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-parchment)'}}>Glossary of Necessary Silence</h1>
          <p style={{fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-bone)', lineHeight: '1.6'}}>
            A catalog of words that lose their meaning when spoken aloud in the territory, words that require translation before they can be understood, and definitions altered by proximity to another person.
          </p>
        </div>

        <div>
          {loading ? (
            <p style={{color: 'var(--color-bone)'}}>Opening the dictionary...</p>
          ) : articles.length === 0 ? (
            <p style={{color: 'var(--color-bone)', fontStyle: 'italic'}}>No definitions have been recorded yet.</p>
          ) : (
            articles.map(article => <GlossaryEntry key={article.id} article={article} />)
          )}
        </div>
      </div>
    </div>
  );
}
