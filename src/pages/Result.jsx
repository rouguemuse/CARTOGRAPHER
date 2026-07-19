import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
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
        <main className="container result-empty">
          <p>You cannot reach the end without walking the path.</p>
          <button onClick={() => navigate('/stage/object')} className="btn btn-primary">Begin</button>
        </main>
      </div>
    );
  }

  const selectedObject = objects.find(o => o.id === state.objectSelected);
  
  // Generate observations based on choices (simple logic for now)
  const choices = Object.values(state.choices);
  const observations = [];
  
  if (choices.some(c => c.choiceId === 'c4' && c.consequence.includes('stop translating'))) {
    observations.push("You have learned that not every observer deserves an explanation.");
  } else {
    observations.push("You are still attempting to translate yourself into a language the weather will understand.");
  }

  if (state.objectSelected === 'red_coat' || state.objectSelected === 'stone') {
    observations.push("You chose to carry weight because you trust gravity more than you trust the wind.");
  } else if (state.objectSelected === 'lantern' || state.objectSelected === 'compass') {
    observations.push("You sought direction over comfort, preparing for a path that may not exist.");
  } else {
    observations.push("You brought an artifact of preparation, though the territory requires instinct.");
  }

  if (choices.some(c => c.choiceId === 'c3' && c.consequence.includes('quiet night'))) {
    observations.push("In the end, you walked away from the spectacle.");
  } else {
    observations.push("The carnival remains a temptation you are still negotiating with.");
  }

  return (
    <div className="result-page">
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
                <p className="final-question">
                  What will you do when the road asks for your name?
                </p>
              </div>

              <div className="result-actions">
                <button onClick={() => navigate('/journal')} className="btn btn-primary">View Your Journal</button>
                <button onClick={() => navigate('/stage/object')} className="btn">Walk Another Route</button>
              </div>
            </div>

            <div className="result-visuals">
              <div className="final-object">
                <img src={selectedObject.image} alt={selectedObject.name} />
                <p>You carried: {selectedObject.name}</p>
              </div>
              
              <div className="final-route">
                <h3>Your Traveled Route</h3>
                <div className="route-line-final">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="result-signup container">
          <SignupForm />
        </section>
      </main>
    </div>
  );
}
