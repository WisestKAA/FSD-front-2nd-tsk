module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:fsd/all',
    'airbnb-base/legacy'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  plugins: [
    'fsd'
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^[A-Za-z]{1,20}Mock$' }]
  }
};
