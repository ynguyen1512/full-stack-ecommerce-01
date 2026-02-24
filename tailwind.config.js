/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#00AA51",
          50: "#e6f9ef",
          100: "#b3f0d0",
          200: "#80e7b1",
          300: "#4dde92",
          400: "#1ad573",
          500: "#00AA51",
          600: "#008842",
          700: "#006633",
          800: "#004325",
          900: "#002116",
        },
      },
    },
  },
  plugins: [],
}

