/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        200: "200px",
        300: "300px",
        348: "348px",
        450: "450px",
      },
      height: {
        40: "40px",
        46: "46px",
        414: "414px",
        600: "600px",
      },
      colors: {
        white: "rgb(251 252 253)",
        input: "#f1f3f5",
        headerTable: "rgb(236,238,240)",
        bodyTable: "rgb(248,249,250)",
        rightContent: "rgb(248,249,250)",
        gray: "rgb(104, 112, 118)",
        link: "rgb(104, 112, 118)",
        blue1: "rgb(0, 145, 255)",
        blueHover: "rgb(0, 129, 241)",
        default: "rgb(248, 249, 250);",
        black: "rgb(17, 24, 28)",
        red1: "rgb(243, 174, 175)",
        red2: "rgb(255, 239, 239)",
        required: "rgb(229, 72, 77)",
      },
      boxShadow: {
        form: "rgba(236, 238, 240, 0.5) 0px 10px 5px",
        header: "rgb(236, 238, 240) 0px 3px 15px",
      },
      inset: {
        135: "135px",
      },
      margin: {
        "08": "-8px",
      },
      maxWidth: {
        1170: "1170px",
        300: "300px",
      },
      minWidth: {
        175: "175px",
        290: "290px",
      },
      minHeight: {
        600: "600px",
      },
    },
  },
  plugins: [],
};
