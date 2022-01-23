module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: {
        'mobile-light': 'url(/public/bg-mobile-light.jpg)',
        'desk-light': 'url(/public/bg-desktop-light.jpg)',
        'mobile-dark': 'url(/public/bg-mobile-dark.jpg)',
        'desk-dark': 'url(/public/bg-desktop-dark.jpg)',
        'icon-light': 'url(/public/icon-moon.svg)',
        'icon-dark': 'url(/public/icon-sun.svg)',
      }
    },
  },
  plugins: [],
};
