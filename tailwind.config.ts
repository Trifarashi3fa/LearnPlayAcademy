import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: "#FFB703",
        coral: "#FF2F76",
        sky: "#0057D9",
        mint: "#59C900",
        purple: "#8B35D6",
        ink: "#06154A",
      },
      boxShadow: {
        playful: "0 18px 45px rgba(6, 21, 74, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
