import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import './JourneyController.css';

// Feature Flag: Set to true when public journey stages are ready for general access
const PUBLIC_JOURNEY_OPEN = false;

export default function JourneyController() {
  const navigate = useNavigate();
  const { getActiveJourney, startNewJourney } = useJourneyState();
  const dialogRef = useRef(null);

  const activeJourney = getActiveJourney();

  useEffect(() => {
    if (PUBLIC_JOURNEY_OPEN) {
      if (!activeJourney || activeJourney.status === 'completed') {
        navigate('/journey/carry', { replace: true });
      }
    }
  }, [activeJourney, navigate]);

  // If public journey is closed, render atmospheric holding page
  if (!PUBLIC_JOURNEY_OPEN) {
    return (
      <div className="journey-holding-environment">
        {/* Full-Page Atmospheric Background */}
        <div className="journey-holding-bg-layer">
          <img 
            src="/images/journey-under-construction.png" 
            alt="Valley and Carnival atmosphere at dawn" 
            width="1344"
            height="768"
            loading="eager"
            className="journey-holding-bg-img"
          />
          <div className="journey-holding-fog-overlay"></div>
        </div>

        {/* Integrated Centered Holding Panel */}
        <div className="journey-holding-container">
          <div className="journey-holding-panel">
            <span className="holding-eyebrow">THIS ROAD IS NOT OPEN YET</span>
            <h1 className="holding-main-title">THE ROAD IS STILL BEING DRAWN</h1>
            
            <p className="holding-body-text">
              The interactive Journey is being built one territory at a time.
            </p>
            <p className="holding-body-subtext">
              Until the road opens, you can enter the Archive or receive a dispatch.
            </p>

            <div className="holding-actions-group">
              <Link to="/archive" className="btn btn-primary btn-large">
                ENTER THE ARCHIVE
              </Link>
              <a 
                href="https://otherpeoplesweather.substack.com/subscribe?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-dark btn-large"
              >
                STAY NEAR THE ROAD &rarr;
              </a>
            </div>

            <p className="holding-final-note">
              "The Valley can be seen from here. It cannot be entered yet."
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- PRESERVED DEVELOPMENT JOURNEY CONTROLLER (WHEN PUBLIC_JOURNEY_OPEN IS TRUE) ---
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
