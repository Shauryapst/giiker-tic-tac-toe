/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-diagonal': {
          '0%': {
            opacity: '0',
            transform: 'translate(-100%, -100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0, 0)',
          },
        },
      },
      animation: {
        'fade-in-diagonal': 'fade-in-diagonal 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}