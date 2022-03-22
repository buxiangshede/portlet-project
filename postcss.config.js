const path = require('path');

module.exports = {
  plugins: [
    'postcss-import',
    [
      'postcss-preset-env',
      {
        features: {
          'nesting-rules': true,
        },
        importFrom: path.resolve(__dirname, 'src/vars.css'),
      },
    ],
    'cssnano',
  ],
};
