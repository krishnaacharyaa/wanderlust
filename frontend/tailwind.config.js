/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: 'var(--color-dark-background)',
          textfield: 'var(--color-dark-textfield-card)',
        },
      },
    },
  },
  plugins: [],
};
