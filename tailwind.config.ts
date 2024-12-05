import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#BD8306E5",
        completed: "#A9F5AB",
        processed: "#FFAC9F",
        started: "#FFD0A5",
        pri100: "#CCEBF2",
      },
    },
  },
  plugins: [],
};
export default config;
