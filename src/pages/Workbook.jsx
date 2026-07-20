import React from 'react';
import { Link } from 'react-router-dom';

export default function Workbook() {
  const exercises = [
    {
      number: '01',
      title: 'Recognizing What You Carry',
      prompt: 'List three objects or expectations you carried into this month. Which of them were given to you by someone else without your consent?'
    },
    {
      number: '02',
      title: 'Mapping Other People’s Weather',
      prompt: 'Identify a recent conversation where you felt compelled to explain yourself. Did your explanation alter the weather in the room, or only exhaust you?'
    },
    {
      number: '03',
      title: 'The Unsent Letter',
      prompt: 'Write the sentence you needed to say. Now ask: does it need to be delivered to be true?'
    },
    {
      number: '04',
      title: 'Setting Down the Object',
      prompt: 'What is one explanation you are ready to stop giving?'
    }
  ];

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 5rem' }}>
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>The Pilgrim Workbook</span>
      </nav>

      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Companion Resource</span>
        <h1 className="page-title">The Pilgrim Workbook</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          Guided exercises and reflective prompts for recognizing what you carry, distinguishing your weather from others, and learning what may be set down.
        </p>
      </header>

      <div style={{ width: 'min(100%, 68ch)', marginInline: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3.5rem' }}>
          {exercises.map((item) => (
            <div key={item.number} className="archive-card" style={{ padding: '2rem' }}>
              <span className="archive-catalog-label">Exercise {item.number}</span>
              <h3 className="card-title" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ fontSize: 'var(--text-reading)', fontStyle: 'italic', color: 'var(--ink)', margin: 0 }}>
                "{item.prompt}"
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'var(--card)', border: '1px dashed var(--paper-line)', borderRadius: '4px', textAlign: 'center' }}>
          <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Take these prompts into your Journal</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
            Your journey notes and reflections are saved privately on your device.
          </p>
          <Link to="/journal" className="btn btn-primary">
            Open Your Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
