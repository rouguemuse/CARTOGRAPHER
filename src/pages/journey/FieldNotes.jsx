import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';
import { journeyConfig } from '../../data/journeyConfig';
import { objects } from '../../data/storyData';
import './FieldNotes.css';

export default function FieldNotes() {
  const { getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();

  const currentObject = objects.find(o => o.id === activeJourney?.carriedObject);
  const answers = activeJourney?.answers || {};
  const hasNotes = activeJourney && Object.keys(answers).length > 0;

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

  const getStageName = (stageId) => {
    switch(stageId) {
      case 'valley': return 'Encounter I: The Valley of Please Understand Me';
      case 'forest': return 'Encounter II: The Forest of Other People\'s Weather';
      case 'bridge': return 'Encounter III: The Bridge & House of Almost Safe';
      case 'wolves': return 'Encounter IV: The Interrogation of Curiosity';
      case 'exit': return 'Encounter V: The Exit & Unmapped Territory';
      default: return `Encounter: ${stageId}`;
    }
  };

  const getSymbolMark = (stageId) => {
    switch(stageId) {
      case 'valley': return '🕮';
      case 'forest': return '🌧';
      case 'bridge': return '🌉';
      case 'wolves': return '🐺';
      case 'exit': return '🧭';
      default: return '🖋';
    }
  };

  return (
    <div className="field-notes-environment">
      <div className="field-notes-journal-container">
        
        {/* Compact Physical Journal Header */}
        <header className="journal-header">
          <div>
            <span className="journal-eyebrow">PILGRIM'S FIELD JOURNAL</span>
            <h1 className="journal-title">Field Notes</h1>
          </div>
          <div className="journal-stamp">
            DATE: {new Date().toLocaleDateString()}
          </div>
        </header>

        {!hasNotes ? (
          <div className="quiet-desk-state">
            <span className="journal-eyebrow">QUIET DESK</span>
            <h2 className="quiet-desk-title">No observations recorded yet.</h2>
            <p className="quiet-desk-desc">
              Begin the Journey, and the choices you make will be recorded in this notebook.
            </p>
            <Link to="/journey/carry" className="btn btn-primary">
              Step onto the road &rarr;
            </Link>
          </div>
        ) : (
          <div>
            {/* CARRIED RELIC ARCHIVAL PANEL */}
            {currentObject && (
              <div className="carried-relic-journal-card">
                <div className="carried-relic-img-wrap">
                  <picture>
                    <source srcSet={currentObject.image.replace('.png', '.avif')} type="image/avif" />
                    <source srcSet={currentObject.image.replace('.png', '.webp')} type="image/webp" />
                    <img 
                      src={currentObject.image} 
                      alt={currentObject.name} 
                      width="800"
                      height="800"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <div>
                  <span className="relic-journal-meta">CARRIED RELIC • {getCatNum(currentObject.id)}</span>
                  <h3 className="relic-journal-name">{currentObject.name}</h3>
                  <p className="relic-journal-desc">"{currentObject.description}"</p>
                </div>
              </div>
            )}

            {/* CHRONOLOGICAL ENCOUNTER ENTRIES */}
            <div className="journal-entries-stack">
              {Object.entries(answers).map(([stageId, answerData]) => (
                <article key={stageId} className="journal-entry-card">
                  <div className="journal-entry-header">
                    <span className="journal-encounter-tag">{getStageName(stageId)}</span>
                    <span className="journal-symbol-mark" aria-hidden="true">{getSymbolMark(stageId)}</span>
                  </div>
                  
                  <p className="journal-choice-text">
                    "{answerData.choiceText || answerData.text || 'Selected response recorded on the road.'}"
                  </p>

                  {answerData.consequence && (
                    <div className="journal-consequence-box">
                      <strong>Observation:</strong> {answerData.consequence}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link 
                to={`/journey/stage/${activeJourney.currentStage || journeyConfig.firstStageId}`} 
                className="btn btn-primary"
              >
                Continue Journey &rarr;
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
