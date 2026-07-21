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
    navigate('/journey/carry');
  };

  return (
    <div className="home-relic-scene">
      {/* Approved Worktable Visual Background Environment */}
      <div className="home-relic-bg-layer">
        <img 
          src="/images/homepage/relic-worktable.jpg" 
          alt="An antique archive worktable with a weathered map and red thread beneath six symbolic relics." 
          width="1344"
          height="768"
          loading="lazy"
          decoding="async"
          className="home-relic-bg-img"
        />
      </div>

      {/* Interactive Relic Overlays Stage */}
      <div className="home-relic-stage" role="radiogroup" aria-label="Cabinet of Relics Worktable">
        {relics.map((obj) => {
          const isSelected = obj.id === selectedId;
          return (
            <button
              key={obj.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${obj.title}`}
              className={`home-relic-button home-relic-${obj.id} ${isSelected ? 'is-selected' : 'is-unselected'}`}
              onClick={() => setSelectedId(obj.id)}
              onFocus={() => setSelectedId(obj.id)}
            >
              <img 
                src={obj.image} 
                alt={obj.alt}
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
                className="home-relic-img"
              />
            </button>
          );
        })}

        {/* Selected Relic HTML Catalogue Record Panel */}
        <div className="home-relic-dossier-panel">
          <span className="home-relic-cat-tag">{activeRelic.catNum}</span>
          <h3 className="home-relic-title">{activeRelic.title}</h3>
          <p className="home-relic-desc">{activeRelic.description}</p>
          
          <div className="home-relic-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleCarry(activeRelic.id)}
              aria-label={`Carry the ${activeRelic.title} into the Journey`}
            >
              Carry it with you
            </button>
            <Link 
              to={`/archive/inventory/${getObjectSlug(activeRelic.id)}`}
              className="btn btn-ghost-sm"
              aria-label={`Examine the ${activeRelic.title} in the Inventory`}
            >
              Examine in Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
