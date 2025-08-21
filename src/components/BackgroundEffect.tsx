'use client';

import { useEffect, useRef } from 'react';

interface BackgroundEffectProps {
  particleColor?: { r: number; g: number; b: number };
  secondaryColor?: { r: number; g: number; b: number };
  particleCount?: number;
  connectionDistance?: number;
  particleSpeed?: number;
  interactive?: boolean;
  theme?: 'projects' | 'gallery' | 'contact' | 'resume';
}

// Theme presets
const themeConfigs = {
  projects: {
    particleColor: { r: 14, g: 165, b: 233 }, // Blue
    secondaryColor: { r: 6, g: 182, b: 212 }, // Cyan
    particleCount: 220,
    connectionDistance: 140,
    particleSpeed: 0.4,
    interactive: true
  },
  gallery: {
    particleColor: { r: 236, g: 72, b: 153 }, // Pink
    secondaryColor: { r: 147, g: 51, b: 234 }, // Purple
    particleCount: 160,
    connectionDistance: 120,
    particleSpeed: 0.2,
    interactive: false
  },
  contact: {
    particleColor: { r: 34, g: 197, b: 94 }, // Green
    secondaryColor: { r: 16, g: 185, b: 129 }, // Emerald
    particleCount: 200,
    connectionDistance: 160,
    particleSpeed: 0.3,
    interactive: true
  },
  resume: {
    particleColor: { r: 147, g: 51, b: 234 }, // Purple
    secondaryColor: { r: 255, g: 215, b: 0 }, // Gold
    particleCount: 140,
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
        if (theme === 'gallery') {
          const r = Math.sin(this.hue * 0.01745) * 127 + 128;
          const g = Math.sin((this.hue + 120) * 0.01745) * 127 + 128;
          const b = Math.sin((this.hue + 240) * 0.01745) * 127 + 128;
          this.color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${Math.random() * 0.6 + 0.3})`;
        } else {
          const mixFactor = Math.random();
          const r = Math.floor(config.particleColor.r * (1 - mixFactor) + config.secondaryColor.r * mixFactor);
          const g = Math.floor(config.particleColor.g * (1 - mixFactor) + config.secondaryColor.g * mixFactor);
          const b = Math.floor(config.particleColor.b * (1 - mixFactor) + config.secondaryColor.b * mixFactor);
          this.color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.7 + 0.2})`;
        }
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
        if (theme === 'gallery') {
          this.pulsePhase += 0.02;
          this.hue += 0.5;
          if (this.hue > 360) this.hue = 0;
          const r = Math.sin(this.hue * 0.01745) * 127 + 128;
          const g = Math.sin((this.hue + 120) * 0.01745) * 127 + 128;
          const b = Math.sin((this.hue + 240) * 0.01745) * 127 + 128;
          const alpha = Math.sin(this.pulsePhase) * 0.3 + 0.5;
          this.color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;
        }
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
        if (theme === 'gallery') {
          const glowSize = Math.max(0.1, this.size + Math.sin(this.pulsePhase) * 1);
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.arc(this.x, this.y, Math.max(0.1, this.size * 0.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (theme === 'projects') {
          const pulse = Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.5 + 1;
          ctx.arc(this.x, this.y, Math.max(0.1, this.size * pulse), 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
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

    // Enhanced Particle system
    class Particle {
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
        
        // Color based on theme
        if (theme === 'gallery') {
          // Rainbow colors for gallery
          const r = Math.sin(this.hue * 0.01745) * 127 + 128;
          const g = Math.sin((this.hue + 120) * 0.01745) * 127 + 128;
          const b = Math.sin((this.hue + 240) * 0.01745) * 127 + 128;
          this.color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${Math.random() * 0.6 + 0.3})`;
        } else {
          // Mix primary and secondary colors
          const mixFactor = Math.random();
          const r = Math.floor(config.particleColor.r * (1 - mixFactor) + config.secondaryColor.r * mixFactor);
          const g = Math.floor(config.particleColor.g * (1 - mixFactor) + config.secondaryColor.g * mixFactor);
          const b = Math.floor(config.particleColor.b * (1 - mixFactor) + config.secondaryColor.b * mixFactor);
          this.color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.7 + 0.2})`;
        }
      }

      update(width: number, height: number) {
        // Interactive mouse attraction
        if (config.interactive && mouseX && mouseY) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.001;
            this.vx += dx * force;
            this.vy += dy * force;
          }
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Update pulse for gallery theme
        if (theme === 'gallery') {
          this.pulsePhase += 0.02;
          this.hue += 0.5;
          if (this.hue > 360) this.hue = 0;
          
          const r = Math.sin(this.hue * 0.01745) * 127 + 128;
          const g = Math.sin((this.hue + 120) * 0.01745) * 127 + 128;
          const b = Math.sin((this.hue + 240) * 0.01745) * 127 + 128;
          const alpha = (Math.sin(this.pulsePhase) * 0.3 + 0.5);
          this.color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;
        }
        
        // Damping for interactive themes
        if (config.interactive) {
          this.vx *= 0.99;
          this.vy *= 0.99;
        }

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        
        // Enhanced drawing for different themes
        if (theme === 'gallery') {
          // Larger, glowing particles for gallery
          const glowSize = Math.max(0.1, this.size + Math.sin(this.pulsePhase) * 1);
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          
          // Add glow effect
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.arc(this.x, this.y, Math.max(0.1, this.size * 0.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (theme === 'projects') {
          // Tech-style particles with pulse
          const pulse = Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.5 + 1;
          ctx.arc(this.x, this.y, Math.max(0.1, this.size * pulse), 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          // Standard particles
          ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
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
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`);
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
            
            const opacity = (1 - distance / finalConnectionDistance) * (theme === 'contact' ? 0.5 : 0.3);
            const { r, g, b } = config.particleColor;
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.lineWidth = theme === 'contact' ? 0.8 : 0.4;
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
