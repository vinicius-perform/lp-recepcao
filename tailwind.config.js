/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5F2',
        white: '#FFFFFF',
        ivory: '#FDFBF8',
        champagne: {
          light: '#F4ECE1',
          DEFAULT: '#E8DAC8',
          dark: '#DAC8B2',
        },
        gold: {
          soft: '#D4AD74',
          DEFAULT: '#C79A5C',
          deep: '#A77943',
        },
        graphite: {
          DEFAULT: '#292724',
          light: '#3C3935',
          dark: '#1C1B18',
        },
        secondary: '#696560',
        border: {
          DEFAULT: '#E5DED6',
          light: '#EFEAE3',
          dark: '#D5CBC0',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(41, 39, 36, 0.03), 0 12px 28px rgba(41, 39, 36, 0.04)',
        'card': '0 4px 20px rgba(41, 39, 36, 0.04), 0 20px 40px rgba(41, 39, 36, 0.05)',
        'gold-glow': '0 0 25px rgba(212, 173, 116, 0.18)',
        'btn': '0 4px 14px rgba(41, 39, 36, 0.12)',
      },
      letterSpacing: {
        'widest-editorial': '0.18em',
        'wide-editorial': '0.12em',
        'tight-editorial': '-0.025em',
      },
      maxWidth: {
        'page': '1240px',
      },
    },
  },
  plugins: [],
}
