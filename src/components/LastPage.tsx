"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LastPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopFooterRefs = useRef<HTMLDivElement>(null);
  const mobileFooterRefs = useRef<HTMLDivElement>(null);
  
  // For typing effect
  const fullChineseQuote = "失败是成功之母";
  const fullEnglishQuote = "Failure is The Mother of Success";
  const [displayChineseQuote, setDisplayChineseQuote] = useState("");
  const [displayEnglishQuote, setDisplayEnglishQuote] = useState("");
  const [isChineseQuoteDone, setIsChineseQuoteDone] = useState(false);
  const [isEnglishQuoteDone, setIsEnglishQuoteDone] = useState(false);
  const [isInView, setIsInView] = useState(false); // Track if section is in view for starting typing
  
  // Effect for typing the Chinese quote - only starts when section is in view
  useEffect(() => {
    if (!isInView) return; // Only run when the section is in view
    
    if (displayChineseQuote === fullChineseQuote) {
      setIsChineseQuoteDone(true);
      return;
    }
    
    const timeout = setTimeout(() => {
      setDisplayChineseQuote(fullChineseQuote.substring(0, displayChineseQuote.length + 1));
    }, 200); // Adjust speed as needed
    
    return () => clearTimeout(timeout);
  }, [displayChineseQuote, fullChineseQuote, isInView]);
  
  // Effect for typing the English quote after the Chinese quote is complete
  useEffect(() => {
    if (!isInView || !isChineseQuoteDone) return; // Only run when section is in view and Chinese quote is done
    
    if (displayEnglishQuote === fullEnglishQuote) {
      setIsEnglishQuoteDone(true);
      return;
    }
    
    const timeout = setTimeout(() => {
      setDisplayEnglishQuote(fullEnglishQuote.substring(0, displayEnglishQuote.length + 1));
    }, 100); // Faster typing for English quote
    
    return () => clearTimeout(timeout);
  }, [displayEnglishQuote, fullEnglishQuote, isChineseQuoteDone, isInView]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a main timeline for the section
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });
    
    // Set up ScrollTrigger to detect when the section is in view
    // This will trigger the typing animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%", // Start when 30% of the section is visible
      onEnter: () => {
        setIsInView(true); // Start typing when scrolled into view
      },
      onLeaveBack: () => {
        // Optional: reset typing if scrolled away
        // Uncomment the following lines if you want to reset typing when scrolling away
        // setDisplayChineseQuote("");
        // setDisplayEnglishQuote("");
        // setIsChineseQuoteDone(false);
        // setIsEnglishQuoteDone(false);
        // setIsInView(false);
      }
    });
    
    // Container fade in
    if (containerRef.current) {
      // Add very subtle animation just for the container
      mainTl.to(containerRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
    
    // Animate desktop footer elements with staggered entrance
    if (desktopFooterRefs.current) {
      const footers = desktopFooterRefs.current.querySelectorAll('footer');
      
      gsap.set(Array.from(footers), {
        opacity: 0,
        y: 20
      });
      
      mainTl.to(Array.from(footers), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.8
      });
      
      // Add subtle text shine effect to footers
      Array.from(footers).forEach((footer, index) => {
        gsap.to(footer, {
          color: "#fff",
          textShadow: "0 0 10px rgba(255, 243, 218, 0.8)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2 + 3
        });
      });
    }
    
    // Animate mobile footer elements
    if (mobileFooterRefs.current) {
      const mobileFooters = mobileFooterRefs.current.querySelectorAll('footer');
      
      gsap.set(Array.from(mobileFooters), {
        opacity: 0,
        y: 20
      });
      
      mainTl.to(Array.from(mobileFooters), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.8
      });
      
      // Add subtle text shine effect to mobile footers
      Array.from(mobileFooters).forEach((footer, index) => {
        gsap.to(footer, {
          color: "#fff",
          textShadow: "0 0 10px rgba(255, 243, 218, 0.8)",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2 + 3
        });
      });
    }
    
    // Create a special 3D hover effect for the container on mouse move
    const handleMouseMove = () => {
      // All mouse tracking effects have been removed
      // Function kept as a placeholder in case effects are added back in the future
    };
    
    // Add event listener for 3D hover effect
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Create a parallax effect based on scroll position
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Parallax effect for container only (not affecting quotes)
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: progress * -30, // Reduced movement
            duration: 0.1
          });
        }
      }
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center relative"
      >
        <h1 className="text-8xl md:text-9xl text-cream font-fancy mb-10 relative">
          {displayChineseQuote}
          <span className={`absolute -right-8 top-0 text-cream ${isChineseQuoteDone ? "animate-blink" : "opacity-0"}`}>|</span>
        </h1>
        <p className="text-4xl md:text-5xl text-cream/80 font-fancy relative">
          {displayEnglishQuote}
          <span className={`absolute -right-4 top-0 text-cream/80 ${isChineseQuoteDone && !isEnglishQuoteDone ? "animate-blink" : "opacity-0"}`}>|</span>
        </p>
      </div>

      {/* Desktop Footer - Hidden on mobile */}
      <div ref={desktopFooterRefs} className="hidden md:block">
        <footer
          className="absolute bottom-4 right-4 text-cream text-2xl font-fancy"
        >
          &copy; 2025 Jack Wang
        </footer>
        <footer
          className="absolute bottom-4 left-4 text-cream text-2xl font-fancy"
        >
          Forged in Boston.
        </footer>
        <footer
          className="absolute bottom-4 left-1/3 -translate-x-full text-cream text-2xl font-fancy"
        >
          おう　ひき
        </footer>
        <footer
          className="absolute bottom-4 right-1/2 translate-x-1/2 text-cream text-2xl font-fancy"
        >
          Jack Wang
        </footer>
        <footer
          className="absolute bottom-4 right-1/3 translate-x-full text-cream text-2xl font-fancy"
        >
          汪曳
        </footer>
      </div>

      {/* Mobile Footer - Hidden on desktop */}
      <div ref={mobileFooterRefs} className="md:hidden">
        <footer
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-cream text-xl font-fancy text-center"
        >
          Jack Wang · おう　ひき · 汪曳
        </footer>
        <footer
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cream text-xl font-fancy"
        >
          Forged in Boston.
        </footer>
        <footer
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream text-xl font-fancy"
        >
          &copy; 2025 Jack Wang
        </footer>
      </div>
    </section>
  );
}
