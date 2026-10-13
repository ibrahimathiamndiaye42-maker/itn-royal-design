/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivoire: '#FBF8F3',   // fond de page
        lin: '#EFE7DA',      // sections beige
        sable: '#D8C8B0',    // filets, bordures
        or: '#A8854A',       // doré mat, très peu utilisé
        noir: '#000000',
        encre: '#1D1B19',    // texte principal
        pierre: '#6F675D',   // texte secondaire
        brique: '#9B2C2C',   // erreurs
        wa: '#1FA855',       // WhatsApp
      },
      fontFamily: {
        display: ['Marcellus', 'Georgia', 'serif'],
        sans: ['"Jost Variable"', 'Jost', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '88rem' },
      transitionTimingFunction: { royal: 'cubic-bezier(.22,.8,.2,1)' },
      keyframes: {
        sheetUp: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        slideLeft: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        slideRight: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        bump: { '0%,100%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.35)' } },
        toastIn: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        sheetUp: 'sheetUp .38s cubic-bezier(.22,.8,.2,1)',
        slideLeft: 'slideLeft .38s cubic-bezier(.22,.8,.2,1)',
        slideRight: 'slideRight .38s cubic-bezier(.22,.8,.2,1)',
        fadeIn: 'fadeIn .25s ease-out',
        bump: 'bump .35s ease-out',
        toastIn: 'toastIn .3s cubic-bezier(.22,.8,.2,1)',
      },
    },
  },
  plugins: [],
};
