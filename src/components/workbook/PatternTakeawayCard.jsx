import React from 'react';

export default function PatternTakeawayCard({ patternInsight, selectedStatus, onValidate }) {
  if (!patternInsight) return null;

  return (
    <div className="pattern-synthesis-card">
      <div className="synthesis-header">
        <span className="synthesis-kicker">GIVING SOMETHING BACK — SYNTHESIZED PATTERN</span>
        <h4 className="synthesis-title">A Pattern Appearing</h4>
      </div>

      <p className="pattern-insight-text">
        "{patternInsight}"
      </p>

      <div className="pattern-validation-controls">
        <span className="validation-label">Does this match your experience?</span>
        <div className="validation-chips">
          {['That fits', 'Partly fits', 'Not mine', 'Reword this'].map(status => (
            <button
              key={status}
              type="button"
              className={`chip-btn ${selectedStatus === status ? 'selected' : ''}`}
              onClick={() => onValidate(status)}
            >
              {selectedStatus === status ? `✓ ${status}` : status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
