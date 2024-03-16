
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '128': '86rem',
        '15': '3.8rem',
      },
     
      height: {
        '128': '35rem',
        '120': '28rem',
        '84':'26rem',
      },
      margin: {
        '1px':'1px',
        '3px':'3px',
        '98px':'26rem',
        '99px': '490px',
        '100px': '390px',
      },
      spacing: {
        '120px': '120px',
        '98px': '98px',
      },
      padding: {
        '3px': '3px',
      },
      backgroundImage: {
        'music': "url('image.jpeg')",
      
      },
      colors: {
        'blues': '#6AB187',
        'pink':'#b340d6',
        'grays':'#6B7280',
        'light-white':'rgba(255,255,255,0.50)'
      },
     
    },
    // screens: {
    //   'mobile': '640px',
    //   // => @media (min-width: 640px) { ... }
    //   'tablet':'768',
    //     // => @media (min-width: 640px) { ... }
    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }
    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
  },
  plugins: [],
}

