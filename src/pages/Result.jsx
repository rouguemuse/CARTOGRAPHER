import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import { objects } from '../data/storyData';
import './Result.css';

function generateSnapshot(journey) {
  const choices = journey.selectedChoices || {};
  const carried = objects.find(o => o.id === journey.carriedObject) || { name: 'Unknown', consequence: 'Nothing carried.' };

  let observation = "This route wandered through uncertain territory.";
  let routeName = "The Unnamed Route";
  let tension = "The tension between staying and leaving.";
  let invitation = "An invitation to rest.";
  let closingText = "The map expands, but the territory remains untamed.";

  if (choices['valley']?.choiceId === 'c4' || choices['valley']?.choiceId === 'c3') {
    observation = "This route repeatedly returned to the realization that not every observer deserves an explanation.";
    routeName = "The Route of Quiet Boundaries";
    tension = "The tension between the desire to be known and the safety of remaining illegible.";
    invitation = "An invitation to let misunderstandings exist without rushing to correct them.";
  } else if (choices['carnival']?.choiceId === 'c4') {
    observation = "This route revealed a deep exhaustion with the performance of self-justification.";
    routeName = "The Route of the Dropped Mask";
    tension = "The tension of disappointing others to save yourself.";
    invitation = "An invitation to exist without an audience.";
  } else {
    observation = "This route was marked by a persistent attempt to translate the self into a language the weather will understand.";
    routeName = "The Route of Endless Translation";
    tension = "The tension of hoping the right words will finally bridge the gap.";
    invitation = "An invitation to ask whether the gap is yours to close.";
  }

  // Timeline generation based on choices
  const timeline = Object.entries(choices).map(([stageId, data]) => ({
    stageId,
    label: `Passed through the ${stageId}`,
    consequence: data.consequence
  }));

  return {
    routeName,
    observation,
    tension,
    invitation,
    closingText,
    objectInterpretation: carried.consequence,
    timeline
  };
}

export default function Result() {
  const { state, getActiveJourney, setCompleted } = useJourneyState();
  const navigate = useNavigate();
  const [snapshotToRender, setSnapshotToRender] = useState(null);

  useEffect(() => {
    const activeJourney = getActiveJourney();
    if (activeJourney && !activeJourney.completedAt) {
      // It's not completed yet, generate a snapshot and complete it
      const snapshot = generateSnapshot(activeJourney);
      
      // We need a stable endingId based on the routeName
      const endingId = snapshot.routeName.toLowerCase().replace(/\s+/g, '-');
      setCompleted(snapshot, endingId);
      setSnapshotToRender(snapshot);
    } else if (activeJourney && activeJourney.completedAt && activeJourney.resultSnapshot) {
      // Already completed, just display it
      setSnapshotToRender(activeJourney.resultSnapshot);
    }
  }, [getActiveJourney, setCompleted]);

  const activeJourney = getActiveJourney();

  if (!activeJourney || !activeJourney.carriedObject) {
    return (
      <div className="result-page">
        <main className="container result-empty" style={{ textAlign: 'center', paddingTop: '10rem' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>No route has been recorded on this device yet.</p>
          <button onClick={() => navigate('/journey/carry')} className="btn btn-primary">Begin</button>
        </main>
      </div>
    );
  }

  const selectedObject = objects.find(o => o.id === activeJourney.carriedObject);
  const snap = snapshotToRender || activeJourney.resultSnapshot;

  if (!snap) return null; // Loading state

  const completedDate = activeJourney.completedAt 
    ? new Date(activeJourney.completedAt).toLocaleDateString() 
    : new Date().toLocaleDateString();

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
                <button onClick={() => navigate('/journey/carry')} className="btn btn-text" style={{ color: 'var(--color-bone)', opacity: 0.7 }}>Walk Another Route</button>
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
