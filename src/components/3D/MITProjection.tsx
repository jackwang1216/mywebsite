'use client';

import { useEffect, useState } from 'react';

interface MITProjectionProps {
  isHovered?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function MITProjection({ isHovered = false, onClick, className = '' }: MITProjectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    canvas: {
      position: 'relative' as const,
      width: '640px',
      height: '640px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    building: {
      position: 'absolute' as const,
      zIndex: 2,
      cursor: onClick ? 'pointer' : 'default',
      filter: `drop-shadow(0 0 10px #72e4ff) drop-shadow(0 0 18px rgba(0, 206, 255, .45))`,
      transition: 'transform .25s ease, opacity .25s ease',
      transform: isHovered ? 'translateY(-2px) scale(1.06)' : 'translateY(-4px) scale(1.06)',
      opacity: isHovered ? 1 : 0.98,
      animation: 'mitFloat 6s ease-in-out infinite'
    }
  };

  return (
    <div style={styles.container} className={className}>
      <div style={styles.canvas}>
        {/* Projection: wide, upward cone with soft bloom and side wings */}
        <svg width="560" height="320" viewBox="0 0 560 320" style={{ position: 'absolute', bottom: 0 }}>
          <defs>
            <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="coneGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0ff" stopOpacity="0.92" />
              <stop offset="35%" stopColor="#67e4ff" stopOpacity="0.42" />
              <stop offset="82%" stopColor="#a6f0ff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#c5f7ff" stopOpacity="0.06" />
            </linearGradient>

            <linearGradient id="rayGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#65e9ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#9aefff" stopOpacity="0.08" />
            </linearGradient>

            <radialGradient id="platformRadial" cx="50%" cy="58%" r="64%">
              <stop offset="0%" stopColor="#bff6ff" stopOpacity="1" />
              <stop offset="38%" stopColor="#5fe6ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#00aaff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Main cone */}
          <path d="M 280 290 L 80 134 L 480 134 Z" fill="url(#coneGrad)" filter="url(#softGlow)" />

          {/* Side light wings */}
          <g opacity="0.45" filter="url(#softGlow)">
            <path d="M 80 188 L 80 134 L 280 290 Z" fill="url(#coneGrad)" />
            <path d="M 480 188 L 480 134 L 280 290 Z" fill="url(#coneGrad)" />
          </g>

          {/* Rays */}
          <g>
            {Array.from({ length: 34 }, (_, i) => {
              const spread = 370;
              const startX = 280;
              const startY = 290;
              const endX = 95 + (i * (spread / 33));
              const endY = 134;
              const op = 0.08 + 0.2 * Math.sin((i / 29) * Math.PI);
              return (
                <line
                  key={i}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#rayGrad)"
                  strokeWidth="0.7"
                  opacity={op}
                />
              );
            })}
          </g>

          {/* Platform with rings and bright core */}
          <g>
            <ellipse cx="280" cy="290" rx="190" ry="16" fill="url(#platformRadial)" filter="url(#softGlow)" />
            <ellipse cx="280" cy="290" rx="162" ry="13" fill="none" stroke="#75eaff" strokeWidth="1.2" opacity="0.62" />
            <ellipse cx="280" cy="290" rx="130" ry="10" fill="none" stroke="#7df0ff" strokeWidth="1" opacity="0.52" />
            <ellipse cx="280" cy="290" rx="96" ry="8" fill="none" stroke="#9cefff" strokeWidth="0.9" opacity="0.44" />
            <ellipse cx="280" cy="290" rx="62" ry="6" fill="none" stroke="#c7f7ff" strokeWidth="0.8" opacity="0.36" />
            <circle cx="280" cy="290" r="4.2" fill="#d2fbff" />
          </g>
        </svg>

        {/* Building (neon blueprint style) */}
        <svg width="660" height="554" viewBox="0 0 520 520" onClick={onClick} style={styles.building}>
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#36cfff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#81f3ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#36cfff" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b2f3ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#5fdcff" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="facadeFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6fe6ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1bb7ff" stopOpacity="0.08" />
            </linearGradient>
            <filter id="edgeGlow2" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.6" result="bb" />
              <feMerge>
                <feMergeNode in="bb" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="tb" />
              <feMerge>
                <feMergeNode in="tb" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="domeEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#37d8ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#9df3ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#37d8ff" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="domeFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#baf4ff" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#5fdcff" stopOpacity="0.08" />
            </linearGradient>
            <radialGradient id="domeHighlight" cx="50%" cy="35%" r="80%">
              <stop offset="0%" stopColor="#e7fcff" stopOpacity="0.30" />
              <stop offset="70%" stopColor="#9fefff" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#7be6ff" stopOpacity="0" />
            </radialGradient>
            <filter id="domeGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="0.8" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
          </defs>

          <g transform="translate(12, 0)">

          {/* Soft fill silhouettes for facade + drum + dome */}
          <g opacity="0.55" filter="url(#edgeGlow2)">
            <rect x="75" y="300" width="350" height="120" fill="url(#fillGrad)" />
            <rect x="70" y="285" width="360" height="10" fill="url(#fillGrad)" />
            
          </g>

          {/* Baselines */}
          <g stroke="#7eeeff" strokeWidth="1.5" fill="none" opacity="0.8">
            <rect x="70" y="430" width="360" height="15" rx="2" />
            <rect x="75" y="415" width="350" height="12" rx="1" />
            <rect x="80" y="400" width="340" height="12" rx="1" />
          </g>

          {/* Base + facade fill behind columns */}
          <g opacity="0.95">
            <rect x="75" y="312" width="350" height="88" fill="url(#facadeFillGrad)" opacity="0.22" />
            <rect x="75" y="312" width="350" height="88" stroke="#55d8ff" strokeWidth="2" fill="none" />
          </g>

          {/* Columns with glowing cores (shortened to clear the text) */}
          <g opacity="0.98">
            {Array.from({ length: 10 }, (_, i) => {
              const x = 95 + (i * 32);
              return (
                <g key={i}>
                  <linearGradient id={`colFill-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b6f6ff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#5ddcff" stopOpacity="0.12" />
                  </linearGradient>
                  <rect x={x - 1} y="318" width="7" height="82" fill={`url(#colFill-${i})`} />
                  <rect x={x} y="318" width="5" height="82" stroke="url(#edgeGrad)" strokeWidth="1.6" fill="none" />
                  <rect x={x - 3} y="312" width="11" height="6" strokeWidth="1" stroke="#81f3ff" fill="none" />
                  <rect x={x - 2} y="400" width="9" height="5" strokeWidth="1" stroke="#81f3ff" fill="none" />
                </g>
              );
            })}
          </g>

          {/* Window grid behind columns */}
          <g stroke="#8feaff" strokeWidth="0.6" opacity="0.25">
            {Array.from({ length: 12 }, (_, i) => {
              const x = 95 + (i * 28);
              return <line key={`vg-${i}`} x1={x} y1="318" x2={x} y2="398" />;
            })}
            {Array.from({ length: 5 }, (_, i) => {
              const y = 318 + (i * 16);
              return <line key={`hg-${i}`} x1={95} y1={y} x2={405} y2={y} />;
            })}
          </g>

          {/* Entablature + text */}
          <g>
            <rect x="70" y="282" width="360" height="28" stroke="#8df2ff" strokeWidth="2" fill="none" opacity="0.95" />
            <text x="250" y="306" textAnchor="middle" fontSize="12" fill="#e6fbff" fontFamily="monospace" letterSpacing="1.2" filter="url(#textGlow)">
              MASSACHUSETTS INSTITUTE OF TECHNOLOGY
            </text>
          </g>

          {/* Flat stepped cornice (replaces triangular pediment) */}
          <g stroke="#9cf4ff" strokeWidth="2" fill="none" opacity="0.9">
            <line x1="70" y1="292" x2="430" y2="292" />
            <line x1="80" y1="288" x2="420" y2="288" opacity="0.85" />
            <line x1="90" y1="284" x2="410" y2="284" opacity="0.75" />
          </g>

          {/* === Dome (drum + layered arcs) === */}
          <g id="mit-dome" opacity="0.96" filter="url(#domeGlow)">
            {/* Dome gradients and glow defs are declared above */}
            <ellipse cx="250" cy="280" rx="118" ry="8" stroke="url(#domeEdgeGrad)" strokeWidth="2" fill="none" />
            <rect x="132" y="242" width="236" height="38" fill="url(#domeFillGrad)" opacity="0.18" />
            <rect x="132" y="242" width="236" height="38" stroke="url(#domeEdgeGrad)" strokeWidth="2" fill="none" opacity="0.9" />
            <ellipse cx="250" cy="242" rx="118" ry="10" stroke="url(#domeEdgeGrad)" strokeWidth="2" fill="none" />

            <path d="M 132 242 Q 250 206 368 242" fill="none" stroke="url(#domeEdgeGrad)" strokeWidth="2.2" />
            <path d="M 148 236 Q 250 210 352 236" fill="none" stroke="url(#domeEdgeGrad)" strokeWidth="2" opacity="0.95" />
            <path d="M 166 224 Q 250 204 334 224" fill="none" stroke="url(#domeEdgeGrad)" strokeWidth="1.8" opacity="0.92" />
            <path d="M 184 214 Q 250 200 316 214" fill="none" stroke="url(#domeEdgeGrad)" strokeWidth="1.6" opacity="0.9" />
            <path d="M 202 206 Q 250 196 298 206" fill="none" stroke="url(#domeEdgeGrad)" strokeWidth="1.5" opacity="0.88" />
            <ellipse cx="250" cy="192" rx="22" ry="5" stroke="url(#domeEdgeGrad)" strokeWidth="1.4" fill="url(#domeFillGrad)" opacity="0.8" />

            <ellipse cx="250" cy="208" rx="108" ry="28" fill="url(#domeHighlight)" opacity="0.22">
              <animate attributeName="opacity" values="0.18;0.28;0.18" dur="4.5s" repeatCount="indefinite" />
            </ellipse>
          </g>
          </g>
        </svg>
      </div>
    </div>
  );
}