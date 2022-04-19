const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: colors.emerald,
                content: colors.slate,
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
