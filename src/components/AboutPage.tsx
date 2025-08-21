'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalPopup from './TerminalPopup';
import BackgroundEffect from './BackgroundEffect';

// Resume data updated from resume.md and existing data
const resumeData = {
  header: {
    name: "Jack Wang",
    title: "Software Engineer & Researcher",
    email: "thejackwang1216@gmail.com",
    location: "Boston, MA | Des Moines, IA | Shanghai, CN",
    github: "github.com/jackwang1216",
    linkedin: "linkedin.com/in/jackwang1216"
  },
  education: [
    {
      institution: "Massachusetts Institute of Technology (MIT)",
      degree: "B.S. Computer Science & Mathematics",
      period: "2024 - Present",
      details: "Computer Science & Mathematics at MIT",
      coursework: ["6.1210(Data Structure and Algorithms)", "6.1220(Design and Algorithms)", "6.3900(Machine Learning)",
        "6.1010(Fundamentals of Programming)", "18.600(Probability and Random Variables)", "18.100B(Real Analysis)",
        "18.650(Fundamentals of Statistics)"]
    }
  ],
  experience: [
    {
      company: "Truewind (YC W23)",
      role: "Software Engineer Intern",
      period: "June 2025 - Sep. 2025",
      location: "San Francisco, CA",
      description: "Software Engineer Intern",
      achievements: [
        "Developed and maintained full-stack features for a fintech platform using Next.js, Typescript, and tRPC for type-safe API communication.",
        "Designed and built Truewind's first Autonomous AI agent from scratch, introducing an agentic workflow that orchestrates tool use for accounting automation.",
        "Developed core infrastructure for the Model Context Protocol (MCP), enabling modular tool integration and dynamic context management within AI agents."
      ],
      status: "Current"
    },
    {
      company: "MIT Sloan School of Management",
      role: "Quantitative Researcher",
      period: "Nov. 2024 - May 2025",
      location: "Cambridge, MA",
      description: "Developed multilevel asset pricing model under Damon Peterson",
      achievements: [
        "Mathematically formalized multilevel factor models for cross-sectional heterogeneity",
        "Implemented novel factor models using Python, autoencoders, ridge regression, kernel PCA",
        "Analyzed discrepancies between time-series and cross-sectional regressions"
      ]
    },
    {
      company: "Forza Construction",
      role: "Software Engineer",
      period: "July 2024 - Present",
      location: "Seattle, WA",
      description: "Full-stack development and internal software solutions",
      achievements: [
        "Improved user experience with responsive UI/UX using React/TypeScript, Tailwind CSS",
        "Built internal software solutions for project management and team communication"
      ]
    }
  ],
  skills: {
    programming: ["Python", "JavaScript", "TypeScript", "Java"],
    web: ["React", "Next.js", "Node.js", "Tailwind CSS"],
    data: ["TensorFlow", "PyTorch", "Machine Learning", "Data Analysis"],
    tools: ["Git", "Docker", "AWS"]
  },
  languages: [
    "English - Native proficiency",
    "Mandarin Chinese - Native proficiency",
    "Japanese - Fluent (grew up in Osaka, Japan)"
  ],
  interests: [
    "Sports: Soccer (former Chinese national youth program), Track and Field",
    "Games: Chess, poker, strategic thinking games, Video Games(top1k Valorant, top500 Fortnite)",
    "I love gambling lowkey"
  ],
  journey: [
    "2005 - Born in Japan",
    "2010 - Childhood in Shanghai, China",
    "2018 - Moved to Iowa, USA",
    "2024 - Started at MIT"
  ]
};

interface AboutProps {
  onBack: () => void;
  onNavigate?: (destination: string) => void;
}

export default function About({ onBack, onNavigate }: AboutProps) {
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  

  // Handle terminal commands
  const handleTerminalCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    if (cmd === 'cat') {
      const section = args[0];
      if (['education', 'experience', 'skills', 'journey'].includes(section)) {
        setActiveSection(section);
        // Scroll to section
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }
      // Handle legacy commands
      if (['languages', 'interests'].includes(section)) {
        setActiveSection('skills');
        const element = document.getElementById('skills');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
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

  // Navigation sections
  const sections = [
    { id: 'about', name: 'About' },
    { id: 'education', name: 'Education' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Skills & More' },
    { id: 'journey', name: 'Journey' }
  ];


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

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                }}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  activeSection === section.id
                    ? 'bg-purple-400/20 text-purple-400 border border-purple-400/40'
                    : 'bg-gray-800/30 text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
            {/* About Section */}
            <section id="about" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{resumeData.header.name}</div>
                    <div className="text-lg text-purple-400 font-semibold mb-2">{resumeData.header.title}</div>
                    <div className="text-gray-300 text-sm">{resumeData.header.location}</div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                      I&apos;m a computer science and mathematics student at MIT with a passion for software engineering
                      and problem-solving. Born in Japan, raised in China and Iowa, I bring a global perspective
                      to technology and innovation.
                    </p>
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
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-4">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                      <p className="text-purple-400 font-medium">{edu.degree}</p>
                      <p className="text-gray-300 text-sm">{edu.details}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">{edu.period}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <span key={courseIndex} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-purple-400 font-medium text-sm">{exp.company}</p>
                        <p className="text-gray-300 text-sm">{exp.description}</p>
                      </div>
                      <div className="text-right flex flex-col items-end space-y-1">
                        <span className="px-2 py-1 bg-blue-400/20 text-blue-400 rounded-full text-xs">{exp.period}</span>
                        <span className="text-xs text-gray-400">{exp.location}</span>
                        {exp.status && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            exp.status === 'Upcoming' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-green-400/20 text-green-400'
                          }`}>
                            {exp.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {exp.achievements && (
                      <div className="mt-3">
                        <button
                          onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
                          className="flex items-center space-x-1 text-xs text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <span>Achievements</span>
                          <svg className={`w-3 h-3 transition-transform ${
                            expandedExperience === index ? 'rotate-180' : ''
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {expandedExperience === index && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-1 pl-3 mt-2"
                            >
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="text-gray-300 text-xs flex items-start space-x-2">
                                  <span className="text-purple-400 mt-1 w-1 h-1 bg-current rounded-full flex-shrink-0"></span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Skills, Languages & Interests Section */}
            <section id="skills" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-4">Skills & More</h2>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Technical Skills</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(resumeData.skills).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          {category === 'programming' ? 'Programming' :
                           category === 'web' ? 'Web Development' :
                           category === 'data' ? 'Data & AI' :
                           'Tools'}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-purple-400/10 text-purple-400 rounded text-xs border border-purple-400/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages and Interests in columns */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Languages */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Languages</h3>
                    <div className="space-y-2">
                      {resumeData.languages.map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{language}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Interests</h3>
                    <div className="space-y-2">
                      {resumeData.interests.map((interest, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                          <p className="text-gray-300 text-sm">{interest}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
          <p>Navigate through sections above or use terminal commands • Press <kbd className="px-2 py-1 bg-gray-800 rounded">`</kbd> for terminal access</p>
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