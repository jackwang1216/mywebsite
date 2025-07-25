'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const fullName = "Jack\nWang";
  const fullDescription = "I just like learning new things and applying them lol";

  const [displayName, setDisplayName] = useState("");
  const [displayDescription, setDisplayDescription] = useState("");
  const [isNameDone, setIsNameDone] = useState(false);
  const [isDescriptionDone, setIsDescriptionDone] = useState(false);

  // Effect for typing the name
  useEffect(() => {
    if (displayName === fullName) {
      setIsNameDone(true);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayName(fullName.substring(0, displayName.length + 1));
    }, 150); // Adjust speed as needed

    return () => clearTimeout(timeout);
  }, [displayName, fullName]);

  // Effect for typing the description after the name is complete
  useEffect(() => {
    if (!isNameDone) return;

    if (displayDescription === fullDescription) {
      setIsDescriptionDone(true);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayDescription(fullDescription.substring(0, displayDescription.length + 1));
    }, 75); // Faster typing for description

    return () => clearTimeout(timeout);
  }, [displayDescription, fullDescription, isNameDone]);

  return (
    <header className="min-h-screen flex items-center justify-center relative">
      <div className="text-center space-y-8">
        <h1 className="text-8xl font-serif font-bold text-cream">
          {displayName.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < displayName.split('\n').length - 1 && <br />}
            </span>
          ))}
          {!isNameDone && <span className="inline-block animate-blink ml-1">|</span>}
        </h1>
        <p className="text-2xl text-cream/80 font-serif italic">
          {displayDescription}
          {!isDescriptionDone && isNameDone &&
            <span className="inline-block animate-blink ml-1">|</span>
          }
        </p>
        <div className="flex items-center justify-center space-x-6">
          <a
            href="https://github.com/jackwang1216"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jackwang1216/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
