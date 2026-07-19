import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default function DearRedInbox() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('new');

  useEffect(() => {
    const q = query(collection(db, 'dear_red_inbox'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setLetters(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'dear_red_inbox', id), {
        status: newStatus
      });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  const filteredLetters = letters.filter(l => l.status === filter);

  return (
    <div style={{maxWidth: '900px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'var(--font-display)', marginBottom: '1rem'}}>Dear Red Inbox</h1>
      <p style={{marginBottom: '2rem', color: 'var(--color-bone)'}}>Private correspondence and advice column queue.</p>

      {/* Filters */}
      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-charcoal-light)', paddingBottom: '1rem', flexWrap: 'wrap'}}>
        {['new', 'reading', 'responded', 'published', 'closed'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{background: 'none', border: 'none', textTransform: 'capitalize', color: filter === f ? 'var(--red-bright)' : 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.1rem'}}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading inbox...</p>
      ) : filteredLetters.length === 0 ? (
        <p style={{fontStyle: 'italic', color: 'var(--color-bone)'}}>No {filter} letters.</p>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          {filteredLetters.map(letter => (
            <InboxCard key={letter.id} letter={letter} onUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}

function InboxCard({ letter, onUpdateStatus }) {
  const isPublishable = letter.publishPermission === 'yes';

  return (
    <div style={{background: 'var(--color-charcoal)', border: '1px solid', borderColor: isPublishable ? 'var(--color-bone)' : 'var(--color-charcoal-light)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      
      {/* Header Meta */}
      <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', fontSize: '0.85rem'}}>
        <div>
          <strong>From:</strong> {letter.alias || 'Anonymous'} &nbsp;|&nbsp; 
          <strong>Email:</strong> {letter.email || 'None provided'} &nbsp;|&nbsp;
          <strong>Response:</strong> <span style={{textTransform: 'capitalize'}}>{letter.responsePreference}</span>
        </div>
        <div style={{color: 'var(--color-bone)'}}>
          {letter.createdAt ? new Date(letter.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
        </div>
      </div>

      {/* Privacy Warning */}
      <div style={{padding: '0.5rem 1rem', background: isPublishable ? 'rgba(0, 255, 0, 0.05)' : 'rgba(255, 0, 0, 0.05)', borderLeft: `3px solid ${isPublishable ? 'green' : 'var(--red-bright)'}`, fontSize: '0.85rem', fontWeight: 'bold', color: isPublishable ? '#88cc88' : 'var(--red-bright)'}}>
        {isPublishable 
          ? `✓ PERMISSION TO PUBLISH GRANTED (Credit as: ${letter.creditAs})` 
          : `✕ PRIVATE - DO NOT PUBLISH`}
      </div>

      {/* Main Content */}
      <div>
        <p style={{whiteSpace: 'pre-wrap', lineHeight: '1.5', margin: '0 0 1rem 0'}}>{letter.letter}</p>
        
        {letter.question && (
          <div style={{padding: '1rem', background: 'var(--color-obsidian)', borderLeft: '2px solid var(--color-charcoal-light)'}}>
            <strong>Question for Red:</strong><br/>
            {letter.question}
          </div>
        )}
      </div>

      {/* Status Controls */}
      <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
        <span style={{fontSize: '0.85rem', marginRight: '0.5rem'}}>Update Status:</span>
        {['new', 'reading', 'responded', 'published', 'closed'].map(s => (
          <button 
            key={s}
            className="btn" 
            style={{
              padding: '0.3rem 0.6rem', 
              fontSize: '0.75rem', 
              textTransform: 'capitalize',
              background: letter.status === s ? 'var(--color-bone)' : 'transparent',
              color: letter.status === s ? 'var(--color-charcoal)' : 'var(--color-bone)',
              border: '1px solid var(--color-bone)'
            }} 
            onClick={() => onUpdateStatus(letter.id, s)}
            disabled={letter.status === s || (s === 'published' && !isPublishable)}
            title={s === 'published' && !isPublishable ? 'Cannot publish without permission' : ''}
          >
            {s}
          </button>
        ))}
      </div>

    </div>
  );
}
