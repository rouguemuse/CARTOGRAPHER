import React, { useEffect, useState } from 'react';
import ExplanationForm from '../components/ExplanationForm';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function ThingsIShouldHaveSaid() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(collection(db, 'wall_submissions'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmissions(subs);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="container archive-page">
      <div className="archive-masthead" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '2rem' }}>
        <h1>Things I Should Have Said</h1>
        <p>An anonymous public wall for the sentences that arrived after the conversation ended.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '4rem' }}>
        <ExplanationForm />
      </div>

      {submissions.length > 0 && (
        <div style={{ maxWidth: '800px', margin: '0 auto', borderTop: '2px solid var(--rule)', paddingTop: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>From the Territory</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {submissions.map(sub => (
              <div key={sub.id} className="archive-card" style={{ padding: '2rem' }}>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.6' }}>"{sub.explanation}"</p>
                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--muted)' }}>
                  — {sub.creditAs === 'anonymous' ? 'Anonymous' : (sub.alias || 'Anonymous')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
