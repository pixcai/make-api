module.exports = {
  entry: './make-api.js',
  output: {
    filename: 'index.js',
    path: __dirname,
    library: 'API',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: ['axios'],
};
