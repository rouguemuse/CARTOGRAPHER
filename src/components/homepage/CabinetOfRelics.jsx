import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CompassRoseIcon,
  CoatIcon,
  SpoolIcon,
  LanternIcon,
  FoldedMapIcon,
  CloudIcon,
  WolfIcon,
  HorizonIcon
} from './CartographyIcons';
import './CabinetOfRelics.css';

const legendItems = [
  // Family: WHAT YOU CARRY
  {
    id: 'red_coat',
    family: 'carry',
    title: 'The Red Coat',
    catNum: 'CAT-OBJ-001',
    description: 'An oversized red wool coat, heavy enough to keep out winter and hide whatever you are carrying beneath it.',
    slug: '/archive/inventory/red-coat',
    icon: CoatIcon
  },
  {
    id: 'red_string',
    family: 'carry',
    title: 'The Red Thread',
    catNum: 'CAT-OBJ-002',
    description: 'A length of crimson thread, frayed at the ends, used for mapping connections or tying things together so they do not get lost.',
    slug: '/archive/inventory/red-thread',
    icon: SpoolIcon
  },
  {
    id: 'lantern',
    family: 'carry',
    title: 'The Lantern',
    catNum: 'CAT-OBJ-006',
    description: 'An elegant antique iron lantern to cut through the fog and cast light on what is hidden.',
    slug: '/archive/inventory/lantern',
    icon: LanternIcon
  },
  {
    id: 'compass',
    family: 'carry',
    title: 'The Compass',
    catNum: 'CAT-OBJ-005',
    description: 'An antique brass compass that always points to the truth, even when it is inconvenient.',
    slug: '/archive/inventory/compass',
    icon: CompassRoseIcon
  },
  // Family: WHAT YOU ENCOUNTER
  {
    id: 'maps',
    family: 'encounter',
    title: 'The Maps',
    catNum: 'CAT-ENC-001',
    description: 'Inherited directions and hand-drawn boundaries that dictate where you are allowed to travel.',
    slug: '/archive/field-guide/map-of-origin',
    icon: FoldedMapIcon
  },
  {
    id: 'weather',
    family: 'encounter',
    title: 'The Weather',
    catNum: 'CAT-ENC-002',
    description: 'Other people\'s moods, expectations, and storms that you have learned to forecast and absorb as personal guilt.',
    slug: '/archive/field-guide/other-peoples-weather',
    icon: CloudIcon
  },
  {
    id: 'wolves',
    family: 'encounter',
    title: 'The Wolves',
    catNum: 'CAT-ENC-003',
    description: 'The critical voices, interrogations, and demands for explanations that meet you at every border.',
    slug: '/archive/field-guide/the-wolves-questions',
    icon: WolfIcon
  },
  {
    id: 'road',
    family: 'encounter',
    title: 'The Road',
    catNum: 'CAT-ENC-004',
    description: 'The path of self-cartography that begins once you choose to stop explaining your directions to the forest.',
    slug: '/workbook',
    icon: HorizonIcon
  }
];

export default function CabinetOfRelics() {
  const [selectedId, setSelectedId] = useState('red_string');

  const activeRelic = legendItems.find(r => r.id === selectedId) || legendItems[0];

  // Get dynamic local red thread path connecting selected icon to description card on an 800x360 layout grid
  const getLocalThreadPath = () => {
    switch(selectedId) {
      case 'red_coat':   return 'M 100,75 C 200,140 280,240 400,290';
      case 'red_string': return 'M 300,75 C 320,140 350,240 400,290';
      case 'lantern':    return 'M 500,75 C 480,140 450,240 400,290';
      case 'compass':    return 'M 700,75 C 600,140 520,240 400,290';
      case 'maps':       return 'M 100,195 C 200,225 280,260 400,290';
      case 'weather':    return 'M 300,195 C 320,225 350,260 400,290';
      case 'wolves':     return 'M 500,195 C 480,225 450,260 400,290';
      case 'road':       return 'M 700,195 C 600,225 520,260 400,290';
      default:           return 'M 300,75 C 300,150 300,250 400,290';
    }
  };

  const renderFamily = (familyId, header) => {
    const list = legendItems.filter(item => item.family === familyId);
    return (
      <div className="relic-family-block">
        <h4 className="relic-family-title">{header}</h4>
        <div className="relic-family-grid">
          {list.map((obj) => {
            const isSelected = obj.id === selectedId;
            const Icon = obj.icon;
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
      </div>
    );
  };

  return (
    <div className="home-relic-container">
      {/* Masthead */}
      <header className="home-relic-header">
        <h2 className="home-relic-main-title">THE LEGEND</h2>
        <p className="home-relic-subtitle">
          A field key to what you carry and what you encounter.
        </p>
      </header>

      {/* Restrained Dark Key Panel */}
      <div className="home-relic-key-panel">
        
        {/* Local connector thread segment running behind the active icon */}
        <svg 
          className="relic-local-thread-connector"
          viewBox="0 0 800 360"
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

        {/* Labeled Families inside a uniform 4-column by 2-row layout */}
        <div className="relic-families-wrapper">
          {renderFamily('carry', 'WHAT YOU CARRY')}
          {renderFamily('encounter', 'WHAT YOU ENCOUNTER')}
        </div>

        {/* Selected Symbol Description Card (Aligned below the grid) */}
        <div className="relic-meaning-panel">
          <span className="relic-meaning-cat-tag">{activeRelic.catNum}</span>
          <h3 className="relic-meaning-title">{activeRelic.title.toUpperCase()}</h3>
          <p className="relic-meaning-desc">
            {activeRelic.description}
          </p>
          
          <div className="relic-meaning-actions">
            <Link 
              to={activeRelic.slug}
              className="btn btn-primary"
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
