module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'dark': '#000000',
        'smoke': '#333333',
        'white':'#f5f6fa'
      },
      fontFamily: {
        // 'serif': ['ui-serif', 'Georgia'],
        // 'Lib': ["Libre Baskerville", serif],
       },
    },
  },
  plugins: [],
}
