import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: "#FFB300",
        coral: "#FF4FA0",
        sky: "#0D5FEA",
        mint: "#66CC00",
        purple: "#8E44FF",
        ink: "#082A7A",
        cream: "#FFFDF8",
        cloud: "#EEF6FF",
      },
      fontFamily: {
        heading: ["Poppins", "Nunito", "Trebuchet MS", "Segoe UI", "Arial", "sans-serif"],
        body: ["Nunito", "Trebuchet MS", "Segoe UI", "Arial", "sans-serif"],
      },
      borderRadius: {
        brand: "1.5rem",
      },
      boxShadow: {
        playful: "0 18px 45px rgba(8, 42, 122, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
