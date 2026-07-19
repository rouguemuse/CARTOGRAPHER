import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import { objects } from '../data/storyData';
import './Journal.css';

export default function Journal() {
  const { state, getActiveJourney, updateJournal } = useJourneyState();
  const navigate = useNavigate();
  
  const activeJourney = getActiveJourney();
  const activeJourneyId = activeJourney?.id;

  const handlePrint = () => {
    window.print();
  };

  const handleBackup = () => {
    if (!activeJourney) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeJourney, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `journal-backup-${activeJourneyId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleReflectionChange = (stageId, text) => {
    if (!activeJourneyId) return;
    const entries = state.journalEntries[activeJourneyId] || {};
    const entry = entries[stageId] || {};
    updateJournal(activeJourneyId, stageId, { ...entry, reflection: text });
  };

  if (!activeJourney || !activeJourney.carriedObject) {
    return (
      <div className="journal-page">
        <main className="container journal-empty">
          <p>The pages are blank. You have not begun the journey.</p>
          <button onClick={() => navigate('/journey/carry')} className="btn btn-primary">Begin</button>
        </main>
      </div>
    );
  }

  const selectedObject = objects.find(o => o.id === activeJourney.carriedObject);
  const journalEntries = Object.entries(state.journalEntries[activeJourneyId] || {});

  return (
    <div className="journal-page">
      <div className="container journal-container" style={{paddingTop: '6rem', paddingBottom: '4rem'}}>
        <div className="journal-header">
          <h1 className="handwritten" style={{ fontSize: '3rem', color: 'var(--red-bright)' }}>Traveler's Field Journal</h1>
          <p className="journal-subtitle">A private record of what you carried and how you answered.</p>
        </div>

        <div className="journal-content">
          
          <section className="journal-section object-record">
            <span className="section-label" style={{ color: 'var(--color-bone)', opacity: 0.6 }}>Object Carried</span>
            <div className="record-item" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={selectedObject?.image} alt={selectedObject?.name} className="record-icon" style={{ width: '80px', height: 'auto', border: '1px solid var(--surface-border)' }} />
              <div className="record-text">
                <h3 style={{ color: 'var(--red-bright)' }}>{selectedObject?.name}</h3>
                <p className="handwritten" style={{ fontSize: '1.1rem' }}>{selectedObject?.consequence}</p>
              </div>
            </div>
          </section>

          {journalEntries.map(([stageId, entry]) => (
            <section key={stageId} className="journal-section stage-record" style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <span className="section-label" style={{ color: 'var(--color-bone)', opacity: 0.6, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>{entry.title || `Stage: ${stageId}`}</span>
              
              <div className="record-qa" style={{ margin: '1.5rem 0' }}>
                <p className="record-q" style={{ fontSize: '1.2rem', marginBottom: '1rem', fontStyle: 'italic' }}>"{entry.question}"</p>
                <p className="record-a" style={{ color: 'var(--red-bright)' }}>You answered: "{entry.choiceText}"</p>
                <p className="handwritten record-c" style={{ marginTop: '1rem', fontSize: '1.1rem' }}>{entry.consequence}</p>
              </div>
              
              <div className="record-reflection" style={{ marginTop: '2rem' }}>
                <label htmlFor={`reflect-${stageId}`} style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--color-bone)', opacity: 0.6 }}>Field Notes (Private)</label>
                <textarea
                  id={`reflect-${stageId}`}
                  placeholder="Any weather observed here..."
                  value={entry.reflection || ''}
                  onChange={(e) => handleReflectionChange(stageId, e.target.value)}
                  style={{ width: '100%', minHeight: '100px', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-bone)', fontFamily: 'var(--font-body)' }}
                />
              </div>
            </section>
          ))}
          
        </div>

        <div className="journal-actions hide-on-print" style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          <button onClick={handlePrint} className="btn" style={{ border: '1px solid var(--color-bone)', background: 'transparent', color: 'var(--color-bone)' }}>Print Record</button>
          <button onClick={handleBackup} className="btn btn-primary">Backup (JSON)</button>
        </div>
      </div>
    </div>
  );
}
