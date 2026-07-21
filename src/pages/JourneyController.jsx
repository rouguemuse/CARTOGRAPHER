import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import './JourneyController.css';

// Feature Flag: Set to true when public journey stages are ready
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
      <div className="journey-holding-page">
        {/* Approved Blueprint Visual Background */}
        <div className="journey-holding-bg-layer">
          <img 
            src="/images/journey-under-construction.png" 
            alt="Valley and Carnival territory map under construction" 
            width="1344"
            height="768"
            loading="eager"
            className="journey-holding-bg-img"
          />
          <div className="journey-holding-vignette"></div>
        </div>

        <div className="journey-holding-content">
          
          {/* Two-Column Territory Blueprint Cards */}
          <div className="holding-territories-grid">
            
            {/* LEFT: THE VALLEY */}
            <div className="holding-territory-card">
              <span className="holding-card-tag">LOCATION III — THE VALLEY</span>
              <h2 className="holding-card-title">The Valley of Please Understand Me</h2>
              <p className="holding-card-body">
                A beautiful place that promises clarity, belonging, and safety—if you can explain well enough.
              </p>
              <p className="holding-card-sub">
                Some roads look like rescue. They can still lead you in circles.
              </p>
            </div>

            {/* RIGHT: THE CARNIVAL */}
            <div className="holding-territory-card">
              <span className="holding-card-tag">LOCATION — UNMARKED</span>
              <h2 className="holding-card-title">The Carnival</h2>
              <p className="holding-card-body">
                The Carnival is not marked on every map.
              </p>
              <p className="holding-card-sub">
                Some roads only appear after dark.
              </p>
            </div>

          </div>

          {/* BOTTOM: UNDER-CONSTRUCTION PANEL */}
          <div className="holding-construction-panel">
            <span className="construction-tag">THIS ROAD IS NOT OPEN YET.</span>
            <h1 className="construction-title">The Journey is Under Construction</h1>
            <p className="construction-body">
              The interactive Journey is being built one territory at a time. The Valley, the Forest, the Bridge, and the Carnival are not ready to receive travelers yet.
            </p>

            <div className="construction-actions">
              <Link to="/archive" className="btn btn-primary btn-large">
                ENTER THE ARCHIVE
              </Link>
              <a 
                href="https://otherpeoplesweather.substack.com/subscribe?utm_source=wolves_website&utm_medium=referral&utm_campaign=dispatches"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-dark btn-large"
              >
                RECEIVE A DISPATCH &rarr;
              </a>
            </div>

            <p className="construction-final-line">
              "No map should pretend to be finished before it knows where it leads."
            </p>
          </div>

        </div>
      </div>
    );
  }

  // --- EXISTING JOURNEY LOGIC (WHEN PUBLIC_JOURNEY_OPEN IS TRUE) ---
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
