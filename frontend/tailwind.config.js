/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {},
  },
  extend: {
    screens: {
      sm: "640px", // Small screens
      lg: "1024px", // Large screens
    },
  },
};
