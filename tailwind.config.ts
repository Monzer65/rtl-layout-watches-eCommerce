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
        height: "height",
        spacing: "margin, padding",
        scale: "scale",
      },
      backgroundImage: {
        banner_bg_pattern:
          "url('../public/images/advertising-banner-background.jpeg')",
      },
    },
    animation: {
      bounce: "bounce 1s infinite",
      infinite_scroll: "infinite_scroll 22s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      spin: "spin 1s linear infinite",
      wiggle: "wiggle 1s ease-in-out infinite",
    },
    keyframes: {
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "translateY(0)",
          "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
      infinite_scroll: {
        "100%": { transform: "translate(calc(50% + 0.5rem))" },
      },
      ping: {
        "75%": { transform: "scale(2)", opacity: "0" },
        "100%": { transform: "scale(2)", opacity: "0" },
      },
      pulse: {
        "0%, 100%": {
          opacity: "1",
        },
        "50%:": {
          opacity: "0.5",
        },
      },
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: " rotate(360deg)",
        },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
    },
  },
  plugins: [],
};
export default config;
