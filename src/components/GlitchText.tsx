import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  // Make sizes easily controllable
  sizeClass?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', sizeClass = 'text-5xl md:text-7xl lg:text-8xl' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Randomly trigger a strong glitch effect occasionally to mimic broken digital signal
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200);

      // Schedule next severe glitch between 2 and 6 seconds
      setTimeout(triggerGlitch, 2000 + Math.random() * 4000);
    };

    const initialTimeout = setTimeout(triggerGlitch, 1500);
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <>
      <style>{`
        /* Core styling for the image aesthetic */
        .glitch-wrapper {
          position: relative;
          display: inline-block;
          font-family: inherit;
          /* The base text creates the dark core with a stroke */
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.1);
        }
        
        /* Night mode: Dark core */
        .dark .glitch-wrapper {
           -webkit-text-stroke: 2px rgba(255,255,255,0.4);
           color: #0b0c10;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          mix-blend-mode: screen;
          pointer-events: none;
          color: transparent;
        }

        /* 
          ANIMATIONS FOR SLICED LAYERS 
          The reference image has distinct horizontal strips. We use clip-path to slice them.
        */
        @keyframes slice-pink {
          0%   { clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%); transform: translate(-2px, 0); }
          50%  { clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%); transform: translate(3px, 0); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(-1px, 0); }
        }

        @keyframes slice-yellow {
          0%   { clip-path: polygon(0 30%, 100% 30%, 100% 65%, 0 65%); transform: translate(2px, 0); }
          50%  { clip-path: polygon(0 25%, 100% 25%, 100% 60%, 0 60%); transform: translate(-3px, 0); }
          100% { clip-path: polygon(0 35%, 100% 35%, 100% 70%, 0 70%); transform: translate(1px, 0); }
        }

        @keyframes slice-blue {
          0%   { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(-2px, 0); }
          50%  { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(2px, 0); }
          100% { clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%); transform: translate(-1px, 0); }
        }

        /* Continuous subtle jitter */
        .glitch-layer.pink {
          -webkit-text-stroke: 2px #ff00ff;
          text-shadow: 0 0 15px rgba(255, 0, 255, 0.6);
          animation: slice-pink 3s infinite steps(2, end) alternate-reverse;
          z-index: 3;
        }

        .glitch-layer.yellow {
          -webkit-text-stroke: 2px #ffff00;
          text-shadow: 0 0 15px rgba(255, 255, 0, 0.6);
          animation: slice-yellow 2.5s infinite steps(2, end) alternate-reverse;
          z-index: 2;
        }

        .glitch-layer.blue {
          -webkit-text-stroke: 2px #00ffff;
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
          animation: slice-blue 3.5s infinite steps(2, end) alternate-reverse;
          z-index: 1;
        }

        /* Intense Random Glitch Overrides */
        .glitch-intense .glitch-layer.pink {
          transform: translate(-6px, 2px) skewX(10deg);
          animation-duration: 0.1s;
        }
        .glitch-intense .glitch-layer.yellow {
          transform: translate(6px, -2px) skewX(-10deg);
          animation-duration: 0.15s;
        }
        .glitch-intense .glitch-layer.blue {
          transform: translate(-4px, 1px) scaleY(1.1);
          animation-duration: 0.1s;
        }
      `}</style>

      <div className={`glitch-wrapper font-black uppercase tracking-widest ${sizeClass} ${isGlitching ? 'glitch-intense' : ''} ${className}`}>
        {/* The Base Text Core */}
        {text}

        {/* Layered Slices */}
        <span className="glitch-layer pink" aria-hidden="true">
          {text}
        </span>
        <span className="glitch-layer yellow" aria-hidden="true">
          {text}
        </span>
        <span className="glitch-layer blue" aria-hidden="true">
          {text}
        </span>
      </div>
    </>
  );
};
