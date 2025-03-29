"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Main timeline for section entrance
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate title section
    if (titleRef.current) {
      const titleElements = titleRef.current.children;
      gsap.set(titleElements, { opacity: 0, y: 30 });
      
      mainTl.to(titleElements, {
        opacity: 1,
        y:.0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
    
    // Animate info section with a side entrance
    if (infoRef.current) {
      const paragraphs = infoRef.current.querySelectorAll('p');
      const contactItems = infoRef.current.querySelectorAll('.flex.items-center');
      
      gsap.set([infoRef.current, ...Array.from(paragraphs), ...Array.from(contactItems)], { 
        opacity: 0, 
        x: -40 
      });
      
      mainTl.to(infoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(Array.from(paragraphs), {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)"
      }, "-=0.6")
      .to(Array.from(contactItems), {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)"
      }, "-=0.4");
    }
    
    // Animate social icons with bounce effect
    if (socialIconsRef.current) {
      const icons = socialIconsRef.current.querySelectorAll('a');
      
      gsap.set(Array.from(icons), { 
        opacity: 0, 
        scale: 0.5,
        y: 20
      });
      
      mainTl.to(Array.from(icons), {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2");
      
      // Add hover animations to social icons
      Array.from(icons).forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            y: -5,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
    
    // Animate form with a typewriter effect for labels and reveal for inputs
    if (formRef.current) {
      gsap.set(formRef.current, { 
        opacity: 0, 
        x: 40 
      });
      
      const labels = formRef.current.querySelectorAll('label');
      const inputs = formRef.current.querySelectorAll('input, textarea');
      const button = formRef.current.querySelector('button');
      
      // Create separate timeline for form elements
      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      formTl.to(formRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .fromTo(Array.from(labels), 
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out"
        }, 
        "-=0.4"
      )
      .fromTo(Array.from(inputs), 
        { 
          opacity: 0, 
          scaleX: 0.8,
          transformOrigin: "left" 
        },
        { 
          opacity: 1, 
          scaleX: 1, 
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out" 
        }, 
        "-=0.2"
      )
      .fromTo(button,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.1"
      );
      
      // Add focus/blur animations for form inputs
      Array.from(inputs).forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: "rgba(218, 165, 32, 0.8)",
            boxShadow: "0 0 0 3px rgba(218, 165, 32, 0.2)",
            duration: 0.3
          });
        });
        
        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: "rgba(218, 165, 32, 0.2)",
            boxShadow: "none",
            duration: 0.3
          });
        });
      });
    }
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Animation for form submission status
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const statusElement = document.querySelector(
        submitStatus === 'success' ? '.text-green-500' : '.text-red-500'
      );
      
      if (statusElement) {
        gsap.fromTo(statusElement,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4,
            ease: "power2.out"
          }
        );
      }
    }
  }, [submitStatus]);
  
  // Function to collect input refs
  const addToInputRefs = (el: HTMLElement | null) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'thejackwang1216@gmail.com',
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-cream mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-cream/80 font-serif">
            Let&#39;s connect and create something amazing together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={infoRef} className="space-y-6">
            <h3 className="text-3xl font-serif text-gold">
              Contact Information
            </h3>
            <div className="space-y-4">
              <p className="text-cream/80">
                I&#39;m always open to new opportunities and collaborations.
                Whether you have a question or just want to say hi, I&#39;ll get
                back to you!
              </p>
              <div className="flex items-center space-x-3 text-cream/80">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:thejackwang1216@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  thejackwang1216@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-cream/80">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Seattle, Boston, NYC, Shanghai, Osaka, and Iowa</span>
              </div>
            </div>

            <div ref={socialIconsRef} className="flex space-x-4 pt-6">
              <a
                href="https://github.com/jackwang1216"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/jackwang1216/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div 
            ref={formRef}
            className="bg-dark-accent p-8 rounded-lg border border-cream/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-cream/80"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  ref={addToInputRefs as React.RefCallback<HTMLInputElement>}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md bg-dark-accent border border-gold/20 text-cream shadow-sm focus:border-gold focus:ring focus:ring-gold/20"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-cream/80"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  ref={addToInputRefs as React.RefCallback<HTMLInputElement>}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md bg-dark-accent border border-gold/20 text-cream shadow-sm focus:border-gold focus:ring focus:ring-gold/20"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-cream/80"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  ref={addToInputRefs as React.RefCallback<HTMLTextAreaElement>}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md bg-dark-accent border border-gold/20 text-cream shadow-sm focus:border-gold focus:ring focus:ring-gold/20"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-dark-accent text-gold border border-gold/20 rounded-md hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-500">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
