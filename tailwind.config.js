/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure correct paths
  theme: {
    extend: {
      fontFamily: {
        general: ["General Sans", "sans-serif"], // Ensure font is installed
        circular: ["circular-web", "sans-serif"],
        robertMedium: ["robert-medium", "sans-serif"],
        robertRegular: ["robert-regular", "sans-serif"],
        zentry: ["zentry", "sans-serif"],
      },
    },
  },
  plugins: [],
};
