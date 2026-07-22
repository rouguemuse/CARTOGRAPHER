import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CompassRoseIcon,
  FoldedMapIcon,
  RulerIcon,
  CloudIcon,
  CoatIcon,
  WolfIcon,
  BridgeIcon,
  EnvelopeIcon,
  DoorIcon,
  SpoolIcon,
  HorizonIcon
} from '../components/homepage/CartographyIcons';

const exerciseData = [
  // Territory 1: Where Your Map Came From
  {
    id: 'origin_map',
    territory: 'origin',
    number: '01',
    title: 'Map of Origin',
    purpose: 'Identify the first rules you learned about what was safe to say and who you had to be.',
    prompt: 'Sketch or list the first rules you learned in childhood about what was safe to say, what had to be hidden, and who you had to be to remain welcome. Who drew this initial map for you?',
    time: '10 mins',
    icon: CompassRoseIcon
  },
  {
    id: 'inherited_directions',
    territory: 'origin',
    number: '02',
    title: 'Inherited Directions',
    purpose: 'Distinguish between your own ambitions and the expectations passed down to you.',
    prompt: 'Identify a major expectation or ambition you are currently pursuing. Is it truly your own, or was it passed down to you by someone who could not carry it themselves?',
    time: '12 mins',
    icon: FoldedMapIcon
  },
  {
    id: 'moving_bar',
    territory: 'origin',
    number: '03',
    title: 'The Moving Bar',
    purpose: 'Measure the moving standards you have been trying to reach.',
    prompt: 'Describe the invisible standards you feel pressured to meet. Who holds the ruler, and what happens if you choose to stop measuring?',
    time: '15 mins',
    icon: RulerIcon
  },
  // Territory 2: How You Learned to Survive
  {
    id: 'peoples_weather',
    territory: 'survive',
    number: '04',
    title: 'Other People’s Weather',
    purpose: 'Track the atmospheric shifts you absorb as personal guilt.',
    prompt: 'Recall a recent conversation where you absorbed someone else\'s emotional storm. Did your explanation alter the weather, or only exhaust you?',
    time: '10 mins',
    icon: CloudIcon
  },
  {
    id: 'roles_wore',
    territory: 'survive',
    number: '05',
    title: 'The Roles You Wore',
    purpose: 'Uncover the survival strategies that became rigid expectations.',
    prompt: 'What survival role (helper, successful one, quiet one, protector) did you adopt early? How does it restrict your movement today?',
    time: '15 mins',
    icon: CoatIcon
  },
  {
    id: 'wolves_questions',
    territory: 'survive',
    number: '06',
    title: 'The Wolves’ Questions',
    purpose: 'Identify the critical voices and echoes of past interrogations.',
    prompt: 'List the questions you are most afraid of answering. Which of these are actual dangers, and which are shadows from past interrogations?',
    time: '15 mins',
    icon: WolfIcon
  },
  {
    id: 'bridge_easier',
    territory: 'survive',
    number: '07',
    title: 'The Bridge of Easier',
    purpose: 'Look back at the choices made simply to make the road smoother.',
    prompt: 'Think of a time you chose a smoother, safer road instead of the true one. What did you compromise, and what did you learn?',
    time: '12 mins',
    icon: BridgeIcon
  },
  // Territory 3: What You Choose Now
  {
    id: 'evidence_carry',
    territory: 'choose',
    number: '08',
    title: 'The Evidence You Carry',
    purpose: 'Examine the proof you gather to convince others you are enough.',
    prompt: 'What proof have you been collecting to convince others (or yourself) that you are allowed to exist? Who is the judge?',
    time: '10 mins',
    icon: EnvelopeIcon
  },
  {
    id: 'alternative_lives',
    territory: 'choose',
    number: '09',
    title: 'Alternative Lives',
    purpose: 'Grieve and let go of the versions of yourself you chose not to live.',
    prompt: 'Describe a version of your life you chose not to live. What part of that potential self are you still grieving, or trying to rescue?',
    time: '15 mins',
    icon: DoorIcon
  },
  {
    id: 'what_is_yours',
    territory: 'choose',
    number: '10',
    title: 'What Is Yours',
    purpose: 'Decide what belongs to you, what belongs to others, and what belongs to the road.',
    prompt: 'Separate what belongs to you, what belongs to others, and what belongs to the road. What can you set down today?',
    time: '12 mins',
    icon: SpoolIcon
  },
  {
    id: 'map_forward',
    territory: 'choose',
    number: '11',
    title: 'The Map Forward',
    purpose: 'Draw the first boundary that marks your next independent step.',
    prompt: 'If you did not need to explain your next step to anyone, which direction would you turn? Draw the first boundary that gets you there.',
    time: '15 mins',
    icon: HorizonIcon
  }
];

