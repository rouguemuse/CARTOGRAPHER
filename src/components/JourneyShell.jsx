import React from 'react';
import GlobalHeader from './GlobalHeader';

export default function JourneyShell({ children }) {
  // Adds the journey-specific layout class to the wrapper
  return (
    <div className="theme-journey journey-page-wrapper">
      <GlobalHeader variant="journey" />
      <main className="journey-main-content" id="main-content" tabIndex="-1">
        {children}
      </main>
      {/* Journey doesn't typically have the massive footer, maybe just a minimal one or nothing */}
    </div>
  );
}
