/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        backup: "url('/src/app/assets/backup.jpg')",
        backup1:"url('/src/app/assets/backup1.png')",
        login:"url('/src/app/assets/login.png')",
       
      },
      boxShadow:{
          overlay:"inset 0 0 0 1000px rgba(0, 0, 0, 0.39)"
        },
      backgroundColor:{
        red1:"red"
      },
      fontFamily: {
        'avenir-medium': ['Avenir-Medium', 'sans-serif'],
        'avenir-black':['Avenir-Black','sans-serif'],
      },
      colors:{
        dfyellow: '#F69220',
        dfblue:'#092264'

      },
      fontSize:{
        mFontSize:"25px",
        dFontSize:"60px",
        mSFontSize:"24px",
        mSParaGraph:"13px",
        msButton :"12px",
        mHeadingLarge:"29px",
        mHeadingSmall :"12px",
        mHeadingMedium:"22px",
        
        
      }
    },
  },
  plugins: [],
};
