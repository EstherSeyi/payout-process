module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      greyish: {
        50: "FBFBFB",
        100: "#FBFAFA",
        150: "#E8E8E8",
        200: "#C4C5C6",
        250: "#B7B7B7",
        300: "#918DAB",
        350: "#8B8F96",
        400: "#636166",
        450: "#404040",
        500: "#EDEDED",
        550: "#F2F2F2",
      },
      purpleish: {
        50: "#F4F3F8",
        100: "#877E9E",
        150: "#A98CF6",
        200: "#4406EC",
        250: "#4305EB",
        300: "#2C0C6A",
      },
      blackish: {
        50: "#222222",
      },
      misc: {
        green: "#6FAE75",
        white: "#FFFFFF",
      },
    },
    extend: {
      inset: {
        "-0.6": "-0.1875rem",
      },
      width: {
        "79%": "79%",
        "21%": "21%",
      },
      fontSize: {
        "13px": "13px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
