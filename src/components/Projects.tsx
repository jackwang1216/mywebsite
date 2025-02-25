"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  video?: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Boldly",
    description:
      "A web app that helps users step out of their comfort zone, personalized to the user",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "/assets/boldly.png",
    video: "/assets/Boldly-video.mp4",
    link: "https://www.linkedin.com/in/jackwang1216/",
  },
  {
    id: 2,
    title: "Multilevel Factor",
    description:
      "Quantitative Research: Trying to recreate a multilevel factor model that better represent the real world, under Damon Peterson",
    technologies: ["Python", "Machine Learning", "Mathematics"],
    image: "/assets/multilevel.png",
    video: "/assets/multilevel-video.mp4",
    link: "https://www.linkedin.com/in/jackwang1216/",
  },
  {
    id: 3,
    title: "Simplify.ai",
    description:
      "AI tool that helps illiterate, non-native speaking, and other disabled people",
    technologies: ["React", "Python", "OpenAI"],
    link: "#",
  },
  {
    id: 4,
    title: "Forza...(Coming soon)",
    description: "",
    technologies: [],
    link: "#",
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif font-bold text-cream mb-4">Projects</h2>
          <p className="text-xl text-cream/80 font-serif">Some of my recent work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-dark-accent rounded-lg overflow-hidden border border-cream/10 hover:border-gold/50 transition-all duration-300"
              onMouseEnter={() => setIsHovered(project.id)}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-all duration-300 z-10"></div>
                {isHovered === project.id && project.video ? (
                  <video autoPlay loop muted className="w-full h-full object-cover">
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                  />
                ) : (
                  <div className="w-full h-full bg-dark flex items-center justify-center">
                    <span className="text-cream/40">Coming Soon</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-serif text-cream group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-cream/70">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dark text-gold/80 rounded-full text-sm border border-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-accent rounded-lg max-w-4xl w-full p-8 border border-cream/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-serif text-cream">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-cream/60 hover:text-cream transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-dark/20"></div>
                {selectedProject.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source src={selectedProject.video} type="video/mp4" />
                  </video>
                ) : selectedProject.image ? (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                ) : (
                  <div className="w-full h-full bg-dark flex items-center justify-center">
                    <span className="text-cream/40">Coming Soon</span>
                  </div>
                )}
              </div>
              <p className="text-cream/80 mb-6 font-serif">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-dark text-gold/80 rounded-full text-sm border border-gold/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
              >
                View Project
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
