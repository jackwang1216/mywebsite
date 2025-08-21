'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalPopup from './TerminalPopup';
import BackgroundEffect from './BackgroundEffect';

interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  location: string;
  phone?: string;
  timezone: string;
}

const contactInfo: ContactInfo = {
  email: "thejackwang1216@gmail.com",
  github: "github.com/jackwang1216",
  linkedin: "linkedin.com/in/jackwang1216",
  location: "Boston, MA",
  timezone: "EST"
};

const socialLinks = [
  {
    name: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    description: "Best way to reach me"
  },
  {
    name: "GitHub",
    value: contactInfo.github,
    href: `https://${contactInfo.github}`,
    description: "Check out my code"
  },
  {
    name: "LinkedIn",
    value: contactInfo.linkedin,
    href: `https://${contactInfo.linkedin}`,
    description: "Professional network"
  }
];

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; email: string; subject: string; message: string };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
}

const ContactFormModal = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  submitStatus
}: ContactFormModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="backdrop-blur-sm bg-gray-900/90 rounded-xl border border-gray-700/50 shadow-2xl shadow-green-500/10 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Send Message</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-300">Thanks for reaching out. I'll get back to you soon!</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-400 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => onChange('subject', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-400 focus:outline-none transition-colors"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => onChange('message', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-400 focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">Failed to send message. Please try again or email directly.</p>
              </div>
            )}

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-400 hover:bg-green-500 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

interface ContactRoomProps {
  onBack: () => void;
  onNavigate?: (destination: string) => void;
}

export default function ContactRoom({ onBack, onNavigate }: ContactRoomProps) {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Memoized form handlers to prevent unnecessary re-renders
  const handleFormChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Open modal with a clean state
  const openContactForm = useCallback(() => {
    setSubmitStatus('idle');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setShowContactForm(true);
  }, []);

  // Handle terminal commands
  const handleTerminalCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    if (cmd === 'send' || cmd === 'compose' || cmd === 'message') {
      openContactForm();
    } else if (cmd === 'email') {
      window.open(`mailto:${contactInfo.email}`, '_blank');
    } else if (cmd === 'github') {
      window.open(`https://${contactInfo.github}`, '_blank');
    } else if (cmd === 'linkedin') {
      window.open(`https://${contactInfo.linkedin}`, '_blank');
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowTerminal(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowContactForm(prev => {
          if (prev) {
            return false;
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Remove dependencies to prevent re-attachment

  // Handle message sending
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          // Include subject at the top of message body for clarity
          message: (formData.subject ? `Subject: ${formData.subject}\n\n` : '') + formData.message,
          to: 'thejackwang1216@gmail.com'
        })
      });

      if (!response.ok) throw new Error('Failed to send');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowContactForm(false), 1000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact form modal (unused old inline def removed; now using external component)

  // Get current time in different timezones
  const getCurrentTime = () => {
    const now = new Date();
    return {
      est: now.toLocaleString('en-US', { timeZone: 'America/New_York', timeStyle: 'short' }),
      pst: now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', timeStyle: 'short' }),
      cst: now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai', timeStyle: 'short' })
    };
  };

  const timeData = getCurrentTime();



  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative text-white"
      >
        {/* Animated Background */}
        <BackgroundEffect theme="contact" />
        {/* Header */}
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/30">
              <h1 className="text-5xl font-bold text-white mb-4">Get In Touch</h1>
              <p className="text-xl text-gray-300">
                Let&apos;s connect! I&apos;m always open to discussing new opportunities
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="p-3 bg-gray-800/50 hover:bg-gray-800/80 border border-green-400/30 hover:border-green-400/60 rounded-lg transition-colors"
                title="Toggle Terminal (`)"
              >
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-green-400/30 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-1">{link.description}</p>
                      <p className="text-green-400 text-sm font-mono">{link.value}</p>
                    </div>
                    <svg className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Location & Time */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">📍 Location & Time</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-gray-300">Currently based in:</span>
                    <p className="text-green-400 font-medium">{contactInfo.location}</p>
                  </div>
                  <div className="grid grid-cols-1 place-items-center pt-4 border-t border-gray-700/50">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">EST</div>
                      <div className="text-green-400 font-mono text-sm">{timeData.est}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Message Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>
              
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Let's Chat!</h3>
                  <p className="text-gray-300 mb-6">
                    Whether it's about work, projects, or just to say hello - I'd love to hear from you!
                  </p>
                  
                  <button
                    onClick={openContactForm}
                    className="px-8 py-4 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-400/20"
                  >
                    Compose Message
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-400">
                  <p>Or use the quick links above to reach out directly</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-blue-400 font-medium text-sm">Typical Response Time</p>
                    <p className="text-gray-300 text-sm">I usually respond within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center text-gray-400 text-sm">
            <p>Click the contact methods above or compose a message • Press <kbd className="px-2 py-1 bg-gray-800 rounded">`</kbd> for terminal commands</p>
          </div>
        </div>

        {/* Terminal Popup */}
        <TerminalPopup
          isOpen={showTerminal}
          onClose={() => setShowTerminal(false)}
          context="contact"
          onCommand={handleTerminalCommand}
          onNavigate={onNavigate}
        />
      </motion.div>
      
      {/* Contact Form Modal */}
      <AnimatePresence>
        <ContactFormModal
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSendMessage}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
        />
      </AnimatePresence>
    </>
  );
}