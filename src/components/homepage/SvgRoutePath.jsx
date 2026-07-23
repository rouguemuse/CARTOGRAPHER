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

  // Organic curves starting right at Y=0 (top edge of hero)
  const desktopThreadPath = 
    "M 480,0 C 220,380 280,720 420,1100 C 580,1500 240,1900 360,2400 C 650,2900 320,3400 480,3900 C 620,4400 320,4900 460,5400 C 640,5900 280,6400 420,6900 C 580,7400 320,7900 480,8400 C 620,8900 360,9400 500,9950";

  const tabletThreadPath = 
    "M 490,0 C 310,380 340,720 430,1100 C 540,1500 320,1900 400,2400 C 580,2900 360,3400 480,3900 C 590,4400 360,4900 460,5400 C 580,5900 340,6400 430,6900 C 540,7400 370,7900 480,8400 C 580,8900 410,9400 500,9950";

  const mobileThreadPath = 
    "M 495,0 C 420,380 430,720 460,1100 C 510,1500 440,1900 470,2400 C 530,2900 450,3400 490,3900 C 520,4400 460,4900 485,5400 C 525,5900 455,6400 480,6900 C 510,7400 465,7950 490,8400 C 520,8900 480,9400 500,9950";

  const selectedPath = 
    viewport === 'mobile'
      ? mobileThreadPath
      : viewport === 'tablet'
        ? tabletThreadPath
        : desktopThreadPath;

  const pathLength = 10100;
  // Ensure top hero section thread is immediately illuminated at page load
  const effectiveProgress = Math.max(0.08, scrollProgress);
  const activeDashOffset = pathLength * (1 - effectiveProgress);

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
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#b3211d" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#b3211d" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* 1. Visible Base Thread: Starts right at Y=0 */}
        <path
          d={selectedPath}
          fill="none"
          stroke="#8c1c18"
          strokeWidth="2.2"
          opacity="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="thread-base"
        />

        {/* 2. Active Illuminated Thread: Immediately glowing at top hero section */}
        <path
          d={selectedPath}
          fill="none"
          stroke="#b3211d"
          strokeWidth="2.2"
          opacity="0.95"
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
