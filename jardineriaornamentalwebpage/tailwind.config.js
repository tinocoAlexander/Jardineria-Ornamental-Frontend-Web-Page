/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pantone 380 C and 361 C inspired greens
        'ornamental': {
          50: '#f0f9e8',
          100: '#ddf2c7',
          200: '#c2e894',
          300: '#9fd957', // Pantone 380 C equivalent
          400: '#7bc142',
          500: '#5ba02b', // Pantone 361 C equivalent
          600: '#4a8520',
          700: '#3a6b1a',
          800: '#2f5517',
          900: '#284716',
        },
        'nature': {
          50: '#f7fdf4',
          100: '#ecfce5',
          200: '#d3f8c8',
          300: '#aef29f',
          400: '#7de66d',
          500: '#4ade80', // Fresh green
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#166534',
        }
      },
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'garden-hero': "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/1453799/pexels-photo-1453799.jpeg')",
        'nature-pattern': "linear-gradient(135deg, #f0f9e8 0%, #ddf2c7 100%)",
      }
    },
  },
  plugins: [],
};