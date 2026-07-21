import { useState, useEffect } from 'react';
import './SubstackDispatches.css';

const FALLBACK_POSTS = [
  {
    title: "The Cartographer’s Inventory",
    url: "https://otherpeoplesweather.substack.com/p/the-cartographers-inventory?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches",
    pubDate: "Jul 20, 2026",
    excerpt: "Six objects recovered from the country surrounding How to Explain Yourself to Wolves, examine what they protected and carry them forward.",
    coverImage: "https://substackcdn.com/image/fetch/$s_!gLAw!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc0b7f666-4d61-47cb-97d6-78c788660a14_859x859.jpeg"
  },
  {
    title: "The Forest of Other People’s Weather",
    url: "https://otherpeoplesweather.substack.com/p/the-forest-of-other-peoples-weather-1e7?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches",
    pubDate: "Jul 18, 2026",
    excerpt: "A field report from The Impossible Atlas regarding the absorption of unfamiliar atmospheric shifts as personal guilt.",
    coverImage: null
  },
  {
    title: "Welcome to The Impossible Atlas",
    url: "https://otherpeoplesweather.substack.com/p/welcome-to-the-impossible-atlas?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches",
    pubDate: "Jul 18, 2026",
    excerpt: "The country surrounding How to Explain Yourself to Wolves, inherited maps, and the dangerous hope that one explanation might finally make us safe.",
    coverImage: null
  }
];

export default function SubstackDispatches() {
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/substack-feed')
      .then(res => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      })
      .catch(() => {
        // Fallback to static data if API proxy is not active in dev mode
        setPosts(FALLBACK_POSTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0] || FALLBACK_POSTS[0];
  const supporting = posts.slice(1, 3);

  return (
    <section className="substack-dispatches-section" aria-label="Latest Substack Dispatches">
      <div className="substack-dispatches-inner">
        
        <header className="substack-dispatches-header">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>
            FROM OTHER PEOPLE’S WEATHER
          </span>
          <h2 className="section-h2" style={{ color: 'var(--color-parchment)', marginTop: '0.5rem' }}>
            Latest Dispatches
          </h2>
          <p className="section-intro-desc" style={{ color: 'var(--color-bone)', fontStyle: 'italic' }}>
            Field notes, fragments, and essays sent from beyond the manuscript.
          </p>
        </header>

        <div className="substack-dispatches-grid">
          
          {/* FEATURED DISPATCH (The Cartographer's Inventory or Latest) */}
          {featured && (
            <a 
              href={featured.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="dispatch-card-featured"
              aria-label={`Read featured dispatch: ${featured.title}`}
            >
              <div>
                <div className="dispatch-meta-strip">
                  <span className="dispatch-tag">FEATURED DISPATCH</span>
                  <span className="dispatch-date">{featured.pubDate}</span>
                </div>

                {featured.coverImage && (
                  <img 
                    src={featured.coverImage} 
                    alt="" 
                    className="dispatch-cover-image"
                    loading="lazy" 
                  />
                )}

                <h3 className="dispatch-featured-title">{featured.title}</h3>
                <p className="dispatch-featured-excerpt">{featured.excerpt}</p>
              </div>

              <span className="dispatch-action-btn">
                Read the dispatch &rarr;
              </span>
            </a>
          )}

          {/* SUPPORTING DISPATCHES STACK */}
          <div className="dispatch-secondary-stack">
            {supporting.map((post, idx) => (
              <a 
                key={idx}
                href={post.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="dispatch-card-secondary"
                aria-label={`Read dispatch: ${post.title}`}
              >
                <div>
                  <div className="dispatch-meta-strip">
                    <span className="dispatch-tag">DISPATCH #{idx + 2}</span>
                    <span className="dispatch-date">{post.pubDate}</span>
                  </div>
                  <h4 className="dispatch-secondary-title">{post.title}</h4>
                  <p className="dispatch-secondary-excerpt">{post.excerpt}</p>
                </div>

                <span className="dispatch-action-btn" style={{ fontSize: '11px' }}>
                  Read dispatch &rarr;
                </span>
              </a>
            ))}
          </div>

        </div>

        <div className="dispatches-footer-row">
          <a 
            href="https://otherpeoplesweather.substack.com?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary-dark"
          >
            Read all dispatches &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
