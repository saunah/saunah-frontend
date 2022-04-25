const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
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
