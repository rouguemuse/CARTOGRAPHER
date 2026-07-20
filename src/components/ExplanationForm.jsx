import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ExplanationForm() {
  const [statement, setStatement] = useState('');
  const [alias, setAlias] = useState('');
  const [destinationTag, setDestinationTag] = useState('to-the-wolf');
  const [publicConsentConfirmed, setPublicConsentConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const MAX_CHARS = 300;

  const destinationOptions = [
    { value: 'to-the-wolf', label: 'To the wolf' },
    { value: 'to-my-mother', label: 'To my mother' },
    { value: 'to-my-younger-self', label: 'To my younger self' },
    { value: 'to-the-person-i-left', label: 'To the person I left' },
    { value: 'to-the-person-who-left', label: 'To the person who left' },
    { value: 'to-myself', label: 'To myself' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!statement.trim()) {
      setError('Please enter your statement.');
      return;
    }

    if (statement.length > MAX_CHARS) {
      setError(`Submissions cannot exceed ${MAX_CHARS} characters.`);
      return;
    }

    if (!publicConsentConfirmed) {
      setError('You must confirm public display consent before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'wall_submissions'), {
        statement: statement.trim(),
        alias: alias.trim() || 'Anonymous',
        destinationTag,
        publicConsentConfirmed: true,
        status: 'pending',
        submittedAt: serverTimestamp()
      });

      setSubmitted(true);
      setStatement('');
      setAlias('');
      setDestinationTag('to-the-wolf');
      setPublicConsentConfirmed(false);
    } catch (err) {
      console.error("Error submitting unsaid statement:", err);
      setError("Failed to place your sentence on the wall. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '2rem', backgroundColor: 'var(--card)', border: '1px solid var(--paper-line)', borderRadius: '4px', textAlign: 'center' }}>
        <span className="page-kicker" style={{ color: 'var(--red)' }}>Fragment Saved</span>
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Submitted to Moderation</h3>
        <p style={{ fontSize: 'var(--text-reading)', color: 'var(--ink)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Your sentence has been placed in the moderation queue. Once reviewed, it will appear as a tactile fragment on the Unsaid Wall.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn">
          Leave Another Sentence
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
        <label htmlFor="unsaid-statement">What did you need to say when it was no longer safe, useful, or possible to say it?</label>
        <textarea
          id="unsaid-statement"
          rows={4}
          maxLength={MAX_CHARS}
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="I stopped explaining because I realized you were collecting evidence..."
          required
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem', fontSize: 'var(--text-xs)', color: statement.length > 280 ? 'var(--red)' : 'var(--muted)' }}>
          {statement.length} / {MAX_CHARS}
        </div>
      </div>

      <div className="archive-form-group">
        <label htmlFor="destination-tag">Destination Tag</label>
        <select
          id="destination-tag"
          value={destinationTag}
          onChange={(e) => setDestinationTag(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--paper-line)', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', borderRadius: '4px' }}
        >
          {destinationOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="archive-form-group">
        <label htmlFor="wall-alias">Alias / Signature (Optional)</label>
        <input
          id="wall-alias"
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Anonymous, or e.g. A traveler in the valley"
        />
      </div>

      {/* Required Public Confirmation Checkbox */}
      <div className="archive-form-group" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginTop: '1.5rem' }}>
        <input
          id="public-consent"
          type="checkbox"
          checked={publicConsentConfirmed}
          onChange={(e) => setPublicConsentConfirmed(e.target.checked)}
          required
          style={{ marginTop: '0.25rem', accentColor: 'var(--red)' }}
        />
        <label htmlFor="public-consent" style={{ fontSize: 'var(--text-sm)', fontWeight: 'normal', lineHeight: '1.5', cursor: 'pointer' }}>
          I understand that, if approved, this statement may appear publicly and anonymously on the Unsaid Wall.
        </label>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Placing Sentence...' : 'Place Sentence on the Wall'}
        </button>
      </div>
    </form>
  );
}
