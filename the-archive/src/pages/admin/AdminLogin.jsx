import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-obsidian)', color: 'var(--color-bone)'}}>
      <div style={{background: 'var(--color-charcoal)', padding: '3rem', border: '1px solid var(--color-charcoal-light)', width: '100%', maxWidth: '400px'}}>
        <h2 style={{fontFamily: 'var(--font-display)', marginBottom: '2rem'}}>Admin Access</h2>
        {error && <div style={{padding: '1rem', background: 'rgba(255,0,0,0.1)', border: '1px solid var(--red-bright)', color: 'var(--red-bright)', marginBottom: '1.5rem', fontSize: '0.9rem'}}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', padding: '0.75rem', background: 'var(--color-obsidian)', border: '1px solid var(--color-charcoal-light)', color: 'var(--color-bone)'}} />
          </div>
          <div style={{marginBottom: '2.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '100%', padding: '0.75rem', background: 'var(--color-obsidian)', border: '1px solid var(--color-charcoal-light)', color: 'var(--color-bone)'}} />
          </div>
          <button type="submit" disabled={loading} style={{width: '100%', padding: '1rem', background: 'var(--red-bright)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '1px'}}>
            {loading ? 'Authenticating...' : 'Enter Console'}
          </button>
        </form>
      </div>
    </div>
  );
}
