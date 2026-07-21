import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { relics } from '../data/relics';
import { useJourneyState } from '../hooks/useJourneyState';
import { journeyConfig } from '../data/journeyConfig';
import './ObjectSelection.css';

export default function ObjectSelection() {
  const [selectedId, setSelectedId] = useState(null);
  const dialogRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const triggerButtonRef = useRef(null);
  
  const { selectObject, getActiveJourney, startNewJourney } = useJourneyState();
  const navigate = useNavigate();

  const activeJourney = getActiveJourney();
  const hasAnswers = activeJourney && Object.keys(activeJourney.answers || {}).length > 0;

  useEffect(() => {
    if (activeJourney && activeJourney.carriedObject && !selectedId) {
      setSelectedId(activeJourney.carriedObject);
    }
  }, [activeJourney, selectedId]);

  const handleSelect = (id, event) => {
    setSelectedId(id);
    if (event) {
      triggerButtonRef.current = event.currentTarget;
    }
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
    startNewJourney(selectedId);
    navigate(`/journey/stage/${journeyConfig.firstStageId}`);
  };

  const handleCancel = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    if (activeJourney?.carriedObject) {
      setSelectedId(activeJourney.carriedObject);
    }
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  };

  const selectedRelic = relics.find(r => r.id === selectedId) || relics[0];

  return (
    <div className="carry-page-environment">
      <div className="carry-page-container">
        
        {/* Page Introduction */}
        <header className="carry-page-header">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>
            THE PATH REQUIRES AN OBJECT
          </span>
          <h1 className="carry-page-title">WHAT WILL YOU CARRY?</h1>
          <p className="carry-page-subtitle">
            The journey requires an object. You cannot take them all.
          </p>
        </header>

        {/* Physical Worktable Selection Interface */}
        <div className="carry-worktable-scene">
          
          <div className="carry-worktable-bg-layer">
            <img 
              src="/images/homepage/relic-worktable.jpg" 
              alt="An antique archive worktable with a weathered map and red thread beneath six symbolic relics." 
              width="1344"
              height="768"
              loading="eager"
              fetchPriority="high"
              className="carry-worktable-bg-img"
            />
          </div>

          <div className="carry-worktable-stage" role="radiogroup" aria-label="Physical Relic Selection Worktable">
            {relics.map((obj) => {
              const isSelected = selectedId === obj.id;
              return (
                <button
                  key={obj.id}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Select ${obj.title}`}
                  className={`carry-relic-button carry-relic-${obj.id} ${isSelected ? 'is-selected' : 'is-unselected'}`}
                  onClick={(e) => handleSelect(obj.id, e)}
                  onFocus={(e) => handleSelect(obj.id, e)}
                >
                  <span className="sr-only">{obj.title}</span>
                  <img 
                    src={obj.image} 
                    alt={obj.alt}
                    width="800"
                    height="800"
                    loading="lazy"
                    className="carry-relic-img"
                  />
                </button>
              );
            })}

            {/* Selected Relic Dossier & Continuation Action Panel */}
            {selectedRelic && (
              <div className="carry-dossier-panel">
                <span className="carry-cat-tag">{selectedRelic.catNum}</span>
                <h3 className="carry-relic-title">{selectedRelic.title}</h3>
                <p className="carry-relic-desc">{selectedRelic.description}</p>
                <p className="carry-relic-consequence">"{selectedRelic.consequence}"</p>
                
                <button 
                  onClick={handleContinue} 
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {hasAnswers && selectedId === activeJourney?.carriedObject 
                    ? 'Continue the Journey' 
                    : 'Begin the Journey'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Accessible Confirmation Dialog */}
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

      </div>
    </div>
  );
}
