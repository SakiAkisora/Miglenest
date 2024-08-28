/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Activa el modo JIT
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      Clockwise: ['Clockwise', 'sans-serif'],
    },
  },
  plugins: [],
};
