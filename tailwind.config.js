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
      screens: {
        xs : '360px',
        s : '425px',

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
        128: '32rem',
        136: '34rem',
        144: '36rem',
        152: '38rem',
        160: '40rem',
        168: '42rem',
        176: '44rem',
        184: '46rem',
        192: '48rem',
        200: '50rem',
         
        'screen_1/6': '16.666667vh',
        'screen_1/5': '20vh',
        'screen_1/4': '25vh',
        'screen_1/3': '33vh',
        'screen_2/5': '40vh',
        
        'screen_1/2': '50vh',
        'screen_3/5': '60vh',
        'screen_2/3': '66vh',
        'screen_3/4': '75vh',
        'screen_4/5': '80vh',
      }
    },
  },
  plugins: [],
};
