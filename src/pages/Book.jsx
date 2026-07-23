import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

export default function Book() {
  return (
    <div 
      className="book-page-wrapper" 
      style={{ 
        backgroundColor: '#050a09', 
        minHeight: '100vh', 
        padding: '3rem 1.5rem 5rem', /* Reduced bottom padding to prevent excessive footer gap */
        color: '#C8BEA7',
        fontFamily: 'var(--font-body)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        
        {/* High-Contrast Breadcrumb Navigation */}
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
          <span style={{ color: '#F1E9D6', fontWeight: '600' }}>The Book</span>
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
            FORTHCOMING ALLEGORICAL MEMOIR
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
            How to Explain Yourself to Wolves
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'clamp(17px, 2.5vw, 19px)', 
              lineHeight: '1.6', 
              color: '#C8BEA7',
              margin: 0,
              maxWidth: '68ch' /* Restrained line width */
            }}
          >
            A woman spends years learning how to make herself understandable to people who benefit from misunderstanding her. Then she begins drawing a map out.
          </p>
        </header>

        {/* Content Section (Restrained to 65ch for excellent readability) */}
        <div style={{ maxWidth: '65ch', margin: '0 auto' }}>
          
          {/* Red Feature Panel */}
          <div 
            style={{ 
              marginBottom: '3rem', 
              padding: '2.25rem 2rem',
              backgroundColor: 'rgba(179, 33, 29, 0.08)',
              borderRadius: '4px',
              border: '1px solid rgba(179, 33, 29, 0.25)',
              borderLeft: '4px solid var(--color-crimson)'
            }}
          >
            <span 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                color: '#B99A55', 
                fontSize: '11px', 
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              ABOUT THE BOOK
            </span>
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(1.5rem, 4vw, 1.85rem)', 
                color: '#F1E9D6', 
                lineHeight: '1.2',
                fontWeight: '700',
                margin: '0 0 1rem 0'
              }}
            >
              You cannot explain yourself into safety.
            </h2>
            <div 
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '16px', 
                lineHeight: '1.65', 
                color: '#C8BEA7'
              }}
            >
              <p style={{ marginBottom: '1.25rem' }}>
                <em>How to Explain Yourself to Wolves</em> is an allegorical memoir told through lived scenes, invented geography, recovered objects, altered definitions, and field notes from a life spent trying to become understandable.
              </p>
              <p style={{ margin: 0 }}>
                It follows a woman who becomes exceptionally skilled at reading rooms, anticipating emotional weather, gathering evidence, translating pain, and making herself smaller enough to remain welcome—until survival requires her to stop pleading her case.
              </p>
            </div>
          </div>

          {/* Main Book Description Section */}
          <div 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '16.5px', 
              lineHeight: '1.7',
              color: '#C8BEA7',
              marginBottom: '3rem'
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
              A memoir about the distance between being understood and being free.
            </h3>
            <p style={{ marginBottom: '1.25rem' }}>
              The book moves between the literal world and the strange geography the narrator builds to survive it: the Valley of <em>Please Understand Me</em>, the Forest of <em>Other People’s Weather</em>, the House of <em>Almost Safe</em>, the Carnival, the Museum of <em>Alternative Lives</em>, and roads that keep changing their rules.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              Across childhood, motherhood, addiction, recovery, grief, incarceration, restaurant work, institutional power, and coercive relationships, she learns how easily a person can mistake endurance for belonging—and explanation for protection.
            </p>
            <p style={{ margin: 0 }}>
              This is not a story about becoming fearless. It is a story about learning which fear belongs to you, which weather belongs to someone else, and when to leave without waiting for the wolves to agree with your version of events.
            </p>
          </div>

          {/* New Section: The Book and the Territory */}
          <div 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '16.5px', 
              lineHeight: '1.7',
              color: '#C8BEA7',
              marginBottom: '3.5rem',
              paddingTop: '2rem',
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
              The Book and the Territory
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              The manuscript carries the central narrative. This digital territory expands the world around it.
            </p>
            <p style={{ marginBottom: '2.5rem' }}>
              Some places, objects, definitions, visual sequences, field notes, and alternate paths were too large—or too structurally different—to live inside a single book without interrupting its story. Here, they can be entered, examined, and experienced on their own terms.
            </p>
            
            <blockquote 
              style={{ 
                fontStyle: 'italic', 
                color: '#EDE4CF', 
                borderLeft: '3px solid var(--color-brass)', 
                paddingLeft: '1.25rem',
                margin: '0 0 2.5rem 0'
              }}
            >
              The website is not a summary of the manuscript and it is not required reading. It is a companion landscape: an extension of the book’s emotional geography, built to hold what the printed narrative could only point toward.
            </blockquote>

            {/* Three concise content blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginTop: '2.5rem' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', color: '#EDE4CF', fontSize: '1.2rem', margin: '0 0 0.35rem 0', fontWeight: '700' }}>
                  The lived story
                </h4>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                  The memoir follows a woman rebuilding a life through motherhood, addiction, recovery, grief, work, institutional failure, and relationships in which care and control become difficult to separate.
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', color: '#EDE4CF', fontSize: '1.2rem', margin: '0 0 0.35rem 0', fontWeight: '700' }}>
                  The interior map
                </h4>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                  Valleys, forests, carnivals, houses, roads, wolves, coats, cranes, lanterns, and compasses give physical form to experiences ordinary language cannot fully contain.
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', color: '#EDE4CF', fontSize: '1.2rem', margin: '0 0 0.35rem 0', fontWeight: '700' }}>
                  The expanded territory
                </h4>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                  The digital world holds visual adaptations, maps, recovered objects, altered definitions, deleted paths, reader contributions, and deeper context for the places encountered in the manuscript.
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Newsletter Signup Form */}
          <div 
            style={{ 
              marginTop: '3.5rem', 
              padding: '2.5rem 2.25rem', 
              backgroundColor: '#0c1210', 
              border: '1px solid rgba(222, 205, 169, 0.15)', 
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
            }}
          >
            <SignupForm 
              headlineText="Follow the Book"
              bodyText="Join the publication list for manuscript news, selected excerpts, visual adaptations, and new journeys from the world of How to Explain Yourself to Wolves."
              buttonText="FOLLOW THE BOOK →"
              privacyText="Occasional book news and field notes. No noise, and no selling your address to the Ministry of Impossible Standards."
            />
          </div>

          {/* Final Call to Action Button */}
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <Link 
              to="/journey" 
              className="btn btn-primary btn-large" 
              style={{ padding: '1rem 2.5rem', fontSize: '16px' }}
            >
              ENTER THE WORLD OF THE BOOK &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
