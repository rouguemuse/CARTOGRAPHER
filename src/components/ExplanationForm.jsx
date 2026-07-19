import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ExplanationForm() {
  const [formStatus, setFormStatus] = useState('idle');
  const [startTime, setStartTime] = useState(Date.now());
  
  const [formData, setFormData] = useState({
    explanation: '',
    alias: '',
    email: '',
    publishPermission: 'no',
    creditAs: 'anonymous',
    consent: false,
    honeypot: ''
  });

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Spam protection: honeypot or too fast (5 seconds)
    const isSpam = formData.honeypot || (Date.now() - startTime < 5000);

    setFormStatus('submitting');
    
    if (!isSpam) {
      try {
        await addDoc(collection(db, 'private_wall_submissions'), {
          explanation: formData.explanation,
          alias: formData.alias,
          email: formData.email,
          publishPermission: formData.publishPermission,
          creditAs: formData.creditAs,
          consent: formData.consent,
          status: 'pending',
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.error('Error submitting form', err);
      }
    }
    
    setFormStatus('success');
  };

  if (formStatus === 'success') {
    return (
      <div className="archive-letter-form" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Explanation Received</h3>
        <p style={{ marginBottom: '1rem' }}>Your words have entered the Archive.</p>
        <p style={{ marginBottom: '2rem' }}>They will remain private while awaiting review. If approved, they will appear on the wall without identifying information.</p>
        <button className="btn btn-primary" onClick={() => { setFormStatus('idle'); setFormData({...formData, explanation: '', alias: '', email: '', consent: false}); setStartTime(Date.now()); }}>Submit Another</button>
      </div>
    );
  }

  return (
    <div className="archive-letter-form">
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Your Explanation</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="honeypot" style={{display: 'none'}} value={formData.honeypot} onChange={handleChange} tabIndex="-1" autoComplete="off" />
        
        <div className="archive-form-group">
          <label>What should you have said? (required)</label>
          <textarea 
            name="explanation"
            rows="5" 
            placeholder="I should have told you that..."
            maxLength="2000"
            required
            value={formData.explanation}
            onChange={handleChange}
          ></textarea>
          <div style={{ textAlign: 'right', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--muted)' }}>
            {formData.explanation.length} / 2000
          </div>
        </div>
        
        <div className="archive-form-group">
          <label>Name or alias (optional)</label>
          <input 
            type="text" 
            name="alias" 
            value={formData.alias}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>May we publish an edited version?</label>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="radio" name="publishPermission" value="yes" checked={formData.publishPermission === 'yes'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="radio" name="publishPermission" value="no" checked={formData.publishPermission === 'no'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
              No
            </label>
          </div>

          {formData.publishPermission === 'yes' && (
            <div style={{ padding: '1.5rem', borderLeft: '4px solid var(--red-bright)', background: 'var(--paper)', marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>Credit me as:</label>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="radio" name="creditAs" value="anonymous" checked={formData.creditAs === 'anonymous'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
                  Anonymous
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="radio" name="creditAs" value="alias" checked={formData.creditAs === 'alias'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
                  Alias
                </label>
              </div>
              
              {formData.creditAs === 'alias' && (
                <div className="archive-form-group" style={{ marginBottom: 0 }}>
                  <label>Required Alias</label>
                  <input type="text" name="alias" required={true} value={formData.alias} onChange={handleChange} placeholder="What should we call you?" />
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="archive-form-group">
          <label>Email (Optional, only for publication notification)</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5', padding: '1.5rem', background: 'var(--paper)', border: '1px solid var(--paper-line)', marginBottom: '2rem' }}>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--ink)' }}>Before you send this</h4>
          <p style={{ marginBottom: '1rem' }}>Your entry will not appear publicly right away. Every submission is reviewed by The Archive before publication.</p>
          <p style={{ marginBottom: '1rem' }}>Approved entries may be lightly edited for length, clarity, safety, or the removal of identifying information. Submission does not guarantee publication.</p>
          <p style={{ marginBottom: '1rem' }}>Please do not include full names, addresses, schools, workplaces, contact information, or details that could identify another person.</p>
          
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1.5rem', fontWeight: 'bold', color: 'var(--ink)', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              name="consent" 
              required
              checked={formData.consent} 
              onChange={handleChange} 
              style={{ marginTop: '0.2rem', width: 'auto' }} 
            />
            I understand that my submission may be reviewed and, if approved, published anonymously on the public wall.
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={formStatus === 'submitting' || !formData.consent}>
          {formStatus === 'submitting' ? 'Submitting...' : 'Submit Explanation'}
        </button>
      </form>
    </div>
  );
}
