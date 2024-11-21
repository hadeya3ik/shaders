import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spectral: ['var(--font-spectral)', 'serif'], 
        ppneuemonteal: ['var(--font-ppneuemonteal)', 'serif'], 
        notoSerif: ['var(--font-notoSerif)', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
      }
    },
  },
  plugins: [],
};
export default config;
