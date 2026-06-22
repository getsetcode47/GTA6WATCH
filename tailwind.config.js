/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#030308',
        abyss: '#07070f',
        panel: '#0b0b16',
        neon: {
          cyan: '#00f0ff',
          pink: '#ff2d7b',
          amber: '#ffb800',
          violet: '#bf00ff',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        tech: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        scansweep: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-22px) translateX(14px)' },
          '66%': { transform: 'translateY(12px) translateX(-18px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.6' },
          '43%': { opacity: '1' },
          '78%': { opacity: '1' },
          '79%': { opacity: '0.4' },
          '80%': { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.8)' },
        },
        riseUp: {
          '0%': { transform: 'translateY(110vh) scale(0.6)', opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { transform: 'translateY(-12vh) scale(1.1)', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 5s linear infinite',
        grain: 'grain 8s steps(10) infinite',
        scansweep: 'scansweep 9s linear infinite',
        floaty: 'floaty 14s ease-in-out infinite',
        ticker: 'ticker 36s linear infinite',
        flicker: 'flicker 6s linear infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
