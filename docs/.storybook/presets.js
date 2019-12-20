const path = require('path');

module.exports = [
  {
    name: '@storybook/preset-typescript',
    options: {
      tsLoaderOptions: {
        configFile: path.resolve(__dirname, '../../tsconfig.json'),
      },
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, '../../tsconfig.json'),
      },
    },
  },
  {
    name: '@storybook/addon-docs/preset',
    options: {
      configureJSX: true,
      babelOptions: {},
      sourceLoaderOptions: null,
    },
  },
];
