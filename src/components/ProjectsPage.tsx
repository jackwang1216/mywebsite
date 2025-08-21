'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalPopup from './TerminalPopup';
import BackgroundEffect from './BackgroundEffect';

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

interface ProjectsPageProps {
  onBack: () => void;
  onNavigate?: (destination: string) => void;
}

export default function ProjectsPage({ onBack, onNavigate }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [filter, setFilter] = useState<string>('');

  // Handle terminal commands
  const handleTerminalCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    if (cmd === 'view' || cmd === 'open') {
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
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTerminal, selectedProject]);

  // Filter projects
  const filteredProjects = filter 
    ? projects.filter(p => 
        p.technologies.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      )
    : projects;

  if (selectedProject) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative text-white"
      >
        {/* Animated Background */}
        <BackgroundEffect theme="projects" />
        {/* Project Detail View */}
        <div className="container mx-auto px-6 py-12 relative z-10">
          <button
            onClick={() => setSelectedProject(null)}
            className="mb-8 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors backdrop-blur-sm bg-gray-900/30 px-4 py-2 rounded-lg border border-gray-700/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Projects</span>
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8 backdrop-blur-sm bg-gray-900/20 p-6 rounded-xl border border-gray-700/30">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl font-bold text-white">{selectedProject.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedProject.status === 'Complete' ? 'bg-green-500/20 text-green-400' :
                  selectedProject.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {selectedProject.status}
                </span>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Image/Video */}
            {selectedProject.image && (
              <div className="mb-8">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-400/15 rounded-lg text-blue-300 border border-blue-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-blue-400">Year:</span> {selectedProject.year}</p>
                  <p><span className="text-blue-400">Status:</span> {selectedProject.status}</p>
                  {selectedProject.link !== '#' && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>View Project</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Popup */}
        <TerminalPopup
          isOpen={showTerminal}
          onClose={() => setShowTerminal(false)}
          context="projects"
          onCommand={handleTerminalCommand}
          onNavigate={onNavigate}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative text-white"
    >
      {/* Animated Background */}
      <BackgroundEffect theme="projects" />
      {/* Header */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/30">
            <h1 className="text-5xl font-bold text-white mb-4">Projects</h1>
            <p className="text-xl text-gray-300">
              Explore my journey through code, research, and innovation
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

        {/* Filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Filter by technology..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20">
                  {/* Project Image */}
                  {project.image && (
                    <div className="aspect-video bg-gray-800 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.status === 'Complete' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-400/15 text-blue-400 text-xs rounded border border-blue-400/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{project.year}</span>
                      <div className="flex items-center space-x-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>View details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Click on any project to view details • Press <kbd className="px-2 py-1 bg-gray-800 rounded">`</kbd> for terminal commands</p>
        </div>
      </div>

      {/* Terminal Popup */}
      <TerminalPopup
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        context="projects"
        onCommand={handleTerminalCommand}
        onNavigate={onNavigate}
      />
    </motion.div>
  );
}