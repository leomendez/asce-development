/** @type {import('tailwindcss').Config} */

const oxfordBlue = '#001B2E';
const charcoal = '#294C60';
const imperialRed = '#E63946';
const honeydew = '#F1FAEE';
const powderBlue = '#A8DADC';

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    typography: (theme) => ({}),
    extend: {
      colors: {
        'asce-bg-dark': oxfordBlue,
        'asce-secondary-dark': powderBlue,
        'asce-primary-dark': charcoal,
        'asce-font-dark': honeydew,
        'asce-bg': honeydew,
        'asce-aux': imperialRed,
        'asce-secondary': charcoal,
        'asce-primary': powderBlue,
        'asce-font': oxfordBlue,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
