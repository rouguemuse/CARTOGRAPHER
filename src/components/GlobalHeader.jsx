import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useJourneyState } from '../hooks/useJourneyState';
import './GlobalHeader.css';

export default function GlobalHeader({ variant = 'archive' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const moreDropdownRef = useRef(null);

  const { getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();
  const hasActiveJourney = activeJourney && activeJourney.status === 'active' && activeJourney.carriedObject;
  const isHomepage = location.pathname === '/';

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  // Handle scroll state for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle body scroll lock and focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      firstElement?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
          triggerRef.current?.focus();
        }
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalStyle;
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else if (triggerRef.current && document.activeElement && menuRef.current?.contains(document.activeElement)) {
      triggerRef.current.focus();
    }
  }, [isMenuOpen]);

  // Links configuration
  const journeyLinks = [
    { to: "/journal", label: "Journal" },
    { to: "/almanac", label: "Almanac" },
    { to: "/endings", label: "Endings" },
    { to: "/archive", label: "Exit to Archive" },
  ];

  const ctaLabel = hasActiveJourney ? "Resume the Journey" : "Begin the Journey";

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header 
        ref={headerRef}
        className={`global-header header-${variant} ${isScrolled ? 'is-scrolled' : ''} ${isHomepage ? 'is-homepage' : ''}`}
      >
        <div className="header-container">
          {/* Identity */}
          <Link to="/" className="brand-link" aria-label="How to Explain Yourself to Wolves - Home">
            <BrandLogo variant={variant} className="header-logo" />
          </Link>

          {/* Desktop Navigation */}
          {variant === 'journey' ? (
            <nav className="desktop-nav" aria-label="Journey Navigation">
              <ul className="nav-list">
                {journeyLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink 
                      to={link.to} 
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <nav className="desktop-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                <li>
                  <NavLink to="/journey" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Journey
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/library" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Library
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Archive
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dear-red" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Dear Red
                  </NavLink>
                </li>

                {/* More Dropdown */}
                <li className="more-dropdown-item" ref={moreDropdownRef}>
                  <button 
                    className={`nav-link more-btn ${isMoreOpen ? 'active' : ''}`}
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    aria-expanded={isMoreOpen}
                    aria-haspopup="true"
                  >
                    More <span className="dropdown-caret" aria-hidden="true">▾</span>
                  </button>

                  {isMoreOpen && (
                    <ul className="more-dropdown-menu" role="menu">
                      <li role="none">
                        <NavLink to="/book" role="menuitem" className="dropdown-link">The Book</NavLink>
                      </li>
                      <li role="none">
                        <NavLink to="/things-i-should-have-said" role="menuitem" className="dropdown-link">Things I Should Have Said</NavLink>
                      </li>
                      <li role="none">
                        <NavLink to="/workbook" role="menuitem" className="dropdown-link">Workbook</NavLink>
                      </li>
                      <li role="none">
                        <NavLink to="/about" role="menuitem" className="dropdown-link">About Jayme</NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Visually Dominant CTA */}
                <li className="nav-cta-item">
                  <Link to="/journey" className="btn btn-primary nav-cta-btn">
                    {ctaLabel}
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* Mobile Menu Trigger */}
          <button 
            ref={triggerRef}
            className="mobile-menu-trigger" 
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        <div 
          id="mobile-menu"
          ref={menuRef}
          className={`mobile-drawer ${isMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="drawer-header">
            <BrandLogo variant={variant} className="header-logo" />
            <button 
              className="mobile-menu-close" 
              onClick={() => {
                setIsMenuOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close Navigation Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="drawer-nav" aria-label="Mobile Navigation">
            {variant === 'journey' ? (
              <ul className="drawer-nav-list">
                {journeyLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink 
                      to={link.to} 
                      className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="drawer-groups">
                <div className="drawer-group">
                  <span className="drawer-group-title">EXPLORE</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/journey" className="drawer-nav-link">Journey</NavLink></li>
                    <li><NavLink to="/library" className="drawer-nav-link">Valley Library</NavLink></li>
                    <li><NavLink to="/archive" className="drawer-nav-link">Archive</NavLink></li>
                  </ul>
                </div>

                <div className="drawer-group">
                  <span className="drawer-group-title">PARTICIPATE</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/dear-red" className="drawer-nav-link">Dear Red</NavLink></li>
                    <li><NavLink to="/things-i-should-have-said" className="drawer-nav-link">Things I Should Have Said</NavLink></li>
                  </ul>
                </div>

                <div className="drawer-group">
                  <span className="drawer-group-title">ABOUT</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/book" className="drawer-nav-link">The Book</NavLink></li>
                    <li><NavLink to="/workbook" className="drawer-nav-link">Workbook</NavLink></li>
                    <li><NavLink to="/about" className="drawer-nav-link">About Jayme</NavLink></li>
                  </ul>
                </div>

                <div className="drawer-cta-wrapper">
                  <Link to="/journey" className="btn btn-primary drawer-cta-btn">
                    {ctaLabel}
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
        
        {/* Mobile Backdrop */}
        {isMenuOpen && (
          <div 
            className="drawer-backdrop" 
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
    </>
  );
}
