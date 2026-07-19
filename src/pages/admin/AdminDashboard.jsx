import { useState } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ArticleManager from './ArticleManager';
import WallModeration from './WallModeration';
import DearRedInbox from './DearRedInbox';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('articles');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: 'var(--color-obsidian)', color: 'var(--color-bone)', fontFamily: 'var(--font-ui)'}}>
      
      {/* Sidebar */}
      <div style={{width: '250px', background: 'var(--color-charcoal)', borderRight: '1px solid var(--color-charcoal-light)', display: 'flex', flexDirection: 'column'}}>
        <div style={{padding: '2rem 1.5rem', borderBottom: '1px solid var(--color-charcoal-light)'}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: 'var(--color-parchment)'}}>The Archive<br/><span style={{color: 'var(--red-bright)'}}>Admin Console</span></h2>
        </div>
        
        <div style={{flex: 1, padding: '1.5rem 0'}}>
          <button 
            onClick={() => setActiveTab('articles')}
            style={{display: 'block', width: '100%', textAlign: 'left', padding: '1rem 1.5rem', background: activeTab === 'articles' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', borderLeft: activeTab === 'articles' ? '3px solid var(--red-bright)' : '3px solid transparent', color: activeTab === 'articles' ? 'white' : 'var(--color-bone)', cursor: 'pointer', fontSize: '0.9rem'}}
          >
            Article Manager
          </button>
          <button 
            onClick={() => setActiveTab('wall')}
            style={{display: 'block', width: '100%', textAlign: 'left', padding: '1rem 1.5rem', background: activeTab === 'wall' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', borderLeft: activeTab === 'wall' ? '3px solid var(--red-bright)' : '3px solid transparent', color: activeTab === 'wall' ? 'white' : 'var(--color-bone)', cursor: 'pointer', fontSize: '0.9rem'}}
          >
            Wall Moderation
          </button>
          <button 
            onClick={() => setActiveTab('dear-red')}
            style={{display: 'block', width: '100%', textAlign: 'left', padding: '1rem 1.5rem', background: activeTab === 'dear-red' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', borderLeft: activeTab === 'dear-red' ? '3px solid var(--red-bright)' : '3px solid transparent', color: activeTab === 'dear-red' ? 'white' : 'var(--color-bone)', cursor: 'pointer', fontSize: '0.9rem'}}
          >
            Dear Red Inbox
          </button>
        </div>

        <div style={{padding: '1.5rem', borderTop: '1px solid var(--color-charcoal-light)'}}>
          <button onClick={handleLogout} style={{width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid var(--color-charcoal-light)', color: 'var(--color-bone)', cursor: 'pointer', fontSize: '0.85rem'}}>
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{flex: 1, padding: '2rem 3rem', height: '100vh', overflowY: 'auto'}}>
        {activeTab === 'articles' && <ArticleManager />}
        {activeTab === 'wall' && <WallModeration />}
        {activeTab === 'dear-red' && <DearRedInbox />}
      </div>
      
    </div>
  );
}
