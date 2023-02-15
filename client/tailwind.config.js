/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'bleu': '#2b2d42',
        'gris': '#8d99ae',
        'blanc': '#edf2f4',
        'rouge1': '#ef233c',
        'rouge2': '#d90429'
      },
      width: {
        '': '',
      },
      padding: {
        '5': '5px',
      }
    },
  },
  plugins: [],
}
