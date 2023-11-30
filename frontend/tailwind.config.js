/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: colors.slate[900],
          primary: colors.slate[50],
          secondary: colors.slate[300],
          tertiary: colors.slate[400],
          card: colors.slate[800],
          title: colors.slate[50],
          description: colors.slate[300],
          info: colors.slate[400],
        },
        light: {},
      },
    },
  },
  plugins: [],
};
