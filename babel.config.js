const alias = require('./alias');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          // EcmaScript proposals, default is false
          proposals: false,
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias,
        extensions: ['.js', '.jsx'],
      },
    ],
  ],
};
