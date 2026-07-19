import { useNavigate } from 'react-router-dom';

const AtlasIntro = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-charcoal)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      color: 'var(--color-parchment)'
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--color-obsidian)', 
            borderRadius: '50%', 
            border: '1px solid var(--color-charcoal-light)'
          }}>
            {/* Minimal Compass/Map SVG matching the seal motif */}
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="var(--color-bone)" strokeWidth="2" opacity="0.8"/>
              <circle cx="50" cy="50" r="38" stroke="var(--color-bone)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
              <path d="M50 10 L60 50 L50 90 L40 50 Z" fill="var(--red-deep)"/>
              <path d="M10 50 L50 40 L90 50 L50 60 Z" fill="var(--color-bone)" opacity="0.8"/>
            </svg>
          </div>
        </div>
        
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.5rem',
          marginBottom: '1rem',
          color: 'var(--color-parchment)'
        }}>
          The Interactive Atlas
        </h1>
        
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.2rem',
          color: 'var(--color-bone)',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Step beyond the static records. Explore the cartography of the Valley, 
          uncover hidden journal entries, and navigate the spatial history of the Archive.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/atlas/explore')}
            className="btn btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            Enter the Experience →
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="btn"
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.1rem',
              background: 'transparent',
              border: '1px solid var(--color-bone)',
              color: 'var(--color-bone)'
            }}
          >
            Return to Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtlasIntro;
