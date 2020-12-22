module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': ['rn-calendar-component'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  extends: ['satya164', 'plugin:react-native/all'],

  rules: {
    'babel/no-unused-expressions': 'off',
    'flowtype/no-types-missing-file-annotation': 'off',
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'no-undef': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-native/no-color-literals': 'off',
    'react/jsx-sort-props': ['error'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
        readonly: 'generic',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        parser: 'typescript',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
  },
};
