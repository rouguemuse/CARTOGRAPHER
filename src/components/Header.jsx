import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          {/* Minimal SVG Seal */}
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="site-logo">
            <circle cx="50" cy="50" r="46" stroke="var(--color-charcoal)" strokeWidth="3" opacity="0.8"/>
            <circle cx="50" cy="50" r="38" stroke="var(--color-brass)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
            <path d="M35 35 L45 50 L35 65 Z" fill="var(--red-deep)"/>
            <path d="M65 35 L55 50 L65 65 Z" fill="var(--red-deep)"/>
            <path d="M10 80 Q 30 50 50 60 T 90 20" stroke="var(--color-charcoal)" strokeWidth="4" fill="none" />
          </svg>
          <Link to="/" style={{fontFamily: 'var(--font-display)', fontSize: '1.2rem', textDecoration: 'none', color: 'inherit'}}>The Archive</Link>
        </div>
        
        <nav className="site-nav">
          <Link to="/library" className="nav-link">Valley Library</Link>
          <Link to="/dear-red" className="nav-link">Dear Red</Link>
          <Link to="/book" className="nav-link">The Book</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/#join" className="btn btn-primary" style={{padding: '0.4rem 1rem'}}>Join the List</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
