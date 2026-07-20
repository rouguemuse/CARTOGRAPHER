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

  return (
    <div className="landing-page">
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/images/hero_artwork.png" alt="Atmospheric landscape with fireflies and a dark forest" className="hero-img" />
          <div className="hero-radial-darken"></div>
        </div>
        
        <div className="hero-content container">
          <div className="hero-text-panel">
            <span className="location-label">The Territory</span>
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
              <Link to="/archive" className="btn btn-large" style={{background: 'rgba(6, 14, 12, 0.8)', border: '1px solid rgba(230, 220, 195, 0.14)', color: 'var(--color-bone)'}}>
                Explore the Archive
              </Link>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* EXPERIENCE / MAP INTRODUCTION SECTION */}
      <section className="experience-section">
        <div className="journey-background"></div>
        <div className="container experience-content">
          <div className="experience-copy field-note-panel">
            <div className="compass-detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2 L14 12 L12 22 L10 12 Z"/></svg>
            </div>
            <h2>The Journey</h2>
            <p>
              You will be asked what you carry, how you respond to unfamiliar weather, what you offer the wolves, and what you are finally willing to leave behind. Your choices will alter the language, symbols, and final map you receive.
            </p>
            <p>
              No two journeys arrive at the same destination.
            </p>
            <Link to="/journey" className="inline-link" style={{marginTop: '1.5rem', display: 'inline-block'}}>BEGIN THE JOURNEY &rarr;</Link>
          </div>
          
          <div className="map-trail">
            <svg className="trail-route" viewBox="0 0 200 600" preserveAspectRatio="none">
              <path d="M 40 48 C 100 48, 150 100, 150 150 C 150 220, 80 230, 80 300 C 80 380, 140 380, 140 450 C 140 500, 110 500, 110 552 C 110 580, 100 590, 100 600" />
            </svg>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section container">
        <div className="how-steps">
          <div className="how-step glass-panel">
            <span className="step-num">01</span>
            <h3>CHOOSE YOUR OBJECT</h3>
            <p>Select the item you carry into the valley. It frames every question you will be asked.</p>
          </div>
          <div className="how-step glass-panel">
            <span className="step-num">02</span>
            <h3>NAVIGATE FIVE CHAPTERS</h3>
            <p>Each location presents a situation. Your choices are recorded, not scored.</p>
          </div>
          <div className="how-step glass-panel">
            <span className="step-num">03</span>
            <h3>RECEIVE YOUR MAP</h3>
            <p>Receive a personal route with annotations drawn from your choices.</p>
          </div>
        </div>
        <div className="how-cta">
          <Link to="/journey" className="btn btn-primary btn-large">Begin the Journey</Link>
        </div>
      </section>

      {/* FOREST TRANSITION SECTION */}
      <section className="forest-section">
        <div className="forest-background">
          <img src="/images/forest_weather.png" alt="The Forest of Other People's Weather" className="forest-img" />
          <div className="forest-graduated-shadow"></div>
        </div>
        
        <div className="container forest-content">
          <div className="forest-text-panel field-note-panel narrow-panel">
            <span className="small-label">THE FOREST OF OTHER PEOPLE'S WEATHER</span>
            <h2 className="main-line">Not every storm belongs to you.</h2>
            <p>
              Some people entered carrying rain. Some brought static. Some could frost a room with one polite sentence. The difficult part was learning that noticing the weather did not make it hers.
            </p>
            <Link to="/library/field-guide" className="inline-link">ENTER THE FOREST &rarr;</Link>
          </div>
        </div>
      </section>

      {/* OBJECT SYMBOLS CAROUSEL SECTION */}
      <section className="symbols-section">
        <div className="container symbols-content">
          <div className="symbols-header">
            <h2>The Symbols You May Carry</h2>
            <p>The journey requires an object. Choose carefully.</p>
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
                <h3>{obj.name}</h3>
                <p>{obj.description}</p>
                <div style={{marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <button 
                    className="btn btn-primary" 
                    style={{fontSize: 'var(--text-xs)', padding: '0.5rem', cursor: 'pointer'}}
                    onClick={(e) => {
                      e.preventDefault();
                      selectObject(obj.id);
                      navigate('/journey/stage/valley');
                    }}
                  >
                    CARRY THIS
                  </button>
                  <Link 
                    to={`/library/inventory`} 
                    className="btn" 
                    style={{fontSize: 'var(--text-xs)', padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)'}}
                  >
                    VIEW IN INVENTORY
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="carousel-hint">Swipe to explore</p>
          <div className="carousel-dots" role="tablist" aria-label="Object Selection">
            {objects.map((_, i) => (
              <button 
                key={i} 
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to slide ${i + 1}`}
                className={`carousel-dot${activeIndex === i ? ' active' : ''}`}
                onClick={() => scrollToSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE / SIGNUP SECTION */}
      <section id="join" className="archive-section">
        <div className="container archive-container">
          <div className="archive-editorial">
            <span className="small-label">FROM THE CARTOGRAPHER'S ARCHIVE</span>
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
      
      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container" style={{textAlign: 'center', padding: '2.5rem 0'}}>
          <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-parchment)'}}>
            Continue exploring the world surrounding the forthcoming book How to Explain Yourself to Wolves.
          </h3>
          <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem'}}>
            <Link to="/archive" className="inline-link">Explore the Archive</Link>
            <Link to="/library" className="inline-link">Visit the Valley Library</Link>
            <Link to="/dear-red" className="inline-link">Write to Dear Red</Link>
            <Link to="/book" className="inline-link">The Book</Link>
            <Link to="/about" className="inline-link">About Jayme</Link>
            <a href="#join" className="inline-link">Join the Book List</a>
          </div>
          <p>© 2026 Jayme Volstad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
