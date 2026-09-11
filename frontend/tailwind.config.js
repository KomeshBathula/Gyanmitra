/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          dark: '#0a192f',
          navy: '#0f2942',
          blue: '#1a365d',
          accent: '#1e40af',
          light: '#2563eb',
          subtle: '#eff6ff',
          surface: '#f8fafc',
          border: '#e2e8f0',
          ashoka: '#0f4c81',
          saffron: '#f97316',
          green: '#16a34a'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 1px 3px 0 rgba(15, 41, 66, 0.08), 0 1px 2px -1px rgba(15, 41, 66, 0.08)',
        'gov-md': '0 4px 6px -1px rgba(15, 41, 66, 0.08), 0 2px 4px -2px rgba(15, 41, 66, 0.06)',
        'gov-lg': '0 10px 15px -3px rgba(15, 41, 66, 0.08), 0 4px 6px -4px rgba(15, 41, 66, 0.04)',
      }
    },
  },
  plugins: [],
}
