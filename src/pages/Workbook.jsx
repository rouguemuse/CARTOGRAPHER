import React from 'react';
import { Link } from 'react-router-dom';

export default function Workbook() {
  const exercises = [
    {
      number: '01',
      title: 'Map of Origin',
      prompt: 'Sketch or list the first rules you learned about what was safe to say, what had to be hidden, and who you had to be to remain welcome.'
    },
    {
      number: '02',
      title: 'Inherited Directions',
      prompt: 'Identify an expectation or ambition you are currently pursuing. Is it truly your own, or was it passed down to you by someone who could not carry it themselves?'
    },
    {
      number: '03',
      title: 'Other People’s Weather',
      prompt: 'Identify a recent conversation where you felt compelled to explain yourself. Did your explanation alter the weather in the room, or only exhaust you?'
    },
    {
      number: '04',
      title: 'The Roles That Kept You Safe',
      prompt: 'What role (the helper, the quiet one, the successful one) did you adopt early in life? How does this role restrict you today?'
    },
    {
      number: '05',
      title: 'The Wolves’ Questions',
      prompt: 'List the questions you are most afraid of being asked. Which of these are actual threats, and which are echoes of past interrogations?'
    },
    {
      number: '06',
      title: 'The Evidence You Carry',
      prompt: 'What proof have you been collecting to show that you are enough? Who is the audience you are trying to convince?'
    },
    {
      number: '07',
      title: 'Alternative Lives',
      prompt: 'Describe a version of your life that you chose not to live. What part of that alternative self are you still grieving, or trying to rescue?'
    },
    {
      number: '08',
      title: 'Roads of Almost',
      prompt: 'Look back at a near-miss or a path you almost took. What is the quiet relief or lingering regret of staying on the road you chose?'
    },
    {
      number: '09',
      title: 'What Is Yours',
      prompt: 'Separate your responsibilities: list what belongs to you, what belongs to others, and what belongs to the road itself. What can you put down today?'
    },
    {
      number: '10',
      title: 'The Map Forward',
      prompt: 'If you did not need to explain your next step to anyone, which direction would you turn? Draw the first boundary that gets you there.'
    }
  ];

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 5rem' }}>
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link to="/archive">Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>Self-Cartography</span>
      </nav>

      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Self-Cartography</span>
        <h1 className="page-title">The Self-Cartography Field Guide</h1>
        <p className="page-introduction" style={{ margin: 0 }}>
          Guided maps for identifying what shaped you, what you inherited, what you adapted to, and what still belongs to you.
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
