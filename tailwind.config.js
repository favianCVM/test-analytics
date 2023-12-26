/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: () => ({
        inter: ['Inter']
      }),
      colors: {
        white: '#FFF',
        primary: {
          1: '#75C3AE',
          2: '#A3D7C9',
          3: '#D1EBE4',
          4: '#28574A',
        },
        secondary: {
          1: '#304376',
          2: '#7582A4',
          3: '#BAC0D1',
        },
        tertiary: {
          1: '#7A86FF',
          2: '#A6AEFF',
          3: '#D3D7FF',
        },
        neutro: {
          1: '#F3EFEC',
          2: '#F7F4F2',
          3: '#FBFAF9',
        },
        text:{
          1: '#1B1C1E',
          3: '#707070',
          2: '#303030',
          4: '#C5C6CC',
          5: '#F8F9FE',
        },
        error:{ 
          1: "#FF616D",
          2: '#ED3241',
        },
        gray88: '#E0E0E0',
        primaryLight: '#67BFAC',
        primaryDark: '#1F2024',
        neutralLight: '#D4D6DD',
        neutralDark: '#71727A',
        lightQuaternary: "#F4F4F5",
        neutralLightDarkest: "#C5C6CC",
        complementary1: "#FEE576"
      }
    },
  },
  plugins: [],
}
