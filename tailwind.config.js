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
        screen_1_2: '50vh',
        screen_1_3: 'calc(100vh / 3)',
        screen_2_3: 'calc(100vh / 1.5)',
        screen_1_4: 'calc(100vh / 4)',
        screen_3_4: 'calc(100vh / 1.33)',
        screen_1_5: 'calc(100vh / 5)',
        screen_2_5: 'calc(100vh / 2.5)',
        screen_3_5: 'calc(100vh / 1.66)',
        screen_4_5: 'calc(100vh / 1.25)',
        screen_all: '93vh',
      },
      animation: {
        'shake': 'shake 0.82s cubic-bezier(.36, .07,.19,.97) both',
        },
        keyframes: {
          'shake': {
              '10%, 90%' : {
                  transform: 'translate3d(-1px, 0, 0)'
          },
              '20%, 80%' : { 
                  transform: 'translate3d(2px, 0, 0)'
          },
              '30%, 50%, 70%' : { 
                  transform: 'translate3d(-4px, 0, 0)'
          },
              '40%, 60%' : { 
                  transform: 'translate3d(4px, 0, 0)'
          }
        }
      }
    },
  },
  plugins: [],
};
