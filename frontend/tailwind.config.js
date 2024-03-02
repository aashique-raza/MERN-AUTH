/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'github-color': '#4078c0',
        'linkdin-color': '#0077b5',
        'google-color': '#34A853',
      },
    },
  },
  plugins: [],
}

