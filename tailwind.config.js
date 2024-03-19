/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./templates/**/*.{html,htm}",
    "./static/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "420px",
      lg: "800px",
      xl: "1000px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      height: {
        "50%": "50%",
        "100%": "100%",
      },
      padding: {
        "placeholder-10": "10px",
      },
      backgroundImage: {
        heroxl: "url('/src/resources/heroxl.jpg')",
        heromd: "url('/src/resources/heromd.jpg')",
        herosm: "url('/src/resources/herosm.jpg')",
      },
      colors: {
        primary: {
          red: "#FAB6B6",
          green: "#9ADAB0",
          yellow: "#DCCAA0",
          blue: "#75C6CC",
        },

        shade_green: {
          100: "#e4f5ea",
          200: "#c9ebd5",
          300: "#afe0c0",
          400: "#94d6ab",
          500: "#79cc96",
          600: "#61a378",
          700: "#497a5a",
          800: "#30523c",
          900: "#18291e",
        },

        shade_red: {
          100: "#fef0f0",
          200: "#fde2e2",
          300: "#fcd3d3",
          400: "#fbc5c5",
          500: "#fab6b6",
          600: "#c89292",
          700: "#966d6d",
          800: "#644949",
          900: "#322424",
        },

        shade_yellow: {
          100: "#f8f4ec",
          200: "#f1ead9",
          300: "#eadfc6",
          400: "#e3d5b3",
          500: "#dccaa0",
          600: "#b0a280",
          700: "#847960",
          800: "#585140",
          900: "#2c2820",
        },

        shade_blue: {
          100: "#e3f4f5",
          200: "#c8e8eb",
          300: "#acdde0",
          400: "#91d1d6",
          500: "#75c6cc",
          600: "#5e9ea3",
          700: "#46777a",
          800: "#2f4f52",
          900: "#172829",
        },

        accent: {
          red: "#fc9999",
          green: "#79cc96",
          yellow: "#cdb784",
          blue: "#8be0e7",
        },

        background: {
          main: "#FCF6F6",
          dark: "#4a4848",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
