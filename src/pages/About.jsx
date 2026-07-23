import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div 
      className="book-page-wrapper" 
      style={{ 
        backgroundColor: '#050a09', 
        minHeight: '100vh', 
        padding: '3rem 1.5rem 5rem', /* Reduced bottom padding to prevent empty space above footer */
        color: '#C8BEA7',
        fontFamily: 'var(--font-body)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        
        {/* High-Contrast Breadcrumbs */}
        <nav 
          aria-label="Breadcrumb" 
          style={{ 
            marginBottom: '2rem', 
            fontFamily: 'var(--font-body)', 
            fontSize: '14px' 
          }}
        >
          <Link to="/archive" style={{ color: 'var(--color-brass)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '600' }}>Archive</Link>
          <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
          <span style={{ color: '#F1E9D6', fontWeight: '600' }}>About Jayme Volstad</span>
        </nav>

        {/* Header Masthead */}
        <header 
          style={{ 
            textAlign: 'left', 
            borderBottom: '1px solid rgba(222, 205, 169, 0.18)', 
            paddingBottom: '1.75rem', 
            marginBottom: '2.5rem' 
          }}
        >
          <span 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              color: '#B99A55', 
              fontSize: '13px', 
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            WRITER · ESSAYIST · CARTOGRAPHER
          </span>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', 
              lineHeight: '1.02', 
              color: '#F1E9D6', 
              fontWeight: '700',
              margin: '0 0 1rem 0'
            }}
          >
            Jayme Volstad
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'clamp(17px, 2.5vw, 19px)', 
              lineHeight: '1.6', 
              color: '#C8BEA7',
              margin: 0,
              maxWidth: '68ch'
            }}
          >
            Jayme Volstad writes about survival, motherhood, emotional weather, and the difficult distance between being understood and being free.
          </p>
        </header>

        {/* Content Area (Restrained 60-75ch line width) */}
        <div style={{ maxWidth: '65ch', margin: '0 auto' }}>
          
          {/* Featured Image */}
          <div 
            style={{ 
              marginBottom: '2.5rem',
              border: '1px solid rgba(222, 205, 169, 0.15)',
              padding: '0.45rem',
              backgroundColor: '#0c1210',
              borderRadius: '4px'
            }}
          >
            <img 
              src="/media/New_camera_angle_new_perspective_202607182049.jpeg" 
              alt="An imagined landscape of trees and hills at dusk" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
            />
            <div 
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '13px', 
                color: '#A79D88', 
                marginTop: '0.65rem', 
                fontStyle: 'italic', 
                textAlign: 'center' 
              }}
            >
              An imagined map from the territory of *How to Explain Yourself to Wolves*.
            </div>
          </div>

          {/* Biography Body */}
          <div 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '16.5px', 
              lineHeight: '1.75', 
              color: '#C8BEA7',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginBottom: '3rem'
            }}
          >
            <p>
              Jayme Volstad is a Texas writer currently completing <em>How to Explain Yourself to Wolves</em>, an allegorical memoir combining lived narrative, invented geography, recovered objects, altered definitions, and field notes from a life spent trying to become understandable.
            </p>
            <p>
              The book moves through motherhood, addiction, recovery, grief, incarceration, restaurant work, institutional power, coercive relationships, and the long process of learning to trust one’s own perception.
            </p>
            <p>
              Before turning fully toward writing and digital storytelling, Jayme trained in baking and pastry and worked across nearly every level of restaurant life—from kitchens and production to management, operations, and business development. That background shapes her attention to labor, appetite, endurance, systems, and what people learn to build from whatever remains.
            </p>
            <p>
              Her work explores the survival habits people develop around volatility: reading rooms, anticipating consequences, gathering evidence, translating pain, and apologizing before anyone has accused them.
            </p>
            <p>
              She is especially interested in what happens when survival skills that once kept a person safe begin to keep her trapped—and how a life changes when those skills no longer have to control every decision.
            </p>
          </div>

          {/* Expanded Territory Section */}
          <div 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '16.5px', 
              lineHeight: '1.75', 
              color: '#C8BEA7',
              marginBottom: '3.5rem',
              paddingTop: '2.25rem',
              borderTop: '1px solid rgba(222, 205, 169, 0.15)'
            }}
          >
            <h3 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.6rem', 
                color: '#EDE4CF', 
                marginBottom: '1rem',
                fontWeight: '700'
              }}
            >
              The Book and Its Expanded Territory
            </h3>
            <p style={{ marginBottom: '1.25rem' }}>
              <em>How to Explain Yourself to Wolves</em> is the central work. This website is its companion and expansion.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              The manuscript carries the narrative arc, but its world became larger than one printed structure could responsibly hold. The website creates room for the places, maps, definitions, visual sequences, recovered objects, field notes, reader responses, and alternate pathways that deepen the book without crowding its story.
            </p>
            <p style={{ marginBottom: '2.5rem' }}>
              Readers do not need the website to understand the manuscript. The book stands on its own. The digital territory exists for those who want to step farther inside—to see how the emotional geography works, explore what remained outside the main narrative, and encounter the world through forms a printed page cannot provide.
            </p>

            <div 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.2rem', 
                lineHeight: '1.5',
                color: '#EDE4CF', 
                borderLeft: '3px solid var(--color-brass)', 
                paddingLeft: '1.25rem',
                margin: '2rem 0'
              }}
            >
              <div style={{ fontWeight: '700' }}>The book is the road through the story.</div>
              <div style={{ color: '#A79D88' }}>The website holds the territory surrounding it.</div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div 
            style={{ 
              marginTop: '3rem', 
              paddingTop: '2rem', 
              borderTop: '1px solid rgba(222, 205, 169, 0.15)', 
              display: 'flex', 
              gap: '1.25rem', 
              flexWrap: 'wrap' 
            }}
          >
            <Link to="/book" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '15px' }}>
              EXPLORE THE BOOK &rarr;
            </Link>
            <Link 
              to="/" 
              className="btn btn-secondary-dark" 
              style={{ 
                padding: '0.85rem 2rem', 
                fontSize: '15px',
                borderColor: 'rgba(222, 205, 169, 0.35)',
                color: '#EDE4CF',
                backgroundColor: 'transparent'
              }}
            >
              ENTER THE TERRITORY &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
