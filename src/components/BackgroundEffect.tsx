'use client';

import { useEffect, useRef } from 'react';

interface BackgroundEffectProps {
  particleColor?: { r: number; g: number; b: number };
  secondaryColor?: { r: number; g: number; b: number };
  particleCount?: number;
  connectionDistance?: number;
  particleSpeed?: number;
  interactive?: boolean;
  theme?: 'projects' | 'gallery' | 'contact' | 'about';
}

// Theme presets - Unified and calmer approach
const themeConfigs = {
  projects: {
    particleColor: { r: 100, g: 120, b: 150 }, // Muted blue
    secondaryColor: { r: 80, g: 100, b: 130 }, // Darker muted blue
    particleCount: 80,
    connectionDistance: 100,
    particleSpeed: 0.15,
    interactive: true
  },
  gallery: {
    particleColor: { r: 120, g: 100, b: 140 }, // Muted purple
    secondaryColor: { r: 100, g: 80, b: 120 }, // Darker muted purple
    particleCount: 80,
    connectionDistance: 100,
    particleSpeed: 0.15,
    interactive: false
  },
  contact: {
    particleColor: { r: 100, g: 140, b: 120 }, // Muted green
    secondaryColor: { r: 80, g: 120, b: 100 }, // Darker muted green
    particleCount: 80,
    connectionDistance: 100,
    particleSpeed: 0.15,
    interactive: true
  },
  about: {
    particleColor: { r: 130, g: 120, b: 100 }, // Muted gold/beige
    secondaryColor: { r: 110, g: 100, b: 80 }, // Darker muted gold
    particleCount: 80,
    connectionDistance: 100,
    particleSpeed: 0.15,
    interactive: false
  }
};

export default function BackgroundEffect(props: BackgroundEffectProps) {
  const {
    theme,
    particleColor,
    secondaryColor,
    particleCount,
    connectionDistance,
    particleSpeed,
    interactive = false
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use theme config or custom props
  const config = theme ? themeConfigs[theme] : {
    particleColor: particleColor || { r: 255, g: 215, b: 0 },
    secondaryColor: secondaryColor || { r: 255, g: 215, b: 0 },
    particleCount: particleCount || 180,
    connectionDistance: connectionDistance || 140,
    particleSpeed: particleSpeed || 0.3,
    interactive: interactive
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Particle system (defined before usage to avoid TDZ issues)
    class ParticleImpl {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      hue: number;
      pulsePhase: number;
      targetX?: number;
      targetY?: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.size = Math.random() * 2.5 + 0.5;
        this.hue = Math.random() * 360;
        this.pulsePhase = Math.random() * Math.PI * 2;
        // Unified color approach for all themes
        const mixFactor = Math.random();
        const r = Math.floor(config.particleColor.r * (1 - mixFactor) + config.secondaryColor.r * mixFactor);
        const g = Math.floor(config.particleColor.g * (1 - mixFactor) + config.secondaryColor.g * mixFactor);
        const b = Math.floor(config.particleColor.b * (1 - mixFactor) + config.secondaryColor.b * mixFactor);
        this.color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.4 + 0.2})`;
      }

      update(width: number, height: number) {
        if (config.interactive) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.001;
            this.vx += dx * force;
            this.vy += dy * force;
          }
        }
        this.x += this.vx;
        this.y += this.vy;
        if (config.interactive) {
          this.vx *= 0.99;
          this.vy *= 0.99;
        }
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const getParams = () => {
      const isMobile = window.innerWidth <= 768;
      return {
        finalParticleCount: isMobile ? Math.floor(config.particleCount * 0.6) : config.particleCount,
        finalConnectionDistance: isMobile ? config.connectionDistance * 0.75 : config.connectionDistance,
      };
    };

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
      const needResize = canvas.width !== Math.floor(cssWidth * dpr) || canvas.height !== Math.floor(cssHeight * dpr);
      if (needResize) {
        canvas.width = Math.floor(cssWidth * dpr);
        canvas.height = Math.floor(cssHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      return needResize;
    };

    let particles: ParticleImpl[] = [];
    let { finalParticleCount, finalConnectionDistance } = getParams();

    const seedParticles = () => {
      particles = [];
      ({ finalParticleCount, finalConnectionDistance } = getParams());
      const width = window.innerWidth;
      const height = window.innerHeight;
      for (let i = 0; i < finalParticleCount; i++) {
        particles.push(new ParticleImpl(width, height));
      }
    };

    setCanvasSize();
    seedParticles();

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    if (config.interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };
      canvas.addEventListener('mousemove', handleMouseMove);
    }


    function updateSize() {
      const resized = setCanvasSize();
      if (resized) seedParticles();
    }

    const handleVisibilityOrFocus = () => updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('focus', handleVisibilityOrFocus);
    window.addEventListener('blur', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      if (setCanvasSize()) {
        seedParticles();
      }

      // Clear canvas with themed background
      ctx.fillStyle = 'rgba(17, 17, 17, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add themed gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      const { r, g, b } = config.particleColor;
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.03)`);
      gradient.addColorStop(1, 'rgba(17, 17, 17, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < finalConnectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = (1 - distance / finalConnectionDistance) * 0.15;
            const { r, g, b } = config.particleColor;

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      window.removeEventListener('blur', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, [theme, config.particleColor, config.secondaryColor, config.particleCount, config.connectionDistance, config.particleSpeed, config.interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        pointerEvents: 'none',
        background: '#111111',
        transform: 'translateZ(0)'
      }}
    />
  );
}
