module.exports = {
  extends: 'satya164',
  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': ['rn-calendar'],
    'import/resolver': {
      node: {
        extensions: [
          '.android.js',
          '.android.ts',
          '.android.tsx',
          '.ios.js',
          '.ios.ts',
          '.ios.tsx',
          '.js',
          '.native.js',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  env: { browser: true, node: true },
};
