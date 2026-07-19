import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import { objects } from '../data/storyData';
import './Result.css';

export default function Result() {
  const { state, setCompleted } = useJourneyState();
  const navigate = useNavigate();

  useEffect(() => {
    setCompleted();
  }, [setCompleted]);

  if (!state.objectSelected) {
    return (
      <div className="result-page">
        <main className="container result-empty" style={{ textAlign: 'center', paddingTop: '10rem' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You cannot reach the end without walking the path.</p>
          <button onClick={() => navigate('/stage/object')} className="btn btn-primary">Begin</button>
        </main>
      </div>
    );
  }

  const selectedObject = objects.find(o => o.id === state.objectSelected);
  
  // Generate observations based on choices
  const choices = state.choices || {};
  const observations = [];
  
  if (choices['valley']?.choiceId === 'c4' || choices['valley']?.choiceId === 'c3') {
    observations.push("You learned that not every observer deserves an explanation.");
  } else {
    observations.push("You are still attempting to translate yourself into a language the weather will understand.");
  }

  if (state.objectSelected === 'red_coat' || state.objectSelected === 'red_envelope') {
    observations.push("You chose to carry the heavy assumption that you must survive the storm or provide the perfect words.");
  } else if (state.objectSelected === 'red_string' || state.objectSelected === 'red_crane') {
    observations.push("You chose connection and fragility, preparing for a softness the territory did not offer.");
  }

  if (choices['carnival']?.choiceId === 'c4' || choices['carnival']?.choiceId === 'c3') {
    observations.push("In the end, you walked away from the need to be understood. You are free.");
  } else {
    observations.push("The need to explain yourself remains a temptation you are still negotiating with.");
  }

  return (
    <div className="result-page" style={{ position: 'relative' }}>
      <main className="result-main">
        <div className="result-map-bg">
          <div className="map-texture"></div>
        </div>

        <div className="container result-content">
          <div className="result-header">
            <h1>The End of the Map</h1>
            <p className="disclaimer">
              This is not a diagnosis, a verdict, or a finished map. It is simply the route your attention took when the path asked something of you.
            </p>
          </div>

          <div className="result-grid">
            <div className="result-observations">
              <h2>Observations</h2>
              <ul className="observation-list">
                {observations.map((obs, idx) => (
                  <li key={idx} className="handwritten">{obs}</li>
                ))}
              </ul>
              
              <div className="result-prose">
                <p>
                  The territory changes the moment you name it. The wolves will always be waiting at the edge of the clearing, hoping you will surrender your complexity for their comfort. The map you have drawn today is yours, but tomorrow the weather will change again.
                </p>
                <p className="final-question" style={{ color: 'var(--red-bright)' }}>
                  What will you do when the road asks for your name?
                </p>
              </div>

              <div className="result-actions" style={{ marginTop: '3rem' }}>
                <button onClick={() => navigate('/journal')} className="btn btn-primary" style={{ marginRight: '1rem' }}>View Your Journal</button>
                <button onClick={() => navigate('/stage/object')} className="btn" style={{ background: 'transparent', border: '1px solid var(--color-bone)', color: 'var(--color-bone)' }}>Walk Another Route</button>
              </div>
            </div>

            <div className="result-visuals">
              <div className="final-object" style={{ border: '1px solid var(--surface-border)', padding: '1rem', background: 'var(--surface-card)', textAlign: 'center' }}>
                <img src={selectedObject?.image} alt={selectedObject?.name} style={{ width: '100%', height: 'auto', marginBottom: '1rem', border: '1px solid var(--surface-border)' }} />
                <p style={{ fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>You carried: <strong style={{ color: 'var(--red-bright)' }}>{selectedObject?.name}</strong></p>
              </div>
              
              <div className="final-route" style={{ marginTop: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--color-bone)' }}>Your Traveled Route</h3>
                <div className="route-line-final" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  {[1,2,3,4,5,6].map(i => (
                    <span key={i} className="dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red-bright)', opacity: i * 0.15 }}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
