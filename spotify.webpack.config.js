module.exports = {
  entry: ['index.js'],
  target: 'web',
  mode: 'production',
  output: {
    path: `${process.cwd()}/dist`,
    filename: 'spotify-custom.js',
    libraryTarget: 'umd',
  },
  externals: [],
};
