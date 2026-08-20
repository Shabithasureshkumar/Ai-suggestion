/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        slate: {
          850: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        // `shadow-xs` is a Tailwind v4 utility that does not exist in v3.4.x.
        // The codebase already uses `shadow-xs` in 7 places where it silently
        // compiled to nothing. Defining it here with Tailwind's own v4 value
        // makes those existing class names resolve instead of renaming them.
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'purple-glow': '0 0 25px -5px rgba(124, 58, 237, 0.25)',
        'purple-subtle': '0 4px 20px -2px rgba(139, 92, 246, 0.08)',
        'card-hover': '0 12px 30px -10px rgba(124, 58, 237, 0.15)',
      },
      keyframes: {
        // Project-native replacements for the `animate-in fade-in
        // slide-in-from-bottom-4` classes, which require the
        // `tailwindcss-animate` plugin that is not installed here.
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'drawer-in': {
          from: { opacity: '0', transform: 'translateY(-0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'backdrop-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'toast-in': 'toast-in 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'drawer-in': 'drawer-in 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        'backdrop-in': 'backdrop-in 200ms ease-out',
      }
    },
  },
  plugins: [],
}
