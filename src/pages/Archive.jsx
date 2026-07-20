import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const FEATURED_DISPATCH_SLUG = null;

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

  let featuredDispatch = null;
  let remainingPosts = [...substackPosts];

  if (FEATURED_DISPATCH_SLUG) {
    const idx = remainingPosts.findIndex(p => p.url && p.url.includes(FEATURED_DISPATCH_SLUG));
    if (idx !== -1) {
      featuredDispatch = remainingPosts.splice(idx, 1)[0];
    }
  }

  const recentArrivals = remainingPosts.slice(0, 3);
  const earlierDispatches = remainingPosts.slice(3, 6);

  return (
    <div className="container archive-page">
      <div className="archive-masthead">
        <h1 className="page-title">The Archive</h1>
        <p className="page-introduction">
          Field notes, unsent sentences, recovered objects, altered definitions, and stories from roads that extend beyond the manuscript.
        </p>
      </div>

      <div className="archive-grid">
        
        {/* CENTER COLUMN (Primary content: Featured story & recent dispatches) */}
        <div className="archive-col archive-col-center">
          <div className="archive-library">
            <span className="archive-catalog-label">The Valley Library</span>
            
            {featuredStory && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 className="card-title" style={{ fontSize: '1.75rem', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                  <Link to={`/library/${featuredStory.collection || 'stories'}/${featuredStory.id}`}>{featuredStory.title}</Link>
                </h3>
                {featuredStory.coverImage && (
                  <div className="archive-figure">
                    <img src={featuredStory.coverImage} alt={featuredStory.title} />
                  </div>
                )}
                <p className="entry-meta">
                  By Jayme Volstad • {featuredStory.createdAt?.toDate ? featuredStory.createdAt.toDate().toLocaleDateString() : 'Recent'}
                </p>
                <p className="entry-excerpt">{featuredStory.excerpt}</p>
                <Link to={`/library/${featuredStory.collection || 'stories'}/${featuredStory.id}`} className="btn">Read Full Entry</Link>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--paper-line)', paddingTop: '1.5rem' }}>
              <span className="archive-catalog-label">Recent Arrivals</span>
              
              {loadingSubstack ? (
                <div className="substack-skeleton" style={{ padding: '1.5rem 0' }}>
                  <div style={{ width: '100%', height: '140px', backgroundColor: 'var(--paper-line)', marginBottom: '1rem', borderRadius: '4px' }}></div>
                  <div style={{ width: '60%', height: '18px', backgroundColor: 'var(--paper-line)', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                  <div style={{ width: '85%', height: '14px', backgroundColor: 'var(--paper-line)', borderRadius: '4px' }}></div>
                </div>
              ) : substackError ? (
                <div className="archive-card" style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--paper)', border: '1px solid var(--paper-line)' }}>
                  <p style={{ marginBottom: '1rem', color: 'var(--muted)' }}>The latest dispatches could not be retrieved.</p>
                  <a href="https://otherpeoplesweather.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Visit Other People's Weather</a>
                  <br />
                  <a href="https://substack.com/@jaymevolstad1" target="_blank" rel="noopener noreferrer" className="text-link">Follow Jayme on Substack</a>
                </div>
              ) : (
                <div className="substack-feed">
                  {featuredDispatch && (
                    <div className="featured-dispatch archive-card" style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: 'var(--paper)', border: '1px solid var(--paper-line)' }}>
                      <span className="archive-catalog-label">Featured Dispatch</span>
                      {featuredDispatch.image && (
                        <div className="archive-figure">
                          <img src={featuredDispatch.image} alt={featuredDispatch.title} />
                        </div>
                      )}
                      <h3 className="card-title">{featuredDispatch.title}</h3>
                      <p className="entry-meta">
                        {featuredDispatch.publishedAt ? new Date(featuredDispatch.publishedAt).toLocaleDateString() : ''} {featuredDispatch.category ? `• ${featuredDispatch.category}` : ''}
                      </p>
                      <p className="entry-excerpt">{featuredDispatch.excerpt}</p>
                      <a href={featuredDispatch.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read on Substack</a>
                    </div>
                  )}

                  <div className="recent-arrivals-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {recentArrivals.map((post, idx) => (
                      <article key={post.id || idx} className="archive-entry" style={{ paddingBottom: '1.75rem', borderBottom: '1px solid var(--paper-line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span className="archive-catalog-label" style={{ margin: 0 }}>{post.category || 'Dispatch'}</span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>
                            IDX-{String(idx + 1).padStart(3, '0')}
                          </span>
                        </div>
                        
                        {post.image && (
                          <div className="archive-figure" style={{ marginBottom: '1rem' }}>
                            <img src={post.image} alt={post.title || 'Dispatch image'} style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>
                        )}
                        
                        <h4 className="card-title">{post.title}</h4>
                        <p className="entry-meta">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                        </p>
                        <p className="entry-excerpt">{post.excerpt}</p>
                        {post.url && (
                          <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-link">Read on Substack &rarr;</a>
                        )}
                      </article>
                    ))}
                  </div>

                  {earlierDispatches.length > 0 && (
                    <div className="earlier-dispatches" style={{ marginTop: '2.5rem' }}>
                      <span className="archive-catalog-label">Earlier Dispatches</span>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {earlierDispatches.map((post, i) => (
                          <li key={post.id || i} style={{ marginBottom: '1rem' }}>
                            <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                              <h5 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>{post.title}</h5>
                              <p className="entry-meta">
                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''} {post.category ? `• ${post.category}` : ''}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--paper-line)', textAlign: 'center' }}>
                    <a href="https://substack.com/@jaymevolstad1" target="_blank" rel="noopener noreferrer" className="btn">Follow Jayme on Substack</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LEFT COLUMN (Interactive Wall & Metaphors) */}
        <div className="archive-col archive-col-left">
          <div className="archive-card archive-card--red" style={{ marginBottom: '1.5rem' }}>
            <span className="archive-catalog-label">Interactive Wall</span>
            <h3 className="card-title">Things I Should Have Said</h3>
            <p style={{ marginBottom: '1.25rem' }}>An anonymous public wall for the sentences that arrived after the conversation ended.</p>
            <Link to="/things-i-should-have-said" className="btn btn-primary" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', border: 'none' }}>Visit the Wall</Link>
          </div>

          <div className="archive-card" style={{ marginBottom: '1.5rem' }}>
            <span className="archive-catalog-label">Field Notes</span>
            <h3 className="card-title">Metaphor Legend</h3>
            <p>Not every wolf is an animal. Sometimes it is a question asked with the wrong tone.</p>
          </div>

          <div className="archive-figure" style={{ marginBottom: '1.5rem' }}>
            <img src="/media/New_camera_angle_new_perspective_202607182049.jpeg" alt="Field Report Illustration" />
            <div className="archive-caption">Fig 1. The territory outside the manuscript.</div>
          </div>
        </div>

        {/* RIGHT COLUMN (Journey & Letters) */}
        <div className="archive-col archive-col-right">
          <div className="archive-card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
            <span className="archive-catalog-label" style={{ color: 'var(--red-bright)' }}>Interactive Experience</span>
            <h3 style={{ color: 'var(--paper)', marginBottom: '0.75rem' }}>Begin the Journey</h3>
            <p style={{ color: 'var(--color-bone)', marginBottom: '1.25rem' }}>Some maps can only be read by choosing. Enter the dark cinematic experience to trace your path through the valley.</p>
            <Link to="/journey" className="btn btn-primary" style={{ width: '100%', display: 'block' }}>Enter the Forest</Link>
          </div>

          <div className="archive-card" style={{ marginBottom: '1.5rem' }}>
            <span className="archive-catalog-label">The Book</span>
            <h3 className="card-title">How to Explain Yourself to Wolves</h3>
            <p style={{ marginBottom: '1rem' }}>The physical manuscript that anchors this digital territory.</p>
            <Link to="/book" className="btn" style={{ width: '100%', display: 'block' }}>Learn More</Link>
          </div>

          <div className="archive-card" style={{ marginBottom: '1.5rem' }}>
            <span className="archive-catalog-label">Correspondence</span>
            <h3 className="card-title">Dear Red</h3>
            <p style={{ marginBottom: '1.25rem' }}>Private questions, difficult roads, and letters for travelers who cannot yet read the weather.</p>
            <Link to="/dear-red" className="btn" style={{ width: '100%', display: 'block' }}>Write to Red</Link>
          </div>
          
          <div className="archive-card">
            <span className="archive-catalog-label">Resources</span>
            <h3 className="card-title">The Pilgrim Workbook</h3>
            <p style={{ marginBottom: '1.25rem' }}>Guided reflections for recognizing what you carry.</p>
            <Link to="/workbook" className="btn" style={{ width: '100%', display: 'block' }}>Open Workbook</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
