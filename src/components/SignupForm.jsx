import { useState } from 'react';
import './SignupForm.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else if (response.status === 409) {
        setStatus('duplicate');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h3 className="signup-headline">BE TOLD WHEN THE WOLVES ARE READY</h3>
      <p className="signup-text">
        Join the release list for publication news, early excerpts, and new journeys from the world of How to Explain Yourself to Wolves.
      </p>

      {status === 'success' ? (
        <div className="signup-success">
          <p>Thank you for joining. The wolves will find you when it is time.</p>
        </div>
      ) : status === 'duplicate' ? (
        <div className="signup-success">
          <p>You are already on the list. We will be in touch soon.</p>
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
          
          {status === 'error' && <p className="signup-error" role="alert">{errorMessage}</p>}
          
          <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining...' : 'JOIN THE BOOK LIST'}
          </button>
        </form>
      )}

      <p className="privacy-note">Book news only. No noise, and no selling your address.</p>
    </div>
  );
}
