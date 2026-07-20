import React from 'react';
import { Link } from 'react-router-dom';

export default function SlugNotFound({ resourceName = "Entry", backPath = "/archive", backLabel = "Back to Archive" }) {
  return (
    <div className="container archive-page" style={{ padding: '4rem 0 6rem', textAlign: 'center' }}>
      <span className="page-kicker" style={{ color: 'var(--red)' }}>404 — Record Missing</span>
      <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
        The {resourceName} Has Not Been Found
      </h1>
      <p className="page-introduction" style={{ margin: '0 auto 2.5rem', maxWidth: '54ch' }}>
        The record you are searching for is missing from the manuscript catalogue, has been moved to another room, or was never transcribed into this territory.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to={backPath} className="btn btn-primary">
          {backLabel}
        </Link>
        <Link to="/archive" className="btn">
          Enter Archive Portal
        </Link>
      </div>
    </div>
  );
}
