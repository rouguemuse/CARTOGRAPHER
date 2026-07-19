import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SignupForm from '../components/SignupForm';
import { objects } from '../data/storyData';
import './Landing.css';

export default function Landing() {
  const [hasJourney, setHasJourney] = useState(false);

  useEffect(() => {
    setHasJourney(!!localStorage.getItem('applebanana_journey_state'));

    const carousel = document.getElementById('symbols-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!carousel || !dots.length) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.scrollWidth / objects.length;
      const index = Math.round(scrollLeft / cardWidth);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <Header />
      
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
            <div className="hero-actions" style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
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

      <section className="forest-section">
        <div className="forest-background">
          <img src="/images/forest_weather.png" alt="The Forest of Other People's Weather" className="forest-img" />
          <div className="forest-graduated-shadow"></div>
        </div>
        
        <div className="section-route-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M50 0 C 40 30, 20 70, 30 100" />
          </svg>
        </div>
        
        <div className="container forest-content">
          <div className="forest-text-panel field-note-panel narrow-panel">
            <span className="small-label">THE FOREST OF OTHER PEOPLE'S WEATHER</span>
            <h2 className="main-line">Not every storm belongs to you.</h2>
            <p>
              Some people entered carrying rain. Some brought static. Some could frost a room with one polite sentence. The difficult part was learning that noticing the weather did not make it hers.
            </p>
            <Link to="/library/field-guide" className="inline-link">ENTER THE FOREST &rarr;</Link>
            
            <div className="weather-mark">
              <svg viewBox="0 0 40 40" stroke="var(--color-brass)" fill="none" strokeWidth="1" opacity="0.4">
                <circle cx="20" cy="20" r="15" strokeDasharray="2 4"/>
                <path d="M5 20 Q 20 5 35 20" />
                <path d="M10 25 Q 20 15 30 25" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="symbols-section">
        <div className="symbols-texture"></div>
        
        <div className="section-route-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M30 0 C 50 30, 70 70, 50 100" />
          </svg>
        </div>
        
        <div className="container symbols-content">
          <div className="symbols-header">
            <h2>The Symbols You May Carry</h2>
            <p>The journey requires an object. Choose carefully.</p>
          </div>
          <div className="symbols-grid" id="symbols-carousel">
            {objects.map((obj, i) => (
              <div key={obj.id} className="symbol-card layered-card" tabIndex={0}>
                <div className="card-light-glow"></div>
                <div className="card-texture"></div>
                <img src={obj.image} alt={obj.name} className="symbol-icon" />
                <h3>{obj.name}</h3>
                <span className="secondary-annotation">Log #{Math.floor(Math.random()*900) + 100}</span>
                <p>{obj.description}</p>
                <div style={{marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <Link 
                    to="/stage/object" 
                    className="btn btn-primary" 
                    style={{fontSize: '0.8rem', padding: '0.5rem'}}
                    onClick={() => localStorage.setItem('applebanana_journey_state', JSON.stringify({object: obj.id, stage: 'valley'}))}
                  >
                    CARRY THIS
                  </Link>
                  <Link 
                    to={`/library/inventory`} 
                    className="btn" 
                    style={{fontSize: '0.8rem', padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)'}}
                  >
                    VIEW IN THE INVENTORY
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="carousel-hint">Swipe to explore</p>
          <div className="carousel-dots" aria-hidden="true">
            {objects.map((_, i) => (
              <span key={i} className={`carousel-dot${i === 0 ? ' active' : ''}`} data-index={i}></span>
            ))}
          </div>
        </div>
      </section>

      <section id="release" className="archive-section">
        <div className="archive-texture"></div>
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
      
      <footer className="site-footer">
        <div className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
          <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-parchment)'}}>
            Continue exploring the world surrounding the forthcoming book How to Explain Yourself to Wolves.
          </h3>
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem'}}>
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
