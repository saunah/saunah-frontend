const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: colors.orange,
                primary: colors.stone,
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /(bg|text|border)-.+-.+/,
            variants: ['hover'],
        },
    ],
}
