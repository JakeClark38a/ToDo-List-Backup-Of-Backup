/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      sm: "300px",
      md: "420px",
      lg: "800px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      height: {
        "50%": "50%",
      },
      padding: {
        "placeholder-10": "10px",
      },
      backgroundImage: {
        heroxl: "url('/src/resources/heroxl.jpg')",
        herosm: "url('/src/resources/herosm.jpg')",
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
  plugins: [],
};
