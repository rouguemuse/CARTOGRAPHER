import React from 'react';
import './SvgRoutePath.css';

export default function SvgRoutePath({ scrollProgress = 0 }) {
  // Calculate SVG stroke-dashoffset based on scroll progress
  // Route terminates at y=2750 (the lantern before final signup area)
  const pathLength = 2750;
  const dashOffset = pathLength * (1 - scrollProgress);

  return (
    <div className="svg-route-spine-container" aria-hidden="true">
      <svg 
        className="svg-route-canvas" 
        viewBox="0 0 1000 2800" 
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Underlay Guide Line (Faint Muted Crimson) */}
        <path
          d="M 500,0 Q 580,350 480,700 T 520,1400 T 460,2100 T 500,2750"
          stroke="rgba(179, 33, 29, 0.15)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Animated Active Crimson Route Spine */}
        <path
          d="M 500,0 Q 580,350 480,700 T 520,1400 T 460,2100 T 500,2750"
          stroke="#b3211d"
          strokeWidth="2.5"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity="0.65"
          fill="none"
        />
      </svg>
    </div>
  );
}
