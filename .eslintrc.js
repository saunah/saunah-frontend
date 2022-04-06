module.exports = {
    extends: ['react-app', 'react-app/jest', 'prettier'],
    ignorePatterns: ['build'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
    },
}
