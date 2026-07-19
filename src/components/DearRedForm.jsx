import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DearRedForm() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [refNumber, setRefNumber] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  
  const [formData, setFormData] = useState({
    letter: '',
    question: '',
    alias: '',
    email: '',
    responsePreference: 'none',
    publishPermission: 'no',
    creditAs: 'anonymous',
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
    
    // Generate a unique reference number
    const ref = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const isSpam = formData.honeypot || (Date.now() - startTime < 5000);

    setFormStatus('submitting');
    
    if (!isSpam) {
      try {
        await addDoc(collection(db, 'private_dear_red_inbox'), {
          letter: formData.letter,
          question: formData.question,
          alias: formData.alias,
          email: formData.email,
          responsePreference: formData.responsePreference,
          publishPermission: formData.publishPermission,
          creditAs: formData.creditAs,
          status: 'new',
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.error('Error submitting form', err);
      }
    }
    
    setRefNumber(ref);
    setFormStatus('success');
  };

  if (formStatus === 'success') {
    return (
      <div className="archive-letter-form" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Letter Received</h3>
        <p style={{ marginBottom: '1rem' }}>Your letter has been received and is awaiting review.</p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', color: 'var(--muted)' }}>Reference Number: <strong>{refNumber}</strong></p>
        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => { setFormStatus('idle'); setFormData({...formData, letter: '', question: ''}); setStartTime(Date.now()); }}>Submit Another</button>
      </div>
    );
  }

  return (
    <div className="archive-letter-form">
      <form onSubmit={handleSubmit}>
        {/* Honeypot field (hidden) */}
        <input type="text" name="honeypot" style={{display: 'none'}} value={formData.honeypot} onChange={handleChange} tabIndex="-1" autoComplete="off" />

        <div className="archive-form-group">
          <label>Your letter (required)</label>
          <textarea 
            name="letter" 
            rows="8" 
            required 
            maxLength="5000"
            value={formData.letter}
            onChange={handleChange}
            placeholder="I have been carrying..."
          ></textarea>
          <div style={{ textAlign: 'right', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--muted)' }}>
            {formData.letter.length} / 5000
          </div>
        </div>

        <div className="archive-form-group">
          <label>What are you asking Red? (optional)</label>
          <input 
            type="text" 
            name="question" 
            value={formData.question}
            onChange={handleChange}
          />
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

        <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--paper-line)', background: 'var(--paper)' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>Would you like a response?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="radio" name="responsePreference" value="public" checked={formData.responsePreference === 'public'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
              Public response
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="radio" name="responsePreference" value="private" checked={formData.responsePreference === 'private'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
              Private response
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="radio" name="responsePreference" value="notification" checked={formData.responsePreference === 'notification'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
              Notification if published
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="radio" name="responsePreference" value="none" checked={formData.responsePreference === 'none'} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
              No response requested
            </label>
          </div>
          
          <div className="archive-form-group" style={{ marginBottom: 0 }}>
            <label>Email {(formData.responsePreference === 'private' || formData.responsePreference === 'notification') && "(Required)"}</label>
            <input 
              type="email" 
              name="email" 
              required={formData.responsePreference === 'private' || formData.responsePreference === 'notification'}
              value={formData.email}
              onChange={handleChange}
              placeholder="Only used for notifications"
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>May Dear Red publish an edited version of your letter together with a response?</label>
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
            <div style={{ padding: '1.5rem', borderLeft: '4px solid var(--red-bright)', background: 'var(--paper)' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>If published, credit me as:</label>
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

        <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}><strong>Privacy Notice:</strong> Submissions are reviewed privately and never published without your explicit permission. If you permit publication, your submission may be shortened or lightly edited and identifying details may be removed. Please do not include full names, addresses, legal case numbers, medical records, or information that could identify another person.</p>
          <p>Dear Red is a literary correspondence project, not therapy, legal advice, or an emergency service. A response is not guaranteed.</p>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={formStatus === 'submitting'}>
          {formStatus === 'submitting' ? 'Submitting...' : 'Submit to Dear Red'}
        </button>
      </form>
    </div>
  );
}
