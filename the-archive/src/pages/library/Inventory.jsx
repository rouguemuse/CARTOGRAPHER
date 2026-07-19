import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function parseInventoryCard(body) {
  const fields = {
    object: '',
    location: '',
    condition: '',
    reason: '',
    status: ''
  };
  
  const lines = body.split('\n');
  lines.forEach(line => {
    if (line.includes('**Object:**')) fields.object = line.replace('**Object:**', '').trim();
    if (line.includes('**Last known location:**')) fields.location = line.replace('**Last known location:**', '').trim();
    if (line.includes('**Condition:**')) fields.condition = line.replace('**Condition:**', '').trim();
    if (line.includes('**Reason abandoned:**')) fields.reason = line.replace('**Reason abandoned:**', '').trim();
    if (line.includes('**Current status:**')) fields.status = line.replace('**Current status:**', '').trim();
  });
  
  return fields;
}

function ArtifactCard({ article }) {
  const data = parseInventoryCard(article.body);
  
  return (
    <div style={{
      marginBottom: '4rem', 
      background: 'var(--color-parchment)', 
      border: '1px solid var(--color-bone)',
      boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Evidence Tag Header */}
      <div style={{
        background: 'var(--color-bone)', 
        padding: '0.5rem 1rem', 
        borderBottom: '1px solid #dcd3c6',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--color-charcoal)'
      }}>
        <span>Item #{article.id.substring(0,6).toUpperCase()}</span>
        <span>Exhibit: {article.title}</span>
      </div>

      <div style={{padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Optional Image */}
        {article.coverImage && (
          <div style={{flex: '1 1 300px', minWidth: '300px'}}>
            <img 
              src={article.coverImage} 
              alt={article.title} 
              style={{width: '100%', height: '100%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}} 
            />
          </div>
        )}

        {/* Card Content */}
        <div style={{flex: '2 1 400px'}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-charcoal)', paddingBottom: '1rem'}}>{article.title}</h2>
          
          <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.9rem'}}>
            <tbody>
              {data.object && (
                <tr style={{borderBottom: '1px dashed var(--color-bone)'}}>
                  <td style={{padding: '1rem 0', width: '200px', color: 'var(--color-charcoal-light)'}}>OBJECT:</td>
                  <td style={{padding: '1rem 0'}}>{data.object}</td>
                </tr>
              )}
              {data.location && (
                <tr style={{borderBottom: '1px dashed var(--color-bone)'}}>
                  <td style={{padding: '1rem 0', color: 'var(--color-charcoal-light)'}}>LAST KNOWN LOCATION:</td>
                  <td style={{padding: '1rem 0'}}>{data.location}</td>
                </tr>
              )}
              {data.condition && (
                <tr style={{borderBottom: '1px dashed var(--color-bone)'}}>
                  <td style={{padding: '1rem 0', color: 'var(--color-charcoal-light)'}}>CONDITION:</td>
                  <td style={{padding: '1rem 0'}}>{data.condition}</td>
                </tr>
              )}
              {data.reason && (
                <tr style={{borderBottom: '1px dashed var(--color-bone)'}}>
                  <td style={{padding: '1rem 0', color: 'var(--color-charcoal-light)'}}>REASON ABANDONED:</td>
                  <td style={{padding: '1rem 0'}}>{data.reason}</td>
                </tr>
              )}
              {data.status && (
                <tr style={{borderBottom: '1px dashed var(--color-bone)'}}>
                  <td style={{padding: '1rem 0', color: 'var(--color-charcoal-light)'}}>CURRENT STATUS:</td>
                  <td style={{padding: '1rem 0', color: data.status.toLowerCase().includes('recovered') ? 'var(--red-bright)' : 'inherit', fontWeight: data.status.toLowerCase().includes('recovered') ? 'bold' : 'normal'}}>{data.status}</td>
                </tr>
              )}
            </tbody>
          </table>

          {article.excerpt && (
            <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', fontStyle: 'italic', color: 'var(--color-charcoal-light)'}}>
              "{article.excerpt}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, 'articles'), 
          where('collection', '==', "Inventory of Left Objects"),
          where('status', '==', 'published')
        );
        const querySnapshot = await getDocs(q);
        const arts = [];
        querySnapshot.forEach((doc) => {
          arts.push({ id: doc.id, ...doc.data() });
        });
        
        arts.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
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
    <div className="archive-page" style={{background: 'var(--color-bone)', minHeight: '100vh', backgroundImage: 'radial-gradient(var(--color-parchment-light) 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem', maxWidth: '900px'}}>
        <div style={{textAlign: 'center', marginBottom: '6rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏷️</div>
          <h1 style={{fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-charcoal)'}}>Inventory of Left Objects</h1>
          <p style={{fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-charcoal-light)', lineHeight: '1.6'}}>
            Travelers rarely leave a place empty-handed. They carry keys, receipts, photographs, warnings, and ordinary objects made heavy by what happened around them.
            <br/><br/>
            This inventory documents what the Cartographer carried, what she abandoned, and what continued following her long after it was left behind.
          </p>
        </div>

        <div>
          {loading ? (
            <p style={{textAlign: 'center'}}>Opening the ledgers...</p>
          ) : articles.length === 0 ? (
            <p style={{textAlign: 'center', fontStyle: 'italic'}}>The inventory is currently empty.</p>
          ) : (
            articles.map(article => <ArtifactCard key={article.id} article={article} />)
          )}
        </div>
      </div>
    </div>
  );
}
