import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addSubmission } from '../data/submissionsStore';
import './DearRed.css';

export default function SubmitHub() {
  const navigate = useNavigate();

  const [submissionType, setSubmissionType] = useState('field_guide');
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    alias: '',
    legal_name: '',
    email: '',
    bio: '',
    links: '',
    content_warning: '',
    rights_confirmed: false,
    originality_confirmed: false,
    consent_editing: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTypeSelect = (type) => {
    if (type === 'dear_red') {
      navigate('/dear-red/write');
      return;
    }
    if (type === 'things_unsaid') {
      navigate('/things-unsaid/submit');
      return;
    }
    setSubmissionType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.body.trim()) {
      setErrorMsg('Please enter your work or submission text.');
      return;
    }
    if (!formData.rights_confirmed || !formData.originality_confirmed) {
      setErrorMsg('Please confirm ownership and originality of your work.');
      return;
    }

    addSubmission({
      submission_type: submissionType,
      title: formData.title,
      body: formData.body,
      alias: formData.alias || formData.legal_name || 'Contributor',
      legal_name: formData.legal_name,
      email: formData.email,
      consent_publication: 'under_review',
      consent_editing: formData.consent_editing,
      content_warning: formData.content_warning,
      publication_identity: formData.alias ? 'alias' : 'legal_name'
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="dear-red-container page-padding">
        <div className="dear-red-paper-box text-center">
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>GENERAL SUBMISSION RECEIVED</span>
          <h2 className="dear-red-title" style={{ marginTop: '0.5rem' }}>Your work has been submitted to the editors.</h2>
          <p className="dear-red-intro" style={{ marginBottom: '2rem' }}>
            Thank you for sending your work to How to Explain Yourself to Wolves. If selected for publication, we will reach out via email to confirm all publication terms and edits before anything is released.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/archive" className="btn btn-primary">
              Return to Archive &rarr;
            </Link>
            <button onClick={() => setSubmitted(false)} className="btn btn-secondary-dark">
              Submit another work
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dear-red-container page-padding">
      <header className="dear-red-header text-center">
        <span className="small-label" style={{ color: 'var(--color-brass)' }}>CONTRIBUTOR PORTAL</span>
        <h1 className="dear-red-title">Submissions</h1>
        <p className="dear-red-intro">
          Choose a channel below to submit your writing, letters, statements, or collaborations.
        </p>
      </header>

      {/* Submission Channel Picker Cards */}
      <div className="submission-channel-picker" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        
        <div 
          onClick={() => handleTypeSelect('dear_red')}
          className="dear-red-card"
          style={{ cursor: 'pointer', borderLeft: '4px solid var(--color-crimson)' }}
        >
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>PRIVATE / INTIMATE</span>
          <h3 className="card-letter-title" style={{ marginTop: '0.35rem' }}>Dear Red</h3>
          <p className="card-letter-excerpt">
            Private letters written to someone or a storm you cannot address directly.
          </p>
          <span className="read-letter-link">Write a letter &rarr;</span>
        </div>

        <div 
          onClick={() => handleTypeSelect('things_unsaid')}
          className="dear-red-card"
          style={{ cursor: 'pointer', borderLeft: '4px solid var(--color-brass)' }}
        >
          <span className="small-label" style={{ color: 'var(--color-brass)' }}>PUBLIC MODERATED</span>
          <h3 className="card-letter-title" style={{ marginTop: '0.35rem' }}>The Wall of Things Unsaid</h3>
          <p className="card-letter-excerpt">
            One short statement released into public air.
          </p>
          <span className="read-letter-link">Leave a statement &rarr;</span>
        </div>

        <div 
          onClick={() => handleTypeSelect('field_guide')}
          className={`dear-red-card ${submissionType === 'field_guide' ? 'is-active-type' : ''}`}
          style={{ cursor: 'pointer', borderLeft: '4px solid #4a90e2' }}
        >
          <span className="small-label" style={{ color: '#4a90e2' }}>ESSAYS & STORIES</span>
          <h3 className="card-letter-title" style={{ marginTop: '0.35rem' }}>General Submissions</h3>
          <p className="card-letter-excerpt">
            Field Guide essays, personal stories, artwork, and audio.
          </p>
          <span className="read-letter-link">Fill form below &darr;</span>
        </div>

      </div>

      {/* General Submission Form */}
      <form onSubmit={handleSubmit} className="dear-red-form-box">
        <h2 className="section-title text-center" style={{ marginBottom: '1.5rem' }}>
          General Submission Form
        </h2>

        {errorMsg && (
          <div className="dear-red-error-banner" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="submission-type">Submission Type <span className="required-star">*</span></label>
          <select 
            id="submission-type"
            value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}
            required
          >
            <option value="field_guide">Field Guide Essay</option>
            <option value="story">Personal Story</option>
            <option value="artwork">Artwork or Photography</option>
            <option value="audio">Audio Reading</option>
            <option value="other">Other Collaboration</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gen-title">Title of Work <span className="required-star">*</span></label>
          <input 
            type="text"
            id="gen-title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title of your essay, story, or project"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gen-body">Work / Text Body <span className="required-star">*</span></label>
          <textarea 
            id="gen-body"
            required
            rows="10"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Paste your essay, story text, or project description..."
          ></textarea>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="gen-alias">Pen Name or Alias (optional)</label>
            <input 
              type="text"
              id="gen-alias"
              value={formData.alias}
              onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
              placeholder="Name as you want it published"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gen-legal-name">Legal Name</label>
            <input 
              type="text"
              id="gen-legal-name"
              value={formData.legal_name}
              onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
              placeholder="For editorial contact"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="gen-email">Email Address <span className="required-star">*</span></label>
          <input 
            type="email"
            id="gen-email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Where we can contact you regarding your submission"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gen-bio">Short Bio (optional)</label>
          <textarea 
            id="gen-bio"
            rows="3"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="2-3 sentences about yourself..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="gen-links">Relevant Links / Portfolio (optional)</label>
          <input 
            type="text"
            id="gen-links"
            value={formData.links}
            onChange={(e) => setFormData({ ...formData, links: e.target.value })}
            placeholder="Website, social link, or portfolio"
          />
        </div>

        {/* Rights & Terms Box */}
        <div className="safety-disclaimer-box">
          <span className="small-label" style={{ color: 'var(--color-brass)', display: 'block', marginBottom: '0.5rem' }}>
            CREATOR RIGHTS STATEMENT
          </span>
          <blockquote className="dossier-excerpt" style={{ color: 'var(--color-parchment)', fontSize: '14px', marginBottom: '1.25rem' }}>
            "You retain ownership of your work. By submitting, you give How to Explain Yourself to Wolves permission to review it. If selected, publication terms and any edits will be confirmed with you before publication."
          </blockquote>

          <label className="checkbox-option safety-option">
            <input 
              type="checkbox"
              required
              checked={formData.rights_confirmed}
              onChange={(e) => setFormData({ ...formData, rights_confirmed: e.target.checked })}
            />
            <span>I confirm I own full rights to this work and agree to the creator terms above.</span>
          </label>

          <label className="checkbox-option safety-option" style={{ marginTop: '0.75rem' }}>
            <input 
              type="checkbox"
              required
              checked={formData.originality_confirmed}
              onChange={(e) => setFormData({ ...formData, originality_confirmed: e.target.checked })}
            />
            <span>I confirm this work is original and does not violate third-party copyright.</span>
          </label>
        </div>

        <div className="form-actions text-center" style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary btn-large">
            Submit Work for Review &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
