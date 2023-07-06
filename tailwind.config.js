/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '25': '7.25rem',
        '50': '12.5rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
      }
    },
  },
  plugins: [],
}
