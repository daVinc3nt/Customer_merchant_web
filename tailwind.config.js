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
        },

        //-----order.tsx:-----//
        buttonColorForm:{
          default: '#DC2626',
          hover: '#B91C1C',
          text: '#FFFFFF',
        },
          //LocationForm.tsx + MoreDetailsForm.tsx + OrderNotifications.tsx//
          formBgColor:{
            parent: "#FFFFFF",
            firstChild: "#FFFFFF",
            secondChild: "#FFFFFF"
          },
          formBorder:{
            parent: "#EF4444",
            children: "#D1D5DB",
          },
          headlineText:{
            default: "#111111",
          },
          scrollBottomBt:{
            default: '#DC2626',
            hover: '#B91C1C',
            outline: '#FFFFFF',
          },
          //end locationForm.tsx//
        goBackNCollapse:{
          default: "#F3F4F6",
          hover: "#D1D5DB",
          text: "#4B5563"
        },
        link:{
          text: "#EF4444"
        },
        //-----end order.tsx.-----//

        //-----balance.tsx:-----//
        balanceBgColor:{
          default: "#E8EAED"
        },
        //-----end balance.tsx:-----//

      },
      backgroundImage: {
        RedGradient:
            'linear-gradient(to top, #890010, #990012)',
        LoginRedGradient:
            'linear-gradient(to left, #E65758, #771D32)', 
        LitghRedGradient:
            'linear-gradient(-45deg, #ff5959, #ff4040, #ff0d6e, #ff8033,#d74177)',
      },
      height:{
        104: '26rem',
        112: '28rem',
        120: '30rem',
        150: '37.5rem',
        160: '40rem',
        170: '42.5rem',
        200: '50rem',
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
