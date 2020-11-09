module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'modules': false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        'absoluteRuntime': true,
        'corejs': 3,
        'version': '^7.7.7',
      },
    ],
  ],
};
