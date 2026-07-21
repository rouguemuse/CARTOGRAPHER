import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';
import './CorridorDoors.css';

export default function CorridorDoors() {
  const { getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();
  const carriedObject = activeJourney?.carriedObject;

  const sceneRef = useRef(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLightPos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setLightPos(prev => ({ ...prev, active: false }));
  };

  return (
    <div 
      ref={sceneRef}
      className="home-corridor-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Approved Corridor Visual Background Environment */}
      <div className="home-corridor-bg-layer">
        <img 
          src="/images/homepage/two-letter-corridor.jpg" 
          alt="A dark corridor with a warm private doorway on the left and a paper-covered public doorway on the right." 
          width="1344"
          height="768"
          loading="lazy"
          decoding="async"
          className="home-corridor-bg-img"
        />
      </div>

      {/* Restrained Mouse Cursor Spotlight Glow */}
      {lightPos.active && (
        <div 
          className="corridor-spotlight-glow"
          style={{
            left: `${lightPos.x}%`,
            top: `${lightPos.y}%`,
            background: lightPos.x < 50 
              ? 'radial-gradient(circle, rgba(230, 200, 160, 0.18) 0%, rgba(200, 140, 90, 0.08) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(200, 215, 225, 0.18) 0%, rgba(140, 170, 190, 0.08) 50%, transparent 80%)'
          }}
        />
      )}

      {/* Physical Doorways Stage */}
      <div className="home-corridor-stage">
        
        {/* LEFT DOORWAY: DEAR RED */}
        <Link 
          to="/dear-red" 
          className="home-corridor-door-link door-left"
          aria-label="Enter Dear Red private room"
        >
          <div className="home-door-label-compact">
            <span className="home-door-eyebrow">PRIVATE ROOM</span>
            <h3 className="home-door-title">Dear Red</h3>
            <p className="home-door-sub">
              A private room for the version of you who kept explaining.
            </p>
          </div>
        </Link>

        {/* RIGHT DOORWAY: THINGS I SHOULD HAVE SAID */}
        <Link 
          to="/things-i-should-have-said" 
          className="home-corridor-door-link door-right"
          aria-label="Step to Things I Should Have Said public wall"
        >
          <div className="home-door-label-compact">
            <span className="home-door-eyebrow">PUBLIC WALL</span>
            <h3 className="home-door-title">Things I Should Have Said</h3>
            <p className="home-door-sub">
              A public wall for words that arrived after the room was gone.
            </p>
          </div>
        </Link>

      </div>

      {carriedObject && (
        <div className="corridor-object-trace">
          <span className="small-label" style={{ fontSize: '11px', color: 'var(--color-brass)' }}>
            TRACE IN THE HALL: Carrying {carriedObject.replace('_', ' ')}
          </span>
        </div>
      )}
    </div>
  );
}
