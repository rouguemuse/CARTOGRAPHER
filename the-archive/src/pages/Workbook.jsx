import React from 'react';
import Header from '../components/Header';

export default function Workbook() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1c1917]">
      <Header />
      <main className="container pt-32 pb-16">
        <h1 className="font-serif text-4xl mb-4">The Pilgrim Workbook</h1>
        <p>Guided reflections for recognizing what you carry, what belongs to you, and what may be set down.</p>
      </main>
    </div>
  );
}
