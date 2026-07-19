import React from 'react';
import Header from './Header';

export default function JourneyShell({ children }) {
  // Adds the journey-specific layout class to the wrapper
  return (
    <div className="theme-journey journey-page-wrapper">
      <Header variant="journey" />
      <main className="journey-main-content">
        {children}
      </main>
      {/* Journey doesn't typically have the massive footer, maybe just a minimal one or nothing */}
    </div>
  );
}
