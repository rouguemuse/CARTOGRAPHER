import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SvgRoutePath from './SvgRoutePath';
import FireflyCanvas from './FireflyCanvas';
import ValleySignScroll from './ValleySignScroll';
import CabinetOfRelics from './CabinetOfRelics';
import CorridorDoors from './CorridorDoors';
import SignupForm from '../SignupForm';
import { useJourneyState } from '../../hooks/useJourneyState';
import './ContinuousMapWorld.css';

export default function ContinuousMapWorld() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasJourney, setHasJourney] = useState(false);
  const containerRef = useRef(null);
  const { getActiveJourney } = useJourneyState();

  useEffect(() => {
    setHasJourney(!!getActiveJourney());

    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = window.scrollY;
      const progress = Math.max(0, Math.min(1, current / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="continuous-map-world">
      {/* Visual Spine: Persistent Animated SVG Red Route */}
      <SvgRoutePath scrollProgress={scrollProgress} />

      {/* Floating Ember Signal Lights */}
      <FireflyCanvas />

      {/* 1. LOCATION I: FULL-VIEWPORT HERO */}
      <section className="map-location location-hero">
        <div className="location-bg-layer">
          <picture>
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
              className="location-bg-img" 
            />
          </picture>
          <div className="hero-vignette-overlay"></div>
        </div>

        <div className="location-content hero-content-box">
          <span className="location-eyebrow">AN INTERACTIVE LITERARY JOURNEY</span>
          <h1 className="hero-main-title">
            How to Explain Yourself to <span className="title-crimson">Wolves</span>
          </h1>
          <p className="hero-subtitle">
            An interactive literary journey through inherited maps, borrowed weather, and the dangerous hope that one perfect explanation might finally make us safe.
          </p>
          
          <div className="hero-buttons-row">
            <Link to="/journey" className="btn btn-primary btn-large">
              {hasJourney ? 'Resume the Road' : 'Begin the Journey'}
            </Link>
            <Link to="/archive" className="btn btn-secondary-dark btn-large">
              Enter the Archive
            </Link>
          </div>

          <p className="hero-subnote">
            "You do not have to explain yourself before entering."
          </p>
        </div>
      </section>

      {/* 2. LOCATION II: THE ROAD OPENS (ROADSIDE SIGN) */}
      <section className="map-location location-road-opens">
        <div className="location-bg-layer">
          <picture>
            <source srcSet="/images/artwork/archive-premise.avif" type="image/avif" />
            <source srcSet="/images/artwork/archive-premise.webp" type="image/webp" />
            <img 
              src="/images/artwork/archive-premise.jpg" 
              alt="Roadside terrain horizon" 
              width="2752" 
              height="1536" 
              loading="lazy" 
              decoding="async" 
              className="location-bg-img" 
            />
          </picture>
          <div className="soft-fog-overlay"></div>
        </div>

        <div className="location-content">
          <div className="roadside-wooden-post">
            <span className="small-label">LOCATION II — THE ROAD OPENS</span>
            <h2 className="post-title">THE PATH WILL ASK WHAT YOU CARRY.</h2>
            <p className="post-body">
              Your answer changes what it shows you. There is no correct route.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/journey/carry" className="btn btn-primary">
                Step onto the road &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION III: THE VALLEY MOMENT (SCROLL SIGN TRANSFORMATION) */}
      <section className="map-location location-valley-moment">
        <div className="location-bg-layer">
          <picture>
            <source srcSet="/images/artwork/journey-explanation.avif" type="image/avif" />
            <source srcSet="/images/artwork/journey-explanation.webp" type="image/webp" />
            <img 
              src="/images/artwork/journey-explanation.jpg" 
              alt="The Valley path terrain" 
              width="2560" 
              height="1440" 
              loading="lazy" 
              decoding="async" 
              className="location-bg-img" 
            />
          </picture>
          <div className="soft-fog-overlay"></div>
        </div>

        <div className="location-content">
          <ValleySignScroll />
        </div>
      </section>

      {/* 4. LOCATION IV: FEATURED ARCHIVE DOSSIER */}
      <section className="map-location location-archival-dossier">
        <div className="location-content">
          <div className="archival-dossier-paper">
            <div className="dossier-header-strip">
              <span className="dossier-wax-seal" title="Archival Wax Seal"></span>
              <span className="small-label" style={{ color: 'var(--red)' }}>RECOVERED FIELD NOTE NO. 01</span>
            </div>
            <h2 className="dossier-title">Other People's Weather</h2>
            <blockquote className="dossier-excerpt">
              "Not every storm that fills a room was created by the person standing in it."
            </blockquote>
            <p className="dossier-desc">
              Field observation regarding the absorption of unfamiliar atmospheric shifts as personal guilt.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/archive/field-guide/other-peoples-weather" className="btn btn-primary">
                Unseal the field note &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION V: CABINET OF RELICS (WORKTABLE) */}
      <section className="map-location location-relics-worktable">
        <div className="location-content">
          <CabinetOfRelics />
        </div>
      </section>

      {/* 6. LOCATION VI: THE TWO LETTER ROOMS */}
      <section className="map-location location-corridor">
        <div className="location-content">
          <CorridorDoors />
        </div>
      </section>

      {/* 7. LOCATION VII: FINAL HORIZON & DISPATCHES */}
      <section className="map-location location-final-landscape">
        <div className="location-bg-layer">
          <picture>
            <source srcSet="/images/homepage/quiet-lantern-horizon.avif" type="image/avif" />
            <source srcSet="/images/homepage/quiet-lantern-horizon.webp" type="image/webp" />
            <img 
              src="/images/homepage/quiet-lantern-horizon.jpg" 
              alt="A foggy road curving past a small glowing lantern at dawn." 
              width="1344" 
              height="768" 
              loading="lazy" 
              decoding="async" 
              className="location-bg-img" 
            />
          </picture>
          <div className="final-lantern-glow"></div>
        </div>

        <div className="location-content final-content-box">
          <div className="final-declaration">
            <h2 className="final-heading">THE WOLVES MAY STILL MISUNDERSTAND YOU.</h2>
            <h3 className="final-subheading">THE ROAD DOES NOT REQUIRE THEIR PERMISSION.</h3>
          </div>

          <div id="join" className="final-signup-panel">
            <span className="small-label">DISPATCHES FROM THE ROAD</span>
            <h4 className="signup-title">Receive dispatches from the road</h4>
            <SignupForm />
          </div>
        </div>

        {/* Simple Non-Overlapping Footer */}
        <footer className="continuous-footer">
          <div className="footer-inner">
            <span className="footer-brand">How to Explain Yourself to Wolves</span>
            <div className="footer-links-row">
              <Link to="/archive">Archive</Link>
              <Link to="/journey">Journey</Link>
              <Link to="/dear-red">Dear Red</Link>
              <Link to="/things-i-should-have-said">Unsaid Wall</Link>
              <Link to="/book">The Book</Link>
              <Link to="/about">About</Link>
            </div>
            <span className="footer-copy">© {new Date().getFullYear()} Jayme Volstad. All rights reserved.</span>
          </div>
        </footer>
      </section>

    </div>
  );
}
