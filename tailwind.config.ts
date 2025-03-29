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
        'dark': '#0A0A0A',
        'dark-accent': '#141414',
        'cream': '#F5F5F4',
        'gold': '#FFD700',
      },
      fontFamily:{
        fancy: ["Lavishly Yours", "cursive"]
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#F5F5F4',
            h1: {
              color: '#FFD700',
            },
            h2: {
              color: '#FFD700',
            },
            h3: {
              color: '#FFD700',
            },
            strong: {
              color: '#FFD700',
            },
            a: {
              color: '#FFD700',
              '&:hover': {
                color: '#F5F5F4',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
