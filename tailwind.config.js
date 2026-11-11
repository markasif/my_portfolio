import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#00F0FF", // Cyberpunk Neon Cyan
          50: "#e0fcff",
          100: "#b3f8ff",
          200: "#80f3ff",
          300: "#4df0ff",
          400: "#26ecff",
          500: "#00f0ff", // Core
          600: "#00d0e6",
          700: "#00a5b8",
          800: "#007d8f",
          900: "#005a66",
          950: "#003b42",
        },
        "indigo-vibrant": "#00F0FF",
        "cyan-vibrant": "#00F0FF",
        "accent-vibrant": "#00F0FF",
        "background-light": "#F8FAFC",
        "background-dark": "#050814",
      },
      fontFamily: {
        "display": ["'Space Grotesk'", "sans-serif"],
        "sans": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px"
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'reverse-spin-slow': 'reverse-spin 15s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
};
