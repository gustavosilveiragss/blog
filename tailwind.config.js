/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        spacing: {
          88: '22rem',
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    themes: [
      {
        mytheme: {
          "primary": "#E08D79",
          "secondary": "#e0beac",
          "accent": "#D8EBD6",
          "neutral": "#6a548f",
          "base-100": "#2b2640",
          "info": "#A882DD",
          "success": "#1DE29D",
          "warning": "#A1A0B3",
          "error": "#FC371D",
        },
      },
    ],
  },
}
