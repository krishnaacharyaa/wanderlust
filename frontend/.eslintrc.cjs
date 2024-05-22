module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'airbnb-base',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules/'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@typescript-eslint', 
    'import', 
  ],
  parserOptions: {
    project: './tsconfig.json', // Point to your tsconfig.json file
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

  },
};
