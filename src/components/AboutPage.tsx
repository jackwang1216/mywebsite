'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TerminalPopup from './TerminalPopup';
import BackgroundEffect from './BackgroundEffect';

// Resume data updated from resume.md and existing data
const resumeData = {
  header: {
    name: "Jack Wang",
    title: "Software Engineer & Researcher",
    email: "thejackwang1216@gmail.com",
    location: "Boston, MA",
    github: "github.com/jackwang1216",
    linkedin: "linkedin.com/in/jackwang1216"
  },
  journey: [
    "2005 - Born in Japan",
    "2005-2015 - Moved back and forth between Shanghai and Osaka",
    "2015 - Moved to Iowa, USA",
    "2024 - Started at MIT"
  ]
};

interface AboutProps {
  onBack: () => void;
  onNavigate?: (destination: string) => void;
}

export default function About({ onBack, onNavigate }: AboutProps) {
  const [showTerminal, setShowTerminal] = useState(false);
  

  // Handle terminal commands
  const handleTerminalCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    if (cmd === 'cat') {
      const section = args[0];
      const target = section === 'journey' ? 'journey' : 'about';
      const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowTerminal(!showTerminal);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTerminal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative text-white"
    >
      {/* Animated Background */}
      <BackgroundEffect theme="resume" />
      {/* Header */}
      <div className="container mx-auto px-6 py-12 pb-24 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="backdrop-blur-sm bg-gray-900/30 p-4 rounded-xl border border-gray-700/30">
            <h1 className="text-4xl font-bold text-white mb-2">About Me</h1>
            <p className="text-lg text-gray-300">
              MIT student, software engineer, and global citizen
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className="p-3 bg-gray-800/50 hover:bg-gray-800/80 border border-purple-400/30 hover:border-purple-400/60 rounded-lg transition-colors"
              title="Toggle Terminal (`)"
            >
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800/80 text-gray-300 hover:text-white rounded-lg transition-colors"
            >
              Home
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
            {/* Compact About Section */}
            <section id="about" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <div className="text-3xl">{resumeData.header.name}</div>
                    <div className="text-lg text-purple-400 font-semibold">{resumeData.header.title}</div>
                    <div className="text-gray-300 text-sm">{resumeData.header.location}</div>
                  </div>
                    <div className="flex flex-wrap gap-2">
                      <a href={`https://${resumeData.header.github}`} target="_blank" rel="noopener noreferrer"
                         className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-sm hover:bg-purple-400/30 transition-colors">
                        GitHub
                      </a>
                      <a href={`https://${resumeData.header.linkedin}`} target="_blank" rel="noopener noreferrer"
                         className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm hover:bg-blue-400/30 transition-colors">
                        LinkedIn
                      </a>
                      <a href={`mailto:${resumeData.header.email}`}
                         className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-sm hover:bg-purple-400/30 transition-colors">
                        Email
                      </a>
                    </div>
                  </div>
                <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                  <p>
                    I&apos;m a computer science and mathematics student at MIT with a passion for software engineering and problem solving. Born in Japan, raised in China and Iowa.
                  </p>
                  <p>
                    This past summer I did full stack development and created agents for accountant teams at Truewind (YC W23). In the past I&apos;ve also worked on quantitative research at MIT Sloan and built software for Forza Construction.
                  </p>
                  <p>
                    I speak: English, Japanese, Mandarin.
                  </p>
                  <p>
                    Interests: Chess, Poker, Video Games(top1k Valorant, top500 Fortnite), Soccer (former Chinese national youth program), Track and Field, I love gambling lowkey
                  </p>
                </div>
              </div>
            </section>

            {/* Journey Section */}
            <section id="journey" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-4">Journey</h2>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {resumeData.journey.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <div className="text-gray-300 text-sm">{step}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-400/20">
                  <p className="text-center text-gray-300 text-sm italic">失败是成功之母</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Press <kbd className="px-2 py-1 bg-gray-800 rounded">`</kbd> for terminal access</p>
        </div>

      {/* Terminal Popup */}
      <TerminalPopup
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        context="resume"
        onCommand={handleTerminalCommand}
        onNavigate={onNavigate}
      />
    </motion.div>
  );
}