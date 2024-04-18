import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        maxHeight: "max-height",
        spacing: "margin, padding",
      },
      backgroundImage: {
        banner_bg_pattern:
          "url('../public/images/advertising-banner-background.jpeg')",
      },
    },
    animation: {
      infinite_scroll: "infinite_scroll 22s linear infinite",
    },
    keyframes: {
      infinite_scroll: {
        "100%": { transform: "translate(calc(50% + 0.5rem))" },
      },
    },
  },
  plugins: [],
};
export default config;
