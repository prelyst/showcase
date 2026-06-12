import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — white base with subtle off-white card layering
        surface: '#FFFFFF',
        card: '#F7F7F5',
        panel: '#F0EFEC',
        skeleton: '#F0EFEC',
        track: '#DAD8D2',
        // Lines
        border: '#E6E4DF',
        divider: '#ECEAE5',
        // Ink + text (kept from original warm palette)
        ink: '#1A1814',
        subtle: '#4A453C',
        muted: '#85806F',
        // Brand accent (terracotta) — preserved
        accent: '#B8541F',
        'accent-tint': '#F5E5D3',
        sage: '#5A6B3A',
        'sage-tint': '#E5E8D4',
        danger: '#A0381F',
        'danger-tint': '#F2DCD1',
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,24,20,0.04), 0 8px 24px -16px rgba(26,24,20,0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
