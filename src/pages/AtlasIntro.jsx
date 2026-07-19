import { useNavigate } from 'react-router-dom';

const AtlasIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="container archive-page">
      <div className="archive-masthead">
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--card)', 
            borderRadius: '50%', 
            border: '2px solid var(--rule)'
          }}>
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="var(--ink)" strokeWidth="2" opacity="0.8"/>
              <circle cx="50" cy="50" r="38" stroke="var(--ink)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
              <path d="M50 10 L60 50 L50 90 L40 50 Z" fill="var(--red)"/>
              <path d="M10 50 L50 40 L90 50 L50 60 Z" fill="var(--muted)" opacity="0.8"/>
            </svg>
          </div>
        </div>
        
        <h1>The Interactive Atlas</h1>
        <p>Step beyond the static records. Explore the cartography of the Valley, uncover hidden journal entries, and navigate the spatial history of the Archive.</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/journey')}
            className="btn btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            Enter the Experience
          </button>
          
          <button 
            onClick={() => navigate('/archive')}
            className="btn"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            Return to Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtlasIntro;
