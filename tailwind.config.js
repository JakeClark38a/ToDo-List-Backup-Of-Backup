/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./templates/**/*.{html,htm}"],
  theme: {
    extend: {
      colors: {
        'blue': '#2c67fe',
        'pink': '#fab6b6',
        'green': '#b3f32b',
      }
    },
  },
  plugins: [],
}