module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules/'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh', 
    '@stylistic/js'
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@stylistic/js/indent': [
      'error',
      2
    ],
  '@stylistic/js/linebreak-style': [
      'error',
      'unix'
    ],
  '@stylistic/js/quotes': [
      'error',
      'single'
    ],
  '@stylistic/js/semi': [
      'error',
      'never'
    ],
  },
};
