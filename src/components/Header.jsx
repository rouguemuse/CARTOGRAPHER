import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="site-logo">
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" opacity="0.8"/>
    <circle cx="50" cy="50" r="38" stroke="var(--color-brass)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
    <path d="M35 35 L45 50 L35 65 Z" fill="currentColor"/>
    <path d="M65 35 L55 50 L65 65 Z" fill="currentColor"/>
    <path d="M10 80 Q 30 50 50 60 T 90 20" stroke="var(--red)" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export default function Header({ variant = 'journey' }) {
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

  const isArchive = variant === 'archive';

  // Base classes for the header container
  const headerClass = `site-header ${isArchive ? 'header-archive' : 'header-journey'} ${scrolled ? 'scrolled' : ''}`;

  return (
    <header className={headerClass}>
      <div className="header-inner container">
        
        {/* Left Side: Brand */}
        <div className="header-brand">
          {isArchive ? (
            <Link to="/archive" className="brand-group">
              <Logo />
              <div className="brand-text">
                <span className="wordmark">How to Explain Yourself to Wolves</span>
              </div>
            </Link>
          ) : (
            <Link to="/archive" className="nav-link exit-link">
              &larr; Exit to the Archive
            </Link>
          )}
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Center/Right Side: Navigation */}
        <nav className={`desktop-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {isArchive ? (
            <>
              <Link to="/archive" className={`nav-link ${isActive('/archive')}`} onClick={() => setIsMobileMenuOpen(false)}>Archive</Link>
              <Link to="/library" className={`nav-link ${isActive('/library')}`} onClick={() => setIsMobileMenuOpen(false)}>Valley Library</Link>
              <Link to="/dear-red" className={`nav-link ${isActive('/dear-red')}`} onClick={() => setIsMobileMenuOpen(false)}>Dear Red</Link>
              <Link to="/book" className={`nav-link ${isActive('/book')}`} onClick={() => setIsMobileMenuOpen(false)}>The Book</Link>
              <Link to="/journey" className="btn btn-primary btn-journey" onClick={() => setIsMobileMenuOpen(false)}>Begin the Journey</Link>
            </>
          ) : (
            <>
              <Link to="/journal" className={`nav-link ${isActive('/journal')}`} onClick={() => setIsMobileMenuOpen(false)}>Almanac</Link>
              <Link to="/result" className={`nav-link ${isActive('/result')}`} onClick={() => setIsMobileMenuOpen(false)}>Endings</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}
