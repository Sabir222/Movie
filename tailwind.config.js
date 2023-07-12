/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mukta: ["Mukta"],
      },
      backgroundImage: {
        "hero-pattern": "url('/Movie-suggest/src/assets/brick-wall.svg')",
      },
    },
  },
  plugins: [],
};
