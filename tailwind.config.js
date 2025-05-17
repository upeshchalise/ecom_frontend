// tailwind.config.js
module.exports = {
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",      
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",         ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        productDetails: '0 4px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
