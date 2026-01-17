/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bhagwa: {
          50: '#fff5f0',
          100: '#ffe6d9',
          200: '#ffc9a8',
          300: '#ffab77',
          400: '#ff8d46',
          500: '#FF6F00', // Main Bhagwa/Saffron
          600: '#e66300',
          700: '#cc5700',
          800: '#b34b00',
          900: '#993f00',
        },
        om: {
          light: '#FFF8E1',
          DEFAULT: '#FFD54F',
          dark: '#FFA000',
        }
      },
      fontFamily: {
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
        sanskrit: ['Noto Serif Devanagari', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FF6F00, 0 0 10px #FF6F00' },
          '100%': { boxShadow: '0 0 20px #FF6F00, 0 0 30px #FF6F00' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'om-pattern': "url('/assets/om-pattern.svg')",
      }
    },
  },
  plugins: [],
}
