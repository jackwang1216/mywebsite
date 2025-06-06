'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatModal from './ChatModal';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end justify-end gap-3">
        {/* Permanent label above button - visible only when NOT hovering */}
        <AnimatePresence>
          {!isHovering && (
            <motion.div 
              className="bg-black/80 text-gold px-3 py-1.5 rounded-full text-sm font-medium shadow-lg border border-gold/20 backdrop-blur-sm mb-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              Chat with Jack.ai
            </motion.div>
          )}
        </AnimatePresence>
        {/* Tooltip label - only visible on hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div 
              className="bg-black/80 text-gold px-3 py-1.5 rounded-full text-sm font-medium shadow-lg border border-gold/20 backdrop-blur-sm whitespace-nowrap absolute right-16"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Chat with Jack.ai
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          className="bg-gradient-to-tr from-black/90 to-black text-gold w-14 h-14 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm border border-gold/30 overflow-hidden"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: [1, 1.05, 1],  // Subtle pulse effect
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 30,
            scale: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,  // 2 seconds per pulse cycle
              repeatDelay: 3, // 3 second pause between pulses
              ease: "easeInOut"
            }
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setIsOpen(true)}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
          <motion.div
            animate={{ 
              rotate: [0, 10, 0],
              y: [0, -2, 0]  // Subtle bounce effect
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut",
              y: {
                duration: 2,
                delay: 0.5  // Slightly offset from the button pulse
              }
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 drop-shadow-gold"
              style={{ filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.5))' }}
            >
              <path 
                d="M10 3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V9l4.4-4.4c.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12L15.12 11H20.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5.38l4.4 4.4c.59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0L13 16.12V21.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-5.38l-4.4 4.4c-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12l4.4-4.4H2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h5.38L3.48 6.6c-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0L10 8.88V3.5z"
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && <ChatModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
