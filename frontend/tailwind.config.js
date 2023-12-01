/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

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
          description: colors.slate[400],
          info: colors.slate[500],
        },
        light: {
          DEFAULT: colors.slate[50],
          primary: colors.slate[900],
          secondary: colors.slate[600],
          tertiary: colors.slate[500],
          title: colors.slate[900],
          description: colors.slate[700],
          info: colors.slate[500],
        },
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
