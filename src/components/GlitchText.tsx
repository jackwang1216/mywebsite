'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  characters?: string;
}

const GlitchText = ({ 
  text, 
  className = '', 
  delay = 0, 
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
}: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
      setIsAnimating(true);
      let iterations = 0;
      const maxIterations = text.length * 3;
      
      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              // Character is revealed if we've iterated enough times for this position
              if (iterations > index * 3) {
                return char;
              }
              
              // Show random character while scrambling
              if (char === ' ') return ' ';
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
        });

        iterations++;

        if (iterations >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsAnimating(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed, characters]);

  return (
    <span className={`${className} ${isAnimating ? 'font-mono' : ''}`}>
      {hasStarted ? (displayText || text) : ''}
    </span>
  );
};

export default GlitchText;