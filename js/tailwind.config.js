tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0F291E',
          light: '#183D2D',
          dark: '#091912',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFC286',
          dark: '#9E7B36',
          muted: 'rgba(197, 160, 89, 0.25)',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          warm: '#F3EFE6',
          paper: '#FFFFFF',
        },
        charcoal: '#1C2420',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
};
