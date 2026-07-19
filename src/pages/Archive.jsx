import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const FEATURED_DISPATCH_SLUG = null; // Example: 'a-dispatch-slug'

export default function Archive() {
  const [featuredStory, setFeaturedStory] = useState(null);
  
  // Substack State
  const [substackPosts, setSubstackPosts] = useState([]);
  const [loadingSubstack, setLoadingSubstack] = useState(true);
  const [substackError, setSubstackError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const featuredQ = query(collection(db, 'articles'), where('status', '==', 'published'), where('isFeatured', '==', true), limit(1));
        const featuredSnap = await getDocs(featuredQ);
        if (!featuredSnap.empty) {
          setFeaturedStory({ id: featuredSnap.docs[0].id, ...featuredSnap.docs[0].data() });
        }
      } catch (err) {
        console.error("Error fetching archive featured story", err);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchSubstack = async () => {
      try {
        setLoadingSubstack(true);
        const res = await fetch('/api/substack-feed');
        if (!res.ok) throw new Error('Failed to fetch Substack feed');
        const data = await res.json();
        setSubstackPosts(data);
      } catch (err) {
        console.error("Error fetching Substack feed", err);
        setSubstackError(true);
      } finally {
        setLoadingSubstack(false);
      }
    };
    fetchSubstack();
  }, []);

  // Filter Substack posts
  let featuredDispatch = null;
  let remainingPosts = [...substackPosts];

  if (FEATURED_DISPATCH_SLUG) {
    const idx = remainingPosts.findIndex(p => p.url.includes(FEATURED_DISPATCH_SLUG));
    if (idx !== -1) {
      featuredDispatch = remainingPosts.splice(idx, 1)[0];
    }
  }

  const recentArrivals = remainingPosts.slice(0, 3);
  const earlierDispatches = remainingPosts.slice(3, 6);

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

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1.5rem' }}>
              <span className="archive-catalog-label">Recent Arrivals</span>
              
              {loadingSubstack ? (
                <div className="substack-skeleton" style={{ padding: '2rem 0' }}>
                  <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--paper-line)', marginBottom: '1rem' }}></div>
                  <div style={{ width: '60%', height: '20px', backgroundColor: 'var(--paper-line)', marginBottom: '0.5rem' }}></div>
                  <div style={{ width: '90%', height: '14px', backgroundColor: 'var(--paper-line)', marginBottom: '0.5rem' }}></div>
                  <div style={{ width: '80%', height: '14px', backgroundColor: 'var(--paper-line)' }}></div>
                </div>
              ) : substackError ? (
                <div className="archive-card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--paper-line)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <p style={{ marginBottom: '1rem', color: 'var(--muted)' }}>The latest dispatches could not be retrieved.</p>
                  <a href="https://otherpeoplesweather.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>Visit Other People's Weather</a>
                  <br />
                  <a href="https://substack.com/@jaymevolstad1" target="_blank" rel="noopener noreferrer" className="inline-link" style={{ fontSize: '0.85rem' }}>Follow Jayme on Substack</a>
                </div>
              ) : (
                <div className="substack-feed">
                  
                  {featuredDispatch && (
                    <div className="featured-dispatch archive-card" style={{ marginBottom: '3rem', padding: '1.5rem', backgroundColor: 'var(--paper-line)', border: '1px solid rgba(0,0,0,0.05)' }}>
                      <span className="archive-catalog-label" style={{ color: 'var(--red)' }}>Featured Dispatch</span>
                      {featuredDispatch.image && (
                        <div className="archive-figure" style={{ marginBottom: '1rem' }}>
                          <img src={featuredDispatch.image} alt={featuredDispatch.title} />
                        </div>
                      )}
                      <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{featuredDispatch.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                        {new Date(featuredDispatch.publishedAt).toLocaleDateString()} • {featuredDispatch.category}
                      </p>
                      <p style={{ marginBottom: '1.5rem' }}>{featuredDispatch.excerpt}</p>
                      <a href={featuredDispatch.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read on Substack</a>
                    </div>
                  )}

                  <div className="recent-arrivals-list" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {recentArrivals.map((post, idx) => (
                      <article key={post.id} className="archive-entry" style={{ paddingBottom: '2.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <span className="archive-catalog-label" style={{ margin: 0 }}>{post.category}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>IDX-{String(idx + 1).padStart(3, '0')}</span>
                        </div>
                        
                        {post.image && (
                          <div className="archive-figure" style={{ marginBottom: '1.5rem' }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>
                        )}
                        
                        <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', lineHeight: 1.2 }}>{post.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.excerpt}</p>
                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-link" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Read on Substack &rarr;</a>
                      </article>
                    ))}
                  </div>

                  {earlierDispatches.length > 0 && (
                    <div className="earlier-dispatches" style={{ marginTop: '3rem' }}>
                      <span className="archive-catalog-label">Earlier Dispatches</span>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {earlierDispatches.map(post => (
                          <li key={post.id} style={{ marginBottom: '1.5rem' }}>
                            <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                              <h5 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }}>{post.title}</h5>
                              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                                {new Date(post.publishedAt).toLocaleDateString()} • {post.category}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <a href="https://substack.com/@jaymevolstad1" target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: 'transparent', border: '1px solid rgba(0,0,0,0.2)' }}>Follow Jayme on Substack</a>
                  </div>
                </div>
              )}
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
