/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./templates/**/*.{html,htm}",
    "./static/**/*.{js,html,htm}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "420px",
      lg: "800px",
      xl: "1000px",
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
        heroxl: "url('/static/images/background3.jpg')",
        heromd: "url('/static/images/background3.jpg')",
        herosm: "url('/static/images/background3.jpg')",
        bg1: "url('/static/images/wallpaper.jpg')",
        bg2: "url('/static/images/wallpaper2.jpg')",
        bg3: "url('/static/images/wallpaper3.jpg')",
        bg4: "url('/static/images/wallpaper3.jpg')",
      },
      colors: {
        primary: {
          100: "#b57250",
          200: "#8cb9be",
        },
        accent: {
          100: "#eaa038",
          200: "#8cb9be",
          300: "#c48e73",
          400: "#6faeb4"
        },
        blue: {
          100: "#e8f1f2",
          200: "#d1e3e5",
          300: "#bad5d8",
          400: "#a3c7cb",
          500: "#8cb9be",
          600: "#709498",
          700: "#546f72",
          800: "#384a4c",
          900: "#1c2526",
        },
        beige: {
          100: "#f0e3dc",
          200: "#e1c7b9",
          300: "#d3aa96",
          400: "#c48e73",
          500: "#b57250",
          600: "#915b40",
          700: "#6d4430",
          800: "#482e20",
          900: "#241710",
        },
        yellow: {
          100: "#fcefde",
          200: "#f8e0bd",
          300: "#f5d09c",
          400: "#f1c17b",
          500: "#eeb15a",
          600: "#be8e48",
          700: "#8f6a36",
          800: "#5f4724",
          900: "#302312",
        },
        main: "#fffcf7",
        dark: "#4a4848",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
