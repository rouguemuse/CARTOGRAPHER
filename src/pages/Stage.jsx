import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stages, objects } from '../data/storyData';
import { useJourneyState } from '../hooks/useJourneyState';
import { journeyConfig } from '../data/journeyConfig';
import './Stage.css';

export default function Stage() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const { getActiveJourney, commitStageAnswer, updateJournalEntry, completeJourney } = useJourneyState();
  const titleRef = useRef(null);
  const dialogRef = useRef(null);
  
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const activeJourney = getActiveJourney();
  const stage = stages.find(s => s.id === stageId);
  const stageIndex = journeyConfig.getStageIndex(stageId);
  const nextStageId = journeyConfig.getNextStageId(stageId);
  const selectedObject = objects.find(o => o.id === (activeJourney?.carriedObject));

  useEffect(() => {
    // Reset local state on route change
    setSelectedChoiceId(null);
    setShowConsequence(false);
    setIsSubmitting(false);

    // Focus management for accessibility
    if (titleRef.current) {
      titleRef.current.focus();
    }

    if (activeJourney) {
      const existingChoice = activeJourney.answers[stageId];
      if (existingChoice) {
        setSelectedChoiceId(existingChoice.answerId);
        setShowConsequence(true);
      }
    }
  }, [stageId, activeJourney?.id]);

  if (!stage) return <div style={{ padding: '4rem', textAlign: 'center', color: 'white' }}>Stage not found</div>;

  const handleChoiceChange = (e) => {
    setSelectedChoiceId(e.target.value);
    setShowConsequence(true);
  };

  const handleReconsider = () => {
    setSelectedChoiceId(null);
    setShowConsequence(false);
  };

  const confirmContinue = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    commitStageAnswer(activeJourney.id, stage.id, selectedChoiceId);
    
    const choice = stage.choices.find(c => c.id === selectedChoiceId);
    
    // We do not overwrite journal if it's the exact same choice and already exists, 
    // but the engine invalidation logic wipes it if it's a structural reset. 
    // Wait, updateJournalEntry does not wipe, it just merges text.
    // If it's a new answer, we might want to reset text. The engine doesn't wipe text of THIS stage, but if answerId changed, it might be good.
    // Let's just let the engine keep it unless the user edits.

    if (nextStageId) {
      navigate(`/journey/stage/${nextStageId}`);
    } else {
      completeJourney(activeJourney.id);
      navigate(`/journey/result/${activeJourney.id}`);
    }
  };

  const handleContinueClick = () => {
    // Check if we are changing an already committed answer
    const existingAnswer = activeJourney.answers[stageId]?.answerId;
    if (existingAnswer && existingAnswer !== selectedChoiceId) {
      // It's a change to a committed answer. Open confirmation if there is later progress.
      // Are there later answers?
      const laterStages = journeyConfig.stages.slice(stageIndex + 1);
      const hasLaterAnswers = laterStages.some(id => activeJourney.answers[id]);
      
      if (hasLaterAnswers) {
        dialogRef.current?.showModal();
        return;
      }
    }
    confirmContinue();
  };

  const handleCancelDialog = () => {
    dialogRef.current?.close();
    // Revert local selection
    const existingAnswer = activeJourney.answers[stageId]?.answerId;
    if (existingAnswer) {
      setSelectedChoiceId(existingAnswer);
      setShowConsequence(true);
    }
  };

  const handleConfirmDialog = () => {
    dialogRef.current?.close();
    confirmContinue();
  };

  return (
    <div className="stage-page">
      <div className="stage-bg">
        <div className="stage-overlay"></div>
      </div>

      <main className="stage-main container">
        {/* Accessible progress indicator */}
        <div className="sr-only" aria-live="polite">
          Stage {stageIndex + 1} of {stages.length}: {stage.title}
        </div>

        <div className="narrative-card glass-panel-stage">
          <div className="card-left-rail">
            <div className="rail-marker">
              <span className="coordinate" aria-hidden="true">N° {stageIndex + 1}</span>
              <div className="rail-line"></div>
              {selectedObject && (
                <img src={selectedObject.image} alt={selectedObject.name} className="rail-icon" title={`Carrying: ${selectedObject.name}`} />
              )}
            </div>
          </div>
          
          <div className="card-main-content">
            <span className="stage-label">Location</span>
            <h1 
              className="stage-title" 
              ref={titleRef} 
              tabIndex={-1} 
              style={{ outline: 'none' }}
            >
              {stage.title}
            </h1>
            
            <div className="prose-body">
              {stage.narrative.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            
            <div className="interactive-zone">
              {/* Using a fieldset for accessible radio group */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend className="stage-question">{stage.question}</legend>
                
                <div className="choices-list" role="radiogroup">
                  {stage.choices.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    return (
                      <label 
                        key={choice.id}
                        className={`choice-label ${isSelected ? 'selected' : ''} ${showConsequence && !isSelected ? 'disabled' : ''}`}
                      >
                        <input 
                          type="radio" 
                          name={`stage-${stage.id}`} 
                          value={choice.id}
                          checked={isSelected}
                          onChange={handleChoiceChange}
                          disabled={showConsequence && !isSelected}
                          className="sr-only" 
                        />
                        <span className="choice-text">{choice.text}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {showConsequence && (
                <div className="consequence-reveal reveal-anim" role="region" aria-live="polite">
                  <div className="consequence-text handwritten">
                    {stage.choices.find(c => c.id === selectedChoiceId)?.consequence}
                  </div>
                  <div className="consequence-actions">
                    <button onClick={handleReconsider} className="btn btn-text" disabled={isSubmitting}>
                      Reconsider
                    </button>
                    <button onClick={handleContinueClick} className="btn btn-primary" disabled={!selectedChoiceId || isSubmitting}>
                      {nextStageId ? 'Continue Journey' : 'End the Map'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="field-note-footer">
          <progress value={stageIndex + 1} max={stages.length} aria-label="Journey progress" style={{ width: '100%', height: '4px', appearance: 'none', border: 'none', background: 'rgba(255,255,255,0.1)', marginBottom: '1rem' }} />
          <p>
            Field Note — A companion to the forthcoming book <em>How to Explain Yourself to Wolves</em> by Jayme Volstad.
          </p>
        </div>

        <dialog 
          ref={dialogRef} 
          className="confirmation-dialog" 
          aria-labelledby="stage-dialog-title" 
          aria-describedby="stage-dialog-desc"
          onCancel={handleCancelDialog}
        >
          <div className="dialog-content">
            <h3 id="stage-dialog-title">Change your answer?</h3>
            <p id="stage-dialog-desc">
              Changing this answer will remove your answers and field notes from all subsequent stages on this route. You will need to walk them again.
            </p>
            <div className="dialog-actions">
              <button onClick={handleConfirmDialog} className="btn btn-primary">
                Change answer and discard later progress
              </button>
              <button onClick={handleCancelDialog} className="btn btn-text">
                Keep original answer
              </button>
            </div>
          </div>
        </dialog>
      </main>
    </div>
  );
}
