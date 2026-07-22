import { useState } from 'react';
import './SignupForm.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Optional backend sync attempt
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName })
      });
    } catch (e) {
      // Non-blocking fallback
    }

    // Direct Substack pre-filled subscriber routing
    const substackUrl = `https://otherpeoplesweather.substack.com/subscribe?email=${encodeURIComponent(email)}`;
    window.open(substackUrl, '_blank', 'noopener,noreferrer');

    setStatus('success');
  };

  return (
    <div className="signup-container">
      <h3 className="signup-headline">BE TOLD WHEN THE WOLVES ARE READY</h3>
      <p className="signup-text">
        Join the release list for publication news, early excerpts, and new journeys from the world of <em>How to Explain Yourself to Wolves</em>.
      </p>

      {status === 'success' ? (
        <div className="signup-success">
          <p style={{ color: '#F1E9D6', fontWeight: '600' }}>
            Thank you for joining. The wolves will find you when it is time.
          </p>
          <p style={{ fontSize: '13px', color: '#B99A55', marginTop: '0.5rem' }}>
            Substack confirmation opened in a new tab.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="firstName" className="visually-hidden">First Name (Optional)</label>
            <input 
              type="text" 
              id="firstName"
              placeholder="First Name (Optional)" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={status === 'loading'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="visually-hidden">Email Address (Required)</label>
            <input 
              type="email" 
              id="email"
              placeholder="Email Address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Opening Substack...' : 'JOIN THE BOOK LIST →'}
          </button>
        </form>
      )}

      <p className="privacy-note">Book news and field notes only. No noise, and no selling your address.</p>
    </div>
  );
}
