'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatModal from './ChatModal';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-tr from-black/90 to-black text-gold w-14 h-14 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm border border-gold/30 overflow-hidden group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
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

      <AnimatePresence>
        {isOpen && <ChatModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
