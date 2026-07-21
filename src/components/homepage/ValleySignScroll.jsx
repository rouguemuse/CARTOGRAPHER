import React, { useEffect, useState, useRef } from 'react';

export default function ValleySignScroll() {
  const containerRef = useRef(null);
  const [stage, setStage] = useState(0); // 0, 1, 2
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress within this section [0 to 1]
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      if (progress < 0.35) {
        setStage(0);
        setOpacity(Math.min(1, progress * 3));
      } else if (progress < 0.65) {
        setStage(1);
        setOpacity(1);
      } else if (progress < 0.88) {
        setStage(2);
        setOpacity(1);
      } else {
        setStage(2);
        setOpacity(Math.max(0, (1 - progress) * 8)); // fade out as sign recedes behind
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textLines = [
    { eyebrow: 'LOCATION III — THE VALLEY', line1: 'WELCOME TO THE VALLEY OF', line2: 'PLEASE UNDERSTAND ME' },
    { eyebrow: 'LOCATION III — THE VALLEY', line1: 'IF I EXPLAIN IT RIGHT', line2: 'THIS TIME' },
    { eyebrow: 'LOCATION III — THE VALLEY', line1: 'MAYBE THEY WILL', line2: 'FINALLY SEE' }
  ];

  const currentText = textLines[stage];

  return (
    <div ref={containerRef} className="valley-sign-container" style={{ opacity }}>
      <div className="wooden-roadside-sign">
        <div className="sign-wood-grain">
          <span className="sign-eyebrow">{currentText.eyebrow}</span>
          <h2 className="sign-text-main">{currentText.line1}</h2>
          <h3 className="sign-text-sub">{currentText.line2}</h3>
        </div>
      </div>
    </div>
  );
}
