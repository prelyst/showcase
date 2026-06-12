import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        // Surfaces — warm paper base with layered cream cards
        surface: '#FAF4EA',
        card: '#FFFCF6',
        panel: '#F3EBDC',
        skeleton: '#EFE6D6',
        track: '#E0D5C2',
        // Lines
        border: '#E7DDCB',
        divider: '#EFE7D8',
        // Ink + text (warm, higher contrast)
        ink: '#211C15',
        subtle: '#5A5142',
        muted: '#8C8270',
        // Brand accent (terracotta) — deepened + extended
        accent: '#B8541F',
        'accent-deep': '#8F3D12',
        'accent-bright': '#D9692B',
        'accent-tint': '#F6E2CE',
        sage: '#566B33',
        'sage-tint': '#E4E9D2',
        gold: '#A67C1E',
        danger: '#A0381F',
        'danger-tint': '#F2DCD1',
      },
      boxShadow: {
        // Warm-tinted, layered elevation
        card: '0 1px 2px rgba(74,46,20,0.05), 0 10px 30px -18px rgba(74,46,20,0.28)',
        lift: '0 2px 4px rgba(74,46,20,0.06), 0 20px 44px -22px rgba(120,60,24,0.34)',
      },
    },
  },
  plugins: [],
};

export default config;
