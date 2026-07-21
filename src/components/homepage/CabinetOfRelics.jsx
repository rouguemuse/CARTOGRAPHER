import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { objects } from '../../data/storyData';
import { useJourneyState } from '../../hooks/useJourneyState';

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
    <div className="cabinet-of-relics-container">
      <header className="cabinet-header">
        <span className="small-label">LOCATION V — THE WORKTABLE</span>
        <h2 className="section-h2">Cabinet of Relics</h2>
        <p className="section-intro-desc">
          An atmospheric worktable of six symbolic items recovered from the valley. Select an object to examine what it protected and carry it forward.
        </p>
      </header>

      <div className="relics-worktable-scene">
        {/* Physical Relic Arrangement Hotspots */}
        <div className="relics-physical-layout" role="radiogroup" aria-label="Cabinet of Relics Worktable">
          {objects.map((obj) => {
            const isSelected = obj.id === selectedId;
            return (
              <button
                key={obj.id}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Select ${obj.name}`}
                className={`relic-hotspot relic-spot-${obj.id} ${isSelected ? 'is-selected' : 'is-dimmed'}`}
                onClick={() => setSelectedId(obj.id)}
                onFocus={() => setSelectedId(obj.id)}
              >
                <picture className="relic-hotspot-img">
                  <source srcSet={obj.image.replace('.png', '.avif')} type="image/avif" />
                  <source srcSet={obj.image.replace('.png', '.webp')} type="image/webp" />
                  <img 
                    src={obj.image} 
                    alt={obj.name}
                    width="800"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="relic-hotspot-label">{obj.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Relic Parchment Dossier Drawer */}
        <div className="selected-relic-dossier">
          <span className="relic-cat-tag">{getCatNum(activeRelic.id)}</span>
          <h3 className="relic-title">{activeRelic.name}</h3>
          <p className="relic-desc">{activeRelic.description}</p>
          
          <div className="relic-actions-row">
            <button 
              className="btn btn-primary"
              onClick={() => handleCarry(activeRelic.id)}
            >
              Carry it with you &rarr;
            </button>
            <Link 
              to={`/archive/inventory/${getObjectSlug(activeRelic.id)}`}
              className="btn btn-ghost-sm"
            >
              Examine in Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
