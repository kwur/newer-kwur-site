/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      header: ['"Kode Mono"', 'monospace']
    },
    extend: {
      backgroundImage: {
        "logoblack": "url('../public/kwurblack.svg');",
        "logored": "url('../public/kwurred.svg');"
      }
    },
  },
  plugins: [],
}

