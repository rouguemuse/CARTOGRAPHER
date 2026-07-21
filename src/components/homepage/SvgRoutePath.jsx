import React, { useEffect, useState } from 'react';

export default function SvgRoutePath({ scrollProgress = 0 }) {
  const [pathLength, setPathLength] = useState(2000);

  // SVG viewBox is normalized: 0 0 100 1000
  // Path winds smoothly down the entire page
  const d = `
    M 50,0
    C 45,8 30,15 35,25
    C 40,35 65,40 60,50
    C 55,60 30,65 38,75
    C 45,85 70,90 50,100
    C 30,110 65,120 48,135
    C 30,150 70,165 50,180
    C 30,195 65,210 52,230
    C 40,250 60,270 50,300
    C 40,330 65,360 48,400
    C 30,440 70,480 50,520
    C 30,560 65,600 52,650
    C 40,700 60,750 50,800
    C 40,850 65,900 50,950
    L 50,1000
  `;

  const dashOffset = Math.max(0, pathLength * (1 - scrollProgress));

  return (
    <svg
      className="continuous-red-route-svg"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3
      }}
      aria-hidden="true"
    >
      {/* Soft dark shadow path behind red line */}
      <path
        d={d}
        fill="none"
        stroke="rgba(0, 0, 0, 0.4)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Main continuous red route line */}
      <path
        d={d}
        fill="none"
        stroke="#b3211d"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        style={{
          transition: 'stroke-dashoffset 0.1s ease-out'
        }}
      />
    </svg>
  );
}
