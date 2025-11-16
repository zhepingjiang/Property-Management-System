// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust paths for your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b9965b", // gold button, card accents
        secondary: "#8e6f43", // darker gold
        accent: "#d4a95d", // lighter accent
        textPrimary: "#5a4632", // dark warm text
        textSecondary: "#7a6a55", // secondary text
        cardBg: "rgba(255, 253, 247, 0.9)",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        hotel: "0 8px 20px rgba(185, 150, 87, 0.15)",
        hotelHover: "0 14px 30px rgba(185, 150, 87, 0.25)",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
