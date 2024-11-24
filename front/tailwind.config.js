/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundLinear:
          "linear-gradient(to bottom, #3954AD 0%, #283B7A 50%, #172347 100%)",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
