import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-purple': "#1E1932",
        'main-dark-purple': "#13121A",
        'grey-nav-text': "#D1D1D1",
        'light-purple': "#6161D650",
        'light-purple-text': '#353570',
        'text-currency-grey': '#42428680',
        'text-currency-muted-white': '#FFFFFF80',
        'white-muted-50': '#FFFFFF50',
        'darker-white-full': '#CCCCFA',
        'darker-white-40': '#CCCCFA40',
        'purple-muted': '#191925',
        'dark-white-background': "#FFFFFF40",
        'white-muted': '#F3F5F9',
        'crypto-red': "#FE2264",
        'crypto-green': "#01F1E3",
      },
      borderWidth: {
        'border-small': '0.5px'
      },
      boxShadow: {
        'on-top': '0px 0px #FFFFFF50 '
      },
      fontFamily: {
        body: ["Space+Grotesk"]
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
