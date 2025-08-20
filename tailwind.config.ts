import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - sophisticated grays
        'midnight': '#0D1117',
        'charcoal': '#161B22',
        'slate': '#21262D',
        'mist': '#30363D',
        'fog': '#484F58',
        
        // Accent colors - modern and vibrant
        'electric': '#7C3AED', // Purple
        'cyan': '#06B6D4',     // Cyan
        'emerald': '#10B981',  // Green
        'amber': '#F59E0B',    // Yellow/Gold
        'coral': '#F97316',    // Orange/Red
        
        // Text colors
        'pearl': '#F0F6FC',    // Primary text
        'silver': '#C9D1D9',   // Secondary text
        'granite': '#8B949E',  // Muted text
        
        // Legacy colors (maintaining compatibility)
        'dark': '#0D1117',
        'dark-accent': '#161B22',
        'cream': '#F0F6FC',
        'gold': '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        fancy: ["Lavishly Yours", "cursive"]
      },
      fontSize: {
        '2xs': '0.625rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in': 'slide-in 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E')",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#F0F6FC',
            h1: {
              color: '#F0F6FC',
              fontWeight: '700',
            },
            h2: {
              color: '#F0F6FC',
              fontWeight: '600',
            },
            h3: {
              color: '#C9D1D9',
              fontWeight: '600',
            },
            strong: {
              color: '#7C3AED',
              fontWeight: '600',
            },
            a: {
              color: '#7C3AED',
              textDecoration: 'none',
              '&:hover': {
                color: '#06B6D4',
              },
            },
            code: {
              color: '#F59E0B',
              backgroundColor: '#161B22',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
          },
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        'glow-sm': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-md': '0 0 30px rgba(124, 58, 237, 0.4)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
