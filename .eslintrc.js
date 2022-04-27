module.exports = {
    extends: ['react-app', 'react-app/jest', 'prettier'],
    ignorePatterns: ['build'],
    rules: {
        'react-hooks/exhaustive-deps': 'off',
        'testing-library/no-node-access': 'off',
    },
}
