import React from 'react';
import SiteHeader from './SiteHeader';
import '../pages/Archive.css'; // We will create this

export default function ArchiveShell({ children }) {
  // Adds the archive-specific layout class to the wrapper
  return (
    <div className="theme-archive archive-page-wrapper">
      <SiteHeader />
      <div className="archive-main-content">
        {children}
      </div>
      <footer className="archive-footer">
        <div className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
          <p className="sans-text" style={{fontSize: '0.85rem', color: 'var(--muted)'}}>
            © {new Date().getFullYear()} Jayme Volstad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
