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

  // Hand-tuned continuous paths from Hero Map through Road, Carnival, Weather, Legend, Corridor, Dispatches to Final Road
  const desktopThreadPath = 
    "M 490,40 C 530,180 470,320 500,450 C 530,580 460,700 520,840 C 580,980 430,1120 490,1260 C 550,1400 460,1540 510,1680 C 560,1820 440,1960 520,2100 C 600,2240 480,2380 500,2520 C 510,2600 495,2680 500,2740";

  const tabletThreadPath = 
    "M 500,40 C 530,180 470,320 500,450 C 530,580 470,700 510,840 C 550,980 450,1120 500,1260 C 540,1400 470,1540 500,1680 C 530,1820 460,1960 510,2100 C 550,2240 480,2380 500,2520 C 505,2600 498,2680 500,2740";

  const mobileThreadPath = 
    "M 500,40 C 515,180 485,320 500,450 C 515,580 485,700 500,840 C 515,980 485,1120 500,1260 C 515,1400 485,1540 500,1680 C 515,1820 485,1960 500,2100 C 515,2240 485,2380 500,2520 C 500,2600 500,2680 500,2740";

  const selectedPath = 
    viewport === 'mobile'
      ? mobileThreadPath
      : viewport === 'tablet'
        ? tabletThreadPath
        : desktopThreadPath;

  const pathLength = 2850;
  const activeDashOffset = pathLength * (1 - scrollProgress);

  return (
    <div className="narrative-thread-container" aria-hidden="true">
      <svg 
        className="narrative-thread-svg" 
        viewBox="0 0 1000 2800" 
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id="thread-ember-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ab1d20" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ab1d20" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Base Thread: Dark Oxblood, Low Opacity, Always Visible */}
        <path
          d={selectedPath}
          fill="none"
          stroke="#541417"
          strokeWidth="3.5"
          opacity="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="thread-base"
        />

        {/* 2. Active Illuminated Thread: Bright Crimson, Revealed with Scroll, Ember Glow Filter */}
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
