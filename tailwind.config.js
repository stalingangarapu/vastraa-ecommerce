/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#7B1E3A',
          dark: '#591328',
          deep: '#420D1D',
          light: '#9C2A4D',
          glow: '#B5335D',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#AA7C11',
          light: '#F3E5AB',
          accent: '#E5C158',
          metallic: '#C5A028',
        },
        ivory: {
          DEFAULT: '#FFF9F2',
          soft: '#FAF4EC',
          warm: '#F5EBE0',
          dark: '#EBE0D2',
        },
        charcoal: {
          DEFAULT: '#2B2020',
          muted: '#5A4A4A',
          light: '#8C7A7A',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA7C11 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #7B1E3A 0%, #591328 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 249, 242, 0.85) 0%, rgba(250, 244, 236, 0.65) 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(43, 32, 32, 0.9) 0%, rgba(26, 18, 18, 0.95) 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'burgundy': '0 10px 30px -5px rgba(123, 30, 58, 0.3)',
        'glass': '0 8px 32px 0 rgba(123, 30, 58, 0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
