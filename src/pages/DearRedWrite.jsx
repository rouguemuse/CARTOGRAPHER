import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addSubmission } from '../data/submissionsStore';
import './DearRed.css';

export default function DearRedWrite() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    alias: '',
    email: '',
    recipient: '',
    consent_publication: 'private',
    content_warning: [],
    confirmed_safety: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCwToggle = (cw) => {
    setFormData(prev => {
      const exists = prev.content_warning.includes(cw);
      const next = exists 
        ? prev.content_warning.filter(item => item !== cw)
        : [...prev.content_warning, cw];
      return { ...prev, content_warning: next };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.body.trim()) {
      setErrorMsg('Please write your letter before submitting.');
      return;
    }
    if (!formData.confirmed_safety) {
      setErrorMsg('Please confirm that you understand this is not emergency support or therapy.');
      return;
    }

    addSubmission({
      submission_type: 'dear_red',
      title: formData.title,
      body: formData.body,
      alias: formData.alias || 'Anonymous',
      email: formData.email,
      recipient: formData.recipient,
      consent_publication: formData.consent_publication,
      publication_identity: formData.consent_publication === 'alias' ? 'alias' : 'anonymous',
      content_warning: formData.content_warning.join(', '),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="dear-red-container page-padding">
        <div className="dear-red-paper-box text-center">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>SUBMISSION RECEIVED</span>
          <h2 className="dear-red-title" style={{ marginTop: '0.5rem' }}>Your letter has been placed in the envelope.</h2>
          <p className="dear-red-intro" style={{ marginBottom: '2rem' }}>
            Thank you for sharing your letter. If you marked it for private archive only, it will never be published. If you gave permission to publish, an editor will review it before any public release.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/dear-red" className="btn btn-primary">
              Return to Dear Red Archive &rarr;
            </Link>
            <button onClick={() => setSubmitted(false)} className="btn btn-secondary-dark">
              Write another letter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dear-red-container page-padding">
      <header className="dear-red-header text-center">
        <span className="small-label" style={{ color: 'var(--color-brass)' }}>PRIVATE INTIMATE CHANNEL</span>
        <h1 className="dear-red-title">Dear Red</h1>
        <p className="dear-red-intro">
          A place to write what you cannot say directly to someone else.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="dear-red-form-box">
        {errorMsg && (
          <div className="dear-red-error-banner" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="letter-title">Letter Title (optional)</label>
          <input 
            type="text"
            id="letter-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. The Map You Left Behind"
          />
        </div>

        <div className="form-group">
          <label htmlFor="letter-recipient">Who is this letter for? (optional)</label>
          <input 
            type="text"
            id="letter-recipient"
            value={formData.recipient}
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            placeholder="e.g. To the storm, To my father, To Red"
          />
        </div>

        <div className="form-group">
          <label htmlFor="letter-body">Your Letter <span className="required-star">*</span></label>
          <textarea 
            id="letter-body"
            required
            rows="8"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Write what you couldn't say..."
          ></textarea>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="letter-alias">Name or Alias (optional)</label>
            <input 
              type="text"
              id="letter-alias"
              value={formData.alias}
              onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
              placeholder="e.g. A Quiet Listener, or leave blank for Anonymous"
            />
          </div>

          <div className="form-group">
            <label htmlFor="letter-email">Email (optional)</label>
            <input 
              type="email"
              id="letter-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Only if you wish to receive editorial follow-up"
            />
          </div>
        </div>

        {/* Permission Options */}
        <fieldset className="form-fieldset">
          <legend className="fieldset-legend">Publication Permission</legend>
          <label className="radio-option">
            <input 
              type="radio" 
              name="consent_publication"
              value="private"
              checked={formData.consent_publication === 'private'}
              onChange={(e) => setFormData({ ...formData, consent_publication: e.target.value })}
            />
            <span><strong>Keep completely private</strong> (Stored in private archive only, never published)</span>
          </label>
          <label className="radio-option">
            <input 
              type="radio" 
              name="consent_publication"
              value="anonymous"
              checked={formData.consent_publication === 'anonymous'}
              onChange={(e) => setFormData({ ...formData, consent_publication: e.target.value })}
            />
            <span><strong>May be published anonymously after editing</strong></span>
          </label>
          <label className="radio-option">
            <input 
              type="radio" 
              name="consent_publication"
              value="alias"
              checked={formData.consent_publication === 'alias'}
              onChange={(e) => setFormData({ ...formData, consent_publication: e.target.value })}
            />
            <span><strong>May be published using my alias</strong></span>
          </label>
        </fieldset>

        {/* Content Warnings */}
        <fieldset className="form-fieldset">
          <legend className="fieldset-legend">Content Warnings (optional)</legend>
          <div className="checkbox-grid">
            {['Grief', 'Family Trauma', 'Loss', 'Mental Health', 'Abandonment'].map(cw => (
              <label key={cw} className="checkbox-option">
                <input 
                  type="checkbox"
                  checked={formData.content_warning.includes(cw)}
                  onChange={() => handleCwToggle(cw)}
                />
                <span>{cw}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Safety Disclaimer Confirmation */}
        <div className="safety-disclaimer-box">
          <label className="checkbox-option safety-option">
            <input 
              type="checkbox"
              required
              checked={formData.confirmed_safety}
              onChange={(e) => setFormData({ ...formData, confirmed_safety: e.target.checked })}
            />
            <span>
              I understand this form is not therapy, an encrypted medical/legal service, emergency support, or guaranteed publication. Submissions marked private will not be intentionally published.
            </span>
          </label>
        </div>

        <div className="form-actions text-center" style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary btn-large">
            Place Letter in Envelope &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
