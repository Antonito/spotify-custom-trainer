module.exports = {
  entry: ['./src/index.js'],
  target: 'web',
  mode: 'production',
  output: {
    path: `${process.cwd()}/dist`,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  externals: [],
};

