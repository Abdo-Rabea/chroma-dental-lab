module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-no-target-blank': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  },
  plugins: ['prettier']
}
