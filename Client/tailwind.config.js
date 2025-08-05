/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
        secondary: "#2c3e50",
        success: "#2ecc71",
        warning: "#f39c12",
        danger: "#e74c3c",
        info: "#9b59b6",
        light: "#f8f9fa",
        dark: "#2c3e50",
      },
    },
  },
  plugins: [],
}
