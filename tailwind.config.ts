import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10002B",
        secondary: "#52B788",
        accent: "#edf2f4",
        border: "#D9DBF1",
        dark: "#222222",
        light: "#edf2f4",
        danger: "#d80032",
        edit: "#0077B6",
        view: "#F77F00",
        status: {
          Approved: "#52B788",
          Rejected: "#d80032",
          Pending: "#edf2f4",
        },
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        lato: ["lato", "Rubik", "sans-serif"],
        poppins: ["Poppins", "Rubik"],
        inter: ["Inter", "Rubik"],
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
export default config;
