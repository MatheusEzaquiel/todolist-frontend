/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#ed6f07',
        'orange-2': '#d66304',
        'orange-100': '#ff2f00',
        'orange-200': '#c22704',
        'white': '#fff',
        'white-100': '#fafafa',
        'gray': '#ebe9e6',
        'gray-100': '#c3c2c12f',
        'gray-200': '#e0e0e0',
        'gray-300': '#bebebeb8',
        'gray-4': '#e6e3e3ab',
        'gray-5': '#7a7979',
        'red': '#f51133',
        'yellow': '#c38e08',
        'yellow-1': '#f2f222',
        'yellow-2': '#e3dc0b',
        'black': '#111111',
        'green': '#04d13b',
        'green-2': '#06bf28ac',
        'green-3': '#88eb94',
        'green-200': '#1f7901',
        'light-rose': '#cfbaba'
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(0)'},
          '50%': { transform: 'translateY(20px)'}
        }
      }
    },
  },
  plugins: [],
}

