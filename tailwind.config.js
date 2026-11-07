/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-raised': 'var(--paper-raised)',
        graphite: 'var(--graphite)',
        'graphite-soft': 'var(--graphite-soft)',
        stone: 'var(--stone)',
        blush: 'var(--blush)',
        sage: 'var(--sage)',
        forest: 'var(--forest)',
        'forest-deep': 'var(--forest-deep)',
        terracotta: 'var(--terracotta)',
        'terracotta-deep': 'var(--terracotta-deep)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Times New Roman"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        card: '2px',
        pill: '999px',
      },
      boxShadow: {
        subtle: '0 12px 40px rgba(52, 54, 56, 0.08)',
      },
    },
  },
  plugins: [],
};
