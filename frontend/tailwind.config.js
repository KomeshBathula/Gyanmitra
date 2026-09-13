/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        karmayogi: {
          navy: '#1B365D',      // Official Karmayogi Primary Deep Navy
          dark: '#0F2942',      // Top Banner Slate
          blue: '#264092',      // Official GoI / Karmayogi Royal Blue
          lightBlue: '#0284C7', // Cyan / Accent Blue
          saffron: '#FF9933',   // Saffron Accent
          amber: '#F59E0B',     // KarmaPoints Gold / Amber
          green: '#138808',     // National Green
          surface: '#F8FAFC',   // Clean background
          card: '#FFFFFF',      // Pure white card
          border: '#E2E8F0',    // Subtle border
          textDark: '#1E293B',  // Slate 800
          textMuted: '#64748B', // Slate 500
        },
        gov: {
          dark: '#0F2942',
          navy: '#1B365D',
          blue: '#264092',
          accent: '#1E40AF',
          light: '#2563EB',
          subtle: '#EFF6FF',
          surface: '#F8FAFC',
          border: '#E2E8F0',
          ashoka: '#0F4C81',
          saffron: '#FF9933',
          green: '#138808'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'Noto Sans', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 1px 3px 0 rgba(27, 54, 93, 0.08), 0 1px 2px -1px rgba(27, 54, 93, 0.08)',
        'gov-md': '0 4px 6px -1px rgba(27, 54, 93, 0.1), 0 2px 4px -2px rgba(27, 54, 93, 0.06)',
        'gov-lg': '0 10px 15px -3px rgba(27, 54, 93, 0.1), 0 4px 6px -4px rgba(27, 54, 93, 0.05)',
        'karmayogi': '0 2px 8px -2px rgba(27, 54, 93, 0.08), 0 1px 4px -1px rgba(27, 54, 93, 0.04)',
      }
    },
  },
  plugins: [],
}
