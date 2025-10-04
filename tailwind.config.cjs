/**** Tailwind CSS v3 config ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Palette Nero + Verde Bosco (forest)
          50: '#f2f7f4',
          100: '#dfeee5',
          200: '#b9dac2',
          300: '#8bbf99',
          400: '#569a6b',
          500: '#2f7a4a', // forest medium
          600: '#23613b',
          700: '#1c4d30',
          800: '#143724',
          900: '#0d2417',
          950: '#08150d'
        },
        noir: '#020403'
      },
      backgroundImage: {
        'grid-radial': 'radial-gradient(circle at center, rgba(47,122,74,0.15), transparent 70%)',
        'beam': 'linear-gradient(110deg, rgba(47,122,74,0.15), rgba(2,4,3,0.4) 45%, rgba(47,122,74,0.15))'
      },
      boxShadow: {
        'glow-green': '0 0 0 1px rgba(47,122,74,0.4), 0 0 18px -2px rgba(47,122,74,0.5)'
      }
    }
  },
  plugins: []
};
