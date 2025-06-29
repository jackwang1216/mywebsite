"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    link: "https://github.com/weblab-class/jackwang1216-hansenfan-JerryLiu06",
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
    technologies: ["React", "Python", "Azure", "FastAPI"],
    image: "/assets/simplifyai.png",
    video: "/assets/simplifyai-video.mp4",
    link: "https://github.com/jackwang1216/Simplified.ai",
  },
  {
    id: 4,
    title: "Forza New Website...(it's done but not deployed lul)",
    description: "",
    technologies: [],
    link: "#",
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize refs array with the correct length
  useEffect(() => {
    projectRefs.current = Array(projects.length).fill(null);
  }, []);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the section entrance
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none"
      }
    });

    // Animate the header with a split text effect
    if (headerRef.current) {
      const headerElements = headerRef.current.children;
      gsap.set(headerElements, { opacity: 0, y: 30 });

      entranceTl.to(headerElements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }

    // Create floating animation for the projects grid
    if (projectsContainerRef.current) {
      gsap.to(projectsContainerRef.current, {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Animate each project card with a staggered entrance
    const validProjectRefs = projectRefs.current.filter(ref => ref !== null);

    if (validProjectRefs.length > 0) {
      gsap.set(validProjectRefs, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotationX: 5
      });

      // Create scroll-triggered animations for each project
      validProjectRefs.forEach((ref, index) => {
        if (!ref) return;

        // Create a timeline for each project card
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse"
          }
        });

        // Animate the card entrance
        cardTl.to(ref, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)"
        });

        // Add hover animations for each project card
        const addHoverEffects = () => {
          if (!ref) return;

          ref.addEventListener('mouseenter', () => {
            if (!gsap.isTweening(ref)) {
              gsap.to(ref, {
                y: -10,
                scale: 1.03,
                borderColor: "rgba(218, 165, 32, 0.5)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                duration: 0.4,
                ease: "power2.out"
              });

              // Animate the title color
              const title = ref.querySelector('h3');
              if (title) {
                gsap.to(title, {
                  color: "#daa520", // gold color
                  duration: 0.3
                });
              }

              // Animate technology tags
              const tags = ref.querySelectorAll('.bg-dark');
              gsap.to(tags, {
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "#fff",
                stagger: 0.05,
                duration: 0.3
              });
            }
          });

          ref.addEventListener('mouseleave', () => {
            if (!gsap.isTweening(ref)) {
              gsap.to(ref, {
                y: 0,
                scale: 1,
                borderColor: "rgba(255, 243, 218, 0.1)",
                boxShadow: "none",
                duration: 0.4,
                ease: "power2.out"
              });

              // Reset title color
              const title = ref.querySelector('h3');
              if (title) {
                gsap.to(title, {
                  color: "#FFF3DA", // cream color
                  duration: 0.3
                });
              }

              // Reset technology tags
              const tags = ref.querySelectorAll('.bg-dark');
              gsap.to(tags, {
                backgroundColor: "#000",
                color: "rgba(218, 165, 32, 0.8)",
                stagger: 0.05,
                duration: 0.3
              });
            }
          });
        };

        // Add hover effects after a short delay to ensure the DOM is ready
        setTimeout(addHoverEffects, 100);
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Set up ref callback function to store refs
  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectRefs.current[index] = el;
  };

  // Handle modal animations when a project is selected
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      // Create an entrance animation for the modal
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );

      // Create a subtle floating animation for the modal
      gsap.to(modalRef.current, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Animate modal content
      const modalContent = modalRef.current.children;
      gsap.fromTo(modalContent,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, [selectedProject]);

  // Handle modal close animation
  const closeModal = () => {
    if (modalRef.current) {
      // Create an exit animation for the modal
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setSelectedProject(null)
      });
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-cream mb-4">Projects</h2>
          <p className="text-xl text-cream/80 font-serif">Some of my recent work</p>
        </div>

        <div
          ref={projectsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => setProjectRef(el, index)}
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
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="bg-dark-accent rounded-lg max-w-4xl w-full p-8 border border-cream/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-serif text-cream">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
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
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
