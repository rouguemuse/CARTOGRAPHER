import React, { useState, useEffect } from 'react';
import './SvgRoutePath.css';

export default function SvgRoutePath({ scrollProgress = 0 }) {
  const [viewport, setViewport] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setViewport('mobile');
      } else if (w < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous Full-Page Paths spanning from Y=0 to Y=10,000 (100% of full document height)
  // Hero (0-1000) -> Road Opens (1000-2000) -> Carnival (2000-3500) -> Weather (3500-5000) -> Legend (5000-6500) -> Corridor (6500-8000) -> Dispatches & Horizon (8000-10000)
  const desktopThreadPath = 
    "M 490,50 C 540,400 460,800 500,1200 C 550,1600 440,2000 520,2500 C 580,3000 430,3500 490,4000 C 550,4500 460,5000 510,5500 C 560,6000 440,6500 520,7000 C 580,7500 460,8000 510,8500 C 550,9000 490,9500 500,9950";

  const tabletThreadPath = 
    "M 500,50 C 530,400 470,800 500,1200 C 530,1600 470,2000 510,2500 C 550,3000 450,3500 500,4000 C 540,4500 470,5000 500,5500 C 530,6000 460,6500 510,7000 C 550,7500 470,8000 500,8500 C 530,9000 495,9500 500,9950";

  const mobileThreadPath = 
    "M 500,50 C 515,400 485,800 500,1200 C 515,1600 485,2000 500,2500 C 515,3000 485,3500 500,4000 C 515,4500 485,5000 500,5500 C 515,6000 485,6500 500,7000 C 515,7500 485,8000 500,8500 C 515,9000 495,9500 500,9950";

  const selectedPath = 
    viewport === 'mobile'
      ? mobileThreadPath
      : viewport === 'tablet'
        ? tabletThreadPath
        : desktopThreadPath;

  const pathLength = 10100;
  const activeDashOffset = pathLength * (1 - scrollProgress);

  return (
    <div className="narrative-thread-container" aria-hidden="true">
      <svg 
        className="narrative-thread-svg" 
        viewBox="0 0 1000 10000" 
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id="thread-ember-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ab1d20" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ab1d20" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. Base Thread: Dark Oxblood, Low Opacity, Always Visible Through Entire Page */}
        <path
          d={selectedPath}
          fill="none"
          stroke="#541417"
          strokeWidth="3.5"
          opacity="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="thread-base"
        />

        {/* 2. Active Illuminated Thread: Bright Crimson, Revealed with Scroll across Entire Page */}
        <path
          d={selectedPath}
          fill="none"
          stroke="#b51f27"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={activeDashOffset}
          filter="url(#thread-ember-glow)"
          className="thread-active"
        />
      </svg>
    </div>
  );
}
