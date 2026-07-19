import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyState } from '../hooks/useJourneyState';
import { objects } from '../data/storyData';
import './Journal.css';

export default function Journal() {
  const { state, clearJourney, updateJournal } = useJourneyState();
  const navigate = useNavigate();
  
  const selectedObject = objects.find(o => o.id === state.objectSelected);
  const journalEntries = Object.entries(state.journalEntries || {});

  const handleClear = () => {
    if (window.confirm('Are you sure you want to erase this journey? This cannot be undone.')) {
      clearJourney();
      navigate('/');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReflectionChange = (stageId, text) => {
    const entry = state.journalEntries[stageId];
    updateJournal(stageId, { ...entry, reflection: text });
  };

  if (!state.objectSelected) {
    return (
      <div className="journal-page">
        <main className="container journal-empty">
          <p>The pages are blank. You have not begun the journey.</p>
          <button onClick={() => navigate('/stage/object')} className="btn btn-primary">Begin</button>
        </main>
      </div>
    );
  }

  return (
    <div className="journal-page">
      {/* Return Navigation */}
      <nav style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
        <div style={{fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)', fontSize: '1.1rem'}}>
          <a href="/" style={{color: 'inherit', textDecoration: 'none'}}>The Archive</a>
        </div>
        <div style={{display: 'flex', gap: '1.5rem'}}>
          <a href="/#library" style={{color: 'var(--color-charcoal)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Valley Library</a>
          <a href="/#join" style={{color: 'var(--color-charcoal)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Join List</a>
        </div>
      </nav>

      <div className="container journal-container" style={{paddingTop: '6rem'}}>
        <div className="journal-header">
          <h1>Field Journal</h1>
          <p className="journal-subtitle">A record of what you carried and how you answered.</p>
        </div>

        <div className="journal-content">
          
          <section className="journal-section object-record">
            <span className="section-label">Object Carried</span>
            <div className="record-item">
              <img src={selectedObject.image} alt={selectedObject.name} className="record-icon" />
              <div className="record-text">
                <h3>{selectedObject.name}</h3>
                <p className="handwritten">{selectedObject.consequence}</p>
              </div>
            </div>
          </section>

          {journalEntries.map(([stageId, entry]) => (
            <section key={stageId} className="journal-section stage-record">
              <span className="section-label">{entry.title}</span>
              
              <div className="record-qa">
                <p className="record-q">{entry.question}</p>
                <p className="record-a">You answered: "{entry.choiceText}"</p>
                <p className="handwritten record-c">{entry.consequence}</p>
              </div>
              
              <div className="record-reflection">
                <label htmlFor={`reflect-${stageId}`}>Notes (Optional)</label>
                <textarea
                  id={`reflect-${stageId}`}
                  placeholder="Any weather observed here..."
                  value={entry.reflection || ''}
                  onChange={(e) => handleReflectionChange(stageId, e.target.value)}
                />
              </div>
            </section>
          ))}
          
        </div>

        <div className="journal-actions hide-on-print">
          <button onClick={handlePrint} className="btn">Print / Save Record</button>
          <button onClick={handleClear} className="btn btn-text delete-btn">Burn this Journal</button>
        </div>
      </div>
    </div>
  );
}
