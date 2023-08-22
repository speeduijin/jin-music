/* eslint-env node */
module.exports = {
  ignorePatterns: ['.eslintrc.cjs', 'dist'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  root: true,
};
