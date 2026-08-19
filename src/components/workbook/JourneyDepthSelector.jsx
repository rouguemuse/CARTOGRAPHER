import React from 'react';

export default function JourneyDepthSelector({ selectedDepthKey, onSelectDepth }) {
  return (
    <section className="choose-depth-section">
      <header className="section-head">
        <span className="mono-kicker">STEP 1 — CHOOSE YOUR JOURNEY DEPTH</span>
        <h2 className="section-title">Select Your Cartographic Depth</h2>
      </header>

      <div className="depth-options-grid">
        <button
          className={`depth-option-card ${selectedDepthKey === 'quick_bearing' ? 'active' : ''}`}
          onClick={() => onSelectDepth('quick_bearing')}
        >
          <span className="depth-badge">10 MINUTES</span>
          <h3 className="depth-card-title">A Quick Bearing</h3>
          <p className="depth-card-desc">Starter journey focused on origin maps, boundary lines, and finding your internal north.</p>
          <span className="depth-card-route">Maps Given · Code of Lines · Compass</span>
        </button>

        <button
          className={`depth-option-card ${selectedDepthKey === 'working_map' ? 'active' : ''}`}
          onClick={() => onSelectDepth('working_map')}
        >
          <span className="depth-badge">30–45 MINUTES</span>
          <h3 className="depth-card-title">A Working Map</h3>
          <p className="depth-card-desc">Core guided cartography through inherited rules, emotional weather, boundaries, and integration.</p>
          <span className="depth-card-route">7 Core Destinations + Integration</span>
        </button>

        <button
          className={`depth-option-card ${selectedDepthKey === 'full_journey' ? 'active' : ''}`}
          onClick={() => onSelectDepth('full_journey')}
        >
          <span className="depth-badge">FULL JOURNEY</span>
          <h3 className="depth-card-title">Full Self-Cartography</h3>
          <p className="depth-card-desc">The complete 10-territory psychological atlas and companion experience.</p>
          <span className="depth-card-route">Complete 10-Territory Psychological Atlas</span>
        </button>
      </div>
    </section>
  );
}
