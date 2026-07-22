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
        padding: '3rem 1.5rem 6rem',
        color: '#C8BEA7',
        fontFamily: 'var(--font-body)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        
        {/* Breadcrumb Navigation */}
        <nav 
          aria-label="Breadcrumb" 
          style={{ 
            marginBottom: '1.5rem', 
            fontFamily: 'var(--font-body)', 
            fontSize: '14px' 
          }}
        >
          <Link to="/archive" style={{ color: '#A79D88', textDecoration: 'none', transition: 'color 0.2s' }}>Archive</Link>
          <span style={{ margin: '0 0.5rem', color: '#A79D88', opacity: 0.5 }}>/</span>
          <span style={{ color: '#C8BEA7' }}>The Book</span>
        </nav>

        {/* Header Masthead */}
        <header 
          style={{ 
            textAlign: 'left', 
            borderBottom: '1px solid rgba(222, 205, 169, 0.15)', 
            paddingBottom: '1.25rem', 
            marginBottom: '1.75rem' 
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
              marginBottom: '0.25rem' /* Reduced gap above main title */
            }}
          >
            Forthcoming Manuscript
          </span>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)', /* Reduced desktop title size */
              lineHeight: '0.98', /* Line height between 0.95 and 1.02 */
              color: '#F1E9D6', /* Warm Ivory */
              fontWeight: '700',
              margin: '0 0 0.85rem 0',
              maxWidth: '1050px'
            }}
          >
            How to Explain Yourself to Wolves
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'clamp(17px, 2.5vw, 20px)', 
              lineHeight: '1.5', 
              color: '#C8BEA7', /* Muted Parchment */
              margin: 0,
              opacity: 0.9,
              maxWidth: '85ch'
            }}
          >
            The physical manuscript that anchors this digital territory. A book about emotional weather, quiet boundaries, and leaving the audience behind.
          </p>
        </header>

        {/* Content Section */}
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          
          {/* Red Overview Card */}
          <div 
            className="archive-card archive-card--red" 
            style={{ 
              marginBottom: '2.5rem', 
              padding: '2rem',
              backgroundColor: 'var(--red-deep)',
              borderRadius: '4px',
              border: '1px solid rgba(225, 59, 71, 0.2)'
            }}
          >
            <span 
              style={{ 
                fontFamily: 'var(--font-body)', /* Cabin */
                color: '#EDE4CF', 
                fontSize: '11px', 
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
                opacity: 0.85
              }}
            >
              Publication Overview
            </span>
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', /* Berenis */
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                color: '#F1E9D6', 
                lineHeight: '1.2',
                fontWeight: '700',
                margin: '0 0 0.85rem 0'
              }}
            >
              What will you do when the road asks for your name?
            </h2>
            <p 
              style={{ 
                fontFamily: 'var(--font-body)', /* Cabin */
                fontSize: '16px', 
                lineHeight: '1.6', /* Increased line-height */
                fontWeight: '400', /* Reduced weight */
                color: '#EDE4CF', 
                margin: 0,
                opacity: 0.9
              }}
            >
              An investigation into the compulsion to explain ourselves, the exhaustion of self-justification, and the peace that arrives when you stop trying to convince the weather to stay warm.
            </p>
          </div>

          {/* About the Manuscript */}
          <div 
            className="article-body" 
            style={{ 
              fontFamily: 'var(--font-body)', /* Cabin */
              fontSize: '17px', 
              lineHeight: '1.7',
              color: '#C8BEA7',
              marginBottom: '3rem'
            }}
          >
            <h3 
              style={{ 
                fontFamily: 'var(--font-display)', /* Berenis */
                fontSize: '1.65rem', 
                color: '#EDE4CF', 
                marginBottom: '1rem',
                fontWeight: '700'
              }}
            >
              About the Manuscript
            </h3>
            <p style={{ marginBottom: '1.25rem' }}>
              <em style={{ color: '#EDE4CF' }}>How to Explain Yourself to Wolves</em> combines personal essay, field notes, recovered object inventories, and altered definitions to chart the geography of non-verbal boundaries.
            </p>
            <p style={{ margin: 0 }}>
              Divided into five main territories—The Red Coat, The Red Thread, The Red Crane, The Red Letter, and The Compass—the book traces the journey from performance to stillness.
            </p>
          </div>

          {/* Newsletter Signup Form */}
          <div 
            style={{ 
              marginTop: '3rem', 
              padding: '2.25rem 2rem', 
              backgroundColor: '#0b1210', 
              border: '1px solid rgba(222, 205, 169, 0.15)', 
              borderRadius: '4px' 
            }}
          >
            <h3 
              style={{ 
                fontFamily: 'var(--font-display)', /* Berenis */
                fontSize: '1.5rem',
                textAlign: 'center', 
                color: '#EDE4CF',
                marginBottom: '1.25rem',
                fontWeight: '700',
                margin: '0 0 1.25rem 0'
              }}
            >
              Join the Book List
            </h3>
            <SignupForm />
          </div>

          {/* Call to Action Button */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/journey" className="btn btn-primary btn-large">
              Experience the Digital Journey &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
