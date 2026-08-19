import React from 'react';

export default function WorkbookMasthead({ totalCompletedCount, onOpenDrawer, onStartMapping }) {
  return (
    <>
      {/* Quiet Top Action Bar */}
      <div className="cartography-top-bar">
        <div className="status-indicator">
          <span className="thread-pulse-dot"></span>
          <span className="status-txt">
            {totalCompletedCount > 0 ? `✓ ${totalCompletedCount} / 10 Destinations Stamped` : '○ Unmarked Personal Map'}
          </span>
        </div>

        <button onClick={onOpenDrawer} className="btn-open-archive-drawer">
          View Personal Report & Archive &rarr;
        </button>
      </div>

      {/* Hero Section */}
      <header className="cartography-hero">
        <span className="hero-kicker">INTERACTIVE FIELD COMPANION</span>
        <h1 className="hero-title">Self-Cartography</h1>
        <p className="hero-subtitle">
          Map what you inherited, what you built to survive, and the road you are choosing now.
        </p>
        <blockquote className="hero-quote">
          "The book offers a landscape. These pages help you notice where your own roads resemble it—and where they do not."
        </blockquote>
        <div className="hero-action">
          <button onClick={onStartMapping} className="btn-begin-mapping">
            BEGIN MAPPING &darr;
          </button>
        </div>
      </header>
    </>
  );
}
