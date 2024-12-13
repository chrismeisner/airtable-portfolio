module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        atlas: ["Atlas Grotesk", "sans-serif"], // Add Atlas Grotesk
      },
      fontSize: {
        hero: "5rem",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      colors: {
        "app-bg": "#F2F5F3",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")], // Added aspect-ratio plugin
};
