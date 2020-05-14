module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'rn-calendar': '../src/index',
          },
        },
      ],
    ],
  };
};
