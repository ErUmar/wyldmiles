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
        wyld: {
          dark: '#0F1715',
          darkCard: '#16221F',
          forest: '#183C32',
          forestLight: '#245446',
          charcoal: '#111827',
          charcoalLight: '#1F2937',
          grayBg: '#F8F9FA',
          ivory: '#FAF9F5',
          orange: '#E27D44',
          orangeHover: '#CC6931',
          accent: '#2563EB',
          sage: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        card: '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        floating: '0 20px 48px -8px rgba(0, 0, 0, 0.16), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
