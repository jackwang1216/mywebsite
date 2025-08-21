'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'projects' | 'resume' | 'gallery' | 'contact' | 'blog';
  onCommand?: (command: string) => void;
  onNavigate?: (destination: string) => void;
}

interface HistoryEntry {
  command: string;
  output: string[];
  timestamp: Date;
}

export default function TerminalPopup({ 
  isOpen, 
  onClose, 
  context, 
  onCommand,
  onNavigate 
}: TerminalPopupProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: [
        `Terminal context: ${context}`,
        'Type "help" for context-specific commands.',
        ''
      ],
      timestamp: new Date()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Get context-specific commands
  const getContextCommands = (cmd: string, args: string[]): string[] => {
    const baseCommands = {
      'help': getHelpText(),
      'clear': [],
      'exit': ['Closing terminal...'],
      'back': ['Returning to main terminal...'],
      'pwd': [`/home/jackwang/${context}`],
      'cd': [], // Will be handled in handleSubmit for 'cd ..'
      '': []
    };

    if (baseCommands[cmd as keyof typeof baseCommands]) {
      return baseCommands[cmd as keyof typeof baseCommands];
    }

    switch (context) {
      case 'projects':
        return getProjectsCommands(cmd, args);
      case 'gallery':
        return getGalleryCommands(cmd, args);
      case 'contact':
        return getContactCommands(cmd);
      case 'resume':
        return getResumeCommands(cmd);
      case 'blog':
        return getBlogCommands(cmd);
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  const getHelpText = (): string[] => {
    const common = [
      `${context.toUpperCase()} TERMINAL COMMANDS`,
      '=' + '='.repeat(context.length + 18),
      '',
      'Common Commands:',
      '  help         - Show this help',
      '  clear        - Clear terminal',
      '  back         - Return to main terminal',
      '  cd ..        - Go back to main terminal',
      '  exit         - Close terminal popup'
    ];

    const contextSpecific = {
      projects: [
        'Project Commands:',
        '  ls           - List all projects',
        '  view <id>    - View project details',
        '  open <id>    - Open project link',
        '  filter <tech> - Filter by technology',
        ''
      ],
      gallery: [
        'Gallery Commands:',
        '  ls           - List all media',
        '  view <id>    - View media item',
        ''
      ],
      contact: [
        'Contact Commands:',
        '  info         - Show contact details',
        '  send         - Compose message',
        '  email        - Open email client',
        '  github       - Open GitHub profile',
        '  linkedin     - Open LinkedIn profile',
        ''
      ],
      resume: [
        'Resume Commands:',
        '  ls           - List sections',
        ''
      ],
      blog: [
        'Blog Commands:',
        '  ls           - List posts',
        '  read <id>    - Read post',
        '  search <term> - Search posts',
        '  recent       - Recent posts',
        ''
      ]
    };

    return [...common, ...contextSpecific[context]];
  };

  const getProjectsCommands = (cmd: string, args: string[]): string[] => {
    switch (cmd) {
      case 'ls':
        return [
          'Available projects:',
          '[1] Boldly - Comfort zone expansion app',
          '[2] Multilevel Factor - Quantitative research',
          '[3] Simplify.ai - AI accessibility tool',
          '[4] Black-Scholes - Financial modeling',
          '[5] Personal Website - This portfolio',
          ''
        ];
      case 'view':
      case 'open':
        if (args[0]) {
          onCommand?.(`${cmd} ${args[0]}`);
          return [`${cmd === 'view' ? 'Viewing' : 'Opening'} project ${args[0]}...`];
        }
        return ['Usage: ' + cmd + ' <project_id>'];
      case 'filter':
        if (args[0]) {
          return [`Filtering projects by ${args[0]}...`];
        }
        return ['Usage: filter <technology>'];
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  const getGalleryCommands = (cmd: string, args: string[]): string[] => {
    switch (cmd) {
      case 'ls':
        return [
          'Gallery items:',
          '[1] Professional photo',
          '[2] Mom and I',
          '[3] With Aria',
          '[4] Iowa Governor',
          '[5] Friend Jerry',
          '[6] Drake 4x4 Relay (video)',
          ''
        ];
      case 'view':
        if (args[0]) {
          onCommand?.(`view ${args[0]}`);
          return [`Viewing item ${args[0]}...`];
        }
        return ['Usage: view <item_id>'];
      case 'slideshow':
        onCommand?.('slideshow');
        return ['Starting slideshow...'];
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  const getContactCommands = (cmd: string): string[] => {
    switch (cmd) {
      case 'info':
        return [
          'Contact Information:',
          'Email: thejackwang1216@gmail.com',
          'GitHub: github.com/jackwang1216',
          'LinkedIn: linkedin.com/in/jackwang1216',
          'Location: Boston, MA'
        ];
      case 'send':
        onCommand?.('send');
        return ['Opening message composer...'];
      case 'email':
      case 'github': 
      case 'linkedin':
        return [`Opening ${cmd}...`];
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  const getResumeCommands = (cmd: string): string[] => {
    switch (cmd) {
      case 'ls':
        return [
          'Resume sections:',
          '• education    - MIT academic background',
          '• experience   - Work & internships',
          '• skills       - Technical abilities',  
          '• projects     - Key projects',
          '• languages    - Spoken languages',
          ''
        ];
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  const getBlogCommands = (cmd: string): string[] => {
    switch (cmd) {
      case 'ls':
        return ['No blog posts available yet...', ''];
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    // Handle special commands
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    
    if (cmd === 'exit') {
      onClose();
      return;
    }

    if (cmd === 'back') {
      onNavigate?.('terminal');
      return;
    }

    if (cmd === 'cd' && args[0] === '..') {
      onNavigate?.('terminal');
      return;
    }

    const output = getContextCommands(cmd, args);
    
    setHistory(prev => [...prev, {
      command,
      output,
      timestamp: new Date()
    }]);
    
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    setInput('');
  };

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic auto-complete
      const suggestions = ['help', 'ls', 'clear', 'exit', 'back'];
      const matches = suggestions.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 right-4 w-96 h-80 z-50"
      >
        <div className="h-full bg-black/95 backdrop-blur-lg border border-green-400/30 rounded-xl overflow-hidden shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-green-400/10 border-b border-green-400/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-mono">
                terminal@{context}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-green-400/60 hover:text-green-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 p-3 overflow-y-auto text-xs min-h-0"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#22c55e transparent' }}
          >
            <AnimatePresence>
              {history.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="mb-2"
                >
                  {entry.command && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-green-400">
                        {context}$
                      </span>
                      <span className="text-green-300">
                        {entry.command}
                      </span>
                    </div>
                  )}
                  <div className="text-green-300/90">
                    {entry.output.map((line, lineIndex) => (
                      <div key={lineIndex} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-green-400/20">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <span className="text-green-400 text-xs font-mono flex-shrink-0">
                {context}$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-300 text-xs font-mono outline-none"
                placeholder="Type command..."
                autoComplete="off"
                spellCheck="false"
              />
              <div className="w-1 h-3 bg-green-400 animate-pulse" />
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}