/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(209, 23%, 22%)",
        veryDarkBlue: "hsl(207, 26%, 17%)",
        darkGray: "hsl(0, 0%, 52%)",
        veryLightGray: "hsl(0, 0%, 98%)"
      },
      gridTemplateColumns: {
        'countries': "repeat(auto-fill, minmax(275px, 1fr))",
        'countries-md': "repeat(auto-fill, minmax(275px, 300px))"
      },
    },
  },
  plugins: [],
};
