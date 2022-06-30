/** @type {import('tailwindcss').Config} */

const oxfordBlue = '#001B2E';
const charcoal = '#294C60';
const imperialRed = '#E63946';
const honeydew = '#F1FAEE';
const powderBlue = '#A8DADC';

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  purge: ['./src/**/*.tsx'],
  theme: {
    typography: (theme) => ({}),
    extend: {
      colors: {
        'asce-oxfordBlue': oxfordBlue,
        'asce-powderBlue': powderBlue,
        'asce-imperialRed': imperialRed,
        'asce-charcoal': charcoal,
        'asce-honeydew': honeydew,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
