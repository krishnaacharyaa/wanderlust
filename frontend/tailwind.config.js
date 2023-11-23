/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          background: 'var(--color-dark-background)',
          background_card_textfield: 'var(--color-dark-textfield-card)',
        },
      },
    },
  },
  plugins: [],
};
