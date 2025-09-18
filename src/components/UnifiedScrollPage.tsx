'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TerminalPopup from './TerminalPopup';
import BackgroundEffect from './BackgroundEffect';

// Resume data from AboutPage
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

// Projects data from ProjectsPage
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  video?: string;
  link: string;
  status?: string;
  year?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Boldly",
    description: "A web app that helps users step out of their comfort zone, personalized to the user",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "/assets/boldly.png",
    video: "/assets/Boldly-video.mp4",
    link: "https://github.com/weblab-class/jackwang1216-hansenfan-JerryLiu06",
    status: "Complete",
    year: "2024"
  },
  {
    id: 2,
    title: "Multilevel Factor Model",
    description: "Quantitative Research: Recreating a multilevel factor model that better represents the real world, under Damon Peterson",
    technologies: ["Python", "Machine Learning", "Mathematics"],
    image: "/assets/multilevel.png",
    video: "/assets/multilevel-video.mp4",
    link: "https://www.linkedin.com/in/jackwang1216/",
    status: "Research",
    year: "2024-2025"
  },
  {
    id: 3,
    title: "Simplify.ai",
    description: "AI tool that helps illiterate, non-native speaking, and other disabled people",
    technologies: ["React", "Python", "Azure", "FastAPI"],
    image: "/assets/simplifyai.png",
    video: "/assets/simplifyai-video.mp4",
    link: "https://github.com/jackwang1216/Simplified.ai",
    status: "Complete",
    year: "2024"
  },
  {
    id: 4,
    title: "Black-Scholes Option Pricing Model",
    description: "Not just a model that utilizes the Black-Scholes Model, but also showing heatmaps and P&L analysis. Planning Greeks analysis with theoretical vs real market values.",
    technologies: ["Python", "Mathematics", "Finance"],
    link: "https://github.com/jackwang1216/Black-Sholes",
    status: "Complete",
    year: "2024"
  },
  {
    id: 5,
    title: "Forza Construction Website",
    description: "Modern, responsive website for Forza Construction company featuring project showcases, service information, and contact forms. Built with modern web technologies for optimal performance and user experience.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "#",
    status: "Complete",
    year: "2024"
  }
];

// Contact data from ContactPage
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

interface UnifiedScrollPageProps {
  onBack: () => void;
  onNavigate?: (destination: string) => void;
  initialSection?: string;
}

export default function UnifiedScrollPage({ onBack, onNavigate, initialSection = 'about' }: UnifiedScrollPageProps) {
  const [showTerminal, setShowTerminal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(initialSection);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Scroll to initial section on mount
  useEffect(() => {
    if (initialSection && initialSection !== 'about') {
      setTimeout(() => {
        scrollToSection(initialSection);
      }, 100);
    }
  }, [initialSection]);


  // Handle terminal commands
  const handleTerminalCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    if (cmd === 'cd') {
      const section = args[0];
      if (['about', 'projects', 'contact', 'home', '~'].includes(section)) {
        scrollToSection(section === '~' || section === 'home' ? 'about' : section);
        return [`Navigating to ${section === '~' ? 'top' : section}...`];
      }
    } else if (cmd === 'view' || cmd === 'open') {
      const projectId = parseInt(args[0]);
      const project = projects.find(p => p.id === projectId);
      if (project) {
        if (cmd === 'view') {
          setSelectedProject(project);
        } else {
          if (project.link !== '#') {
            window.open(project.link, '_blank');
          }
        }
        return [`${cmd === 'view' ? 'Viewing' : 'Opening'} project ${projectId}...`];
      }
    } else if (cmd === 'contact' || cmd === 'email') {
      setShowContactModal(true);
      return ['Opening contact form...'];
    }

    return [`Command not recognized: ${command}`];
  };

  // Scroll to section function
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(section);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowTerminal(!showTerminal);
      } else if (e.key === 'Escape') {
        setShowTerminal(false);
        setSelectedProject(null);
        setShowContactModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTerminal]);

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          to: 'thejackwang1216@gmail.com'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative text-white overflow-y-auto"
    >
      {/* Unified Background */}
      <BackgroundEffect
        particleColor={{ r: 100, g: 120, b: 150 }}
        secondaryColor={{ r: 80, g: 100, b: 130 }}
        particleCount={80}
        connectionDistance={100}
        particleSpeed={0.15}
        interactive={true}
      />

      {/* Fixed Navigation */}
      <div className="fixed top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="backdrop-blur-sm bg-gray-900/30 p-3 rounded-xl border border-gray-700/30">
          <span className="text-sm text-gray-300 font-mono">
            jack@mit:~/{currentSection}$
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="p-3 bg-gray-800/50 hover:bg-gray-800/80 border border-blue-400/30 hover:border-blue-400/60 rounded-lg transition-colors"
            title="Toggle Terminal (`)"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10 space-y-32">

        {/* Resume/About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{resumeData.header.name}</h1>
            <p className="text-xl text-gray-300 mb-6">{resumeData.header.title}</p>

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Journey</h3>
                <div className="space-y-2">
                  {resumeData.journey.map((item, index) => (
                    <p key={index} className="text-gray-300 text-sm font-mono">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <p className="text-gray-300 leading-relaxed">
                MIT student, software engineer, and researcher.
                Passionate about building technology that makes a difference.
                Spent the past summer building ai agents for accounting @ Truewind (YC 23),
                Quantitative Research @ Sloan School of Management, 
                SWE @ Forza
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden hover:border-blue-400/50 transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative w-full h-48 bg-gray-900/50">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Status Badge Overlay */}
                      <div className="absolute top-3 right-3">
                        <span className="text-xs text-white bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      {!project.image && (
                        <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{project.year}</span>
                      <span>Click to view details</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <div className="p-8">
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">Get In Touch</h1>
              <p className="text-xl text-gray-300">
                Let&apos;s connect! I&apos;m always open to discussing new opportunities
              </p>
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
                        <div className="text-green-400 font-mono text-sm">
                          {new Date().toLocaleString('en-US', { timeZone: 'America/New_York', timeStyle: 'short' })}
                        </div>
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
                    <h3 className="text-2xl font-semibold text-white mb-2">Let&apos;s Chat!</h3>
                    <p className="text-gray-300 mb-6">
                      Whether it&apos;s about work, projects, or just to say hello - I&apos;d love to hear from you!
                    </p>

                    <button
                      onClick={() => setShowContactModal(true)}
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
        </section>
      </div>

      {/* Terminal Popup */}
      {showTerminal && (
        <TerminalPopup
          isOpen={showTerminal}
          onClose={() => setShowTerminal(false)}
          context={currentSection as 'projects' | 'about' | 'gallery' | 'contact' | 'blog'}
          onCommand={handleTerminalCommand}
          onNavigate={onNavigate}
        />
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/90 rounded-xl border border-gray-700/50 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">{selectedProject.description}</p>

              <div>
                <h3 className="font-semibold text-white mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-gray-400">{selectedProject.year} • {selectedProject.status}</span>
                {selectedProject.link !== '#' && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Contact Form Modal */}
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowContactModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/90 rounded-xl border border-gray-700/50 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Send Message</h2>
              <button
                onClick={() => setShowContactModal(false)}
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
                <p className="text-gray-300">Thanks for reaching out. I&apos;ll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:outline-none resize-none"
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg">
                    <p className="text-red-400 text-sm">
                      There was an error sending your message. Please try again or email me directly.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 bg-green-500/20 border border-green-400/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
