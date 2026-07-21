import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { objects } from '../../data/storyData';
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

  const getCatNum = (id) => {
    switch(id) {
      case 'red_coat': return 'CAT-OBJ-001';
      case 'red_string': return 'CAT-OBJ-002';
      case 'red_crane': return 'CAT-OBJ-003';
      case 'red_envelope': return 'CAT-OBJ-004';
      case 'compass': return 'CAT-OBJ-005';
      case 'lantern': return 'CAT-OBJ-006';
      default: return 'CAT-OBJ-000';
    }
  };

  const activeRelic = objects.find(o => o.id === selectedId) || objects[0];

  const handleCarry = (id) => {
    selectObject(id);
    navigate('/journey/carry');
  };

  return (
    <div className="home-relic-scene">
      {/* Approved Worktable Visual Background Environment */}
      <div className="home-relic-bg-layer">
        <picture>
          <source srcSet="/images/homepage/relic-worktable.avif" type="image/avif" />
          <source srcSet="/images/homepage/relic-worktable.webp" type="image/webp" />
          <img 
            src="/images/homepage/relic-worktable.jpg" 
            alt="An antique archive worktable with a weathered map and red thread beneath six symbolic relics." 
            width="1344"
            height="768"
            loading="lazy"
            decoding="async"
            className="home-relic-bg-img"
          />
        </picture>
      </div>

      {/* Interactive Relic Overlays Stage */}
      <div className="home-relic-stage" role="radiogroup" aria-label="Cabinet of Relics Worktable">
        {objects.map((obj) => {
          const isSelected = obj.id === selectedId;
          return (
            <button
              key={obj.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${obj.name}`}
              className={`home-relic-button home-relic-${obj.id} ${isSelected ? 'is-selected' : 'is-unselected'}`}
              onClick={() => setSelectedId(obj.id)}
              onFocus={() => setSelectedId(obj.id)}
            >
              <picture style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <source srcSet={obj.image.replace('.png', '.avif')} type="image/avif" />
                <source srcSet={obj.image.replace('.png', '.webp')} type="image/webp" />
                <img 
                  src={obj.image} 
                  alt={obj.name}
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="home-relic-img"
                />
              </picture>
            </button>
          );
        })}

        {/* Selected Relic HTML Catalogue Record Panel */}
        <div className="home-relic-dossier-panel">
          <span className="home-relic-cat-tag">{getCatNum(activeRelic.id)}</span>
          <h3 className="home-relic-title">{activeRelic.name}</h3>
          <p className="home-relic-desc">{activeRelic.description}</p>
          
          <div className="home-relic-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleCarry(activeRelic.id)}
              aria-label={`Carry the ${activeRelic.name} into the Journey`}
            >
              Carry it with you
            </button>
            <Link 
              to={`/archive/inventory/${getObjectSlug(activeRelic.id)}`}
              className="btn btn-ghost-sm"
              aria-label={`Examine the ${activeRelic.name} in the Inventory`}
            >
              Examine in Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
