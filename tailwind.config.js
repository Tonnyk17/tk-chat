/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {      
        "w-p": {"max": '479px'},
        "w-t": {"min": '480px', "max": "1023px"},
        "w-d": {"min": '1024px'},
      },
      height: {
        "9/10": "90%",
        "1/10": "10%",
      },
      width: {
        "9/10": "90%",
        "1/10": "10%",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        "1/2": "50%",
        "40": "10rem"
      },
      fontSize: {

      }
    },
  },
  plugins: [],
}
