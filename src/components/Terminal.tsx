'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

interface TerminalProps {
  onNavigate: (destination: string) => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'beaver';
  timestamp: Date;
}

interface HistoryEntry {
  command: string;
  output: string[];
  timestamp: Date;
}

export default function Terminal({ onNavigate }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: [
        'Welcome to Jack Wang\'s MIT Terminal Interface',
        'jackwang@mit:~$ npm run build',
        '',
        '> Initializing personal website...',
        '> Loading MIT experience...',
        '> Ready for exploration!',
        '',
        'Type "help" for available commands.',
        ''
      ],
      timestamp: new Date()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isFirstBoot, setIsFirstBoot] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Show input after initialization completes (only if first boot)
  useEffect(() => {
    if (isFirstBoot) {
      // Calculate total delay: 8 lines (including empty ones) * 400ms + buffer for glitch animation
      const initializationDelay = 8 * 400 + 1000; // 4200ms total
      const timer = setTimeout(() => {
        setShowInput(true);
        setIsFirstBoot(false); // Mark that we've completed first boot
      }, initializationDelay);

      return () => clearTimeout(timer);
    } else {
      // For subsequent visits, show input immediately
      setShowInput(true);
    }
  }, [isFirstBoot]);

  // Focus input when it becomes visible
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);


  // Handle terminal commands
  const handleCommand = (command: string): string[] => {
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    switch (cmd) {
      
      case 'ls':
        return [
          'Available sections:',
          '',
          '  projects/            Interactive project portfolio',
          '  resume/              Professional experience',
          '  gallery/             Personal photos & memories',
          '  contact/             Get in touch',
          '  blog/                Thoughts & writings',
          ''
        ];
      
      case 'cd':
      case 'open':
        if (args[0]) {
          const destination = args[0];
          const validSections = ['projects', 'resume', 'gallery', 'contact', 'blog'];
          if (validSections.includes(destination)) {
            setTimeout(() => onNavigate(destination), 500);
            return [`Opening ${destination}...`, 'Transitioning to interactive view...'];
          } else {
            return [`Section '${destination}' not found.`, 'Try: ls'];
          }
        }
        return [`Usage: ${cmd} <section>`, 'Available sections: projects, resume, gallery, contact, blog'];
      
      case 'pwd':
        return ['/home/jackwang/mit'];
      
      case 'whoami':
        return [
          'Jack Wang',
          '',
          'MIT Student • Computer Science & Mathematics',
          'Born in Japan, grew up in China, lived in Iowa',
          'Now at MIT pursuing dual degree',
          'Passionate about AI, software engineering, and solving real problems',
          ''
        ];
      
      case 'skills':
        return [
          'Technical Skills & Expertise:',
          '',
          'Programming:     Python, JavaScript, TypeScript, C++, Java',
          'Web Development: React, Next.js, Node.js, Tailwind CSS, HTML/CSS',
          'Data & AI:       TensorFlow, PyTorch, Machine Learning, Data Analysis',
          'Tools:           Git, Docker, AWS, Linux, VS Code',
          '',
          'Languages:',
          '  • English - Native proficiency',
          '  • Mandarin Chinese - Native proficiency',
          '  • Japanese - Fluent (grew up in Osaka)',
          '',
          'Interests:',
          '  • Sports: Soccer (former Chinese national youth program), MIT Track & Field',
          '  • Games: Chess, poker, strategic thinking games',
          '  • Technology: AI Research, Software Engineering, Problem-solving',
          ''
        ];
      
      case 'education':
        return [
          'MIT Academic Details:',
          '',
          'Institution:     Massachusetts Institute of Technology (MIT)',
          'Degree:          B.S. Computer Science & Mathematics',
          'Period:          2024 - Present',
          'Location:        Cambridge, MA',
          'Details:         Computer Science & Mathematics at MIT'
        ];
      
      case 'history':
        return [
          'Life Journey (Japan→China→Iowa→MIT):',
          '',
          '2005         Born in Japan 🇯🇵',
          '             Early childhood in the Land of the Rising Sun',
          '',
          '2010         Childhood in Shanghai, China 🇨🇳',
          '             Formative years in a bustling metropolis',
          '             Learned to adapt to different cultures',
          '',
          '2018         Moved to Iowa, USA 🇺🇸',
          '             Midwest values and wide-open spaces',
          '             High school years, Academic Decathlon',
          '',
          '2024         Started at MIT 🎓',
          '             Cambridge, MA - pursuing CS & Math',
          '             Building the future with code and algorithms',
          '',
          '2024-2025    Creating AI agents & web experiences',
          '             Truewind internship, personal projects',
          '             "From Japan to China to Iowa to MIT - a global journey!"',
          ''
        ];
      
      case 'fortune':
        const fortunes = [
          'Jack can solve a Rubik\'s cube in under 2 minutes!',
          'He\'s lived on 3 different continents before turning 20.',
          'Jack built his first AI chatbot at age 16.',
          'He speaks English, Mandarin, and is learning Japanese.',
          'Jack\'s favorite debugging technique: rubber duck programming.',
          'He once stayed up 36 hours straight to finish a hackathon project.',
          'Jack\'s go-to snack while coding: green tea and pocky sticks.',
          'He dreams of building technology that makes the world more connected.',
          'Jack\'s coding playlist has over 500 lo-fi hip-hop tracks.',
          'He believes the best code is code that doesn\'t need comments.',
        ];
        return [
          'Random Fun Fact:',
          '',
          fortunes[Math.floor(Math.random() * fortunes.length)],
          ''
        ];
      
      case 'motd':
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
        const motds = [
          'Welcome to Jack\'s personal terminal! 🚀',
          'Currently building the future, one line of code at a time.',
          'Debugging is like being a detective in a crime movie where you are also the murderer.',
          'MIT: Where impossible problems become merely difficult.',
          'Remember: Code is poetry written for machines and humans alike.',
          'Today\'s challenge: Turn caffeine into code.',
          'The best error message is the one that never shows up.',
          'Building bridges between cultures through technology.',
          'Learning never stops at MIT - embrace the journey!',
          'Making the complex simple, one algorithm at a time.',
        ];
        return [
          `Message of the Day (${today.toDateString()}):`,
          '',
          motds[dayOfYear % motds.length],
          '',
          'Type "help" to explore available commands.',
          ''
        ];
      
      case 'clear':
        return [];
      
      case 'beaver':
      case 'help':
        if (args.includes('beaver') || cmd === 'beaver') {
          setChatMode(true);
          setChatMessages([{
            id: '1',
            text: "Hi! I'm jack.ai 🦫\n\nI'm Jack's AI assistant and can help you learn more about his journey, projects, and experiences. What would you like to know?\n\nType 'exit' to return to terminal.",
            sender: 'beaver',
            timestamp: new Date()
          }]);
          return [
            'Switching to chat mode with jack.ai...',
            'The beaver assistant will help you learn about Jack!',
            ''
          ];
        }
        return [
          'Jack Wang Terminal Interface v3.0',
          '==================================',
          '',
          'Navigation Commands:',
          '  ls                    - List all available sections',
          '  cd <section>          - Navigate to section (opens web page)',
          '  open <section>        - Alternative navigation command',
          '  pwd                   - Show current directory path',
          '',
          'Information Commands:',
          '  whoami               - About Jack Wang & background',
          '  skills               - Technical skills & expertise',  
          '  education            - MIT academic details',
          '  history              - Life journey (Japan→China→Iowa→MIT)',
          '  fortune              - Random fun fact about Jack',
          '  motd                 - Message of the day',
          '',
          'Interactive Features:',
          '  beaver               - Chat with jack.ai assistant 🦫',
          '',
          'Available Sections:',
          '  • projects           - Interactive project portfolio',
          '  • resume             - Professional experience & skills',
          '  • gallery            - Personal photos & videos',
          '  • contact            - Get in touch & social links',  
          '  • blog               - Thoughts & writings',
          '',
          'Terminal Tips:',
          '  • Use ` key to toggle terminal in sections',
          '  • Terminal commands work in all sections',
          '  • Type "clear" to clear screen',
          '',
          'Navigation: cd projects | cd resume | cd gallery | cd contact',
          ''
        ];
      
      case 'exit':
      case 'quit':
        onNavigate?.('dome');
        return [
          'Thanks for visiting!',
          'Returning to portal...'
        ];
      
      case '':
        return [];
      
      default:
        return [
          `Command not found: ${cmd}`,
          'Type "help" for available commands.',
          ''
        ];
    }
  };

  // Handle chat message submission
  const handleChatSubmit = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsLoadingChat(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: 'terminal-chat'
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const beaverMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't process that request right now.",
        sender: 'beaver',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, beaverMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong. Try asking me something else! 🦫",
        sender: 'beaver',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const command = input.trim();
    
    // Handle chat mode
    if (chatMode) {
      if (command.toLowerCase() === 'exit' || command.toLowerCase() === 'quit') {
        setChatMode(false);
        setChatMessages([]);
        setHistory(prev => [...prev, {
          command: '',
          output: [
            'Exited chat mode.',
            'Back to terminal interface.',
            ''
          ],
          timestamp: new Date()
        }]);
        setInput('');
        return;
      }
      
      handleChatSubmit(command);
      setInput('');
      return;
    }
    
    const output = handleCommand(command);
    
    // Special handling for clear command
    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    // Add to history
    setHistory(prev => [...prev, {
      command,
      output,
      timestamp: new Date()
    }]);
    
    // Add to command history
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
      // Auto-complete suggestions
      const suggestions = chatMode 
        ? ['exit', 'quit']
        : ['help', 'ls', 'cd', 'open', 'clear', 'pwd', 'whoami', 'skills', 'education', 'history', 'fortune', 'beaver'];
      const matches = suggestions.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  // Get current time for prompt
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen w-full bg-black text-green-400 font-mono text-sm overflow-hidden"
    >
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-full w-full overflow-y-auto p-6 pb-20"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#22c55e transparent' }}
      >
        {chatMode ? (
          // Chat Mode
          <>
            <div className="text-green-400 mb-4">
              <div className="flex items-center space-x-2">
                <span>🦫</span>
                <span className="font-bold">jack.ai - Interactive Chat Mode</span>
              </div>
              <div className="text-xs text-green-400/60 mt-1">
                Type 'exit' to return to terminal
              </div>
            </div>
            
            <AnimatePresence>
              {chatMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-4 ${message.sender === 'user' ? 'ml-8' : ''}`}
                >
                  <div className={`text-xs mb-1 ${
                    message.sender === 'user' ? 'text-green-300' : 'text-green-400'
                  }`}>
                    {message.sender === 'user' ? 'You' : 'jack.ai 🦫'} • {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className={`whitespace-pre-wrap ${
                    message.sender === 'user' 
                      ? 'text-green-300 bg-green-400/10 p-2 rounded border-l-2 border-green-400/50'
                      : 'text-green-400/90'
                  }`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoadingChat && (
              <div className="text-green-400/70 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-xs">jack.ai is thinking...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          // Terminal Mode
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="mb-2"
              >
                {entry.command && (
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-green-400">
                      jackwang@mit [{getCurrentTime()}]:~$
                    </span>
                    <span className="text-green-300">
                      {entry.command}
                    </span>
                  </div>
                )}
                <div className="text-green-300/90 whitespace-pre-wrap pl-0">
                  {entry.output.map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-relaxed">
                      {index === 0 && line.trim() !== '' && isFirstBoot ? (
                        <GlitchText 
                          text={line} 
                          delay={lineIndex * 400}
                          speed={25}
                          className="text-green-300/90"
                        />
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Current Input - only show after initialization */}
        {showInput && (
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-4">
            <span className="text-green-400 flex-shrink-0">
              {isFirstBoot ? (
                <GlitchText 
                  text={chatMode ? 'jack.ai>' : `jackwang@mit [${getCurrentTime()}]:~$`}
                  delay={0}
                  speed={20}
                  className="text-green-400"
                />
              ) : (
                chatMode ? 'jack.ai>' : `jackwang@mit [${getCurrentTime()}]:~$`
              )}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-300 outline-none"
              placeholder={chatMode ? "Ask me anything..." : ""}
              autoComplete="off"
              spellCheck="false"
              disabled={chatMode && isLoadingChat}
            />
            <div className="w-2 h-4 bg-green-400 animate-pulse" />
          </form>
        )}
      </div>

      {/* Help hint - only show after initialization */}
      {showInput && (
        <div className="absolute bottom-4 left-6 text-green-600/60 text-xs">
          {chatMode 
            ? "Chat mode: Ask questions • Type 'exit' to return" 
            : "Tip: Type 'help' for commands • 'beaver' to chat • ↑↓ for history"
          }
        </div>
      )}
    </motion.div>
  );
}