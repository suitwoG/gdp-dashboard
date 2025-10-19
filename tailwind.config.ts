import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        floating: '0 20px 45px -20px rgba(15, 23, 42, 0.35)'
      },
      borderRadius: {
        xl3: '1.75rem'
      }
    }
  },
  plugins: []
};

export default config;
