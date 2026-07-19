import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStageById, stages, objects } from '../data/storyData';
import { useJourneyState } from '../hooks/useJourneyState';
import './Stage.css';

export default function Stage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, makeChoice, updateJournal } = useJourneyState();
  
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  
  const stage = getStageById(id);
  const stageIndex = stages.findIndex(s => s.id === id);
  const nextStage = stages[stageIndex + 1];
  const selectedObject = objects.find(o => o.id === state.objectSelected);

  useEffect(() => {
    setSelectedChoiceId(null);
    setShowConsequence(false);
    
    if (!state.objectSelected) {
      navigate('/stage/object');
    }
  }, [id, navigate, state.objectSelected]);

  if (!stage) return <div>Stage not found</div>;

  const handleChoice = (choiceId) => {
    setSelectedChoiceId(choiceId);
    setShowConsequence(true);
  };

  const handleContinue = () => {
    const choice = stage.choices.find(c => c.id === selectedChoiceId);
    
    makeChoice(stage.id, choice.id, choice.consequence);
    
    updateJournal(stage.id, {
      title: stage.title,
      question: stage.question,
      choiceText: choice.text,
      consequence: choice.consequence,
      reflection: ''
    });

    if (nextStage) {
      navigate(`/stage/${nextStage.id}`);
    } else {
      navigate('/result');
    }
  };

  return (
    <div className="stage-page">
      {/* Background atmosphere */}
      <div className="stage-bg">
        <div className="stage-overlay"></div>
      </div>
      
      {/* Return Navigation */}
      <nav style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', zIndex: 10}}>
        <div style={{fontFamily: 'var(--font-display)', color: 'var(--color-bone)', fontSize: '1.1rem'}}>
          <a href="/" style={{color: 'inherit', textDecoration: 'none'}}>The Archive</a>
        </div>
        <div style={{display: 'flex', gap: '1.5rem'}}>
          <a href="/#library" style={{color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Valley Library</a>
          <a href="/#join" style={{color: 'var(--color-bone)', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Join List</a>
        </div>
      </nav>

      <main className="stage-main container">
        <div className="narrative-card glass-panel-stage">
          <div className="card-left-rail">
            <div className="rail-marker">
              <span className="coordinate">N° {stageIndex + 1}</span>
              <div className="rail-line"></div>
              {selectedObject && (
                <img src={selectedObject.image} alt={selectedObject.name} className="rail-icon" />
              )}
            </div>
          </div>
          
          <div className="card-main-content">
            <span className="stage-label">Location</span>
            <h1 className="stage-title">{stage.title}</h1>
            
            <div className="prose-body">
              {stage.narrative.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            
            <div className="interactive-zone">
              <h2 className="stage-question">{stage.question}</h2>
              
              <div className="choices-list">
                {stage.choices.map((choice) => (
                  <button 
                    key={choice.id}
                    className={`choice-btn ${selectedChoiceId === choice.id ? 'selected' : ''}`}
                    onClick={() => handleChoice(choice.id)}
                    disabled={showConsequence && selectedChoiceId !== choice.id}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>

              {showConsequence && (
                <div className="consequence-reveal">
                  <div className="consequence-text handwritten">
                    {stage.choices.find(c => c.id === selectedChoiceId)?.consequence}
                  </div>
                  <div className="consequence-actions">
                    <button onClick={() => setShowConsequence(false)} className="btn btn-text">
                      Reconsider
                    </button>
                    <button onClick={handleContinue} className="btn btn-primary">
                      {nextStage ? 'Continue Journey' : 'End the Map'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="field-note-footer">
          <p>
            Field Note — A companion to the forthcoming book <em>How to Explain Yourself to Wolves</em> by Jayme Volstad.
          </p>
        </div>
      </main>
    </div>
  );
}
