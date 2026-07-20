import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ExplanationForm from '../components/ExplanationForm';
import TactilePaperFragment from '../components/TactilePaperFragment';

export default function ThingsIShouldHaveSaid() {
  const [approvedStatements, setApprovedStatements] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [loading, setLoading] = useState(true);

  const tags = [
    { value: 'all', label: 'All Fragments' },
    { value: 'to-the-wolf', label: 'To the wolf' },
    { value: 'to-my-mother', label: 'To my mother' },
    { value: 'to-my-younger-self', label: 'To my younger self' },
    { value: 'to-the-person-i-left', label: 'To the person I left' },
    { value: 'to-the-person-who-left', label: 'To the person who left' },
    { value: 'to-myself', label: 'To myself' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const q = query(
          collection(db, 'wall_submissions'),
          where('status', '==', 'approved')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docs = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            submittedAt: doc.data().submittedAt?.toDate ? doc.data().submittedAt.toDate() : null
          }));
          setApprovedStatements(docs);
        } else {
          // Fallback initial tactile fragments if wall queue is newly initialized
          setApprovedStatements([
            {
              id: 'seed-1',
              statement: 'I realized being understood by you required me to apologize for things I never did.',
              alias: 'A traveler on the bridge',
              destinationTag: 'to-the-wolf',
              submittedAt: new Date('2026-07-01')
            },
            {
              id: 'seed-2',
              statement: 'I kept quiet because I thought my silence would keep the house safe.',
              alias: 'Younger self',
              destinationTag: 'to-my-mother',
              submittedAt: new Date('2026-07-05')
            },
            {
              id: 'seed-3',
              statement: 'You did not storm; you simply frosted every surface until I stopped asking.',
              alias: 'Anonymous',
              destinationTag: 'to-the-person-i-left',
              submittedAt: new Date('2026-07-10')
            }
          ]);
        }
      } catch (err) {
        console.warn("Could not query approved wall statements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  const filteredStatements = approvedStatements.filter(item => 
    selectedTag === 'all' || item.destinationTag === selectedTag
  );

  return (
    <div className="container archive-page" style={{ padding: '2rem 0 6rem' }}>
      {/* Breadcrumbs */}
      <nav className="entry-meta" aria-label="Breadcrumb" style={{ marginBottom: '1.75rem' }}>
        <Link to="/archive">The Archive</Link>
        <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>Unsaid Wall</span>
      </nav>

      {/* Header */}
      <header className="archive-masthead" style={{ textAlign: 'left', borderBottom: '2px solid var(--paper-line)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <span className="page-kicker">Public Tactile Wall</span>
        <h1 className="page-title">Things I Should Have Said</h1>
        <p className="page-introduction" style={{ fontSize: 'var(--text-reading-large)', fontWeight: 500, color: 'var(--ink)', marginBottom: '0.5rem' }}>
          What did you need to say when it was no longer safe, useful, or possible to say it?
        </p>
        <p className="entry-meta" style={{ fontStyle: 'italic', color: 'var(--muted)', margin: 0 }}>
          An anonymous wall of sentences left behind after the conversation ended.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
        
        {/* Left Column: Form */}
        <div>
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Leave a Sentence on the Wall</h2>
          <ExplanationForm />
        </div>

        {/* Right Column: Tactile Wall Feed & Filter */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="card-title" style={{ margin: 0 }}>The Unsaid Wall</h2>
          </div>

          {/* Tag Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {tags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedTag(tag.value)}
                className={`btn ${selectedTag === tag.value ? 'btn-primary' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="entry-meta">Gathering paper fragments...</p>
          ) : filteredStatements.length === 0 ? (
            <div className="archive-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <p className="card-description" style={{ margin: 0 }}>
                No fragments found for this tag yet. Use the form on the left to leave the first sentence.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
              {filteredStatements.map((item, idx) => (
                <TactilePaperFragment
                  key={item.id}
                  statement={item.statement}
                  alias={item.alias}
                  destinationTag={item.destinationTag}
                  submittedAt={item.submittedAt}
                  variant={idx}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
