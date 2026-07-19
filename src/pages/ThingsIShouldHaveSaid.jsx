import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
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
    <div className="min-h-screen bg-[#09090b] text-[#E6DCC3]">
      <Header />
      <main className="container pt-32 pb-16 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl mb-4 text-white">Things I Should Have Said</h1>
          <p className="text-[#a1a1aa] mb-12">An anonymous public wall for the sentences that arrived after the conversation ended.</p>
          <ExplanationForm />
        </div>

        {submissions.length > 0 && (
          <div className="wall-entries space-y-8 mt-16 border-t border-[rgba(230,220,195,0.1)] pt-16">
            <h2 className="font-serif text-2xl text-center mb-12">From the Territory</h2>
            {submissions.map(sub => (
              <div key={sub.id} className="p-8 border border-[rgba(230,220,195,0.14)] bg-[rgba(255,255,255,0.02)] rounded-lg">
                <p className="font-serif text-lg leading-relaxed mb-4">"{sub.explanation}"</p>
                <div className="text-sm text-[#a1a1aa] uppercase tracking-widest">— {sub.creditAs === 'anonymous' ? 'Anonymous' : (sub.alias || 'Anonymous')}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
