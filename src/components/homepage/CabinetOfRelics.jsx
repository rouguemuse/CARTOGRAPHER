import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { relics } from '../../data/relics';
import { useJourneyState } from '../../hooks/useJourneyState';
import './CabinetOfRelics.css';

export default function CabinetOfRelics() {
  const { selectObject, getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(activeJourney?.carriedObject || 'red_coat');

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

  const activeRelic = relics.find(r => r.id === selectedId) || relics[0];

  const handleCarry = (id) => {
    selectObject(id);
    navigate('/journey');
  };

  return (
    <div className="home-relic-container">
      {/* Masthead */}
      <header className="home-relic-header">
        <h2 className="home-relic-main-title">THE LEGEND</h2>
        <p className="home-relic-subtitle">
          Every map needs a legend. This one tells you what the objects mean—and asks which one you still carry.
        </p>
      </header>

      {/* Atmospheric Void Stage (Transparent Cutouts & Vector Red Thread) */}
      <div className="home-relic-void-stage">
        
        {/* Continuous Red Thread Vector Path (Placed Beneath Relics) */}
        <svg
          className="relic-thread"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M170 135 C255 175 225 300 365 322 C505 344 505 205 665 305 C805 393 830 510 1040 330" />
        </svg>

        {/* Floating Isolated Relic Cutout Buttons */}
        <div className="void-relics-cluster" role="radiogroup" aria-label="Symbolic Inventory Relics">
          {relics.map((obj) => {
            const isSelected = obj.id === selectedId;
            return (
              <button
                key={obj.id}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Select ${obj.title}`}
                className={`void-relic-button void-relic-${obj.id} ${isSelected ? 'is-selected' : 'is-unselected'}`}
                onClick={() => setSelectedId(obj.id)}
                onFocus={() => setSelectedId(obj.id)}
              >
                <img 
                  src={obj.image} 
                  alt={obj.alt}
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="void-relic-img"
                />
                <span className="void-relic-label">{obj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Relic Meaning Panel */}
        <div className="void-relic-dossier-panel">
          <span className="void-relic-cat-tag">{activeRelic.catNum}</span>
          <h3 className="void-relic-title">{activeRelic.title}</h3>
          <p className="void-relic-desc">{activeRelic.description}</p>
          
          <div className="void-relic-actions">
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
              aria-label={`Examine the ${activeRelic.title} in Inventory`}
            >
              Examine in Inventory &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
