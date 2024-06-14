import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '450px',
        md: '680px',
        lg: '920px',
        xl: '1200px',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        1: '1px',
        0.3: '0.3px',
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.2)',
        neutral: {
          100: '#f7f7f5',
        },
        primary: {
          300: '#4B96FF',
          400: '#2D49DE',

          500: '#00178F',
        },
        secondary: {
          100: '#FEE5E1',
          200: '#FAD8D7',
          300: '#FFA2B6',
          400: '#FF708C',
        },
        dark: {},
        accent: {
          100: '',
          300: '',
          500: '',
        },
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out',
        'fade-out': 'fade-out 300ms ease-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
