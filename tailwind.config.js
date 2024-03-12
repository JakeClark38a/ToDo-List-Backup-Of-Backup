/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./templates/**/*.{html,htm}",
    "./static/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screen: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      height: {
        "50%": "50%",
      },
      colors: {
        primary: {
          red: "#FAB6B6",
          green: "#9ADAB0",
          yellow: "#DCCAA0",
          blue: "#75C6CC",
        },
        accent: {
          red: "#fc9999",
          green: "#79cc96",
          yellow: "#cdb784",
          blue: "#8be0e7",
        },
        background: {
          main: "#FCF6F6",
          secondary: "#FCF0FF",
          thirdary: "#F0FEFF",
        },
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ]
}