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
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.asce-font'),
            '--tw-prose-headings': theme('colors.asce-font'),
            '--tw-prose-lead': theme('colors.asce-font'),
            '--tw-prose-links': theme('colors.asce-font'),
            '--tw-prose-bold': theme('colors.asce-font'),
            '--tw-prose-counters': theme('colors.asce-font'),
            '--tw-prose-bullets': theme('colors.asce-font'),
            '--tw-prose-hr': theme('colors.asce-font'),
            '--tw-prose-quotes': theme('colors.asce-font'),
            '--tw-prose-quote-borders': theme('colors.asce-font'),
            '--tw-prose-captions': theme('colors.asce-font'),
            '--tw-prose-code': theme('colors.asce-font'),
            '--tw-prose-pre-code': theme('colors.asce-font'),
            '--tw-prose-pre-bg': theme('colors.asce-font'),
            '--tw-prose-th-borders': theme('colors.asce-font'),
            '--tw-prose-td-borders': theme('colors.asce-font'),
            '--tw-prose-invert-body': theme('colors.asce-font-dark'),
            '--tw-prose-invert-headings': theme('colors.asce-font-dark'),
            '--tw-prose-invert-lead': theme('colors.asce-font-dark'),
            '--tw-prose-invert-links': theme('colors.asce-font-dark'),
            '--tw-prose-invert-bold': theme('colors.asce-font-dark'),
            '--tw-prose-invert-counters': theme('colors.asce-font-dark'),
            '--tw-prose-invert-bullets': theme('colors.asce-font-dark'),
            '--tw-prose-invert-hr': theme('colors.asce-font-dark'),
            '--tw-prose-invert-quotes': theme('colors.asce-font-dark'),
            '--tw-prose-invert-quote-borders': theme('colors.asce-font-dark'),
            '--tw-prose-invert-captions': theme('colors.asce-font-dark'),
            '--tw-prose-invert-code': theme('colors.asce-font-dark'),
            '--tw-prose-invert-pre-code': theme('colors.asce-font-dark'),
            '--tw-prose-invert-pre-bg': theme('colors.asce-font-dark'),
            '--tw-prose-invert-th-borders': theme('colors.asce-font-dark'),
            '--tw-prose-invert-td-borders': theme('colors.asce-font-dark'),
          },
        },
      }),
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
