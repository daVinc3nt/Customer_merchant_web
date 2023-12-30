/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.5rem',
        '3xs': '0.25rem'
      },
      colors: {
        light: {
          DEFAULT: "#FAFBFC",
          lighter: "#F3F4F6",
        }
      },
      backgroundImage: {
        RedGradient:
            'linear-gradient(to top, #890010, #990012)',
        LoginRedGradient:
            'linear-gradient(to left, #E65758, #771D32)',    
      }
    },
  },
  plugins: [],
};
