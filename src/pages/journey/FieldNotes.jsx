import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';
import { journeyConfig } from '../../data/journeyConfig';
import { objects } from '../../data/storyData';

export default function FieldNotes() {
  const { getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();

  const currentObject = objects.find(o => o.id === activeJourney?.carriedObject);
  const answers = activeJourney?.answers || {};
  const hasNotes = activeJourney && Object.keys(answers).length > 0;

  return (
    <div className="container journey-page" style={{ padding: '3rem 0 6rem' }}>
      <header className="journey-masthead" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
        <span className="section-label">Personal Observations</span>
        <h1 className="page-title" style={{ color: 'var(--color-parchment)' }}>Field Notes</h1>
        <p className="page-introduction" style={{ color: 'var(--color-bone)', margin: 0 }}>
          Your recorded encounters, responses to unfamiliar weather, and personal choices made inside the valley.
        </p>
      </header>

      {!hasNotes ? (
        <div style={{ padding: '3.5rem 2rem', textAlign: 'center', background: 'var(--surface-panel)', border: '1px solid var(--surface-border)', borderRadius: '4px', maxWidth: '56ch', margin: '0 auto' }}>
          <span className="section-label">Quiet Desk</span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-parchment)', marginBottom: '1rem' }}>
            No observations have been recorded yet.
          </h2>
          <p style={{ color: 'var(--color-bone)', marginBottom: '2rem', fontSize: 'var(--text-reading)' }}>
            Begin the Journey, and the marks you leave will gather here.
          </p>
          <Link to="/journey/carry" className="btn btn-primary">
            Begin the Journey
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: '68ch', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {currentObject && (
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-panel)', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
              <span className="section-label">Carried Object</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-parchment)', marginBottom: '0.5rem' }}>{currentObject.name}</h3>
              <p style={{ color: 'var(--color-bone)', margin: 0, fontStyle: 'italic' }}>{currentObject.description}</p>
            </div>
          )}

          {Object.entries(answers).map(([stageId, answerData]) => (
            <article key={stageId} style={{ padding: '1.75rem', backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
              <span className="section-label" style={{ textTransform: 'capitalize' }}>Encounter: {stageId}</span>
              <p style={{ color: 'var(--color-parchment)', fontSize: 'var(--text-reading)', margin: '0 0 1rem 0' }}>
                "{answerData.choiceText || answerData.text || 'Choice recorded'}"
              </p>
              {answerData.consequence && (
                <div style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--color-brass)', fontStyle: 'italic', color: 'var(--color-bone)', fontSize: 'var(--text-sm)' }}>
                  {answerData.consequence}
                </div>
              )}
            </article>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to={`/journey/stage/${activeJourney.currentStage || journeyConfig.firstStageId}`} className="btn btn-primary">
              Continue Journey
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
