import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SvgRoutePath from './SvgRoutePath';
import FireflyCanvas from './FireflyCanvas';
import CabinetOfRelics from './CabinetOfRelics';
import CorridorDoors from './CorridorDoors';
import SubstackDispatches from '../substack/SubstackDispatches';
import { useJourneyState } from '../../hooks/useJourneyState';
import './ContinuousMapWorld.css';

export default function ContinuousMapWorld() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carnivalDarkOpacity, setCarnivalDarkOpacity] = useState(0);
  const [carnivalTextOpacity, setCarnivalTextOpacity] = useState(1);
  
  const containerRef = useRef(null);
  const carnivalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = window.scrollY;
      const progress = Math.max(0, Math.min(1, current / totalHeight));
      setScrollProgress(progress);

      // Carnival Scroll-Linked Crossfade Calculation
      if (carnivalRef.current) {
        const rect = carnivalRef.current.getBoundingClientRect();
        const sectionHeight = rect.height - window.innerHeight;
        if (sectionHeight > 0) {
          const scrolledInto = -rect.top;
          const localProgress = Math.max(0, Math.min(1, scrolledInto / sectionHeight));
          setCarnivalDarkOpacity(localProgress);
          // Text card fades out gracefully as scene darkens completely
          const textOpacity = localProgress > 0.75 ? Math.max(0, 1 - (localProgress - 0.75) / 0.25) : 1;
          setCarnivalTextOpacity(textOpacity);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="continuous-map-world relative overflow-hidden">
      {/* Floating Ember Signal Lights */}
      <FireflyCanvas />

      {/* Primary Narrative Sections */}
      <main className="relative z-10">
        
        {/* Fixed Full-Page Continuous Red Thread Overlay (Inside main stack context) */}
        <SvgRoutePath scrollProgress={scrollProgress} />
        
        {/* 1. HERO MAP */}
        <section data-thread-anchor="hero" className="map-location location-hero">
          <div className="location-bg-layer">
            <img 
              src="/images/artwork/hero-desktop.jpg" 
              alt="How to Explain Yourself to Wolves territory map" 
              width="1344" 
              height="768" 
              loading="eager" 
              fetchPriority="high" 
              className="location-bg-img" 
            />
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
              PREVIEW THE JOURNEY &rarr;
            </Link>
            <Link to="/archive" className="hero-secondary-text-link">
              Enter the Archive &rarr;
            </Link>
          </div>

            <p className="hero-subnote">
              "You do not have to explain yourself before entering."
            </p>
          </div>
        </section>

        {/* Seam 1: Hero Map to Road Opens */}
        <div className="scene-seam-wrapper hero-to-road-seam" aria-hidden="true">
          <div className="scene-seam-graphic hero-to-road-graphic"></div>
        </div>

        {/* 2. LOCATION II: THE ROAD OPENS */}
        <section data-thread-anchor="road" className="map-location location-road-opens">
          <div className="location-bg-layer">
            <img 
              src="/images/artwork/archive-premise.jpg" 
              alt="Roadside terrain horizon" 
              width="2752" 
              height="1536" 
              loading="lazy" 
              decoding="async" 
              className="location-bg-img" 
            />
            <div className="road-contrast-overlay"></div>
          </div>

          <div className="location-content">
            <div className="roadside-wooden-post">
              <span className="small-label">LOCATION II — THE ROAD OPENS</span>
              <h2 className="post-title">THE PATH WILL ASK WHAT YOU CARRY.</h2>
              <p className="post-body">
                Your answer changes what it shows you. There is no correct route.
              </p>
              <div style={{ marginTop: '1.75rem' }}>
                <Link to="/journey" className="btn btn-primary">
                  THE ROAD IS STILL BEING DRAWN &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seam 2: Road Opens to Carnival */}
        <div className="scene-seam-wrapper road-to-carnival-seam" aria-hidden="true">
          <div className="scene-seam-graphic road-to-carnival-graphic"></div>
        </div>

        {/* 3. LOCATION III: THE CARNIVAL (ONE SINGLE SCROLL-LINKED CROSSFADE SECTION) */}
        <section ref={carnivalRef} data-thread-anchor="carnival" className="carnival-single-section">
          <div className="carnival-sticky-frame">
            
            {/* Lit Layer (Bottom) */}
            <img 
              src="/images/artwork/carnival-lit.jpg" 
              alt="Illuminated aerial view of the Carnival territory" 
              width="1344" 
              height="768" 
              loading="lazy" 
              decoding="async" 
              className="carnival-layer carnival-layer-lit" 
            />

            {/* Dark Layer (Top with scroll-linked opacity crossfade) */}
            <img 
              src="/images/artwork/carnival-dark.jpg" 
              alt="Dark abandoned aerial view of the Carnival territory" 
              width="1344" 
              height="768" 
              loading="lazy" 
              decoding="async" 
              className="carnival-layer carnival-layer-dark" 
              style={{ opacity: carnivalDarkOpacity }}
            />

            <div className="carnival-vignette-overlay"></div>

            {/* Single Centered Text Card */}
            <div className="carnival-centered-content" style={{ opacity: carnivalTextOpacity }}>
              <div className="carnival-single-card">
                <span className="small-label" style={{ color: 'var(--color-brass)' }}>
                  LOCATION III — THE CARNIVAL
                </span>
                <h2 className="carnival-single-title">THE CARNIVAL</h2>
                <blockquote className="carnival-single-quote">
                  "It did not look dangerous while the lights were on."
                </blockquote>
                <p className="carnival-single-sub">
                  Some roads only appear after dark.
                </p>
              </div>
            </div>

            {/* Subtle Scroll Interaction Cue */}
            <div className="carnival-scroll-cue" style={{ opacity: Math.max(0, 1 - carnivalDarkOpacity * 1.8) }}>
              <span className="cue-text">Scroll to dim the lights &darr;</span>
            </div>

          </div>
        </section>

        {/* Seam 3: Carnival to Forest (Weather) */}
        <div className="scene-seam-wrapper carnival-to-forest-seam" aria-hidden="true">
          <div className="scene-seam-graphic carnival-to-forest-graphic"></div>
        </div>

        {/* 4. LOCATION IV: OTHER PEOPLE'S WEATHER */}
        <section data-thread-anchor="weather" className="map-location location-archival-dossier">
          <div className="location-bg-layer">
            <img 
              src="/images/artwork/weather-rain.png" 
              alt="A woman in a red coat walking through rain, moving fog, wind-bent branches, and distant storm light" 
              width="1344" 
              height="768" 
              loading="lazy" 
              decoding="async" 
              className="location-bg-img" 
            />
            <div className="weather-readability-overlay"></div>
          </div>

          <div className="location-content weather-dossier-wrap">
            <div className="archival-dossier-paper">
              <div className="dossier-header-strip">
                <span className="dossier-wax-seal" title="Archival Wax Seal"></span>
                <span className="small-label" style={{ color: '#8b0000', margin: 0 }}>
                  LOCATION IV — OTHER PEOPLE’S WEATHER
                </span>
              </div>
              <h2 className="dossier-title">Other People's Weather</h2>
              <blockquote className="dossier-excerpt">
                "Not every storm that fills a room was created by the person standing in it."
              </blockquote>
              <p className="dossier-desc">
                Field observation regarding the absorption of unfamiliar atmospheric shifts as personal guilt.
              </p>
              <div style={{ marginTop: '1.75rem' }}>
                <Link to="/archive/field-guide/other-peoples-weather" className="btn btn-primary">
                  Unseal the field note &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seam 4: Forest (Weather) to Legend */}
        <div className="scene-seam-wrapper forest-to-legend-seam" aria-hidden="true">
          <div className="scene-seam-graphic forest-to-legend-graphic"></div>
        </div>

        {/* 5. LOCATION V: THE LEGEND */}
        <section data-thread-anchor="legend" className="map-location location-relics-worktable">
          <div className="location-content location-worktable-content">
            <CabinetOfRelics />
          </div>
        </section>

        {/* Seam 5: Legend to Corridor */}
        <div className="scene-seam-wrapper legend-to-corridor-seam" aria-hidden="true">
          <div className="scene-seam-graphic legend-to-corridor-graphic"></div>
        </div>

        {/* 6. LOCATION VI: CORRIDOR */}
        <section data-thread-anchor="corridor" className="map-location location-corridor">
          <div className="location-content location-corridor-content">
            <CorridorDoors />
          </div>
        </section>

        {/* Seam 6: Corridor to Final mist road */}
        <div className="scene-seam-wrapper corridor-to-dawn-seam" aria-hidden="true">
          <div className="scene-seam-graphic corridor-to-dawn-graphic"></div>
        </div>

        {/* 7. LOCATION VII: FINAL HORIZON & STAY NEAR THE ROAD */}
        <section data-thread-anchor="final" className="map-location location-final-landscape">
          <div className="location-bg-layer">
            <img 
              src="/images/homepage/quiet-lantern-horizon.jpg" 
              alt="A foggy road curving past a small glowing lantern at dawn." 
              width="1344" 
              height="768" 
              loading="lazy" 
              decoding="async" 
              className="location-bg-img" 
            />
            <div className="final-lantern-glow"></div>
          </div>

          <div className="location-content final-content-box">
            {/* Open Sky Statement */}
            <div className="final-declaration">
              <h2 className="final-heading">THE WOLVES MAY STILL MISUNDERSTAND YOU.</h2>
              <h3 className="final-subheading">THE ROAD DOES NOT REQUIRE THEIR PERMISSION.</h3>
            </div>

            {/* Restrained Live CTA Panel */}
            <div id="join" className="final-signup-panel">
              <span className="small-label">DISPATCHES FROM THE ROAD</span>
              <h4 className="signup-title">STAY NEAR THE ROAD</h4>
              <p className="signup-subnote" style={{ fontStyle: 'italic', color: 'var(--color-bone)', marginBottom: '1.75rem', fontSize: '15px' }}>
                Be told when the wolves are ready.
              </p>

              <div className="final-actions-row">
                <a 
                  href="https://otherpeoplesweather.substack.com/subscribe?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large"
                >
                  RECEIVE DISPATCHES
                </a>
                <a 
                  href="https://otherpeoplesweather.substack.com?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-sm"
                  style={{ color: 'var(--color-brass)' }}
                >
                  READ ON SUBSTACK &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Seam 7: Dawn road to Latest Dispatches */}
        <div className="scene-seam-wrapper dawn-to-dispatches-seam" aria-hidden="true">
          <div className="scene-seam-graphic dawn-to-dispatches-graphic"></div>
        </div>

        {/* 8. LATEST DISPATCHES */}
        <section data-thread-anchor="dispatches" className="quiet-dispatches-wrapper">
          <SubstackDispatches />
        </section>

        {/* Footer */}
        <footer className="continuous-footer">
          <div className="footer-inner">
            <span className="footer-brand">How to Explain Yourself to Wolves</span>
            <div className="footer-links-row">
              <Link to="/archive">Archive</Link>
              <Link to="/journey">Journey</Link>
              <Link to="/dear-red">Dear Red</Link>
              <Link to="/things-i-should-have-said">Unsaid Wall</Link>
              <a 
                href="https://otherpeoplesweather.substack.com?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Dispatches
              </a>
              <Link to="/book">The Book</Link>
              <Link to="/about">About</Link>
            </div>
            <span className="footer-copy">© {new Date().getFullYear()} Jayme Volstad. All rights reserved.</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
