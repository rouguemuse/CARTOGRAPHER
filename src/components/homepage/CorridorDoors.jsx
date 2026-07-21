import React from 'react';
import { Link } from 'react-router-dom';
import { useJourneyState } from '../../hooks/useJourneyState';

export default function CorridorDoors() {
  const { getActiveJourney } = useJourneyState();
  const activeJourney = getActiveJourney();
  const carriedObject = activeJourney?.carriedObject;

  return (
    <div className="corridor-doors-container">
      <header className="corridor-header">
        <span className="small-label">LOCATION VI — THE CORRIDOR</span>
        <h2 className="section-h2">The Two Letter Rooms</h2>
        <p className="section-intro-desc">
          Two physical entryways at the end of the hall. One leads into private correspondence; the other to an open wall of unsaid sentences.
        </p>
      </header>

      <div className="corridor-doors-grid">
        
        {/* DOOR 1: DEAR RED */}
        <Link to="/dear-red" className="corridor-door-card door-dear-red">
          <div className="door-frame">
            <div className="door-wood">
              <div className="door-handle"></div>
              <div className="slipped-red-letter" title="Red envelope slipped beneath door"></div>
            </div>
          </div>
          <div className="door-info">
            <span className="small-label">PRIVATE ROOM</span>
            <h3 className="door-title">Dear Red</h3>
            <p className="door-subtitle">"A private room for the version of you who kept explaining."</p>
            <p className="door-desc">
              Letters for the selves we abandoned while trying to be understood. Submitted letters remain strictly private by default.
            </p>
            <span className="door-action-text">Enter Room &rarr;</span>
          </div>
        </Link>

        {/* DOOR 2: THINGS I SHOULD HAVE SAID */}
        <Link to="/things-i-should-have-said" className="corridor-door-card door-unsaid-wall">
          <div className="door-frame">
            <div className="door-wood">
              <div className="door-handle"></div>
              <div className="pinned-paper-scraps" title="Pinned paper fragments around doorway"></div>
            </div>
          </div>
          <div className="door-info">
            <span className="small-label">PUBLIC WALL</span>
            <h3 className="door-title">Things I Should Have Said</h3>
            <p className="door-subtitle">"A public wall for words that arrived after the room was gone."</p>
            <p className="door-desc">
              An anonymous wall of tactile paper fragments (max 300 chars) left behind after the conversation ended.
            </p>
            <span className="door-action-text">Step to the Wall &rarr;</span>
          </div>
        </Link>

      </div>

      {carriedObject && (
        <div className="relic-corridor-trace">
          <span className="small-label" style={{ fontSize: '11px', color: 'var(--color-brass)' }}>
            TRACE IN THE HALL: Carrying {carriedObject.replace('_', ' ')}
          </span>
        </div>
      )}
    </div>
  );
}
