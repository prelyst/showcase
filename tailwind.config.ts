import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        // Driven by CSS variables in globals.css so the .dark class can swap
        // the whole palette. Channel triplets keep opacity modifiers working.
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        skeleton: 'rgb(var(--skeleton) / <alpha-value>)',
        track: 'rgb(var(--track) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        divider: 'rgb(var(--divider) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        subtle: 'rgb(var(--subtle) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-deep': 'rgb(var(--accent-deep) / <alpha-value>)',
        'accent-bright': 'rgb(var(--accent-bright) / <alpha-value>)',
        'accent-tint': 'rgb(var(--accent-tint) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        'sage-tint': 'rgb(var(--sage-tint) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        'danger-tint': 'rgb(var(--danger-tint) / <alpha-value>)',
      },
      boxShadow: {
        // Neutral, layered elevation for the clean white theme
        card: '0 1px 2px rgba(18,18,20,0.05), 0 10px 30px -18px rgba(18,18,20,0.22)',
        lift: '0 2px 4px rgba(18,18,20,0.06), 0 20px 44px -22px rgba(18,18,20,0.30)',
      },
    },
  },
  plugins: [],
};

export default config;
