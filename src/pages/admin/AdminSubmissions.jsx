import { useState, useEffect } from 'react';
import { 
  getSubmissionsStore, 
  updateSubmissionStatus, 
  exportSubmissionsJSON, 
  exportSubmissionsCSV 
} from '../../data/submissionsStore';
import '../DearRed.css';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeItem, setActiveItem] = useState(null);
  const [editPublishedBody, setEditPublishedBody] = useState('');
  const [editModNotes, setEditModNotes] = useState('');
  const [editEditorNote, setEditEditorNote] = useState('');

  const loadSubmissions = () => {
    setSubmissions(getSubmissionsStore());
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleOpenDetail = (item) => {
    setActiveItem(item);
    setEditPublishedBody(item.published_body || item.body || '');
    setEditModNotes(item.moderator_notes || '');
    setEditEditorNote(item.editor_note || '');
  };

  const handleUpdateStatus = (id, newStatus) => {
    updateSubmissionStatus(id, newStatus, editModNotes, editPublishedBody, editEditorNote);
    loadSubmissions();
    setActiveItem(null);
  };

  const handleExportJSON = () => {
    const jsonStr = exportSubmissionsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-export-${Date.now()}.json`;
    a.click();
  };

  const handleExportCSV = () => {
    const csvStr = exportSubmissionsCSV();
    const blob = new Blob([csvStr], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-export-${Date.now()}.csv`;
    a.click();
  };

  const filteredSubmissions = submissions.filter(s => {
    if (typeFilter !== 'all' && s.submission_type !== typeFilter) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (s.title || '').toLowerCase().includes(q);
      const aliasMatch = (s.alias || '').toLowerCase().includes(q);
      const emailMatch = (s.email || '').toLowerCase().includes(q);
      const bodyMatch = (s.body || '').toLowerCase().includes(q);
      if (!titleMatch && !aliasMatch && !emailMatch && !bodyMatch) return false;
    }
    return true;
  });

  return (
    <div className="dear-red-container page-padding" style={{ width: '100%', maxWidth: '1200px' }}>
      <header className="dear-red-header text-center">
        <span className="small-label" style={{ color: 'var(--color-brass)' }}>ADMINISTRATIVE QUEUE</span>
        <h1 className="dear-red-title">Submissions Dashboard</h1>
        <p className="dear-red-intro">
          Review, moderate, edit, and publish incoming submissions for Dear Red, Wall of Things Unsaid, and Field Guide essays.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button onClick={handleExportJSON} className="btn btn-secondary-dark" style={{ fontSize: '13px' }}>
            Export JSON
          </button>
          <button onClick={handleExportCSV} className="btn btn-secondary-dark" style={{ fontSize: '13px' }}>
            Export CSV
          </button>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div style={{ background: '#141a17', padding: '1.5rem', borderRadius: '4px', border: '1px solid rgba(230,220,195,0.15)', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-brass)', marginBottom: '0.35rem' }}>TYPE FILTER</label>
            <select 
              value={typeFilter} 
              onChange={e => setTypeFilter(e.target.value)}
              style={{ width: '100%', background: '#080c0a', color: '#fff', border: '1px solid #334', padding: '0.6rem', borderRadius: '4px' }}
            >
              <option value="all">All Submission Types</option>
              <option value="dear_red">Dear Red Letters</option>
              <option value="things_unsaid">Wall of Things Unsaid</option>
              <option value="field_guide">Field Guide Essays</option>
              <option value="story">Personal Stories</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-brass)', marginBottom: '0.35rem' }}>STATUS FILTER</label>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              style={{ width: '100%', background: '#080c0a', color: '#fff', border: '1px solid #334', padding: '0.6rem', borderRadius: '4px' }}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
              <option value="declined">Declined</option>
              <option value="private_archive">Private Archive Only</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-brass)', marginBottom: '0.35rem' }}>SEARCH</label>
            <input 
              type="text" 
              placeholder="Search title, alias, email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: '#080c0a', color: '#fff', border: '1px solid #334', padding: '0.6rem', borderRadius: '4px' }}
            />
          </div>

        </div>
      </div>

      {/* Submissions Data Table */}
      <div style={{ overflowX: 'auto', background: '#141a17', borderRadius: '4px', border: '1px solid rgba(230,220,195,0.15)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(230,220,195,0.15)', background: '#0a0f0d', color: 'var(--color-brass)' }}>
              <th style={{ padding: '1rem' }}>Type</th>
              <th style={{ padding: '1rem' }}>Title / Statement Excerpt</th>
              <th style={{ padding: '1rem' }}>Alias / Email</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Created</th>
              <th style={{ padding: '1rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-bone)' }}>
                  No submissions matched your search criteria.
                </td>
              </tr>
            ) : (
              filteredSubmissions.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(230,220,195,0.08)' }}>
                  <td style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--color-brass)' }}>
                    {item.submission_type}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-parchment)' }}>
                    {item.title || item.body.slice(0, 50) + '...'}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-bone)' }}>
                    {item.alias || 'Anonymous'} {item.email ? `(${item.email})` : ''}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.6rem', 
                      borderRadius: '3px', 
                      fontSize: '11px', 
                      fontWeight: 700,
                      background: item.status === 'published' ? '#2e7d32' : item.status === 'new' ? '#b51f27' : '#455a64',
                      color: '#fff'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '12px', color: 'var(--color-bone)' }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => handleOpenDetail(item)}
                      className="btn btn-primary"
                      style={{ padding: '0.35rem 0.85rem', fontSize: '12px' }}
                    >
                      Review & Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Item Review & Editing Drawer / Modal */}
      {activeItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#181f1c', border: '1px solid var(--color-brass)', padding: '2.25rem', borderRadius: '6px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left', color: 'var(--color-parchment)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="small-label" style={{ color: 'var(--color-brass)' }}>
                MODERATION REVIEW & EDITING
              </span>
              <button 
                onClick={() => setActiveItem(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', margin: '0 0 0.5rem' }}>
              {activeItem.title || 'Untitled Submission'}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--color-bone)', marginBottom: '1.5rem' }}>
              <strong>Type:</strong> {activeItem.submission_type} | <strong>Submitted by:</strong> {activeItem.alias || 'Anonymous'} ({activeItem.email || 'No email'}) | <strong>Permission:</strong> {activeItem.consent_publication}
            </p>

            {/* Untouched Original Body */}
            <div style={{ background: '#0a0f0d', padding: '1rem 1.25rem', borderRadius: '4px', borderLeft: '4px solid #666', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-brass)', display: 'block', marginBottom: '0.35rem' }}>ORIGINAL SUBMISSION BODY (UNTOUCHED)</span>
              <p style={{ fontStyle: 'italic', fontSize: '14px', whiteSpace: 'pre-wrap', margin: 0 }}>{activeItem.body}</p>
            </div>

            {/* Editable Published Body */}
            <div className="form-group">
              <label>EDITABLE PUBLISHED VERSION</label>
              <textarea 
                rows="6"
                value={editPublishedBody}
                onChange={e => setEditPublishedBody(e.target.value)}
                style={{ width: '100%', background: '#080c0a', color: '#fff', border: '1px solid #445', padding: '0.75rem', borderRadius: '4px' }}
              ></textarea>
            </div>

            {/* Editor's Note (for Dear Red) */}
            {activeItem.submission_type === 'dear_red' && (
              <div className="form-group">
                <label>EDITOR'S NOTE (Publicly displayed below letter)</label>
                <input 
                  type="text"
                  value={editEditorNote}
                  onChange={e => setEditEditorNote(e.target.value)}
                  placeholder="e.g. Published with submitter consent. Anonymized by editor."
                  style={{ width: '100%', background: '#080c0a', color: '#fff', border: '1px solid #445', padding: '0.75rem', borderRadius: '4px' }}
                />
              </div>
            )}

            {/* Internal Moderator Notes */}
            <div className="form-group">
              <label>INTERNAL MODERATOR NOTES (Private to team)</label>
              <input 
                type="text"
                value={editModNotes}
                onChange={e => setEditModNotes(e.target.value)}
                placeholder="e.g. Identity verified, clear of personal accusations."
                style={{ width: '100%', background: '#080c0a', color: '#fff', border: '1px solid #445', padding: '0.75rem', borderRadius: '4px' }}
              />
            </div>

            {/* Workflow Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <button 
                onClick={() => handleUpdateStatus(activeItem.id, 'published')}
                className="btn btn-primary"
                style={{ background: '#2e7d32' }}
              >
                Publish Publicly
              </button>

              <button 
                onClick={() => handleUpdateStatus(activeItem.id, 'approved')}
                className="btn btn-secondary-dark"
              >
                Approve (Pending Schedule)
              </button>

              <button 
                onClick={() => handleUpdateStatus(activeItem.id, 'private_archive')}
                className="btn btn-secondary-dark"
              >
                Private Archive Only
              </button>

              <button 
                onClick={() => handleUpdateStatus(activeItem.id, 'declined')}
                className="btn btn-ghost-sm"
                style={{ color: '#ff9999' }}
              >
                Decline Submission
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
