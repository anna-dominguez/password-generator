/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jetBrains: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        red: '#F64A4A',
        orange: '#FB7C58',
        yellow: '#F8CD65',
        almostWhite: '#E6E5EA',
        darkGrey: '#24232C',
        grey: '#817D92',
        neonGreen: '#A4FFAF',
        veryDarkGrey: '#18171F',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
