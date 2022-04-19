module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern: /(bg|text|border)-.+-.+/,
            variants: ['hover'],
        },
    ],
}
