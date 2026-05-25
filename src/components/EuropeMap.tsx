import React from 'react';
import europeMap from '/europe-map.png';

/**
 * Animated Europe map overlay.
 * Coordinates are percentages relative to the square map image.
 */
const NODES: { x: number; y: number; delay: number; label?: string }[] = [
  { x: 31, y: 43, delay: 0.0, label: 'London' },
  { x: 33, y: 48, delay: 0.4, label: 'Paris' },
  { x: 43, y: 42, delay: 0.8, label: 'Berlin' },
  { x: 54, y: 35, delay: 0.2, label: 'Warsaw' },
  { x: 55, y: 56, delay: 1.0, label: 'Sofia (HQ)' },
  { x: 43, y: 57, delay: 0.6, label: 'Rome' },
  { x: 62, y: 60, delay: 1.4, label: 'Istanbul' },
  { x: 51, y: 48, delay: 0.5, label: 'Vienna' },
  { x: 70, y: 37, delay: 1.6, label: 'Moscow' },
  { x: 50, y: 42, delay: 0.9, label: 'Prague' },
  { x: 26, y: 60, delay: 1.2, label: 'Madrid' },
  { x: 77, y: 78, delay: 1.8, label: 'Arabia' },
  { x: 87, y: 78, delay: 2.0, label: 'UAE' },
];

const VISIBLE_NODE_INDICES = new Set([0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12]); // London, Paris, Berlin, Warsaw, Sofia, Rome, Moscow, Prague, Madrid, Arabia, UAE

const ROUTES: { from: number; to: number; delay: number }[] = [
  { from: 4, to: 0,  delay: 0.0 }, // Sofia → London
  { from: 4, to: 1,  delay: 0.3 }, // Sofia → Paris
  { from: 4, to: 2,  delay: 0.6 }, // Sofia → Berlin
  { from: 4, to: 3,  delay: 0.9 }, // Sofia → Warsaw
  { from: 4, to: 5,  delay: 1.2 }, // Sofia → Rome
  { from: 4, to: 8,  delay: 1.5 }, // Sofia → Moscow
  { from: 4, to: 9,  delay: 1.8 }, // Sofia → Prague
  { from: 4, to: 10, delay: 2.1 }, // Sofia → Madrid
  { from: 4, to: 11, delay: 2.4 }, // Sofia → Arabia
  { from: 4, to: 12, delay: 2.7 }, // Sofia → UAE
];

function curvedPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // Perpendicular offset for curve apex
  const nx = -dy / dist;
  const ny = dx / dist;
  const curvature = dist * 0.25;
  const cx = mx + nx * curvature;
  const cy = my + ny * curvature;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function EuropeMap({
  className = 'w-full aspect-square',
  fit = 'contain',
}: {
  className?: string;
  fit?: 'contain' | 'cover';
}) {
  const objectFit = fit === 'cover' ? 'object-cover' : 'object-contain';
  const svgPreserve = fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet';
  return (
    <div className={`relative ${className}`}>
      {/* Soft gold glow behind the map */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 55% 50%, hsla(38, 60%, 55%, 0.16), transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      <div className="relative w-full h-full map-float">
        <img
          src={europeMap}
          alt="Map of Europe with Prime Axis market reach"
          className={`w-full h-full ${objectFit} select-none`}
          draggable={false}
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio={svgPreserve}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          {/* Trade routes from Sofia — curved + travelling pulse */}
          {ROUTES.map((r, i) => {
            const a = NODES[r.from];
            const b = NODES[r.to];
            const d = curvedPath(a.x, a.y, b.x, b.y);
            return (
              <g key={`route-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="hsl(38, 60%, 55%)"
                  strokeWidth="0.18"
                  strokeLinecap="round"
                  className="map-route-base"
                />
                <path
                  d={d}
                  fill="none"
                  stroke="hsl(40, 80%, 62%)"
                  strokeWidth="0.32"
                  strokeLinecap="round"
                  className="map-route-pulse"
                  style={{ animationDelay: `${r.delay}s` }}
                />
              </g>
            );
          })}

          {/* Visible city nodes — Sofia is 2x, others normal */}
          {NODES.map((n, i) => {
            if (!VISIBLE_NODE_INDICES.has(i)) return null;
            const isSofia = i === 4;
            const scale = isSofia ? 2 : 1;
            return (
              <g key={`node-${i}`} style={{ transformOrigin: `${n.x}% ${n.y}%` }}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={0.7 * scale}
                  fill="none"
                  stroke="hsl(38, 60%, 55%)"
                  strokeWidth={0.18 * scale}
                  className="map-node-pulse"
                  style={{ animationDelay: `${n.delay}s` }}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={0.55 * scale}
                  fill="hsl(38, 70%, 55%)"
                  className="map-node-core"
                  style={{ animationDelay: `${n.delay}s` }}
                />
                <circle cx={n.x} cy={n.y} r={0.22 * scale} fill="hsl(40, 90%, 75%)" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
