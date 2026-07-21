import React from 'react';
import './SvgRoutePath.css';

export default function SvgRoutePath({ scrollProgress = 0 }) {
  // Physical Dark Crimson Thread winding continuously through the environments
  // Path terminates at y=2750 near the physical lantern
  const pathLength = 2850;
  const dashOffset = pathLength * (1 - scrollProgress);

  return (
    <div className="svg-route-spine-container" aria-hidden="true">
      <svg 
        className="svg-route-canvas" 
        viewBox="0 0 1000 2800" 
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Underlay Organic Red Thread Path (Faint Deep Crimson Shadow) */}
        <path
          d="M 500,0 C 560,250 430,450 490,750 C 550,1050 440,1320 510,1580 C 580,1850 460,2120 515,2400 C 530,2550 495,2680 500,2750"
          stroke="rgba(80, 10, 10, 0.25)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Physical Dark Crimson Thread (Tactile, Frayed Organic Fiber Appearance) */}
        <path
          d="M 500,0 C 560,250 430,450 490,750 C 550,1050 440,1320 510,1580 C 580,1850 460,2120 515,2400 C 530,2550 495,2680 500,2750"
          stroke="#8c1c18"
          strokeWidth="2.2"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.82"
          fill="none"
          className="physical-red-thread-path"
        />
      </svg>
    </div>
  );
}
