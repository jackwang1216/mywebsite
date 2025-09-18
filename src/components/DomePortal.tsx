'use client';

import { useState, useEffect } from 'react';
import MITProjection from './MITProjection';
import GlitchText from './GlitchText';


// Typing animation hook
function useTypingAnimation(text: string, speed: number = 100, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, speed);
      } else {
        setIsComplete(true);
      }
    };

    if (startDelay > 0 && displayText.length === 0) {
      timeout = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [displayText, text, speed, startDelay]);

  return { displayText, isComplete };
}

// Initial landing text
function InitialLandingText() {
  const name = useTypingAnimation("Jack Wang", 120);
  const description = useTypingAnimation(
    "I just like learning new things and applying them lol", 
    60, 
    name.isComplete ? 800 : 0
  );

  return (
    <div className="text-center">
      <h1 className="text-7xl font-mono font-bold text-cyan mb-8 leading-tight">
        {name.displayText}
        {!name.isComplete && <span className="inline-block animate-pulse ml-2 text-cyan">|</span>}
      </h1>
      
      <p className="text-xl text-cyan/70 font-mono leading-relaxed mb-12">
        {description.displayText}
        {!description.isComplete && name.isComplete && (
          <span className="inline-block animate-pulse ml-1 text-cyan">|</span>
        )}
      </p>
    </div>
  );
}


// Main Portal Component
export default function DomePortal({ onEnterCorridor, onGoToResume }: { onEnterCorridor: () => void; onGoToResume: () => void }) {
  const [portalState, setPortalState] = useState<'initial' | 'opening' | 'opened'>('initial');
  const [isHovered, setIsHovered] = useState(false);
  const OPEN_DELAY_MS = 500; // half-second blackout
  const [isLighting, setIsLighting] = useState(false);

  const handleOpenPortal = () => {
    setPortalState('opening');
    setTimeout(() => {
      setPortalState('opened');
      setIsLighting(true);
      setTimeout(() => setIsLighting(false), 1200);
    }, OPEN_DELAY_MS);
  };

  const handleEnter = () => {
    onEnterCorridor();
  };

  if (portalState === 'initial') {
    return (
      <div className="h-screen w-full relative overflow-hidden bg-black flex items-center justify-center">
        <div className="text-center">
          <InitialLandingText />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenPortal}
              aria-label="Initialize portal"
              className="bg-transparent border border-cyan/60 text-cyan px-6 py-3 text-sm font-mono hover:bg-cyan/10 hover:border-cyan transition-all duration-300 rounded backdrop-blur-sm"
            >
              INITIALIZE_PORTAL.EXE
            </button>
            <div className="relative group">
              <button
                onClick={onGoToResume}
                aria-label="View about"
                className="bg-transparent border border-purple-400/60 text-purple-400 px-6 py-3 text-sm font-mono hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 rounded backdrop-blur-sm"
              >
                VIEW_ABOUT
              </button>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 border border-purple-400/60 text-purple-200 rounded px-2 py-1 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Click me for shortcut!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      {/* Blackout overlay during opening */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
        portalState === 'opening' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} />

      {/* Holographic MIT Dome (hidden during opening to avoid flash) */}
      <div className="absolute inset-0">
        <div className={`w-full h-full flex items-center justify-center -translate-y-12 md:-translate-y-16 lg:-translate-y-20 ${
          portalState === 'opening' ? 'opacity-0' : 'opacity-100'
        } ${isLighting ? 'light-up' : ''}`}>
          <MITProjection isHovered={isHovered} onClick={handleEnter} />
        </div>
      </div>

      {/* Minimal UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* MIT Info */}
        <div className={`absolute top-6 left-6 transition-opacity duration-800 ${
          portalState === 'opened' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-black/40 backdrop-blur-sm border border-cyan/20 rounded p-3">
            <div className="text-cyan text-xs font-mono opacity-90">MASSACHUSETTS INSTITUTE OF TECHNOLOGY</div>
            <div className="text-cyan/60 text-xs font-mono">HOLOGRAPHIC_PROJECTION_ACTIVE</div>
          </div>
        </div>

        {/* Terminal Build Button */}
        <div className={`absolute bottom-28 md:bottom-36 lg:bottom-40 left-1/2 transform -translate-x-1/2 transition-opacity duration-800 delay-400 ${
          portalState === 'opened' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="pointer-events-auto">
            <button
              onClick={handleEnter}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-black/80 backdrop-blur-sm border border-green-400/50 rounded-lg px-8 py-4 hover:border-green-400/80 hover:bg-green-400/5 transition-all duration-200 text-green-400 font-mono group shadow-lg"
            >
              <div className="text-center">
                <div className="text-green-400 text-lg mb-1 group-hover:animate-pulse">
                  <GlitchText 
                    text="$ npm run build" 
                    delay={800}
                    speed={40}
                    className="text-green-400"
                  />
                </div>
                <div className="text-green-400/60 text-xs">
                  <GlitchText 
                    text="Initialize Terminal Interface" 
                    delay={2000}
                    speed={60}
                    className="text-green-400/60"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}