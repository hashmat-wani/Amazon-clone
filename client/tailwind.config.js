/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      coupon: "#5ed15e",
      festival: "#ff9138",
      white: "white",
      gray: "#ddd",
      "button-bg": "#f0c14b",
      "button-border": "#a88734",
      "button-hover": "#ddb347",
    },
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
  },
  plugins: [],
};
