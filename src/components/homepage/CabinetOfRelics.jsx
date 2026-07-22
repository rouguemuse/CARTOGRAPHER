import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { relics } from '../../data/relics';
import { useJourneyState } from '../../hooks/useJourneyState';
import {
  CompassRoseIcon,
  CoatIcon,
  SpoolIcon,
  LanternIcon,
  CraneIcon,
  EnvelopeIcon
} from './CartographyIcons';
import './CabinetOfRelics.css';

export default function CabinetOfRelics() {
  const { selectObject, getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(activeJourney?.carriedObject || 'red_string');

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

  const getIconForRelic = (id) => {
    switch(id) {
      case 'red_coat': return CoatIcon;
      case 'red_string': return SpoolIcon;
      case 'compass': return CompassRoseIcon;
      case 'lantern': return LanternIcon;
      case 'red_crane': return CraneIcon;
      case 'red_envelope': return EnvelopeIcon;
      default: return CompassRoseIcon;
    }
  };

  const activeRelic = relics.find(r => r.id === selectedId) || relics[0];

  const handleCarry = (id) => {
    selectObject(id);
    navigate('/journey');
  };

  // Get dynamic local red thread path connecting selected icon to description card
  const getLocalThreadPath = () => {
    switch(selectedId) {
      case 'red_coat':     return 'M 100,80 C 180,150 220,250 300,310';
      case 'red_string':   return 'M 300,80 C 300,150 300,250 300,310';
      case 'compass':      return 'M 500,80 C 420,150 380,250 300,310';
      case 'lantern':      return 'M 100,210 C 180,240 220,280 300,310';
      case 'red_crane':    return 'M 300,210 C 300,240 300,280 300,310';
      case 'red_envelope': return 'M 500,210 C 420,240 380,280 300,310';
      default:             return 'M 300,80 C 300,150 300,250 300,310';
    }
  };

  return (
    <div className="home-relic-container">
      {/* Masthead */}
      <header className="home-relic-header">
        <h2 className="home-relic-main-title">THE LEGEND</h2>
        <p className="home-relic-subtitle">
          Symbols encountered throughout the journey.
        </p>
      </header>

      {/* Restrained Dark Key Panel */}
      <div className="home-relic-key-panel">
        
        {/* Local connector thread segment running behind the active icon */}
        <svg 
          className="relic-local-thread-connector"
          viewBox="0 0 600 360"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path 
            d={getLocalThreadPath()} 
            fill="none" 
            stroke="#b3211d" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>

        {/* 3-Column / 2-Row Grid of symbols */}
        <div className="relic-grid-key" role="radiogroup" aria-label="Symbolic Inventory Key">
          {relics.map((obj) => {
            const isSelected = obj.id === selectedId;
            const Icon = getIconForRelic(obj.id);
            return (
              <button
                key={obj.id}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Select ${obj.title}`}
                className={`relic-key-item ${isSelected ? 'is-selected' : 'is-unselected'}`}
                onClick={() => setSelectedId(obj.id)}
                onFocus={() => setSelectedId(obj.id)}
              >
                <div className="relic-key-icon-wrap">
                  <Icon className="relic-key-svg-icon" />
                </div>
                <span className="relic-key-label">{obj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Symbol Description Card (Aligned below the grid) */}
        <div className="relic-meaning-panel">
          <span className="relic-meaning-cat-tag">{activeRelic.catNum}</span>
          <h3 className="relic-meaning-title">{activeRelic.title.toUpperCase()}</h3>
          <p className="relic-meaning-desc">
            {activeRelic.description} {activeRelic.consequence || ''}
          </p>
          
          <div className="relic-meaning-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleCarry(activeRelic.id)}
              aria-label={`Carry the ${activeRelic.title}`}
            >
              Carry this object
            </button>
            <Link 
              to={`/archive/inventory/${getObjectSlug(activeRelic.id)}`}
              className="btn btn-ghost-sm"
              style={{ color: 'var(--color-brass)' }}
              aria-label={`Explore the ${activeRelic.title} symbol`}
            >
              Explore this symbol &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
