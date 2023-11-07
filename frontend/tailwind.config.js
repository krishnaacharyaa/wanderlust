/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'var(--bg-dark)',
          field: 'var(--bg-dark-field)',
          card: 'var(--bg-dark-card)',
          text: 'var(--text-dark)',
        },
      },
    },
  },
  plugins: [],
};
