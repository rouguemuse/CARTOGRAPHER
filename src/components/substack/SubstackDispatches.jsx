import React, { useState, useEffect } from 'react';
import './SubstackDispatches.css';

export default function SubstackDispatches() {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch('/api/substack-feed');
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setDispatches(data.items);
          }
        }
      } catch (err) {
        console.warn('Substack feed proxy fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  const fallbackFeatured = {
    title: "The Cartographer's Inventory",
    link: "https://otherpeoplesweather.substack.com/p/the-cartographers-inventory?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches",
    pubDate: "Latest Issue",
    snippet: "A catalog of inherited emotional weather, non-verbal boundaries, and the objects we carry when leaving the room behind."
  };

  const fallbackLinks = [
    {
      title: "On Explaining Yourself to Storms",
      link: "https://otherpeoplesweather.substack.com?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
    },
    {
      title: "Field Observation: Borrowed Atmosphere",
      link: "https://otherpeoplesweather.substack.com?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
    }
  ];

  const featured = dispatches.length > 0 ? dispatches[0] : fallbackFeatured;
  const secondaryLinks = dispatches.length > 1 ? dispatches.slice(1, 3) : fallbackLinks;

  return (
    <section className="location-dispatches-bridge">
      <div className="dispatches-container">
        
        {/* Masthead */}
        <header className="dispatches-header">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>
            FROM OTHER PEOPLE’S WEATHER
          </span>
          <h2 className="dispatches-title">Latest Dispatches</h2>
          <p className="dispatches-subtitle">
            Field notes, fragments, and essays sent from beyond the manuscript.
          </p>
        </header>

        {/* Editorial Bridge Layout */}
        <div className="dispatches-paper-folio">
          
          {/* Featured Dispatch Entry */}
          <article className="dispatches-featured-entry">
            <span className="dispatches-date-tag">FEATURED DISPATCH</span>
            <h3 className="featured-entry-title">
              <a href={featured.link} target="_blank" rel="noopener noreferrer">
                {featured.title}
              </a>
            </h3>
            <p className="featured-entry-snippet">
              "{featured.snippet || featured.contentSnippet}"
            </p>
            <a 
              href={featured.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm"
            >
              Read dispatch &rarr;
            </a>
          </article>

          {/* Compact Links Column */}
          <div className="dispatches-compact-column">
            <span className="compact-column-tag">MORE DISPATCHES</span>
            
            <ul className="compact-links-list">
              {secondaryLinks.map((item, idx) => (
                <li key={idx} className="compact-link-item">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="compact-item-anchor">
                    <span className="compact-item-title">{item.title}</span>
                    <span className="compact-item-arrow">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #d4c8a8' }}>
              <a 
                href="https://otherpeoplesweather.substack.com?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost-sm"
                style={{ color: '#8b0000', fontWeight: 700 }}
              >
                Read all dispatches &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
