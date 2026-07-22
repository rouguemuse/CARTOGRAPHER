import React from 'react';

// Hand-engraved style: 1.5px stroke, warm ivory/brass color, occasional red details, raw lines
const baseStroke = {
  stroke: '#EDE4CF',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none'
};

const redStroke = {
  stroke: '#b3211d',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none'
};

const brassStroke = {
  stroke: '#B99A55',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none'
};

export function CompassRoseIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="18" {...baseStroke} strokeDasharray="3 3" />
      <path d="M 24,6 L 24,42 M 6,24 L 42,24" {...brassStroke} />
      {/* North Arrow Red Detail */}
      <path d="M 24,6 L 28,18 L 24,15 L 20,18 Z" stroke="#b3211d" strokeWidth="1.5" fill="#b3211d" />
      <path d="M 24,42 L 28,30 L 24,33 L 20,30 Z" {...baseStroke} fill="none" />
      <path d="M 42,24 L 30,28 L 33,24 L 30,20 Z" {...baseStroke} fill="none" />
      <path d="M 6,24 L 18,28 L 15,24 L 18,20 Z" {...baseStroke} fill="none" />
    </svg>
  );
}

export function FoldedMapIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <path d="M 8,10 L 18,6 L 30,10 L 40,6 L 40,38 L 30,42 L 18,38 L 8,42 Z" {...baseStroke} />
      <path d="M 18,6 L 18,38 M 30,10 L 30,42" {...brassStroke} />
      {/* Red Thread Trail crossing the map */}
      <path d="M 10,18 Q 15,24 24,20 T 38,30" {...redStroke} />
    </svg>
  );
}

export function RulerIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <rect x="6" y="16" width="36" height="16" rx="2" {...baseStroke} />
      <path d="M 12,16 L 12,22 M 18,16 L 18,26 M 24,16 L 24,22 M 30,16 L 30,26 M 36,16 L 36,22" {...brassStroke} />
      {/* Red mark indicator */}
      <circle cx="18" cy="16" r="2.5" fill="#b3211d" stroke="#b3211d" />
    </svg>
  );
}

export function CloudIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Hand drawn cloud contour */}
      <path d="M 12,32 A 6,6 0 0,1 12,20 A 8,8 0 0,1 26,16 A 10,10 0 0,1 38,24 A 6,6 0 0,1 36,32 Z" {...baseStroke} />
      {/* Isobar / Pressure Wind lines */}
      <path d="M 8,36 L 40,36" {...brassStroke} strokeDasharray="4 2" />
      <path d="M 14,40 L 34,40" {...redStroke} />
    </svg>
  );
}

export function CoatIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Stylized coat collar and shoulders */}
      <path d="M 12,42 L 12,20 L 20,10 L 28,10 L 36,20 L 36,42 Z" {...baseStroke} />
      <path d="M 12,20 L 24,28 L 36,20" {...brassStroke} />
      <path d="M 24,28 L 24,42" {...brassStroke} />
      {/* Red button detail */}
      <circle cx="24" cy="34" r="2" fill="#b3211d" stroke="#b3211d" />
    </svg>
  );
}

export function WolfIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Wolf track / teeth mark pattern */}
      <path d="M 24,24 Q 28,14 34,22" {...baseStroke} />
      <path d="M 24,24 Q 20,14 14,22" {...baseStroke} />
      {/* Claws */}
      <path d="M 18,12 L 20,16 M 30,12 L 28,16" {...redStroke} />
      <path d="M 24,8 L 24,13" {...redStroke} />
      {/* Main pad */}
      <path d="M 18,34 Q 24,28 30,34 Q 32,38 24,38 Q 16,38 18,34 Z" {...brassStroke} />
    </svg>
  );
}

export function BridgeIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Simple arch bridge */}
      <path d="M 6,36 Q 24,24 42,36" {...baseStroke} />
      <path d="M 6,30 Q 24,18 42,30" {...baseStroke} />
      <path d="M 14,26 L 14,31 M 24,22 L 24,27 M 34,26 L 34,31" {...brassStroke} />
      {/* Red threat line underneath the bridge */}
      <path d="M 6,40 Q 24,34 42,40" {...redStroke} />
    </svg>
  );
}

export function EnvelopeIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <rect x="8" y="14" width="32" height="20" rx="1.5" {...baseStroke} />
      <path d="M 8,14 L 24,26 L 40,14" {...brassStroke} />
      {/* Red wax seal detail */}
      <circle cx="24" cy="25" r="3.5" fill="#b3211d" stroke="#b3211d" />
    </svg>
  );
}

export function DoorIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <path d="M 12,42 L 12,8 L 36,8 L 36,42 Z" {...baseStroke} />
      <path d="M 18,8 L 18,42 M 30,8 L 30,42" {...brassStroke} strokeDasharray="3 3" />
      {/* Red door handle */}
      <circle cx="32" cy="25" r="2.5" fill="#b3211d" stroke="#b3211d" />
    </svg>
  );
}

export function SpoolIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Thread spool */}
      <path d="M 14,10 L 34,10 M 14,38 L 34,38" {...baseStroke} strokeWidth="2.5" />
      <rect x="18" y="14" width="12" height="20" rx="1" {...brassStroke} />
      {/* Winding red thread spooling out */}
      <path d="M 18,18 H 30 M 18,22 H 30 M 18,26 H 30 M 18,30 H 30" {...redStroke} />
      <path d="M 30,24 Q 38,24 32,36 T 40,42" {...redStroke} />
    </svg>
  );
}

export function HorizonIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Horizon line */}
      <path d="M 6,28 L 42,28" {...baseStroke} />
      {/* Road lines perspective disappearing */}
      <path d="M 24,28 L 10,42 M 24,28 L 38,42" {...brassStroke} />
      <path d="M 24,28 L 24,42" {...redStroke} strokeDasharray="3 2" />
    </svg>
  );
}

export function LanternIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Lantern outline */}
      <path d="M 18,12 L 30,12 L 32,16 L 16,16 Z" {...baseStroke} />
      <rect x="18" y="20" width="12" height="16" rx="2" {...baseStroke} />
      <path d="M 18,36 L 30,36 L 32,40 L 16,40 Z" {...baseStroke} />
      {/* Glass arches */}
      <path d="M 20,20 Q 24,28 20,36 M 28,20 Q 24,28 28,36" {...brassStroke} />
      {/* Red light ember in the middle */}
      <circle cx="24" cy="28" r="3" fill="#b3211d" stroke="#b3211d" />
    </svg>
  );
}

export function CraneIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {/* Origami folded crane lines */}
      <path d="M 8,32 L 20,26 L 34,30 L 40,16 L 24,20 L 8,32" {...baseStroke} />
      <path d="M 20,26 L 24,10 L 24,20" {...brassStroke} />
      <path d="M 34,30 L 28,42 L 20,26" {...brassStroke} />
      {/* Red head tip detail */}
      <path d="M 8,32 L 5,30" {...redStroke} strokeWidth="2" />
    </svg>
  );
}
