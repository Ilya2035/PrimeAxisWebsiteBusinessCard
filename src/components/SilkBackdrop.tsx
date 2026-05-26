import React from 'react';

/**
 * Monochrome cream silk backdrop.
 * Wide light/dark cream bands warped by a slow turbulence + displacement
 * filter — reads as soft draped fabric folds, not multicolor stripes.
 */
export function SilkBackdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Oversized filter region so displaced edges never reveal background */}
          <filter id="silk-warp" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.008"
              numOctaves="1"
              seed="6"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="40s"
                values="0.004 0.008; 0.005 0.010; 0.004 0.008"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90">
              <animate
                attributeName="scale"
                dur="34s"
                values="80; 110; 80"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>

          {/* Wide cream-on-cream bands: light and slightly darker cream
              alternating gives the impression of fabric folds catching light. */}
          <linearGradient id="silk-folds" x1="0" y1="0" x2="1" y2="0.85">
            <stop offset="0%"   stopColor="hsl(40, 35%, 86%)" />
            <stop offset="18%"  stopColor="hsl(40, 35%, 93%)" />
            <stop offset="34%"  stopColor="hsl(40, 30%, 82%)" />
            <stop offset="50%"  stopColor="hsl(40, 35%, 94%)" />
            <stop offset="66%"  stopColor="hsl(40, 30%, 84%)" />
            <stop offset="82%"  stopColor="hsl(40, 35%, 93%)" />
            <stop offset="100%" stopColor="hsl(40, 32%, 86%)" />
          </linearGradient>

          {/* Soft drifting highlight */}
          <linearGradient id="silk-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="hsl(40, 35%, 97%)" stopOpacity="0.0" />
            <stop offset="50%"  stopColor="hsl(40, 35%, 97%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(40, 35%, 97%)" stopOpacity="0.0" />
          </linearGradient>

          {/* Subtle fabric grain */}
          <filter id="fabric-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="1" />
            <feColorMatrix
              values="0 0 0 0 0.85
                      0 0 0 0 0.80
                      0 0 0 0 0.70
                      0 0 0 0.08 0"
            />
          </filter>
        </defs>

        {/* Cream base — never reveals a different color underneath */}
        <rect x="-200" y="-200" width="1200" height="1000" fill="hsl(40, 35%, 90%)" />

        {/* Draped silk folds */}
        <g filter="url(#silk-warp)">
          <rect x="-300" y="-250" width="1400" height="1100" fill="url(#silk-folds)" />
        </g>

        {/* Travelling highlight */}
        <g filter="url(#silk-warp)" opacity="0.6">
          <rect x="-400" y="-100" width="1600" height="800" fill="url(#silk-sheen)">
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-300 0"
              to="300 0"
              dur="18s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* Very fine fabric grain on top */}
        <rect width="800" height="600" filter="url(#fabric-grain)" opacity="0.6" />
      </svg>
    </div>
  );
}
