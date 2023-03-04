/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        bleu: "#2b2d42",
        gris: "#8d99ae",
        blanc: "#edf2f4",
        rouge1: "#ef233c",
        rouge2: "#d90429",
      },
      width: {
        "": "",
      },
      padding: {
        5: "5px",
      },
      inset: {
        "550px": "550px",
      },
      fontSize: {
        xs: '0.6rem',
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
  },
  plugins: [],
};
