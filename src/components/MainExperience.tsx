'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DomePortal from './DomePortal';
import Terminal from './Terminal';
import UnifiedScrollPage from './UnifiedScrollPage';
import GalleryPage from './GalleryPage';

export type ExperienceState = 'dome' | 'terminal' | 'room' | 'unified';
export type RoomType = 'gallery' | 'blog';

interface MainExperienceProps {
  initialState?: ExperienceState;
}

export default function MainExperience({ initialState = 'dome' }: MainExperienceProps) {
  const [currentState, setCurrentState] = useState<ExperienceState>(initialState);
  const [currentRoom, setCurrentRoom] = useState<RoomType | null>(null);
  const [targetSection, setTargetSection] = useState<string>('about');

  // Handle navigation commands
  const handleNavigate = (destination: string) => {
    switch (destination.toLowerCase()) {
      case 'dome':
      case 'portal':
      case 'home':
        setCurrentState('dome');
        setCurrentRoom(null);
        break;
      case 'terminal':
        setCurrentState('terminal');
        setCurrentRoom(null);
        break;
      case 'projects':
        setTargetSection('projects');
        setCurrentState('unified');
        setCurrentRoom(null);
        break;
      case 'about':
      case 'cv':
        setTargetSection('about');
        setCurrentState('unified');
        setCurrentRoom(null);
        break;
      case 'contact':
      case 'email':
        setTargetSection('contact');
        setCurrentState('unified');
        setCurrentRoom(null);
        break;
      case 'gallery':
      case 'images':
      case 'photos':
        setCurrentState('room');
        setCurrentRoom('gallery');
        break;
      case 'blog':
      case 'writing':
        setCurrentState('room');
        setCurrentRoom('blog');
        break;
      default:
        console.log(`Unknown destination: ${destination}`);
    }
  };

  // Enter terminal from dome
  const handleEnterTerminal = () => {
    console.log('Entering terminal...');
    setCurrentState('terminal');
  };




  return (
    <div className={`h-screen w-full relative ${currentState === 'room' || currentState === 'unified' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      <AnimatePresence mode="wait">
        {currentState === 'dome' && (
          <motion.div
            key="dome"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <DomePortal onEnterCorridor={handleEnterTerminal} onGoToResume={() => handleNavigate('about')} />
          </motion.div>
        )}

        {currentState === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Terminal onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentState === 'unified' && (
          <motion.div
            key="unified"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            <UnifiedScrollPage onBack={() => setCurrentState('dome')} onNavigate={handleNavigate} initialSection={targetSection} />
          </motion.div>
        )}

        {currentState === 'room' && currentRoom && (
          <motion.div
            key={`room-${currentRoom}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            {currentRoom === 'gallery' && (
              <GalleryPage onBack={() => setCurrentState('dome')} onNavigate={handleNavigate} />
            )}
            {currentRoom === 'blog' && (
              <div className="h-full w-full flex items-center justify-center bg-black">
                <div className="text-center">
                  <h1 className="text-4xl font-mono text-green-400 mb-4">Blog Terminal</h1>
                  <p className="text-green-300/70">Coming soon...</p>
                  <button
                    onClick={() => setCurrentState('terminal')}
                    className="mt-4 px-6 py-2 bg-green-400/20 border border-green-400/50 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors font-mono"
                  >
                    Back to Terminal
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>



      {/* UI Controls: show path only in terminal and room states */}
      {currentState !== 'dome' && currentState !== 'unified' && (
        <div className="absolute top-4 right-4 z-30">
          <div className="px-3 py-2 bg-black/60 backdrop-blur-sm border border-green-400/30 rounded-lg">
            <span className="text-xs text-green-400 font-mono">
              {currentState === 'terminal' && 'jackwang@mit:~$'}
              {currentState === 'room' && currentRoom && `jackwang@mit:~/${currentRoom}`}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}