import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: "#FFD166",
        coral: "#FF6B6B",
        sky: "#4D96FF",
        mint: "#62D2A2",
        ink: "#243047",
      },
      boxShadow: {
        playful: "0 18px 45px rgba(36, 48, 71, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
