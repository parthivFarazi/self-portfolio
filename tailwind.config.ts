import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rw: {
          grass: '#6db862',
          path: '#e8d5a8',
          brick: '#a8553c',
          terracotta: '#c97e58',
          gold: '#b3a369',
          'gold-bright': '#d4c178',
          ink: '#2a2520',
          'ink-soft': '#534a3e',
          paper: '#f6f1e4',
          cream: '#fffaee',
          amber: '#f5d97a',
          'sky-peach': '#ffd4a3',
          'sky-lav': '#e3c5e1',
          'sky-teal': '#b3dfd7',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        hand: ['Caveat', '"Bradley Hand"', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
