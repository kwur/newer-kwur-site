/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      // header: ['"FuzzySlippers"', 'monospace'],
      subtitle: ['"Subtitle"', 'monospace'],
      other: ['"Try"', 'monospace'],
      // subtitle: ["devils-haircut", "sans-serif"],
      mono: ['"Kode Mono"', 'monospace'],
      header: ["burnaby-stencil", 'sans-serif'],
    },
    letterSpacing: {
      mostwide: "0.4em"
    },
    extend: {
      backgroundImage: {
        "logoblack": "url('../public/kwurblack.svg');",
        "logored": "url('../public/kwurred.svg');",
        "show": "url('../public/show_password.svg');",
        "hide": "url('../public/hide_password.svg');",
        "more": "url('../public/show-more.svg');",
        "less": "url('../public/show-less.svg');"
      },
      fontSize: {
        "bigasfuck": "10rem;"
      },
      colors: {
        "background": "#f0f0f0;"
      },
      gridTemplateRows: {
        "24": "repeat(25, minmax(0, 1fr))"
      }
    },
  },
  plugins: [],
}

