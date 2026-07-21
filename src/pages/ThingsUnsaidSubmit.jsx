import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addSubmission } from '../data/submissionsStore';
import './DearRed.css';

export default function ThingsUnsaidSubmit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    body: '',
    alias: '',
    category: 'Grief',
    consent_publication: false,
    confirmed_no_identifying_info: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const MAX_CHARS = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.body.trim()) {
      setErrorMsg('Please write your statement.');
      return;
    }
    if (formData.body.length > MAX_CHARS) {
      setErrorMsg(`Statement must be under ${MAX_CHARS} characters.`);
      return;
    }
    if (!formData.consent_publication) {
      setErrorMsg('Please confirm permission to publish your statement to the wall.');
      return;
    }
    if (!formData.confirmed_no_identifying_info) {
      setErrorMsg('Please confirm that identifying names/details have been removed.');
      return;
    }

    addSubmission({
      submission_type: 'things_unsaid',
      body: formData.body,
      alias: formData.alias || 'Anonymous',
      category: formData.category,
      consent_publication: 'published',
      publication_identity: formData.alias ? 'alias' : 'anonymous',
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="dear-red-container page-padding">
        <div className="dear-red-paper-box text-center">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>STATEMENT SUBMITTED</span>
          <h2 className="dear-red-title" style={{ marginTop: '0.5rem' }}>Your statement has been sent to the moderation queue.</h2>
          <p className="dear-red-intro" style={{ marginBottom: '2rem' }}>
            Every entry is reviewed by a human moderator before appearing on the wall to protect privacy and prevent spam. Thank you for leaving your unsaid statement.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/things-i-should-have-said" className="btn btn-primary">
              View the Public Wall &rarr;
            </Link>
            <button onClick={() => setSubmitted(false)} className="btn btn-secondary-dark">
              Submit another statement
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dear-red-container page-padding">
      <header className="dear-red-header text-center">
        <span className="small-label" style={{ color: 'var(--color-brass)' }}>PUBLIC MODERATED WALL</span>
        <h1 className="dear-red-title">The Wall of Things Unsaid</h1>
        <p className="dear-red-intro">
          Submit one sentence or brief statement you never said out loud.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="dear-red-form-box">
        {errorMsg && (
          <div className="dear-red-error-banner" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="unsaid-category">Category <span className="required-star">*</span></label>
          <select 
            id="unsaid-category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="Love">Love</option>
            <option value="Grief">Grief</option>
            <option value="Anger">Anger</option>
            <option value="Family">Family</option>
            <option value="Leaving">Leaving</option>
            <option value="Apology">Apology</option>
            <option value="Survival">Survival</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="unsaid-body">
            The Unsaid Statement <span className="required-star">*</span>
            <span style={{ float: 'right', fontSize: '12px', color: formData.body.length > MAX_CHARS ? 'var(--color-crimson)' : 'var(--color-bone)' }}>
              {formData.body.length}/{MAX_CHARS} chars
            </span>
          </label>
          <textarea 
            id="unsaid-body"
            required
            rows="5"
            maxLength={MAX_CHARS}
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Write the sentence you never got to say..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="unsaid-alias">Alias or Pen Name (optional)</label>
          <input 
            type="text"
            id="unsaid-alias"
            value={formData.alias}
            onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
            placeholder="e.g. A Quiet Witness, or leave blank for Anonymous"
          />
        </div>

        <div className="safety-disclaimer-box">
          <label className="checkbox-option safety-option">
            <input 
              type="checkbox"
              required
              checked={formData.consent_publication}
              onChange={(e) => setFormData({ ...formData, consent_publication: e.target.checked })}
            />
            <span>
              I grant permission to publish this statement anonymously or under my alias on the Wall of Things Unsaid after moderation.
            </span>
          </label>

          <label className="checkbox-option safety-option" style={{ marginTop: '0.75rem' }}>
            <input 
              type="checkbox"
              required
              checked={formData.confirmed_no_identifying_info}
              onChange={(e) => setFormData({ ...formData, confirmed_no_identifying_info: e.target.checked })}
            />
            <span>
              I confirm that all real legal names, specific addresses, and identifying personal details have been removed or changed.
            </span>
          </label>
        </div>

        <div className="form-actions text-center" style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary btn-large">
            Submit Statement to Moderation &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
