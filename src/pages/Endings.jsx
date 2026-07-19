import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import './Endings.css';

export default function Endings() {
  const { state } = useJourneyState();
  const navigate = useNavigate();
  const unlocked = state.unlockedEndings || [];

  return (
    <div className="endings-page container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="handwritten" style={{ fontSize: '3rem', color: 'var(--red-bright)' }}>The Gallery of Routes</h1>
        <p style={{ color: 'var(--color-bone)', opacity: 0.7, maxWidth: '600px', margin: '1rem auto' }}>
          Every path leaves a mark. These are the routes you have traveled, the tensions you have held, and the invitations you have received.
        </p>
      </header>

      {unlocked.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
          <p style={{ color: 'var(--color-bone)', fontSize: '1.2rem', marginBottom: '2rem' }}>You have not mapped any routes yet.</p>
          <button onClick={() => navigate('/journey/carry')} className="btn btn-primary">Begin the Journey</button>
        </div>
      ) : (
        <div className="endings-grid">
          {unlocked.map(endingId => {
            // Find the journey that generated this ending
            const journey = Object.values(state.journeys).find(j => j.resultSnapshot?.routeName.toLowerCase().replace(/\s+/g, '-') === endingId);
            const snap = journey?.resultSnapshot;
            
            if (!snap) return null;

            return (
              <div key={endingId} className="ending-card" style={{ padding: '2rem', border: '1px solid var(--surface-border)', background: 'var(--surface-card)', position: 'relative' }}>
                <h3 className="handwritten" style={{ color: 'var(--red-bright)', fontSize: '1.8rem', marginBottom: '1rem' }}>{snap.routeName}</h3>
                <p style={{ color: 'var(--color-bone)', fontSize: '0.9rem', marginBottom: '2rem' }}>{snap.observation}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, marginBottom: '0.5rem' }}>The Tension</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>{snap.tension}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
