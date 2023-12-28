/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      light: {
        DEFAULT: "#FAFBFC",
        lighter: "#F3F4F6",
      }
    },
    extend: {
      backgroundImage: {
        RedGradient:
            'linear-gradient(to top, #890010, #990012)',
      }
    },
  },
  plugins: [],
};
