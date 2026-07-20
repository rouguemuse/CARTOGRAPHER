import { useParams, useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import { objects } from '../data/storyData';
import './Result.css';

export default function Result() {
  const { journeyId } = useParams();
  const { getJourney, startNewJourney } = useJourneyState();
  const navigate = useNavigate();

  const journey = getJourney(journeyId);

  // If somehow they got here without a valid completed journey, the route guard handles most of it,
  // but just in case:
  if (!journey || journey.status !== 'completed' || !journey.resultSnapshot) {
    return (
      <div className="result-page">
        <main className="container result-empty" style={{ textAlign: 'center', paddingTop: '10rem' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>This map cannot be found.</p>
          <button onClick={() => navigate('/journey')} className="btn btn-primary">Return</button>
        </main>
      </div>
    );
  }

  const snap = journey.resultSnapshot;
  const selectedObject = objects.find(o => o.id === journey.carriedObject);
  const completedDate = journey.completedAt 
    ? new Date(journey.completedAt).toLocaleDateString() 
    : new Date().toLocaleDateString();

  const handleWalkAnotherRoute = () => {
    startNewJourney();
    navigate('/journey/carry');
  };

  return (
    <div className="result-page" style={{ position: 'relative' }}>
      <main className="result-main">
        <div className="result-map-bg">
          <div className="map-texture"></div>
        </div>

        <div className="container result-content">
          <div className="result-header">
            <h1 className="handwritten" style={{ fontSize: '3rem', color: 'var(--red-bright)' }}>{snap.routeName}</h1>
            <p className="completed-date" style={{ fontFamily: 'var(--font-ui)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-bone)', opacity: 0.7, marginTop: '1rem' }}>
              Completed: {completedDate}
            </p>
          </div>

          <div className="result-grid">
            <div className="result-observations">
              <h2>Route Analysis</h2>
              
              <div className="observation-block" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--red-bright)', textTransform: 'uppercase', letterSpacing: '1px' }}>Primary Observation</h3>
                <p className="handwritten">{snap.observation}</p>
              </div>

              <div className="observation-block" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--red-bright)', textTransform: 'uppercase', letterSpacing: '1px' }}>The Central Tension</h3>
                <p className="handwritten">{snap.tension}</p>
              </div>

              <div className="observation-block" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--red-bright)', textTransform: 'uppercase', letterSpacing: '1px' }}>The Invitation</h3>
                <p className="handwritten">{snap.invitation}</p>
              </div>
              
              <div className="result-prose">
                <p>{snap.closingText}</p>
              </div>

              <div className="result-actions" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/journal')} className="btn btn-primary">View Your Journal</button>
                <button onClick={() => navigate('/endings')} className="btn" style={{ background: 'transparent', border: '1px solid var(--color-bone)', color: 'var(--color-bone)' }}>View All Endings</button>
                <button onClick={handleWalkAnotherRoute} className="btn btn-text" style={{ color: 'var(--color-bone)', opacity: 0.7 }}>Walk Another Route</button>
              </div>
            </div>

            <div className="result-visuals">
              <div className="final-object" style={{ border: '1px solid var(--surface-border)', padding: '2rem', background: 'var(--surface-card)', textAlign: 'center' }}>
                <img src={selectedObject?.image} alt={selectedObject?.name} style={{ width: '100%', height: 'auto', marginBottom: '1.5rem', border: '1px solid var(--surface-border)' }} />
                <p style={{ fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Carried Object: <strong style={{ color: 'var(--red-bright)' }}>{selectedObject?.name}</strong></p>
                <p className="handwritten" style={{ marginTop: '1rem', fontSize: '1.1rem', color: 'var(--color-bone)' }}>{snap.objectInterpretation}</p>
              </div>
              
              <div className="final-route" style={{ marginTop: '3rem' }}>
                <h3 style={{ fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1.5rem', color: 'var(--color-bone)' }}>Route Timeline</h3>
                <div className="route-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {snap.timeline.map((item, i) => (
                    <div key={i} className="timeline-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div className="timeline-marker" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--red-bright)', marginTop: '6px', flexShrink: 0 }}></div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-bone)', opacity: 0.6 }}>{item.label}</div>
                        <div className="handwritten" style={{ fontSize: '1rem' }}>{item.consequence}</div>
                      </div>
                    </div>
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
