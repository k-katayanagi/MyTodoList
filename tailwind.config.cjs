/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",        
    "./src/**/*.{js,ts,jsx,tsx}" // Reactプロジェクトの場合、srcフォルダ内を指定
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
