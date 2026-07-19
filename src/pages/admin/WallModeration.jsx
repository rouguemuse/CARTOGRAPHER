import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, writeBatch, serverTimestamp } from 'firebase/firestore';

export default function WallModeration() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'private_wall_submissions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subs = [];
      snapshot.forEach((doc) => {
        subs.push({ id: doc.id, ...doc.data() });
      });
      setSubmissions(subs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, newStatus, rawData = null) => {
    try {
      if (newStatus === 'published' && rawData) {
        const batch = writeBatch(db);
        
        // 1. Create sanitized copy in public collection
        const publicRef = doc(collection(db, "wall_submissions")); // keeping public wall as "wall_submissions" so existing front-end works
        batch.set(publicRef, {
          explanation: rawData.explanation,
          creditAs: rawData.creditAs || 'Anonymous',
          consent: rawData.consent,
          status: 'published',
          moderatedAt: serverTimestamp(),
          originalId: id
        });
        
        // 2. Mark private record as processed
        const privateRef = doc(db, "private_wall_submissions", id);
        batch.update(privateRef, { status: 'approved', archived: true, publicDocId: publicRef.id });
        
        await batch.commit();
        alert("Approved and published to public wall.");
      } else if (newStatus === 'rejected' || newStatus === 'archived') {
        await updateDoc(doc(db, 'private_wall_submissions', id), {
          status: 'archived',
          deletedAt: serverTimestamp()
        });
      } else {
        await updateDoc(doc(db, 'private_wall_submissions', id), {
          status: newStatus
        });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Check permissions.");
    }
  };

  const handleSaveRedaction = async (id, redactedText) => {
    try {
      await updateDoc(doc(db, 'private_wall_submissions', id), {
        explanation: redactedText
      });
      alert("Redaction saved!");
    } catch (err) {
      console.error("Error saving redaction:", err);
      alert("Failed to save redaction.");
    }
  };
  
  const handleSaveNote = async (id, note) => {
    try {
      await updateDoc(doc(db, 'private_wall_submissions', id), {
        adminNote: note
      });
      alert("Note saved!");
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save note.");
    }
  };

  const filteredSubmissions = submissions.filter(sub => sub.status === filter);

  return (
    <div style={{maxWidth: '900px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'var(--font-display)', marginBottom: '1rem'}}>Wall Moderation</h1>
      <p style={{marginBottom: '2rem', color: 'var(--color-bone)'}}>Review, redact, and publish entries from "Things I Should Have Said".</p>

      {/* Filters */}
      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-charcoal-light)', paddingBottom: '1rem'}}>
        <button 
          onClick={() => setFilter('pending')}
          style={{background: 'none', border: 'none', color: filter === 'pending' ? 'var(--red-bright)' : 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.1rem'}}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilter('published')}
          style={{background: 'none', border: 'none', color: filter === 'published' ? 'var(--red-bright)' : 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.1rem'}}
        >
          Published
        </button>
        <button 
          onClick={() => setFilter('archived')}
          style={{background: 'none', border: 'none', color: filter === 'archived' ? 'var(--red-bright)' : 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.1rem'}}
        >
          Archived / Rejected
        </button>
      </div>

      {loading ? (
        <p>Loading submissions...</p>
      ) : filteredSubmissions.length === 0 ? (
        <p style={{fontStyle: 'italic', color: 'var(--color-bone)'}}>No {filter} submissions.</p>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          {filteredSubmissions.map(sub => (
            <SubmissionCard 
              key={sub.id} 
              sub={sub} 
              onUpdateStatus={handleUpdateStatus} 
              onSaveRedaction={handleSaveRedaction}
              onSaveNote={handleSaveNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubmissionCard({ sub, onUpdateStatus, onSaveRedaction, onSaveNote }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(sub.explanation || '');
  const [noteText, setNoteText] = useState(sub.adminNote || '');

  return (
    <div style={{background: 'var(--color-charcoal)', border: '1px solid var(--color-charcoal-light)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      
      {/* Header Meta */}
      <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', fontSize: '0.85rem'}}>
        <div>
          <strong>Alias:</strong> {sub.alias || 'None provided'} &nbsp;|&nbsp; 
          <strong>Credit as:</strong> {sub.creditAs} &nbsp;|&nbsp;
          <strong>Consent:</strong> {sub.consent ? 'Yes' : 'No'}
        </div>
        <div style={{color: 'var(--color-bone)'}}>
          {sub.createdAt ? new Date(sub.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
        </div>
      </div>

      {/* Main Content */}
      <div>
        {editing ? (
          <div>
            <textarea 
              value={editText} 
              onChange={e => setEditText(e.target.value)}
              rows="6"
              style={{width: '100%', padding: '0.5rem', background: 'var(--color-obsidian)', color: 'var(--color-bone)', border: '1px solid var(--color-charcoal-light)', marginBottom: '0.5rem'}}
            />
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button className="btn btn-primary" style={{padding: '0.3rem 0.8rem', fontSize: '0.8rem'}} onClick={() => { onSaveRedaction(sub.id, editText); setEditing(false); }}>Save Redaction</button>
              <button className="btn" style={{padding: '0.3rem 0.8rem', fontSize: '0.8rem'}} onClick={() => { setEditText(sub.explanation); setEditing(false); }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{whiteSpace: 'pre-wrap', lineHeight: '1.5', margin: '0 0 1rem 0'}}>{sub.explanation}</p>
            <button className="btn" style={{padding: '0.2rem 0.5rem', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--color-charcoal-light)', color: 'var(--color-bone)'}} onClick={() => setEditing(true)}>Edit / Redact</button>
          </div>
        )}
      </div>
      
      {/* Admin Note */}
      <div style={{background: 'var(--color-obsidian)', padding: '1rem', borderLeft: '3px solid var(--color-charcoal-light)'}}>
        <label style={{display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Private Admin Note</label>
        <textarea 
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Add internal note here..."
          rows="2"
          style={{width: '100%', padding: '0.5rem', background: 'var(--color-charcoal)', color: 'var(--color-bone)', border: 'none', marginBottom: '0.5rem'}}
        />
        <button className="btn" style={{padding: '0.2rem 0.5rem', fontSize: '0.75rem'}} onClick={() => onSaveNote(sub.id, noteText)}>Save Note</button>
      </div>

      {/* Actions */}
      <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
        {sub.status !== 'published' && sub.status !== 'approved' && (
          <button className="btn" style={{background: 'var(--red-bright)', color: 'white', border: 'none'}} onClick={() => onUpdateStatus(sub.id, 'published', sub)}>Approve & Publish</button>
        )}
        {(sub.status === 'published' || sub.status === 'approved') && (
          <button className="btn" style={{background: 'transparent', color: 'var(--color-bone)', border: '1px solid var(--color-bone)'}} onClick={() => alert('Unpublishing requires deleting the public document. Soft delete (archived) in private collection instead.')}>Already Published</button>
        )}
        {sub.status !== 'archived' && (
          <button className="btn" style={{background: 'transparent', color: 'var(--color-bone)', border: '1px solid var(--color-charcoal-light)'}} onClick={() => onUpdateStatus(sub.id, 'archived')}>Archive / Reject</button>
        )}
      </div>

    </div>
  );
}
