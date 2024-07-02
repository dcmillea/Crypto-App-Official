import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // 'coinCard': '20px 300px 100px 75px 75px 75px 100px 100px 100px',
        'coinCard': '1% 17% 8% 5% 5% 5% 14% 14% 14%',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-purple': "#1E1932",
        'main-dark-purple': "#13121A",
        'grey-nav-text': "#D1D1D1",
        'light-grey-chart-text': '#B9B9BA',
        'bright-puprle': '#7c7cf2',
        'light-purple': "#6161D650",
        'light-purple-full': '#6161D6',
        'light-purple-text': '#353570',
        'text-currency-grey': '#42428680',
        'text-currency-grey-muted': '#42428640',
        'text-currency-grey-full': '#424286',
        'text-currency-muted-white': '#FFFFFF80',
        'dark-blue-chart-bg': '#191932',
        'white-muted-50': '#FFFFFF50',
        'darker-white-full': '#CCCCFA',
        'darker-white-40': '#CCCCFA40',
        'purple-muted': '#191925',
        'purple-muted-90': '#19192590',
        'boring-purple': '#232336',
        'bright-purple-border': '#7878FA',
        'bright-purple-border-trans': '#7878FA00',
        'dark-white-background': "#FFFFFF40",
        'grey-date-text': '#9E9E9E',
        'white-muted': '#F3F5F9',
        'crypto-red': "#FE2264",
        'crypto-red-trans': "#FE226450",
        'crypto-green': "#01F1E3",
        'crypto-green-trans': "#01F1E350",
        'crypto-green-2': '#00B1A7',
        'btc-orange': '#F7931A',
        'eth-blue': '#627EEA',
        'date-selection-grey': '#A7A7CC',
        'date-selection-white': '#E4E4F0',
        'date-selection-black': '#181825',
      },
      borderWidth: {
        'border-small': '0.5px'
      },
      boxShadow: {
        'on-top': '0px 0px #FFFFFF50 '
      },
      dropShadow: {
        'md-select': '0px 0px 20px 8px #6161D6',
        'purp-glow': '0 0 10px 0 rgba(128, 0, 128, 0.5)',
      },
      fontFamily: {
        body: ["Space+Grotesk"]
      },
      animation: {  
        dropDownIn: 'dropDownMenu 0.3s ease-in-out forwards',
        dropDownOut: 'dropDownMenu 0.3s ease-in-out reverse',
      },
      keyframes: {
        dropDownMenu: {
          // '0%, 100%': { transform: 'translateY(0px)' },
          // '50%': { transform: 'translateY(20px)' },
          'from': {transform: 'scale(0) translateY(-175px)', opacity: '0'},
          'to': {transform: 'scale(1) translateY(0px)', opacity: '1'},
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
