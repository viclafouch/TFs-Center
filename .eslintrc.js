module.exports = {
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/prop-types': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'warn'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    chrome: true,
    browser: true
  }
}
