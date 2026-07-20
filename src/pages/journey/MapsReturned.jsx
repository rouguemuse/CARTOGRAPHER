import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';

export default function MapsReturned() {
  const { state } = useJourneyState();
  
  const journeys = state?.journeys || {};
  const completedJourneys = Object.values(journeys).filter(j => j.status === 'completed');
  const unlockedEndings = state?.unlockedEndings || {};

  const hasCompleted = completedJourneys.length > 0;

  return (
    <div className="container journey-page" style={{ padding: '3rem 0 6rem' }}>
      <header className="journey-masthead" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
        <span className="section-label">Completed Routes & Maps</span>
        <h1 className="page-title" style={{ color: 'var(--color-parchment)' }}>Maps Returned</h1>
        <p className="page-introduction" style={{ color: 'var(--color-bone)', margin: 0 }}>
          Your completed journeys, personalized map snapshots, and unlocked alternate endings gathered from the valley.
        </p>
      </header>

      {!hasCompleted ? (
        <div style={{ padding: '3.5rem 2rem', textAlign: 'center', background: 'var(--surface-panel)', border: '1px solid var(--surface-border)', borderRadius: '4px', maxWidth: '56ch', margin: '0 auto' }}>
          <span className="section-label">Unmapped Territory</span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-parchment)', marginBottom: '1rem' }}>
            No map has returned yet.
          </h2>
          <p style={{ color: 'var(--color-bone)', marginBottom: '2rem', fontSize: 'var(--text-reading)' }}>
            Complete a Journey to see where the road led.
          </p>
          <Link to="/journey/carry" className="btn btn-primary">
            Begin the Journey
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: '72ch', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <span className="section-label">Completed Journey Records ({completedJourneys.length})</span>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {completedJourneys.map((j) => (
              <div key={j.id} style={{ padding: '1.75rem', backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                <span className="section-label" style={{ color: 'var(--color-brass)' }}>Object: {j.carriedObject}</span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-parchment)', marginBottom: '0.75rem' }}>
                  {j.resultSnapshot?.endingTitle || 'Completed Route'}
                </h3>
                <p style={{ color: 'var(--color-bone)', fontSize: 'var(--text-sm)', marginBottom: '1.25rem' }}>
                  {j.resultSnapshot?.summary || 'Route completed through all five encounters.'}
                </p>
                <Link to={`/journey/result/${j.id}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  View Map Record
                </Link>
              </div>
            ))}
          </div>

          {Object.keys(unlockedEndings).length > 0 && (
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)' }}>
              <span className="section-label">Unlocked Alternate Endings</span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                {Object.keys(unlockedEndings).map((endingKey) => (
                  <div key={endingKey} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--surface-panel)', border: '1px solid var(--color-brass)', borderRadius: '4px', fontSize: 'var(--text-xs)', color: 'var(--color-parchment)' }}>
                    {endingKey.replace(/-/g, ' ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
