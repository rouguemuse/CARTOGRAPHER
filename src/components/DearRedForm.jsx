import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function DearRedForm() {
  const [letterBody, setLetterBody] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!letterBody.trim()) {
      setError('Please write your letter before sending.');
      return;
    }

    setSubmitting(true);
    setError('');

    const referenceNumber = `RED-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      // Writes to private dear_red_submissions collection
      await addDoc(collection(db, 'dear_red_submissions'), {
        referenceNumber,
        letterBody: letterBody.trim(),
        alias: alias.trim() || 'A traveler in the valley',
        email: email.trim() || null,
        isPrivate: true,
        permissionGranted,
        consentTextVersion: 'v1.0',
        status: 'received',
        publicExcerpt: '',
        publicResponse: '',
        submittedAt: serverTimestamp()
      });

      setSubmittedRef(referenceNumber);
      setLetterBody('');
      setAlias('');
      setEmail('');
      setPermissionGranted(false);
    } catch (err) {
      console.error("Error submitting letter to Dear Red:", err);
      setError("Failed to send your letter. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div style={{ padding: '2rem', backgroundColor: 'var(--card)', border: '1px solid var(--paper-line)', borderRadius: '4px', textAlign: 'center' }}>
        <span className="page-kicker" style={{ color: 'var(--red)' }}>Letter Received • {submittedRef}</span>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Placed in the Archive</h3>
        <p style={{ fontSize: 'var(--text-reading)', color: 'var(--ink)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Your letter has been placed in the Archive. It will remain private unless you gave separate permission for an edited, anonymous excerpt and response.
        </p>
        <button onClick={() => setSubmittedRef(null)} className="btn">
          Write Another Letter
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="archive-letter-form">
      {error && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(179, 33, 29, 0.1)', border: '1px solid var(--red)', color: 'var(--red)', marginBottom: '1.25rem', borderRadius: '4px', fontSize: 'var(--text-sm)' }}>
          {error}
        </div>
      )}

      <div className="archive-form-group">
        <label htmlFor="letter-body">Your Letter to Red</label>
        <textarea
          id="letter-body"
          rows={7}
          value={letterBody}
          onChange={(e) => setLetterBody(e.target.value)}
          placeholder="Dear Red, I kept explaining because I thought if I used enough words..."
          required
        />
      </div>

      <div className="archive-form-group">
        <label htmlFor="alias">Alias / Signature (Optional)</label>
        <input
          id="alias"
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="e.g. A traveler on the bridge, or Anonymous"
        />
      </div>

      <div className="archive-form-group">
        <label htmlFor="email">Email Address (Optional — Strictly Private)</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="For private response only. Never displayed publicly."
        />
      </div>

      {/* Explicit Consent Checkbox — Unchecked by default */}
      <div className="archive-form-group" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginTop: '1.5rem' }}>
        <input
          id="permission-granted"
          type="checkbox"
          checked={permissionGranted}
          onChange={(e) => setPermissionGranted(e.target.checked)}
          style={{ marginTop: '0.25rem', accentColor: 'var(--red)' }}
        />
        <label htmlFor="permission-granted" style={{ fontSize: 'var(--text-sm)', fontWeight: 'normal', lineHeight: '1.5', cursor: 'pointer' }}>
          I give permission for the Cartographer to publish an edited and anonymized excerpt from this letter, together with a public response.
        </label>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Placing in Archive...' : 'Send Letter to Red'}
        </button>
      </div>
    </form>
  );
}
