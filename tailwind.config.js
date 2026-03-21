/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        postman: '#FF6C37',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          primary: '#FF6C37',
          'primary-content': '#ffffff',
          'base-100': '#1e1e1e',
          'base-200': '#252525',
          'base-300': '#2c2c2c',
          'base-content': '#e0e0e0',
          neutral: '#3d3d3d',
          'neutral-content': '#cccccc',
        },
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#FF6C37',
          'primary-content': '#ffffff',
          'base-100': '#f5f5f5',
          'base-200': '#ffffff',
          'base-300': '#e8e8e8',
          'base-content': '#1a1a1a',
          neutral: '#e0e0e0',
          'neutral-content': '#333333',
        },
      },
    ],
    defaultTheme: 'dark',
  },
};
