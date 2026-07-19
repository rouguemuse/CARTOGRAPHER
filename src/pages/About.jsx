import React from 'react';
import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1c1917]">
      <Header />
      <main className="container pt-32 pb-16">
        <h1 className="font-serif text-4xl mb-4">About the Author</h1>
        <p>Jayme Volstad is a writer and systems-builder...</p>
      </main>
    </div>
  );
}
