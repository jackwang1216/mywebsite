"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceItemsRef = useRef<HTMLDivElement[]>([]);
  const skillItemsRef = useRef<HTMLDivElement[]>([]);

  // Add experiences and skills arrays
  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "TypeScript", "React"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Node.js", "Next.js", "TensorFlow", "PyTorch"],
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "AWS", "MongoDB"],
    },
  ];

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Truewind (YC W23)",
      description: "Incoming Software Engineer Intern",
      date: "June 2025 - Sep. 2025"
    },
    {
      title: "Quantitative Researcher",
      company: "MIT Sloan School of Management",
      description: "Multilevel Factor: Trying to recreate a multilevel factor that better represents the real world, under Damon Peterson",
      date: "Nov. 2024 - May 2025"
    },
    {
      title: "Software Engineer Intern",
      company: "Forza",
      description: "Improved their work environment website to improve productivity. Currently working on their new website",
      date: "June 2024 - Present"
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Main timeline for the section
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate section title
    if (titleRef.current) {
      const titleElements = titleRef.current.children;

      gsap.set(titleElements, { opacity: 0, y: 30 });

      mainTl.to(titleElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }

    // Bio animation
    if (bioRef.current) {
      gsap.set(bioRef.current, {
        opacity: 0,
        x: -60
      });

      mainTl.to(bioRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Create a spotlight effect that follows mouse in bio section
      const bioElement = bioRef.current;
      bioElement.addEventListener('mousemove', (e) => {
        const rect = bioElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(bioElement, {
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(218, 165, 32, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          duration: 0.3
        });
      });

      bioElement.addEventListener('mouseleave', () => {
        gsap.to(bioElement, {
          background: 'none',
          duration: 0.3
        });
      });
    }

    // Skills animation
    if (skillsRef.current) {
      gsap.set(skillsRef.current, {
        opacity: 0,
        x: 60
      });

      mainTl.to(skillsRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.8");
    }

    // Animate each experience item with staggered entrance and hover effects
    if (experienceItemsRef.current.length > 0) {
      gsap.set(experienceItemsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95
      });

      mainTl.to(experienceItemsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.5");

      // Add hover animations for each experience item
      experienceItemsRef.current.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -5,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            borderColor: "rgba(218, 165, 32, 0.5)",
            duration: 0.3
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            boxShadow: "none",
            borderColor: "rgba(255, 243, 218, 0.1)",
            duration: 0.3
          });
        });
      });
    }

    // Animate each skill group with staggered entrance and hover effects
    if (skillItemsRef.current.length > 0) {
      gsap.set(skillItemsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95
      });

      mainTl.to(skillItemsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.7");

      // Add hover animations for each skill item
      skillItemsRef.current.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -5,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            borderColor: "rgba(218, 165, 32, 0.5)",
            duration: 0.3
          });

          // Animate skill pills inside the hovered item
          const skillPills = item.querySelectorAll('span');
          gsap.to(skillPills, {
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            scale: 1.05,
            stagger: 0.05,
            duration: 0.3
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            boxShadow: "none",
            borderColor: "rgba(255, 243, 218, 0.1)",
            duration: 0.3
          });

          // Reset skill pills animation
          const skillPills = item.querySelectorAll('span');
          gsap.to(skillPills, {
            backgroundColor: "rgba(0, 0, 0, 1)",
            scale: 1,
            stagger: 0.05,
            duration: 0.3
          });
        });
      });
    }

    return () => {
      // Clean up all animations and event listeners
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add refs to experienceItemsRef
  const addToExperienceRefs = (el: HTMLDivElement) => {
    if (el && !experienceItemsRef.current.includes(el)) {
      experienceItemsRef.current.push(el);
    }
  };

  // Add refs to skillItemsRef
  const addToSkillRefs = (el: HTMLDivElement) => {
    if (el && !skillItemsRef.current.includes(el)) {
      skillItemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-cream mb-4">
            About Me
          </h2>
          <p className="text-xl text-cream/80 font-serif">Heheheha</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Bio Section */}
          <div ref={bioRef} className="space-y-6">
            <h3 className="text-3xl font-serif text-gold">My Journey</h3>
            <div className="prose prose-invert prose-lg">
              <p className="text-cream/80">
                I&#39;m a tri-lingual undergraduate at MIT studying Computer
                Science and Mathematics. Right now, I am working on couple
                different things I enjoy, from a{" "}
                <strong>black-scholes option trading model</strong> with many features to an
                <strong> ai agent</strong> that could speed up the construction
                industry. On the side, I like to lift, play soccer, and play
                chess(my peak was 2011 lol).
              </p>
            </div>

            {/* Experience Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-serif text-gold mb-6">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    ref={addToExperienceRefs}
                    className="bg-dark-accent p-6 rounded-lg border border-cream/10"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl text-cream font-serif">
                        {exp.title}
                      </h4>
                      <span className="text-gold/70 text-sm">{exp.date}</span>
                    </div>
                    <p className="text-gold/80">{exp.company}</p>
                    <p className="text-cream/60 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="space-y-8">
            <h3 className="text-3xl font-serif text-gold">
              Skills & Technologies
            </h3>
            <div className="space-y-8">
              {skills.map((skillGroup, groupIndex) => (
                <div
                  key={groupIndex}
                  ref={addToSkillRefs}
                  className="bg-dark-accent p-6 rounded-lg border border-cream/10"
                >
                  <h4 className="text-xl text-cream font-serif mb-4">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dark text-gold/80 rounded-full text-sm border border-gold/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
