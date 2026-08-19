import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Library.css';

export default function Library() {
  const seedDispatches = [
    {
      title: "The Mountain of Receipts",
      subtitle: "On collecting evidence to prove reality",
      excerpt: "Evidence collected to prove you were right. Too heavy to carry, but impossible to leave behind when rooms benefit from misunderstanding you."
    },
    {
      title: "Apologizing to Lightning",
      subtitle: "On weather forecasting and hypervigilance",
      excerpt: "When another person's storm quietly becomes your responsibility to manage, survival turns into constant atmospheric meteorology."
    },
    {
      title: "The House of Almost Safe",
      subtitle: "On predictable truces versus true peace",
      excerpt: "Almost-safe is a house built from vigilance. It offers familiar predictability without genuine peace, locking doors from the outside."
    }
  ];

  return (
    <div className="lit-page-container">
      <Header />

      <main className="container max-w-4xl mx-auto">
        
        {/* 1. OPENING / HERO */}
        <header className="lit-hero">
          <span className="lit-hero-eyebrow">LITERATURE FOR THE ROADS WE INHERIT</span>
          <h1 className="lit-hero-title">Literature & Dispatches</h1>
          <p className="lit-hero-byline">Written by Jayme Volstad</p>
          <p className="lit-hero-lead">
            Field notes, essays, recovered objects, and narrative works exploring the maps people inherit, the weather they learn to manage, and the explanations they build for survival.
          </p>
        </header>

        {/* 2. FEATURED WORK: How to Explain Yourself to Wolves */}
        <section className="lit-book-card" aria-label="Featured Book">
          <span className="lit-book-genre">LITERARY MEMOIR · NARRATIVE NONFICTION</span>
          <h2 className="lit-book-title">How to Explain Yourself to Wolves</h2>
          
          <p className="lit-book-description">
            A woman spends her life believing that if she can explain herself correctly enough, she can prevent harm, repair relationships, prove reality, and earn safety. Told through maps, weather, wolves, doors, and the roads she inherits, <em>How to Explain Yourself to Wolves</em> asks what happens when accountability becomes indistinguishable from confession.
          </p>

          <p className="lit-book-architecture">
            <strong>Formal Architecture:</strong> Maps, Weather, Wolves, Doors, and The Red Coat.
          </p>

          <div className="lit-book-ctas">
            <Link to="/book" className="btn btn-primary">
              Explore The Memoir &rarr;
            </Link>
            <Link to="/defect" className="btn" style={{ borderColor: 'var(--red-deep)', color: 'var(--red-deep)' }}>
              View Map Room &rarr;
            </Link>
          </div>
        </section>

        {/* 3. AUTHOR POSITIONING */}
        <section className="lit-author-section" aria-label="Author Profile">
          <div className="lit-author-header">
            <span className="lit-author-eyebrow">THE CARTOGRAPHER</span>
            <h2 className="lit-author-name">Jayme Volstad</h2>
          </div>

          <div className="lit-author-positioning">
            "Jayme Volstad writes about the maps people inherit, the weather they learn to manage, the explanations they turn into evidence against themselves, and the difficult work of learning what is actually theirs to carry."
          </div>

          <p className="lit-author-bio">
            <strong>Jayme Volstad</strong> is the author of <em>How to Explain Yourself to Wolves</em>, an allegorical literary memoir about the stories we inherit, the explanations we build for survival, and what happens when accountability becomes indistinguishable from confession. Her work examines memory, hypervigilance, addiction, motherhood, coercion, institutional systems, and the long process of determining what belongs to us—and what never did.
          </p>
        </section>

        {/* 4. OTHER PEOPLE'S WEATHER */}
        <section className="lit-opw-section" aria-label="Other People's Weather Dispatches">
          <div className="lit-opw-header">
            <h2 className="lit-opw-title">OTHER PEOPLE’S WEATHER</h2>
            <span className="lit-opw-tagline">Field notes from the territory.</span>
            <p className="lit-opw-desc">
              Essays and dispatches about the maps we inherit, the weather we mistake for our responsibility, the explanations we build for survival, and the work of deciding what is actually ours to carry.
            </p>
          </div>

          <div className="lit-opw-grid">
            {seedDispatches.map((dispatch, idx) => (
              <article key={idx} className="lit-essay-card">
                <h3 className="lit-essay-title">{dispatch.title}</h3>
                <p className="lit-essay-excerpt">{dispatch.excerpt}</p>
              </article>
            ))}
          </div>

          <div>
            <a 
              href="https://otherpeoplesweather.substack.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Read & Subscribe on Substack ↗
            </a>
          </div>
        </section>

        {/* 5. CURATED LITERARY ARCHIVES */}
        <section className="lit-archives-section" aria-label="Curated Archives">
          <h2 className="lit-archives-title">Curated Archives & Companions</h2>

          <div className="lit-archives-grid">
            <div className="lit-archive-card">
              <div>
                <h3 className="lit-archive-card-title">Field Guide to Other People's Weather</h3>
                <p className="lit-archive-card-desc">A growing catalog of the storms and silences we encounter in others.</p>
              </div>
              <Link to="/library/field-guide" className="btn" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                Open Field Guide &rarr;
              </Link>
            </div>

            <div className="lit-archive-card">
              <div>
                <h3 className="lit-archive-card-title">Inventory of Left Objects</h3>
                <p className="lit-archive-card-desc">Documentation of what the Cartographer carried and set down.</p>
              </div>
              <Link to="/library/inventory" className="btn" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                View Inventory &rarr;
              </Link>
            </div>

            <div className="lit-archive-card">
              <div>
                <h3 className="lit-archive-card-title">Glossary of Necessary Silence</h3>
                <p className="lit-archive-card-desc">Words swallowed, mistranslated, or redefined.</p>
              </div>
              <Link to="/library/glossary" className="btn" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                Explore Glossary &rarr;
              </Link>
            </div>

            <div className="lit-archive-card">
              <div>
                <h3 className="lit-archive-card-title">Self-Cartography Companion</h3>
                <p className="lit-archive-card-desc">Interactive field companion and reflection stepper.</p>
              </div>
              <Link to="/workbook" className="btn" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                Open Companion &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* QUIET ENDING */}
        <footer className="lit-quiet-ending">
          <blockquote className="lit-ending-quote">
            "You do not need to convince the forest that you are allowed to walk through it. The road out is opened by taking the first quiet step."
          </blockquote>
        </footer>

      </main>
    </div>
  );
}
