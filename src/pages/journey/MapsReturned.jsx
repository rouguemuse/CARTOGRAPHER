import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';
import { getRelicById } from '../../data/relics';
import './MapsReturned.css';

export default function MapsReturned() {
  const { state } = useJourneyState();
  
  const journeys = state?.journeys || {};
  const completedJourneys = Object.values(journeys).filter(j => j.status === 'completed');
  const unlockedEndings = state?.unlockedEndings || {};

  const hasCompleted = completedJourneys.length > 0;

  return (
    <div className="maps-returned-environment">
      {/* Relocated Map-in-Water Visual Background Environment */}
      <div className="maps-returned-bg-layer">
        <img 
          src="/images/artwork/archive-detail.jpg" 
          alt="A map floating and dissolving in water" 
          width="2752"
          height="1536"
          loading="eager"
          className="maps-returned-bg-img"
        />
        <div className="maps-returned-vignette"></div>
      </div>

      <div className="maps-returned-container">
        
        {/* Page Header */}
        <header className="maps-returned-header">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>
            COMPLETED ROUTES & MAPS
          </span>
          <h1 className="maps-returned-title">Maps Returned</h1>
          <p className="maps-returned-subtitle">
            "Some maps return altered by the weather."
          </p>
        </header>

        {!hasCompleted ? (
          /* Physical Returned Map Folio (Empty State) */
          <div className="maps-returned-empty-folio">
            <span className="folio-stamp">UNMAPPED TERRITORY</span>
            <h2 className="folio-title">No map has returned yet.</h2>
            <p className="folio-desc">
              Complete a Journey to see where the road led.
            </p>
            <Link to="/journey" className="btn btn-primary">
              PREVIEW THE JOURNEY &rarr;
            </Link>
          </div>
        ) : (
          /* Completed Map Entries Stack */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="maps-returned-grid">
              {completedJourneys.map((j) => {
                const relic = getRelicById(j.carriedObject);
                return (
                  <article key={j.id} className="returned-map-card">
                    <div>
                      <span className="returned-map-meta">
                        CARRIED: {relic ? relic.title : j.carriedObject}
                      </span>
                      <h3 className="returned-map-title">
                        {j.resultSnapshot?.endingTitle || 'Completed Route'}
                      </h3>
                      <p className="returned-map-summary">
                        {j.resultSnapshot?.summary || 'Route completed through all five encounters.'}
                      </p>
                    </div>

                    <Link 
                      to={`/journey/result/${j.id}`} 
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      View Map Record &rarr;
                    </Link>
                  </article>
                );
              })}
            </div>

            {Object.keys(unlockedEndings).length > 0 && (
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px dashed rgba(230, 220, 195, 0.2)' }}>
                <span className="small-label" style={{ color: 'var(--color-brass)' }}>
                  UNLOCKED ALTERNATE ENDINGS
                </span>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  {Object.keys(unlockedEndings).map((endingKey) => (
                    <div 
                      key={endingKey} 
                      style={{ 
                        padding: '0.5rem 1rem', 
                        backgroundColor: 'rgba(20, 24, 22, 0.9)', 
                        border: '1px solid var(--color-brass)', 
                        borderRadius: '3px', 
                        fontSize: '13px', 
                        color: 'var(--color-parchment)' 
                      }}
                    >
                      {endingKey.replace(/-/g, ' ')}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
