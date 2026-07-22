import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useJourneyState } from '../hooks/useJourneyState';
import { journeyConfig } from '../data/journeyConfig';
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

  const activeStageId = activeJourney?.currentStage || journeyConfig.firstStageId;
  const continueJourneyPath = hasActiveJourney ? `/journey/stage/${activeStageId}` : `/journey/carry`;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header 
        ref={headerRef}
        className={`global-header header-${variant} ${isScrolled ? 'is-scrolled' : ''} ${isHomepage ? 'is-homepage' : ''}`}
      >
        <div className="header-container">
          {/* Logo & Title link to / */}
          <Link to="/" className="brand-link" aria-label="How to Explain Yourself to Wolves - Home">
            <BrandLogo variant={variant} className="header-logo" />
          </Link>

          {/* Desktop Navigation */}
          {variant === 'journey' ? (
            <nav className="desktop-nav" aria-label="Journey Navigation">
              <ul className="nav-list">
                <li>
                  <Link to={continueJourneyPath} className="nav-link">
                    Continue Journey
                  </Link>
                </li>
                <li>
                  <NavLink to="/journey/field-notes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Field Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/journey/maps-returned" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Maps Returned
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/archive" className="nav-link">
                    Exit to Archive
                  </NavLink>
                </li>
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
                  <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Archive
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dear-red" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Dear Red
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/things-i-should-have-said" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Unsaid Wall
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/book" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    The Book
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
                        <NavLink to="/about" role="menuitem" className="dropdown-link">About</NavLink>
                      </li>
                      <li role="none">
                        <a href="/#join" role="menuitem" className="dropdown-link">Join the Book List</a>
                      </li>
                      <li role="none">
                        <NavLink to="/workbook" role="menuitem" className="dropdown-link">Self-Cartography</NavLink>
                      </li>
                    </ul>
                  )}
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
                <li><Link to={continueJourneyPath} className="drawer-nav-link">Continue Journey</Link></li>
                <li><NavLink to="/journey/field-notes" className="drawer-nav-link">Field Notes</NavLink></li>
                <li><NavLink to="/journey/maps-returned" className="drawer-nav-link">Maps Returned</NavLink></li>
                <li><NavLink to="/archive" className="drawer-nav-link">Exit to Archive</NavLink></li>
              </ul>
            ) : (
              <div className="drawer-groups">
                <div className="drawer-group">
                  <span className="drawer-group-title">JOURNEY</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/journey" className="drawer-nav-link">Journey</NavLink></li>
                    <li><NavLink to="/journey/field-notes" className="drawer-nav-link">Field Notes</NavLink></li>
                    <li><NavLink to="/journey/maps-returned" className="drawer-nav-link">Maps Returned</NavLink></li>
                  </ul>
                </div>

                <div className="drawer-group">
                  <span className="drawer-group-title">THE ARCHIVE</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/archive" className="drawer-nav-link">Archive Portal</NavLink></li>
                    <li><NavLink to="/archive/field-guide" className="drawer-nav-link">The Field Guide</NavLink></li>
                    <li><NavLink to="/archive/inventory" className="drawer-nav-link">The Inventory</NavLink></li>
                    <li><NavLink to="/archive/glossary" className="drawer-nav-link">Glossary of Impossible Places</NavLink></li>
                  </ul>
                </div>

                <div className="drawer-group">
                  <span className="drawer-group-title">PARTICIPATE</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/dear-red" className="drawer-nav-link">Dear Red</NavLink></li>
                    <li><NavLink to="/things-i-should-have-said" className="drawer-nav-link">Unsaid Wall</NavLink></li>
                  </ul>
                </div>

                <div className="drawer-group">
                  <span className="drawer-group-title">ABOUT & BOOK</span>
                  <ul className="drawer-group-list">
                    <li><NavLink to="/book" className="drawer-nav-link">The Book</NavLink></li>
                    <li><NavLink to="/workbook" className="drawer-nav-link">Self-Cartography</NavLink></li>
                    <li><NavLink to="/about" className="drawer-nav-link">About Jayme</NavLink></li>
                    <li><a href="/#join" className="drawer-nav-link">Join the Book List</a></li>
                  </ul>
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
