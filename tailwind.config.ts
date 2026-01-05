import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Remixed color palette for DJ-Jaytek-Music
        primary: {
          // Neon Blue - Primary brand color
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc2ff',
          400: '#1ab0ff',
          500: '#00a3ff', // Main Neon Blue
          600: '#0088d9',
          700: '#006db3',
          800: '#00528c',
          900: '#003766',
        },
        secondary: {
          // Deep Purple - Accent color
          50: '#f3e5f9',
          100: '#dbb8f0',
          200: '#c38ae6',
          300: '#ab5cdc',
          400: '#933ed2',
          500: '#7b20c8', // Main Deep Purple
          600: '#651aa6',
          700: '#4f1484',
          800: '#390e62',
          900: '#230840',
        },
        neutral: {
          // Matte Black and grays
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d0d0d', // Matte Black
        },
        // Additional accent colors for music/DJ theme
        accent: {
          neon: '#00a3ff',
          purple: '#7b20c8',
          cyan: '#00f0ff',
          magenta: '#ff00ff',
          gold: '#ffd700',
        },
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #00a3ff 0%, #7b20c8 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0d0d0d 0%, #212529 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          // Using primary-500 (#00a3ff) and secondary-500 (#7b20c8) colors
          '0%': { boxShadow: '0 0 5px #00a3ff, 0 0 10px #00a3ff' },
          '100%': { boxShadow: '0 0 10px #00a3ff, 0 0 20px #00a3ff, 0 0 30px #7b20c8' },
        },
      },
      boxShadow: {
        // Using primary-500 (#00a3ff) and secondary-500 (#7b20c8) colors
        'neon': '0 0 10px #00a3ff, 0 0 20px #00a3ff',
        'purple': '0 0 10px #7b20c8, 0 0 20px #7b20c8',
        'glow-sm': '0 0 5px rgba(0, 163, 255, 0.5)',
        'glow-md': '0 0 10px rgba(0, 163, 255, 0.5)',
        'glow-lg': '0 0 20px rgba(0, 163, 255, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