export default function Workbook() {
  const [reflections, setReflections] = useState({});
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [inputText, setInputText] = useState('');

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('applebanana_cartography_reflections');
      if (saved) {
        setReflections(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading reflections', e);
    }
  }, []);

  const handleOpenExercise = (id) => {
    setActiveExerciseId(id);
    setInputText(reflections[id]?.text || '');
  };

  const handleSaveReflection = (id) => {
    const updated = {
      ...reflections,
      [id]: {
        text: inputText,
        updatedAt: new Date().toISOString(),
        completed: inputText.trim().length > 0
      }
    };
    setReflections(updated);
    localStorage.setItem('applebanana_cartography_reflections', JSON.stringify(updated));
    setActiveExerciseId(null);
  };

  const getStatus = (id) => {
    if (reflections[id]?.completed) return 'Completed';
    if (reflections[id]?.text) return 'In Progress';
    return 'Not Started';
  };

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#b3211d'; // Crimson
    if (status === 'In Progress') return '#B99A55'; // Brass
    return '#A79D88'; // Muted
  };

  const renderTerritory = (territoryId, title) => {
    const list = exerciseData.filter(e => e.territory === territoryId);
    return (
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.45rem', 
            color: '#EDE4CF', 
            borderBottom: '1px solid rgba(222, 205, 169, 0.15)',
            paddingBottom: '0.5rem',
            marginBottom: '1.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </h3>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          {list.map((ex) => {
            const status = getStatus(ex.id);
            const Icon = ex.icon;
            return (
              <div 
                key={ex.id}
                style={{ 
                  backgroundColor: '#0c1210', 
                  border: '1px solid rgba(222, 205, 169, 0.15)', 
                  borderRadius: '4px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon />
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#B99A55', fontSize: '12px' }}>
                        EX-{ex.number}
                      </span>
                    </div>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '11px', 
                        color: getStatusColor(status),
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {status}
                    </span>
                  </div>

                  <h4 
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '1.25rem', 
                      color: '#F1E9D6', 
                      margin: '0 0 0.5rem 0',
                      fontWeight: '700'
                    }}
                  >
                    {ex.title}
                  </h4>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '14.5px', 
                      lineHeight: '1.5',
                      color: '#C8BEA7', 
                      margin: '0 0 1rem 0' 
                    }}
                  >
                    {ex.purpose}
                  </p>
                </div>

                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid rgba(222, 205, 169, 0.08)',
                    paddingTop: '0.85rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A79D88' }}>
                    Est: {ex.time}
                  </span>
                  <button
                    onClick={() => handleOpenExercise(ex.id)}
                    className="btn btn-ghost-sm"
                    style={{ 
                      color: 'var(--red-bright)', 
                      background: 'none', 
                      border: 'none', 
                      padding: 0, 
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {status === 'Completed' ? 'Revise Mapping →' : 'Begin Mapping →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const activeExercise = exerciseData.find(e => e.id === activeExerciseId);

  return (
    <div 
      className="self-cartography-page"
      style={{ 
        backgroundColor: '#050a09', 
        minHeight: '100vh', 
        padding: '3rem 1.5rem 6rem',
        color: '#C8BEA7',
        fontFamily: 'var(--font-body)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        
        {/* Breadcrumb Navigation */}
        <nav 
          aria-label="Breadcrumb" 
          style={{ 
            marginBottom: '1.5rem', 
            fontSize: '14px' 
          }}
        >
          <Link to="/archive" style={{ color: '#A79D88', textDecoration: 'none' }}>Archive</Link>
          <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
          <span style={{ color: '#C8BEA7' }}>Self-Cartography</span>
        </nav>

        {/* Header Masthead */}
        <header 
          style={{ 
            textAlign: 'left', 
            borderBottom: '1px solid rgba(222, 205, 169, 0.15)', 
            paddingBottom: '1.5rem', 
            marginBottom: '3rem' 
          }}
        >
          <span 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              color: '#B99A55', 
              fontSize: '13px', 
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.35rem'
            }}
          >
            Guided Exercises
          </span>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              lineHeight: '1.02', 
              color: '#F1E9D6', 
              fontWeight: '700',
              margin: '0 0 1rem 0'
            }}
          >
            Self-Cartography
          </h1>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)',
              color: '#B99A55',
              fontStyle: 'italic',
              margin: '0 0 1rem 0',
              fontWeight: '400'
            }}
          >
            A Field Guide for Mapping What You Carry
          </h2>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '17px', 
              lineHeight: '1.6', 
              color: '#C8BEA7', 
              margin: 0,
              maxWidth: '80ch'
            }}
          >
            You inherited maps, learned to forecast other people’s weather, and adapted to roads you did not choose. These exercises help you identify what shaped you—and decide what still belongs to you.
          </p>
        </header>

        {/* 3 Territories */}
        {renderTerritory('origin', '1. Where Your Map Came From')}
        {renderTerritory('survive', '2. How You Learned to Survive')}
        {renderTerritory('choose', '3. What You Choose Now')}

        {/* Interactive Guided Drawer Modal */}
        {activeExercise && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 10, 9, 0.85)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
              padding: '1.5rem'
            }}
            onClick={() => setActiveExerciseId(null)}
          >
            <div 
              style={{
                backgroundColor: '#0c1210',
                border: '1px solid rgba(222, 205, 169, 0.22)',
                borderRadius: '4px',
                width: 'min(100%, 640px)',
                padding: '2.25rem 2rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                boxSizing: 'border-box',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#B99A55', fontSize: '12px' }}>
                  EXERCISE {activeExercise.number}
                </span>
                <span style={{ color: '#A79D88', opacity: 0.5 }}>•</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A79D88' }}>
                  Est: {activeExercise.time}
                </span>
              </div>

              <h3 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '1.75rem', 
                  color: '#F1E9D6', 
                  margin: '0 0 1.25rem 0',
                  fontWeight: '700'
                }}
              >
                {activeExercise.title}
              </h3>

              <p 
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '16px', 
                  lineHeight: '1.65', 
                  color: '#EDE4CF', 
                  backgroundColor: 'rgba(185, 154, 85, 0.06)',
                  borderLeft: '3px solid #B99A55',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  borderRadius: '2px'
                }}
              >
                {activeExercise.prompt}
              </p>

              <label 
                htmlFor="exercise-reflection"
                style={{ 
                  display: 'block', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '11px', 
                  color: '#B99A55', 
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase'
                }}
              >
                Your Journal Reflection
              </label>
              <textarea
                id="exercise-reflection"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write your reflections here. Your notes are saved privately on this device..."
                style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: '#050a09',
                  border: '1px solid rgba(222, 205, 169, 0.15)',
                  borderRadius: '4px',
                  padding: '1rem',
                  color: '#EDE4CF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15.5px',
                  lineHeight: '1.6',
                  resize: 'none',
                  boxSizing: 'border-box',
                  outline: 'none',
                  marginBottom: '1.75rem'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  onClick={() => setActiveExerciseId(null)}
                  className="btn btn-ghost-sm"
                  style={{ color: '#A79D88' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleSaveReflection(activeExercise.id)}
                  className="btn btn-primary"
                >
                  Save Reflection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
