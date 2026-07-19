import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// Helper to parse the markdown-ish format into structured fields
function parseWeatherReport(body) {
  const fields = {
    weather: '',
    signs: '',
    assumes: '',
    note: ''
  };
  
  const lines = body.split('\n');
  lines.forEach(line => {
    if (line.includes('**Weather:**')) fields.weather = line.replace('**Weather:**', '').trim();
    if (line.includes('**Common signs:**')) fields.signs = line.replace('**Common signs:**', '').trim();
    if (line.includes('**What the traveler assumes:**')) fields.assumes = line.replace('**What the traveler assumes:**', '').trim();
    if (line.includes('**Cartographer’s note:**')) fields.note = line.replace('**Cartographer’s note:**', '').trim();
  });
  
  return fields;
}

function WeatherReport({ article }) {
  const data = parseWeatherReport(article.body);
  
  return (
    <div style={{
      marginBottom: '4rem', 
      padding: '2.5rem', 
      background: 'rgba(255, 255, 255, 0.6)', 
      borderLeft: '4px solid var(--color-charcoal)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <h2 style={{fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem'}}>{article.title}</h2>
      {article.excerpt && <p style={{fontStyle: 'italic', marginBottom: '2rem', color: 'var(--color-charcoal-light)'}}>{article.excerpt}</p>}
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-ui)', fontSize: '0.95rem'}}>
        {data.weather && <div><span className="archive-small-label" style={{display: 'inline-block', width: '200px'}}>Weather:</span> <span>{data.weather}</span></div>}
        {data.signs && <div><span className="archive-small-label" style={{display: 'inline-block', width: '200px'}}>Common signs:</span> <span>{data.signs}</span></div>}
        {data.assumes && <div><span className="archive-small-label" style={{display: 'inline-block', width: '200px'}}>What the traveler assumes:</span> <span>{data.assumes}</span></div>}
        
        {data.note && (
          <div style={{marginTop: '1.5rem', padding: '1.5rem', background: 'var(--color-charcoal)', color: 'var(--color-parchment)'}}>
            <span className="archive-small-label" style={{color: 'var(--red-bright)', marginBottom: '0.5rem'}}>Cartographer's note</span>
            <p style={{margin: 0}}>{data.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FieldGuide() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, 'articles'), 
          where('collection', '==', "Field Guide to Other People's Weather"),
          where('status', '==', 'published')
        );
        const querySnapshot = await getDocs(q);
        const arts = [];
        querySnapshot.forEach((doc) => {
          arts.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort manually by createdAt (Firebase requires composite index if sorting with where)
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
    <div className="archive-page" style={{background: 'linear-gradient(to bottom, #e0e5ec, var(--color-parchment))', minHeight: '100vh'}}>
      <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem', maxWidth: '800px'}}>
        <div style={{textAlign: 'center', marginBottom: '6rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>☁️</div>
          <h1 style={{fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-charcoal)'}}>Field Guide to Other People's Weather</h1>
          <p style={{fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-charcoal-light)', lineHeight: '1.6'}}>
            A growing catalog of the storms, silences, pressure systems, and false clearings we encounter in other people. 
            <br/><br/>
            These field notes examine what happens when someone becomes so skilled at reading a room that she forgets she is allowed to have weather of her own.
          </p>
        </div>

        <div>
          {loading ? (
            <p style={{textAlign: 'center'}}>Gathering field notes...</p>
          ) : articles.length === 0 ? (
            <p style={{textAlign: 'center', fontStyle: 'italic'}}>The sky is temporarily clear. Check back for incoming fronts.</p>
          ) : (
            articles.map(article => <WeatherReport key={article.id} article={article} />)
          )}
        </div>
      </div>
    </div>
  );
}
