module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.jsx",
  ],
  corePlugins: {
    float: false,
  },
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
        error: "#d40e0e",
      },
    },
    extend: {
      inset: {
        "-0.6": "-0.1875rem",
        "64%": "64%",
        "29%": "29%",
      },
      width: {
        "79%": "79%",
        "21%": "21%",
      },
      fontSize: {
        "10px": "10px",
        "13px": "13px",
        "16px": "16px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
