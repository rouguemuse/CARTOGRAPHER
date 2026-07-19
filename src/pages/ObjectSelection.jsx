import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { objects } from '../data/storyData';
import { useJourneyState } from '../hooks/useJourneyState';
import './ObjectSelection.css';

export default function ObjectSelection() {
  const [selectedId, setSelectedId] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const { selectObject, state } = useJourneyState();
  const navigate = useNavigate();

  // If we already have a selected object (e.g. clicked CARRY THIS on the landing page),
  // we should fast-forward straight to the first stage (valley).
  useEffect(() => {
    if (state && state.object) {
      navigate('/stage/valley', { replace: true });
    }
  }, [state, navigate]);

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowConsequence(true);
  };

  const handleContinue = () => {
    if (selectedId) {
      selectObject(selectedId);
      navigate('/stage/valley');
    }
  };

  const selectedObject = objects.find(o => o.id === selectedId);

  return (
    <div className="object-selection-page">
      {/* Return Navigation */}
      <nav style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', zIndex: 10}}>
        <div style={{fontFamily: 'var(--font-display)', color: 'var(--color-bone)', fontSize: '1.1rem'}}>
          <a href="/" style={{color: 'inherit', textDecoration: 'none'}}>The Archive</a>
        </div>
        <div style={{display: 'flex', gap: '1.5rem'}}>
          <a href="/#library" style={{color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Valley Library</a>
          <a href="/#join" style={{color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Join List</a>
        </div>
      </nav>

      <main className="object-main container">
        <div className="object-header">
          <h2>What will you carry?</h2>
          <p>The journey requires an object. You cannot take them all.</p>
        </div>

        <div className="object-grid">
          {objects.map((obj) => (
            <button 
              key={obj.id} 
              className={`tactile-card ${selectedId === obj.id ? 'selected' : ''}`}
              onClick={() => handleSelect(obj.id)}
              aria-pressed={selectedId === obj.id}
            >
              <div className="object-image">
                <img src={obj.image} alt={obj.name} />
              </div>
              <h3>{obj.name}</h3>
              <p>{obj.description}</p>
            </button>
          ))}
        </div>

        {showConsequence && selectedObject && (
          <div className="consequence-panel reveal-anim">
            <p className="handwritten">{selectedObject.consequence}</p>
            <button onClick={handleContinue} className="btn btn-primary">
              Begin the Journey
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
