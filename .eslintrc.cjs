
// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'key-spacing': ['error', { 'beforeColon': false }],
    'block-spacing': 'error',
    'arrow-spacing': 'error',
    'one-var-declaration-per-line': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'curly': 'error',
    'brace-style': ['error', '1tbs'],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-nested-ternary': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true } ],
    'padded-blocks': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^_' }],
    'quotes': ['error', 'single'],
    'semi': 'off',
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': ['error'],
    'space-infix-ops': ['error'],
    '@typescript-eslint/semi': 'error',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/space-infix-ops': ['error'],
    '@typescript-eslint/prefer-enum-initializers': ['error'],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/space-before-blocks': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/no-var-requires': ['off'],
  },
  overrides: [
    {
      files: '**/*.d.ts',
      rules: {
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
};