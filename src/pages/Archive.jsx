import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default function Archive() {
  const [featuredStory, setFeaturedStory] = useState(null);
  const [latestEntries, setLatestEntries] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const featuredQ = query(collection(db, 'articles'), where('status', '==', 'published'), where('isFeatured', '==', true), limit(1));
        const featuredSnap = await getDocs(featuredQ);
        if (!featuredSnap.empty) {
          setFeaturedStory({ id: featuredSnap.docs[0].id, ...featuredSnap.docs[0].data() });
        }

        const latestQ = query(collection(db, 'articles'), where('status', '==', 'published'), orderBy('createdAt', 'desc'), limit(3));
        const latestSnap = await getDocs(latestQ);
        setLatestEntries(latestSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching archive articles", err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="container archive-page">
      <div className="archive-masthead">
        <h1>The Archive</h1>
        <p>Field notes, unsent sentences, recovered objects, altered definitions, and stories from roads that extend beyond the manuscript.</p>
      </div>

      <div className="archive-grid">
        
        {/* LEFT COLUMN */}
        <div className="archive-col">
          <div className="archive-card archive-card--red" style={{ marginBottom: '2rem' }}>
            <span className="archive-catalog-label">Interactive Wall</span>
            <h3>Things I Should Have Said</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>An anonymous public wall for the sentences that arrived after the conversation ended. Leave what you carried too long.</p>
            <Link to="/things-i-should-have-said" className="btn btn-primary" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>Visit the Wall</Link>
          </div>

          <div className="archive-figure">
            <img src="/media/New_camera_angle_new_perspective_202607182049.jpeg" alt="Field Report Illustration" />
            <div className="archive-caption">Fig 1. The territory outside the manuscript.</div>
          </div>
          
          <div className="archive-card" style={{ marginBottom: '2rem' }}>
            <span className="archive-catalog-label">Field Notes</span>
            <h3>Metaphor Legend</h3>
            <p style={{ fontSize: '0.9rem' }}>Not every wolf is an animal. Sometimes it is a question asked with the wrong tone.</p>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="archive-col">
          <div className="archive-library">
            <span className="archive-catalog-label">The Valley Library</span>
            
            {featuredStory && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '2rem', lineHeight: 1.1, marginBottom: '1rem' }}>
                  <Link to={`/library/${featuredStory.collection || 'stories'}/${featuredStory.id}`}>{featuredStory.title}</Link>
                </h3>
                {featuredStory.coverImage && (
                  <div className="archive-figure" style={{ marginBottom: '1rem' }}>
                    <img src={featuredStory.coverImage} alt={featuredStory.title} />
                  </div>
                )}
                <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                  By Jayme Volstad • {featuredStory.createdAt?.toDate().toLocaleDateString()}
                </p>
                <p>{featuredStory.excerpt}</p>
                <Link to={`/library/${featuredStory.collection || 'stories'}/${featuredStory.id}`} className="btn" style={{ marginTop: '1rem' }}>Read Full Entry</Link>
              </div>
            )}

            <div style={{ borderTop: '2px solid var(--rule)', paddingTop: '1.5rem' }}>
              <span className="archive-catalog-label">Recent Arrivals</span>
              <ul style={{ listStyle: 'none' }}>
                {latestEntries.map(entry => (
                  <li key={entry.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--paper-line)', paddingBottom: '1rem' }}>
                    <Link to={`/library/${entry.collection || 'stories'}/${entry.id}`} style={{ display: 'block' }}>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{entry.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{entry.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/library" className="btn btn-primary" style={{ width: '100%' }}>View Complete Library</Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="archive-col">
          <div className="archive-card" style={{ marginBottom: '2rem', backgroundColor: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
            <span className="archive-catalog-label" style={{ color: 'var(--red)' }}>Interactive Experience</span>
            <h3 style={{ color: 'var(--paper)', marginBottom: '1rem' }}>Begin the Journey</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Some maps can only be read by choosing. Enter the dark cinematic experience to trace your path through the valley.</p>
            <Link to="/journey" className="btn btn-primary" style={{ width: '100%' }}>Enter the Forest</Link>
          </div>

          <div className="archive-card" style={{ marginBottom: '2rem' }}>
            <span className="archive-catalog-label">The Book</span>
            <h3>How to Explain Yourself to Wolves</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>The physical manuscript that anchors this digital territory.</p>
            <Link to="/book" className="btn" style={{ width: '100%' }}>Learn More</Link>
          </div>

          <div className="archive-card" style={{ marginBottom: '2rem' }}>
            <span className="archive-catalog-label">Correspondence</span>
            <h3>Dear Red</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Private questions, difficult roads, and letters for travelers who cannot yet read the weather.</p>
            <Link to="/dear-red" className="btn" style={{ width: '100%' }}>Write to Red</Link>
          </div>
          
          <div className="archive-card">
            <span className="archive-catalog-label">Resources</span>
            <h3>The Pilgrim Workbook</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Guided reflections for recognizing what you carry.</p>
            <Link to="/workbook" className="btn" style={{ width: '100%' }}>Open Workbook</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
