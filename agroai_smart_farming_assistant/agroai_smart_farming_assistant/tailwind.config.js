module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5e3023", // rich-soil-brown
          50: "#faf8f6", // soil-brown-50
          100: "#f0e8e3", // soil-brown-100
          200: "#dcc8bc", // soil-brown-200
          300: "#c8a895", // soil-brown-300
          400: "#b4886e", // soil-brown-400
          500: "#a06847", // soil-brown-500
          600: "#8c4820", // soil-brown-600
          700: "#5e3023", // soil-brown-700
          800: "#4a261c", // soil-brown-800
          900: "#361c15", // soil-brown-900
        },
        secondary: {
          DEFAULT: "#bc6c25", // harvest-amber
          50: "#fef9f3", // amber-50
          100: "#fdf2e7", // amber-100
          200: "#fae5cf", // amber-200
          300: "#f7d8b7", // amber-300
          400: "#f4cb9f", // amber-400
          500: "#f1be87", // amber-500
          600: "#ee9c56", // amber-600
          700: "#bc6c25", // amber-700
          800: "#96561e", // amber-800
          900: "#704017", // amber-900
        },
        accent: {
          DEFAULT: "#8b4513", // terracotta
          50: "#faf7f4", // terracotta-50
          100: "#f5efe9", // terracotta-100
          200: "#ebdfd3", // terracotta-200
          300: "#e1cfbd", // terracotta-300
          400: "#d7bfa7", // terracotta-400
          500: "#cdaf91", // terracotta-500
          600: "#b8956a", // terracotta-600
          700: "#8b4513", // terracotta-700
          800: "#6f370f", // terracotta-800
          900: "#53290b", // terracotta-900
        },
        background: "#f3efe5", // cream-background
        surface: "#ffffff", // pure-white
        text: {
          primary: "#2d1810", // deep-brown-black
          secondary: "#6b4423", // medium-brown
        },
        success: {
          DEFAULT: "#4a7c59", // natural-green
          50: "#f3f8f5", // green-50
          100: "#e7f1ea", // green-100
          200: "#cfe3d5", // green-200
          300: "#b7d5c0", // green-300
          400: "#9fc7ab", // green-400
          500: "#87b996", // green-500
          600: "#6f9d81", // green-600
          700: "#4a7c59", // green-700
          800: "#3c6347", // green-800
          900: "#2e4a35", // green-900
        },
        warning: {
          DEFAULT: "#d4851f", // golden-amber
          50: "#fef8f1", // warning-50
          100: "#fdf1e3", // warning-100
          200: "#fbe3c7", // warning-200
          300: "#f9d5ab", // warning-300
          400: "#f7c78f", // warning-400
          500: "#f5b973", // warning-500
          600: "#e69d3b", // warning-600
          700: "#d4851f", // warning-700
          800: "#aa6a19", // warning-800
          900: "#805013", // warning-900
        },
        error: {
          DEFAULT: "#a0522d", // muted-rust
          50: "#faf6f4", // error-50
          100: "#f5ede9", // error-100
          200: "#ebdbd3", // error-200
          300: "#e1c9bd", // error-300
          400: "#d7b7a7", // error-400
          500: "#cda591", // error-500
          600: "#b8816a", // error-600
          700: "#a0522d", // error-700
          800: "#804224", // error-800
          900: "#60311b", // error-900
        },
        border: {
          DEFAULT: "#e5d5c8", // muted-earth-border
          light: "#f0e8e3", // light-earth-border
        },
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'], // headings
        inter: ['Inter', 'sans-serif'], // body
        source: ['Source Sans Pro', 'sans-serif'], // captions
        mono: ['JetBrains Mono', 'monospace'], // data
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(94, 48, 35, 0.1)',
        'medium': '0 4px 12px rgba(94, 48, 35, 0.15)',
        'strong': '0 8px 24px rgba(94, 48, 35, 0.2)',
      },
      borderRadius: {
        'card': '8px',
        'button': '4px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
    },
  },
  plugins: [],
}