import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import { objects, stages } from '../data/storyData';
import { journeyConfig } from '../data/journeyConfig';
import './Journal.css';

export default function Journal() {
  const { state, getActiveJourney, updateJournalEntry } = useJourneyState();
  const navigate = useNavigate();
  
  const activeJourney = getActiveJourney();
  const [viewingJourneyId, setViewingJourneyId] = useState(activeJourney?.id);

  // Synchronize on load if no active journey but past journeys exist
  useEffect(() => {
    if (!viewingJourneyId && Object.keys(state.journeys).length > 0) {
      const allJourneyIds = Object.keys(state.journeys);
      setViewingJourneyId(allJourneyIds[allJourneyIds.length - 1]); // default to most recent
    }
  }, [state.journeys, viewingJourneyId]);

  const handlePrint = () => {
    window.print();
  };

  const handleBackup = () => {
    if (!viewingJourneyId) return;
    const journeyToBackup = state.journeys[viewingJourneyId];
    if (!journeyToBackup) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(journeyToBackup, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `journal-backup-${viewingJourneyId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleReflectionChange = (stageId, text) => {
    if (!viewingJourneyId) return;
    updateJournalEntry(viewingJourneyId, stageId, text);
  };

  const hasAnyJourneys = Object.keys(state.journeys).length > 0;

  if (!hasAnyJourneys) {
    return (
      <div className="journal-page">
        <main className="container journal-empty">
          <p>The pages are blank. You have not begun the journey.</p>
          <button onClick={() => navigate('/journey/carry')} className="btn btn-primary">Begin</button>
        </main>
      </div>
    );
  }

  const viewingJourney = state.journeys[viewingJourneyId];
  if (!viewingJourney) return null;

  const selectedObject = objects.find(o => o.id === viewingJourney.carriedObject);
  
  // Reconstruct entries with static story data
  const entriesList = Object.entries(viewingJourney.answers || {}).map(([stageId, answerData]) => {
    const stageInfo = stages.find(s => s.id === stageId);
    const choiceInfo = stageInfo?.choices.find(c => c.id === answerData.answerId);
    const userNotes = viewingJourney.journalEntries[stageId]?.text || '';
    
    return {
      stageId,
      title: stageInfo?.title,
      question: stageInfo?.question,
      choiceText: choiceInfo?.text,
      consequence: choiceInfo?.consequence,
      reflection: userNotes
    };
  });

  // Sort them according to journey order
  entriesList.sort((a, b) => journeyConfig.getStageIndex(a.stageId) - journeyConfig.getStageIndex(b.stageId));

  return (
    <div className="journal-page">
      <div className="container journal-container" style={{paddingTop: '6rem', paddingBottom: '4rem'}}>
        <div className="journal-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="handwritten" style={{ fontSize: '3rem', color: 'var(--red-bright)' }}>Traveler's Field Journal</h1>
              <p className="journal-subtitle">A private record of what you carried and how you answered.</p>
            </div>
            
            {Object.keys(state.journeys).length > 1 && (
              <div className="journal-selector hide-on-print">
                <label htmlFor="journey-select" style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-bone)', opacity: 0.7, marginRight: '0.5rem' }}>Select Route:</label>
                <select 
                  id="journey-select" 
                  value={viewingJourneyId || ''} 
                  onChange={(e) => setViewingJourneyId(e.target.value)}
                  style={{ background: 'var(--surface-card)', color: 'var(--color-bone)', border: '1px solid var(--surface-border)', padding: '0.5rem' }}
                >
                  {Object.values(state.journeys).reverse().map(j => (
                    <option key={j.id} value={j.id}>
                      {j.resultSnapshot?.routeName || `Route Started ${new Date(j.startedAt).toLocaleDateString()}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="journal-content">
          
          <section className="journal-section object-record">
            <span className="section-label" style={{ color: 'var(--color-bone)', opacity: 0.6 }}>Object Carried</span>
            <div className="record-item" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={selectedObject?.image} alt={selectedObject?.name} className="record-icon" style={{ width: '80px', height: 'auto', border: '1px solid var(--surface-border)' }} />
              <div className="record-text">
                <h3 style={{ color: 'var(--red-bright)' }}>{selectedObject?.name || 'Unknown Object'}</h3>
                <p className="handwritten" style={{ fontSize: '1.1rem' }}>{selectedObject?.consequence}</p>
              </div>
            </div>
          </section>

          {entriesList.length === 0 && (
            <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--color-bone)', opacity: 0.7 }}>No stages have been recorded for this route yet.</p>
          )}

          {entriesList.map((entry) => (
            <section key={entry.stageId} className="journal-section stage-record" style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <span className="section-label" style={{ color: 'var(--color-bone)', opacity: 0.6, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>{entry.title || `Stage: ${entry.stageId}`}</span>
              
              <div className="record-qa" style={{ margin: '1.5rem 0' }}>
                <p className="record-q" style={{ fontSize: '1.2rem', marginBottom: '1rem', fontStyle: 'italic' }}>"{entry.question}"</p>
                <p className="record-a" style={{ color: 'var(--red-bright)' }}>You answered: "{entry.choiceText}"</p>
                <p className="handwritten record-c" style={{ marginTop: '1rem', fontSize: '1.1rem' }}>{entry.consequence}</p>
              </div>
              
              <div className="record-reflection" style={{ marginTop: '2rem' }}>
                <label htmlFor={`reflect-${entry.stageId}`} style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--color-bone)', opacity: 0.6 }}>Field Notes (Private)</label>
                <textarea
                  id={`reflect-${entry.stageId}`}
                  placeholder="Any weather observed here..."
                  value={entry.reflection || ''}
                  onChange={(e) => handleReflectionChange(entry.stageId, e.target.value)}
                  className="journal-textarea"
                />
                <p className="print-only-reflection">{entry.reflection || 'No field notes recorded.'}</p>
              </div>
            </section>
          ))}
          
        </div>

        <div className="journal-actions hide-on-print" style={{ marginTop: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={handlePrint} className="btn" style={{ border: '1px solid var(--color-bone)', background: 'transparent', color: 'var(--color-bone)' }}>Print Record</button>
          <button onClick={handleBackup} className="btn btn-primary">Download private backup</button>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-bone)', opacity: 0.6, maxWidth: '300px' }}>
            This will download a JSON file of your journey. Keep this safe if you wish to preserve it.
          </span>
        </div>
      </div>
    </div>
  );
}
