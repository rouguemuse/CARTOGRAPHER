import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JourneyController() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if journey exists
    const state = localStorage.getItem('applebanana_journey_state');
    if (state) {
      // Journey exists, we could show a "Resume the Road" / "Start Over" screen
      // But user spec says: "If an unfinished Journey exists, offer Resume the Road."
      // Since this is the controller page, let's just render the options here.
    } else {
      // If no Journey is in progress, continue to the existing object-selection entry
      navigate('/stage/object', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-md w-full glass-panel p-8 text-center" style={{border: '1px solid rgba(230, 220, 195, 0.14)', background: 'rgba(6, 14, 12, 0.8)', borderRadius: '12px'}}>
        <h1 className="text-2xl font-serif text-[#E6DCC3] mb-4">Journey in Progress</h1>
        <p className="text-[#a1a1aa] mb-8 text-sm uppercase tracking-widest">You have an unfinished map.</p>
        <div className="flex flex-col gap-4">
          <button 
            className="btn btn-primary w-full py-3"
            onClick={() => navigate('/stage/weather')} // Or whatever the next saved step is
          >
            Resume the Road
          </button>
          <button 
            className="btn w-full py-3"
            style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.1)'}}
            onClick={() => {
              localStorage.removeItem('applebanana_journey_state');
              navigate('/stage/object');
            }}
          >
            Begin Again
          </button>
        </div>
      </div>
    </div>
  );
}
