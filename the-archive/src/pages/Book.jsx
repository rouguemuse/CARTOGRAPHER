import React from 'react';
import Header from '../components/Header';

export default function Book() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1c1917]">
      <Header />
      <main className="container pt-32 pb-16">
        <h1 className="font-serif text-4xl mb-4">How to Explain Yourself to Wolves</h1>
        <p>Book information coming soon.</p>
      </main>
    </div>
  );
}
