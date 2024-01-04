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
        LitghRedGradient:
            'linear-gradient(-45deg, #ff5959, #ff4040, #ff0d6e, #ff8033,#d74177)'   
      },
      height:{
        104: '26rem',
        112: '28rem',
        120: '30rem',
        150: '37.5rem',
        160: '40rem',
        170: '42.5rem',
        200: '50rem',
      }
    },
  },
  plugins: [],
};
