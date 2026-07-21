import React from 'react';
import './SvgRoutePath.css';

export default function SvgRoutePath({ scrollProgress = 0 }) {
  // Animated Crimson Thread lighting up continuously through the environments as you scroll
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
        {/* Underlay Deep Crimson Guide Shadow */}
        <path
          d="M 500,0 C 560,250 430,450 490,750 C 550,1050 440,1320 510,1580 C 580,1850 460,2120 515,2400 C 530,2550 495,2680 500,2750"
          stroke="rgba(139, 0, 0, 0.2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Illuminated Active Red Thread (Lights up with crimson ember glow on scroll) */}
        <path
          d="M 500,0 C 560,250 430,450 490,750 C 550,1050 440,1320 510,1580 C 580,1850 460,2120 515,2400 C 530,2550 495,2680 500,2750"
          stroke="#b3211d"
          strokeWidth="2.5"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
          fill="none"
          className="illuminated-red-thread-path"
        />
      </svg>
    </div>
  );
}
