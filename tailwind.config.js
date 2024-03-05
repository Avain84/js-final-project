/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    colors: {
      'transparent': 'transparent',
      'white': {
        DEFAULT: '#FFFFFF',
        'bg':'#F8F8F8',
      },
      'blue': {
        'state':'#0067CE',
      },
      'red': {
        'warning':'#C72424',
        'delete':'#C44021'
      },
      'black': {
        DEFAULT: '#000000',
        'select-text': '#212529'
      },
      'gray': {
        'table-text':'#797979',
        'border':'#CED4DA',
        'input-text':'#818A91',
        'cart-line':'#BFBFBF',
        'table-border':'#B9B9B9',
        'rcd-border':'#707070',
      },
      'purple': {
        'bg': '#301E5F',
        'text':'#6A33F8',
        'check':'#6A33FF'
      }
    },
    extend: {
      fontFamily: {
        "noto-sans" : '"Noto Sans TC", sans-serif',
      },
      height: {
        35: "140px"
      },
      margin: {
        15: "60px"
      },
      borderWidth: {
        20 : "20px",
        32 : "32px",
        40 : "40px"
      },
      backgroundImage: {
        "banner": "url('./img/banner.png')"
      }
    },
    container:{
      screens: {
        'md': '768px',
        'lg': '1140px'
      },
      center: true,
      padding: '15px'
    }
  },
  plugins: [],
}