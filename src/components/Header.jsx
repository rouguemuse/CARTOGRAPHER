import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="site-logo">
    <circle cx="50" cy="50" r="46" stroke="var(--color-parchment)" strokeWidth="3" opacity="0.8"/>
    <circle cx="50" cy="50" r="38" stroke="var(--color-brass)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
    {/* Negative space wolf ears using parchment shapes */}
    <path d="M35 35 L45 50 L35 65 Z" fill="var(--color-charcoal)"/>
    <path d="M65 35 L55 50 L65 65 Z" fill="var(--color-charcoal)"/>
    {/* Red route line */}
    <path d="M10 80 Q 30 50 50 60 T 90 20" stroke="var(--color-oxblood)" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const headerClass = `glass-header ${isHomepage && !scrolled ? 'transparent-header' : 'solid-header'}`;

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <Link to="/" className="brand-group">
          <Logo />
          <div className="brand-text">
            <span className="wordmark uppercase tracking-widest text-sm" style={{fontFamily: 'var(--font-ui)', letterSpacing: '0.15em'}}>How to Explain Yourself to Wolves</span>
          </div>
        </Link>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`desktop-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/journey" className={`nav-link ${isActive('/journey')}`} onClick={() => setIsMobileMenuOpen(false)}>
            Journey
            <div className="active-indicator"></div>
          </Link>
          <Link to="/archive" className={`nav-link ${isActive('/archive')}`} onClick={() => setIsMobileMenuOpen(false)}>
            The Archive
            <div className="active-indicator"></div>
          </Link>
          <Link to="/library" className={`nav-link ${isActive('/library')}`} onClick={() => setIsMobileMenuOpen(false)}>
            Valley Library
            <div className="active-indicator"></div>
          </Link>
          <Link to="/dear-red" className={`nav-link ${isActive('/dear-red')}`} onClick={() => setIsMobileMenuOpen(false)}>
            Dear Red
            <div className="active-indicator"></div>
          </Link>
          <Link to="/book" className={`nav-link ${isActive('/book')}`} onClick={() => setIsMobileMenuOpen(false)}>
            The Book
            <div className="active-indicator"></div>
          </Link>
          <Link to="/#join" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Join the List</Link>
        </nav>
      </div>
    </header>
  );
}
