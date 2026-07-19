import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SignupForm from '../components/SignupForm';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default function Archive() {
  const [featuredStory, setFeaturedStory] = useState(null);
  const [latestEntries, setLatestEntries] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch featured story
        const featuredQ = query(
          collection(db, 'articles'), 
          where('status', '==', 'published'),
          limit(1)
        );
        const featuredSnap = await getDocs(featuredQ);
        if (!featuredSnap.empty) {
          setFeaturedStory({ id: featuredSnap.docs[0].id, ...featuredSnap.docs[0].data() });
        }

        // Fetch latest 3
        const latestQ = query(
          collection(db, 'articles'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const latestSnap = await getDocs(latestQ);
        setLatestEntries(latestSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching archive articles", err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1c1917] font-serif">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Section 1: Introduction */}
        <section className="container mx-auto px-6 max-w-5xl mb-24">
          <div className="text-center">
            <span className="uppercase tracking-widest text-xs text-[#a8201a] font-sans font-bold block mb-4">The Country Surrounding the Book</span>
            <h1 className="text-5xl md:text-6xl mb-6 text-[#09090b]">The Archive</h1>
            <p className="text-lg md:text-xl text-[#57534e] max-w-2xl mx-auto mb-10 leading-relaxed">
              Field notes, unsent sentences, recovered objects, altered definitions, and stories from roads that extend beyond the manuscript.
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/library" className="border-b border-[#1c1917] pb-1 uppercase tracking-widest text-sm font-sans hover:text-[#a8201a] hover:border-[#a8201a] transition-colors">Explore the Valley Library</Link>
              <Link to="/journey" className="border-b border-[#1c1917] pb-1 uppercase tracking-widest text-sm font-sans hover:text-[#a8201a] hover:border-[#a8201a] transition-colors">Begin the Journey</Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
            {/* Section 2: Featured Story */}
            <div className="lg:col-span-7">
              <span className="uppercase tracking-widest text-xs text-[#a8201a] font-sans font-bold block mb-4 border-b border-[#e5e5e5] pb-2">Featured Publication</span>
              {featuredStory ? (
                <article className="group">
                  {featuredStory.coverImage && (
                    <div className="mb-6 overflow-hidden rounded">
                      <img src={featuredStory.coverImage} alt={featuredStory.title} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="uppercase tracking-widest text-[10px] text-[#854d0e] font-sans mb-2">{featuredStory.collection || 'Story'}</div>
                  <h2 className="text-4xl mb-4 leading-tight">{featuredStory.title}</h2>
                  <div className="text-sm font-sans text-[#78716c] mb-6">
                    By Jayme Volstad • {featuredStory.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <p className="text-lg text-[#44403c] leading-relaxed mb-6">{featuredStory.excerpt || 'Read the full story in the archive.'}</p>
                  <Link to={`/library/${featuredStory.collection || 'stories'}/${featuredStory.id}`} className="inline-block uppercase tracking-widest text-xs font-sans bg-[#1c1917] text-[#F4F1EA] px-6 py-3 hover:bg-[#a8201a] transition-colors">Read Full Entry</Link>
                </article>
              ) : (
                <div className="py-12 border border-dashed border-[#d6d3d1] text-center rounded">
                  <p className="text-[#78716c] italic">The shelves are still being cataloged.</p>
                </div>
              )}
            </div>

            {/* Section 4: Latest from Valley Library */}
            <div className="lg:col-span-5">
              <span className="uppercase tracking-widest text-xs text-[#a8201a] font-sans font-bold block mb-4 border-b border-[#e5e5e5] pb-2">Latest Arrivals</span>
              <div className="space-y-8 mb-10">
                {latestEntries.length > 0 ? latestEntries.map(entry => (
                  <article key={entry.id} className="border-b border-[#e5e5e5] pb-6 last:border-0">
                    <div className="uppercase tracking-widest text-[10px] text-[#854d0e] font-sans mb-1">{entry.collection || 'Library'}</div>
                    <h3 className="text-2xl mb-2 leading-snug hover:text-[#a8201a] transition-colors">
                      <Link to={`/library/${entry.collection || 'stories'}/${entry.id}`}>{entry.title}</Link>
                    </h3>
                    <p className="text-[#57534e] mb-3 text-sm leading-relaxed line-clamp-3">{entry.excerpt}</p>
                    <div className="text-xs font-sans text-[#a8a29e]">
                      {entry.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </article>
                )) : (
                  <p className="text-[#78716c] italic">No recent entries found.</p>
                )}
              </div>
              <Link to="/library" className="uppercase tracking-widest text-xs font-sans text-[#1c1917] font-bold hover:text-[#a8201a] transition-colors">View the Complete Library &rarr;</Link>
            </div>
          </div>
        </div>

        {/* Section 3: Four Destinations */}
        <section className="bg-[#1c1917] text-[#F4F1EA] py-24 mb-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-center font-sans tracking-widest text-sm uppercase text-[#d6d3d1] mb-16 border-b border-[rgba(244,241,234,0.1)] pb-4 max-w-xs mx-auto">Explore the Territory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(244,241,234,0.1)]">
              
              <div className="bg-[#1c1917] p-12 hover:bg-[#292524] transition-colors flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl mb-4 text-[#e7e5e4]">The Valley Library</h3>
                  <p className="text-[#a8a29e] leading-relaxed mb-8">Essays, field guides, recovered objects, altered definitions, and stories from beyond the manuscript.</p>
                </div>
                <Link to="/library" className="self-start uppercase font-sans tracking-widest text-xs border border-[rgba(244,241,234,0.3)] px-6 py-3 hover:border-[#a8201a] hover:text-[#a8201a] transition-colors">Enter the Library</Link>
              </div>

              <div className="bg-[#1c1917] p-12 hover:bg-[#292524] transition-colors flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl mb-4 text-[#e7e5e4]">Things I Should Have Said</h3>
                  <p className="text-[#a8a29e] leading-relaxed mb-8">An anonymous public wall for the sentences that arrived after the conversation ended.</p>
                </div>
                <Link to="/things-i-should-have-said" className="self-start uppercase font-sans tracking-widest text-xs border border-[rgba(244,241,234,0.3)] px-6 py-3 hover:border-[#a8201a] hover:text-[#a8201a] transition-colors">Visit the Wall</Link>
              </div>

              <div className="bg-[#1c1917] p-12 hover:bg-[#292524] transition-colors flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl mb-4 text-[#e7e5e4]">Dear Red</h3>
                  <p className="text-[#a8a29e] leading-relaxed mb-8">Private questions, difficult roads, and correspondence for travelers who cannot yet read the weather.</p>
                </div>
                <Link to="/dear-red" className="self-start uppercase font-sans tracking-widest text-xs border border-[rgba(244,241,234,0.3)] px-6 py-3 hover:border-[#a8201a] hover:text-[#a8201a] transition-colors">Write to Red</Link>
              </div>

              <div className="bg-[#1c1917] p-12 hover:bg-[#292524] transition-colors flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl mb-4 text-[#e7e5e4]">The Pilgrim Workbook</h3>
                  <p className="text-[#a8a29e] leading-relaxed mb-8">Guided reflections for recognizing what you carry, what belongs to you, and what may be set down.</p>
                </div>
                <Link to="/workbook" className="self-start uppercase font-sans tracking-widest text-xs border border-[rgba(244,241,234,0.3)] px-6 py-3 hover:border-[#a8201a] hover:text-[#a8201a] transition-colors">Open the Workbook</Link>
              </div>

            </div>
          </div>
        </section>

        {/* Section 5: Journey Bridge */}
        <section className="relative py-32 mb-24 flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/forest_hero_1784324259251.png" alt="Atmospheric Journey Forest" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#09090b] bg-opacity-75"></div>
          </div>
          <div className="relative z-10 container mx-auto px-6 max-w-2xl">
            <h2 className="text-4xl md:text-5xl text-[#F4F1EA] mb-6 font-serif leading-tight">Some maps can only be read by choosing.</h2>
            <p className="text-[#d6d3d1] text-lg mb-10 leading-relaxed font-serif">
              Choose what you carry and follow the roads that answer. Every decision changes the map that forms beneath your feet.
            </p>
            <Link to="/journey" className="inline-block uppercase tracking-widest text-sm font-sans bg-[#a8201a] text-white px-8 py-4 hover:bg-[#7f1d1d] transition-colors">Begin the Journey</Link>
          </div>
        </section>

        {/* Section 6: Mailing List */}
        <section className="container mx-auto px-6 max-w-2xl text-center mb-24" id="join">
          <div className="border border-[#d6d3d1] p-12 bg-white shadow-sm">
            <h2 className="text-3xl mb-4 text-[#1c1917]">Be told when the wolves are ready.</h2>
            <p className="text-[#57534e] mb-8 font-serif italic">Sign up for dispatches from the territory and news about the book.</p>
            
            <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="First name (optional)" className="px-4 py-3 border border-[#d6d3d1] font-sans text-sm focus:outline-none focus:border-[#a8201a] bg-transparent" />
                <input type="email" required placeholder="Email address" className="px-4 py-3 border border-[#d6d3d1] font-sans text-sm focus:outline-none focus:border-[#a8201a] bg-transparent" />
                <button type="submit" className="uppercase tracking-widest text-sm font-sans bg-[#1c1917] text-[#F4F1EA] px-6 py-4 hover:bg-[#a8201a] transition-colors mt-2">Join the Book List</button>
              </div>
              <p className="text-xs text-[#a8a29e] font-sans mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </div>
        </section>

      </main>

      <footer className="bg-[#1c1917] text-[#a8a29e] py-12 text-center font-sans text-sm">
        <div className="container mx-auto px-6">
          <p>© 2026 Jayme Volstad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
