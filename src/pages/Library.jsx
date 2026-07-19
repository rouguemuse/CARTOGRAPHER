import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Library() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1c1917]">
      <Header />
      <main className="container pt-32 pb-16 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl mb-4">The Valley Library</h1>
        <p className="text-lg text-[#57534e] mb-12">Essays, field guides, recovered objects, altered definitions, and stories from beyond the manuscript.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/library/stories" className="block p-8 border border-[rgba(0,0,0,0.1)] rounded-lg hover:shadow-lg transition-shadow bg-white">
            <h2 className="font-serif text-2xl mb-2 text-[#1c1917]">Stories from the Archive</h2>
            <p className="text-[#57534e]">Narratives, parables, and extended records.</p>
          </Link>
          
          <Link to="/library/field-guide" className="block p-8 border border-[rgba(0,0,0,0.1)] rounded-lg hover:shadow-lg transition-shadow bg-white">
            <h2 className="font-serif text-2xl mb-2 text-[#1c1917]">Field Guide to Other People's Weather</h2>
            <p className="text-[#57534e]">A growing catalog of the storms and silences we encounter in others.</p>
          </Link>

          <Link to="/library/inventory" className="block p-8 border border-[rgba(0,0,0,0.1)] rounded-lg hover:shadow-lg transition-shadow bg-white">
            <h2 className="font-serif text-2xl mb-2 text-[#1c1917]">Inventory of Left Objects</h2>
            <p className="text-[#57534e]">Documentation of what the Cartographer carried and abandoned.</p>
          </Link>

          <Link to="/library/glossary" className="block p-8 border border-[rgba(0,0,0,0.1)] rounded-lg hover:shadow-lg transition-shadow bg-white">
            <h2 className="font-serif text-2xl mb-2 text-[#1c1917]">Glossary of Necessary Silence</h2>
            <p className="text-[#57534e]">Words swallowed, mistranslated, or redefined.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
