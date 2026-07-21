import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';
import './CorridorDoors.css';

export default function CorridorDoors() {
  const { getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();
  const carriedObject = activeJourney?.carriedObject;

  return (
    <div className="home-corridor-scene">
      {/* Approved Corridor Visual Background Environment */}
      <div className="home-corridor-bg-layer">
        <picture>
          <source srcSet="/images/homepage/two-letter-corridor.avif" type="image/avif" />
          <source srcSet="/images/homepage/two-letter-corridor.webp" type="image/webp" />
          <img 
            src="/images/homepage/two-letter-corridor.jpg" 
            alt="A dark corridor with a warm private doorway on the left and a paper-covered public doorway on the right." 
            width="1344"
            height="768"
            loading="lazy"
            decoding="async"
            className="home-corridor-bg-img"
          />
        </picture>
      </div>

      {/* Interactive Doorway Portals Stage */}
      <div className="home-corridor-stage">
        
        {/* LEFT DOORWAY: DEAR RED */}
        <Link 
          to="/dear-red" 
          className="home-corridor-door-link door-left"
          aria-label="Enter Dear Red private room"
        >
          {/* Live Replacement Plaque Positioned Directly Over Artwork Header */}
          <div className="home-door-plaque">
            <span className="home-door-plaque-tag">PRIVATE ROOM</span>
            <h3 className="home-door-plaque-title">DEAR RED</h3>
          </div>

          {/* Small Localized Text Treatment Near Base */}
          <div className="home-door-label-subtle">
            <p className="home-door-sub">"A private room for the version of you who kept explaining."</p>
            <span className="home-door-action">Enter Dear Red &rarr;</span>
          </div>
        </Link>

        {/* RIGHT DOORWAY: THINGS I SHOULD HAVE SAID */}
        <Link 
          to="/things-i-should-have-said" 
          className="home-corridor-door-link door-right"
          aria-label="Step to Things I Should Have Said public wall"
        >
          {/* Live Replacement Plaque Positioned Directly Over Artwork Header */}
          <div className="home-door-plaque">
            <span className="home-door-plaque-tag">PUBLIC WALL</span>
            <h3 className="home-door-plaque-title">THINGS I SHOULD HAVE SAID</h3>
          </div>

          {/* Small Localized Text Treatment Near Base */}
          <div className="home-door-label-subtle">
            <p className="home-door-sub">"A public wall for words that arrived after the room was gone."</p>
            <span className="home-door-action">Step to the wall &rarr;</span>
          </div>
        </Link>

      </div>

      {carriedObject && (
        <div style={{ position: 'absolute', bottom: '0.75rem', width: '100%', textAlign: 'center', zIndex: 10 }}>
          <span className="small-label" style={{ fontSize: '11px', color: 'var(--color-brass)', background: 'rgba(10, 13, 12, 0.85)', padding: '0.2rem 0.6rem', borderRadius: '3px' }}>
            TRACE IN THE HALL: Carrying {carriedObject.replace('_', ' ')}
          </span>
        </div>
      )}
    </div>
  );
}
