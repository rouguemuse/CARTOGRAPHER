import React from 'react';
import './SvgRoutePath.css';

export default function SvgRoutePath({ scrollProgress = 0 }) {
  // Calculate SVG stroke-dashoffset based on scroll progress
  const pathLength = 3200;
  const dashOffset = pathLength * (1 - scrollProgress);

  return (
    <div className="svg-route-spine-container" aria-hidden="true">
      <svg 
        className="svg-route-canvas" 
        viewBox="0 0 1000 3200" 
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Underlay Guide Line (Faint Muted Crimson) */}
        <path
          d="M 500,0 Q 580,400 480,800 T 520,1600 T 460,2400 T 500,3200"
          stroke="rgba(179, 33, 29, 0.15)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Animated Active Crimson Route Spine */}
        <path
          d="M 500,0 Q 580,400 480,800 T 520,1600 T 460,2400 T 500,3200"
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
