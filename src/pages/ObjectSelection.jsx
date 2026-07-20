import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { objects } from '../data/storyData';
import { useJourneyState } from '../hooks/useJourneyState';
import { journeyConfig } from '../data/journeyConfig';
import './ObjectSelection.css';

export default function ObjectSelection() {
  const [selectedId, setSelectedId] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const dialogRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const triggerButtonRef = useRef(null);
  
  const { selectObject, getActiveJourney, startNewJourney } = useJourneyState();
  const navigate = useNavigate();

  const activeJourney = getActiveJourney();
  const hasAnswers = activeJourney && Object.keys(activeJourney.answers || {}).length > 0;

  useEffect(() => {
    if (activeJourney && activeJourney.carriedObject && !selectedId && !showConsequence) {
      setSelectedId(activeJourney.carriedObject);
      setShowConsequence(true);
    }
  }, [activeJourney, selectedId, showConsequence]);

  const handleSelect = (id, event) => {
    setSelectedId(id);
    setShowConsequence(true);
    triggerButtonRef.current = event.currentTarget;
  };

  const handleContinue = () => {
    if (selectedId) {
      if (hasAnswers && selectedId !== activeJourney.carriedObject) {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      } else {
        selectObject(selectedId);
        navigate(`/journey/stage/${journeyConfig.firstStageId}`);
      }
    }
  };

  const handleConfirmBeginAnew = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    const newJourneyId = startNewJourney(selectedId);
    navigate(`/journey/stage/${journeyConfig.firstStageId}`);
  };

  const handleCancel = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    // Revert selection
    if (activeJourney?.carriedObject) {
      setSelectedId(activeJourney.carriedObject);
    }
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  };

  const selectedObject = objects.find(o => o.id === selectedId);

  return (
    <div className="object-page">
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
              onClick={(e) => handleSelect(obj.id, e)}
              aria-pressed={selectedId === obj.id}
            >
              <picture className="object-image-area">
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
              <h3>{obj.name}</h3>
              <p>{obj.description}</p>
            </button>
          ))}
        </div>

        {showConsequence && selectedObject && (
          <div className="consequence-panel reveal-anim">
            <p className="handwritten">{selectedObject.consequence}</p>
            <button onClick={handleContinue} className="btn btn-primary">
              {hasAnswers && selectedId === activeJourney.carriedObject ? 'Continue the Journey' : 'Begin the Journey'}
            </button>
          </div>
        )}

        {/* Native accessible dialog */}
        <dialog 
          ref={dialogRef} 
          className="confirmation-dialog" 
          aria-labelledby="dialog-title" 
          aria-describedby="dialog-desc"
          onCancel={handleCancel}
        >
          <div className="dialog-content">
            <h3 id="dialog-title">Abandon current route?</h3>
            <p id="dialog-desc">
              You already have answers recorded for your current route. Changing your object now will permanently discard that progress and begin a completely new journey.
            </p>
            <div className="dialog-actions">
              <button onClick={handleConfirmBeginAnew} className="btn btn-primary">
                Discard this route and begin again
              </button>
              <button ref={confirmButtonRef} onClick={handleCancel} className="btn btn-text">
                Keep current route
              </button>
            </div>
          </div>
        </dialog>
      </main>
    </div>
  );
}
