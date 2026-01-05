import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.5)',
        'glow-md': '0 0 20px rgba(99, 102, 241, 0.6)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.7)',
      },
    },
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        // Cyber-aesthetic color palette
        cyber: {
          cyan: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#a855f7',
            500: '#9333ea',
            600: '#7e22ce',
            700: '#6b21a8',
            800: '#581c87',
            900: '#3b0764',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.5)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'neon-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'neon-white': '0 0 30px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
          '0%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
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
