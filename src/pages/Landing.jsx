import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import { objects } from '../data/storyData';
import { useJourneyState } from '../hooks/useJourneyState';
import './Landing.css';

export default function Landing() {
  const [hasJourney, setHasJourney] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectObject, getActiveJourney } = useJourneyState();
  const navigate = useNavigate();

  useEffect(() => {
    setHasJourney(!!getActiveJourney());

    const carousel = document.getElementById('symbols-carousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.symbol-card');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: carousel,
        threshold: 0.6
      }
    );

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (index) => {
    const carousel = document.getElementById('symbols-carousel');
    const cards = carousel.querySelectorAll('.symbol-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const getObjectSlug = (id) => {
    switch(id) {
      case 'red_coat': return 'red-coat';
      case 'red_string': return 'red-thread';
      case 'red_crane': return 'red-crane';
      case 'red_envelope': return 'red-letter';
      case 'compass': return 'compass';
      case 'lantern': return 'lantern';
      default: return id;
    }
  };

  const getCatalogueNumber = (id) => {
    switch(id) {
      case 'red_coat': return 'CAT-OBJ-001';
      case 'red_string': return 'CAT-OBJ-002';
      case 'red_crane': return 'CAT-OBJ-003';
      case 'red_envelope': return 'CAT-OBJ-004';
      case 'compass': return 'CAT-OBJ-005';
      case 'lantern': return 'CAT-OBJ-006';
      default: return 'CAT-OBJ-000';
    }
  };

  return (
    <div className="landing-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="hero-section">
        <div className="hero-background">
          <picture className="hero-artwork-picture">
            <source media="(min-width: 600px)" srcSet="/images/artwork/hero-desktop.avif" type="image/avif" />
            <source media="(min-width: 600px)" srcSet="/images/artwork/hero-desktop.webp" type="image/webp" />
            <source media="(min-width: 600px)" srcSet="/images/artwork/hero-desktop.jpg" type="image/jpeg" />
            <source media="(max-width: 599px)" srcSet="/images/artwork/hero-mobile.avif" type="image/avif" />
            <source media="(max-width: 599px)" srcSet="/images/artwork/hero-mobile.webp" type="image/webp" />
            <img 
              src="/images/artwork/hero-mobile.jpg" 
              alt="How to Explain Yourself to Wolves territory map" 
              width="1344" 
              height="768" 
              loading="eager" 
              fetchPriority="high" 
              className="hero-img" 
            />
          </picture>
          <div className="hero-localized-gradient"></div>
        </div>
        
        <div className="hero-content container">
          <div className="hero-text-panel">
            <span className="location-label">AN INTERACTIVE LITERARY EXPERIENCE</span>
            <h1 className="hero-title">
              How to Explain Yourself<br />to <span className="title-highlight">Wolves</span>
            </h1>
            <p className="hero-desc">
              An interactive journey through the maps we inherit, the weather we mistake for our own, and the exhausting hope that the right explanation might finally make us safe.
            </p>
            <p className="hero-question">
              What will you do when the road asks for your name?
            </p>
            <div className="hero-actions" style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
              <Link to="/journey" className="btn btn-primary btn-large">
                {hasJourney ? 'Resume the Road' : 'Begin the Journey'}
              </Link>
              <Link to="/archive" className="btn btn-large" style={{background: 'rgba(6, 14, 12, 0.8)', border: '1px solid rgba(230, 220, 195, 0.2)', color: 'var(--color-bone)'}}>
                Enter the Archive
              </Link>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* 2. THE PREMISE */}
      <section className="premise-section">
        <div className="premise-background">
          <picture>
            <source srcSet="/images/artwork/archive-premise.avif" type="image/avif" />
            <source srcSet="/images/artwork/archive-premise.webp" type="image/webp" />
            <img 
              src="/images/artwork/archive-premise.jpg" 
              alt="Atmospheric territory horizon" 
              width="2752" 
              height="1536" 
              loading="lazy" 
              decoding="async" 
              className="section-bg-img" 
            />
          </picture>
          <div className="section-dark-overlay"></div>
        </div>
        <div className="container premise-content">
          <div className="premise-panel">
            <span className="small-label">THE PREMISE</span>
            <blockquote className="premise-quote">
              "We spend years translating ourselves for rooms that have already decided who we are. This project is an investigation into the weather we carry, the silence we swallow, and the peace that arrives when you stop convincing wolves not to bite."
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3. HOW THE JOURNEY WORKS */}
      <section className="experience-section">
        <div className="journey-background">
          <picture>
            <source srcSet="/images/artwork/journey-explanation.avif" type="image/avif" />
            <source srcSet="/images/artwork/journey-explanation.webp" type="image/webp" />
            <img 
              src="/images/artwork/journey-explanation.jpg" 
              alt="The territory path" 
              width="2560" 
              height="1440" 
              loading="lazy" 
              decoding="async" 
              className="section-bg-img" 
            />
          </picture>
          <div className="section-dark-overlay"></div>
        </div>
        <div className="container experience-content">
          <div className="experience-copy field-note-panel">
            <span className="small-label">HOW THE JOURNEY WORKS</span>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-parchment)' }}>The Path Through the Valley</h2>
            <div className="how-steps-list">
              <div className="how-step-item">
                <span className="step-badge">01</span>
                <div>
                  <h4>CHOOSE WHAT YOU CARRY</h4>
                  <p>Select one of six symbolic objects to frame every question you will be asked.</p>
                </div>
              </div>
              <div className="how-step-item">
                <span className="step-badge">02</span>
                <div>
                  <h4>NAVIGATE FIVE ENCOUNTERS</h4>
                  <p>Face situation encounters of misunderstanding, coercion, and borrowed weather.</p>
                </div>
              </div>
              <div className="how-step-item">
                <span className="step-badge">03</span>
                <div>
                  <h4>RECEIVE YOUR MAP</h4>
                  <p>Receive your personalized map snapshot with route annotations drawn from your choices.</p>
                </div>
              </div>
            </div>
            <Link to="/journey" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
              Begin the Journey
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ARCHIVE ENTRY */}
      <section className="featured-archive-section">
        <div className="container">
          <div className="featured-archive-card field-note-panel">
            <span className="small-label">ROOM I — FEATURED FIELD GUIDE ESSAY</span>
            <h2 className="featured-essay-title">Other People's Weather</h2>
            <blockquote className="featured-essay-excerpt">
              "Not every storm that fills a room was created by the person standing in it. Some people entered carrying rain. Some brought static. Some could frost a room with one polite sentence. The difficult part was learning that noticing the weather did not make it hers."
            </blockquote>
            <Link to="/archive/field-guide/other-peoples-weather" className="inline-link" style={{ marginTop: '1.25rem' }}>
              Read Field Guide Entry &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE SIX OBJECTS (MUSEUM CATALOGUE PRESENTATION) */}
      <section className="symbols-section">
        <div className="container symbols-content">
          <div className="symbols-header">
            <span className="small-label">ROOM II — THE INVENTORY</span>
            <h2>The Six Symbolic Objects</h2>
            <p>Examine what each item protected, what it cost to carry, and what happens when it is set down.</p>
          </div>
          <div className="symbols-grid" id="symbols-carousel">
            {objects.map((obj, i) => (
              <div key={obj.id} className="symbol-card layered-card" tabIndex={0} data-index={i} aria-hidden={activeIndex !== i}>
                <picture className="symbol-image-area">
                  <source srcSet={obj.image.replace('.png', '.avif')} type="image/avif" />
                  <source srcSet={obj.image.replace('.png', '.webp')} type="image/webp" />
                  <img 
                    src={obj.image} 
                    alt={obj.name} 
                    width="800"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="detail-label" style={{ color: 'var(--color-brass)', marginBottom: '0.25rem' }}>
                  {getCatalogueNumber(obj.id)}
                </span>
                <h3>{obj.name}</h3>
                <p>{obj.description}</p>
                <div style={{marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%'}}>
                  <button 
                    className="btn btn-primary" 
                    style={{fontSize: 'var(--text-xs)', padding: '0.5rem', cursor: 'pointer', width: '100%'}}
                    onClick={(e) => {
                      e.preventDefault();
                      selectObject(obj.id);
                      navigate('/journey/stage/valley');
                    }}
                  >
                    Carry This Into the Journey
                  </button>
                  <Link 
                    to={`/archive/inventory/${getObjectSlug(obj.id)}`} 
                    className="btn" 
                    style={{fontSize: 'var(--text-xs)', padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', width: '100%', textDecoration: 'none'}}
                  >
                    Examine in Inventory &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTICIPATORY ROOMS (DEAR RED & UNSAID WALL) */}
      <section className="participatory-section">
        <div className="container">
          <div className="participatory-grid">
            
            {/* Dear Red Panel */}
            <div className="participatory-card field-note-panel">
              <span className="small-label">PRIVATE LETTER ROOM</span>
              <h3>Dear Red</h3>
              <p className="participatory-subtitle">"Write to the version of yourself who kept explaining."</p>
              <p className="participatory-desc">
                Letters for the selves we abandoned while trying to be understood. Submitted letters remain strictly private by default.
              </p>
              <Link to="/dear-red" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                Write to Red &rarr;
              </Link>
            </div>

            {/* Unsaid Wall Panel */}
            <div className="participatory-card field-note-panel">
              <span className="small-label">PUBLIC TACTILE WALL</span>
              <h3>Things I Should Have Said</h3>
              <p className="participatory-subtitle">"What did you need to say when it was no longer safe to say it?"</p>
              <p className="participatory-desc">
                An anonymous wall of tactile paper fragments (max 300 chars) left behind after the conversation ended.
              </p>
              <Link to="/things-i-should-have-said" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                Visit the Wall &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. THE BOOK & SIGNUP */}
      <section id="join" className="archive-section">
        <div className="container archive-container">
          <div className="archive-editorial">
            <span className="small-label">FORTHCOMING MANUSCRIPT</span>
            <h2 className="archive-headline">This experience belongs to the world of the forthcoming book How to Explain Yourself to Wolves.</h2>
            <div className="archive-annotation">
              <div className="archive-details">
                <div className="detail-row">
                  <span className="detail-label">AUTHOR</span>
                  <span className="detail-value">Jayme Volstad</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">STATUS</span>
                  <span className="detail-value">Forthcoming</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">FORMAT</span>
                  <span className="detail-value">Narrative nonfiction</span>
                </div>
              </div>
            </div>
          </div>
          <div className="archive-form-wrapper">
            <div className="archive-form-panel glass-panel">
              <SignupForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* 8. FOOTER WITH COMPLETE SITEMAP */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-sitemap">
            {/* Col 1: Brand */}
            <div className="footer-col">
              <h4 className="footer-brand-title">How to Explain Yourself to Wolves</h4>
              <p className="footer-brand-desc">
                An interactive literary experience and editorial archive by Jayme Volstad.
              </p>
              <p className="footer-copy">© {new Date().getFullYear()} Jayme Volstad. All rights reserved.</p>
            </div>

            {/* Col 2: Archive */}
            <div className="footer-col">
              <span className="footer-col-title">THE ARCHIVE</span>
              <ul className="footer-links">
                <li><Link to="/archive">Archive Portal</Link></li>
                <li><Link to="/archive/field-guide">The Field Guide</Link></li>
                <li><Link to="/archive/inventory">The Inventory</Link></li>
                <li><Link to="/archive/glossary">Glossary of Impossible Places</Link></li>
              </ul>
            </div>

            {/* Col 3: Participate & Journey */}
            <div className="footer-col">
              <span className="footer-col-title">PARTICIPATE & JOURNEY</span>
              <ul className="footer-links">
                <li><Link to="/journey">The Journey</Link></li>
                <li><Link to="/journey/field-notes">Field Notes</Link></li>
                <li><Link to="/journey/maps-returned">Maps Returned</Link></li>
                <li><Link to="/dear-red">Dear Red</Link></li>
                <li><Link to="/things-i-should-have-said">Unsaid Wall</Link></li>
              </ul>
            </div>

            {/* Col 4: Manuscript & Legal */}
            <div className="footer-col">
              <span className="footer-col-title">MANUSCRIPT & INFO</span>
              <ul className="footer-links">
                <li><Link to="/book">The Book</Link></li>
                <li><Link to="/workbook">The Pilgrim Workbook</Link></li>
                <li><Link to="/about">About Jayme</Link></li>
                <li><a href="/#join">Join the Book List</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
