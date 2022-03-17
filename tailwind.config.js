module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#b95d94",
        "dark-900": "#060708",
        "dark-800": "#121315",
        "dark-700": "#32353b",
      },
      fontFamily: {
        display: ["Bebas Neue"],
        title: ["Poppins"],
        body: ["Dancing Script"],
      },
      transitionProperty: {
        width: "width",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        page: "6vh 94vh",
      },
      gridTemplateColumns: {
        // Simple 8 row grid
        page: "250px auto",
        "page-sm": "4rem auto",
      },
    },
  },
  plugins: [],
};
