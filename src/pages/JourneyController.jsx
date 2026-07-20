import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import './JourneyController.css';

export default function JourneyController() {
  const navigate = useNavigate();
  const { getActiveJourney, startNewJourney } = useJourneyState();
  const dialogRef = useRef(null);

  const activeJourney = getActiveJourney();

  useEffect(() => {
    // If no active journey or it's completed, go straight to carry
    if (!activeJourney || activeJourney.status === 'completed') {
      navigate('/journey/carry', { replace: true });
    }
  }, [activeJourney, navigate]);

  if (!activeJourney || activeJourney.status === 'completed') return null;

  const handleResume = () => {
    const nextStage = activeJourney.currentStage || 'valley';
    navigate(`/journey/stage/${nextStage}`);
  };

  const handleBeginAgain = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const confirmBeginAgain = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    startNewJourney();
    navigate('/journey/carry');
  };

  const handleCancel = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="journey-controller-page">
      <div className="container controller-container">
        <div className="field-note-panel text-center controller-panel">
          <div className="controller-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2 L14 12 L12 22 L10 12 Z"/>
            </svg>
          </div>
          <h1 className="handwritten controller-title" style={{ fontSize: '2.5rem', color: 'var(--red-bright)', marginBottom: '1rem' }}>Journey in Progress</h1>
          <p className="controller-subtitle">You have an unfinished map.</p>
          
          <div className="controller-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={handleResume}
            >
              Resume the Road
            </button>
            <button 
              className="btn btn-large"
              style={{ background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--color-bone)' }}
              onClick={handleBeginAgain}
            >
              Begin Again
            </button>
          </div>
        </div>
      </div>

      <dialog 
        ref={dialogRef} 
        className="confirmation-dialog" 
        aria-labelledby="controller-dialog-title" 
        aria-describedby="controller-dialog-desc"
        onCancel={handleCancel}
      >
        <div className="dialog-content">
          <h3 id="controller-dialog-title">Abandon current route?</h3>
          <p id="controller-dialog-desc">
            Are you sure you want to abandon your current progress? This cannot be undone.
          </p>
          <div className="dialog-actions">
            <button onClick={confirmBeginAgain} className="btn btn-primary">
              Yes, start over
            </button>
            <button onClick={handleCancel} className="btn btn-text">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
