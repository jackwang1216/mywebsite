"use client";

import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "TypeScript", "React", "Java"],
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
      title: "Quantitative Researcher",
      company: "MIT Sloan School of Management",
      description: "Multilevel Factor: Trying to recreate a multilevel factor that better represents the real world, under Damon Peterson",
    },
    {
      title: "Software Engineer Intern",
      company: "Forza",
      description: "Improved their work environment website to improve productivity. Currently working on their new website",
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif font-bold text-cream mb-4">About Me</h2>
          <p className="text-xl text-cream/80 font-serif">Software Engineer, Mathematician, and Athlete</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif text-gold">My Journey</h3>
            <div className="prose prose-invert prose-lg">
              <p className="text-cream/80">
                I&#39;m a tri-lingual undergraduate at MIT studying Computer Science and Mathematics, with a deep passion for software engineering,
                quantitative research, and athletics. When I&#39;m not coding or solving mathematical problems,
                you can find me sprinting, lifting, playing soccer, or playing chess.
              </p>
            </div>

            {/* Experience Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-serif text-gold mb-6">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-dark-accent p-6 rounded-lg border border-cream/10"
                  >
                    <h4 className="text-xl text-cream font-serif">{exp.title}</h4>
                    <p className="text-gold/80">{exp.company}</p>
                    <p className="text-cream/60 mt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-serif text-gold">Skills & Technologies</h3>
            <div className="space-y-8">
              {skills.map((skillGroup, groupIndex) => (
                <motion.div
                  key={groupIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-accent p-6 rounded-lg border border-cream/10"
                >
                  <h4 className="text-xl text-cream font-serif mb-4">{skillGroup.category}</h4>
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
