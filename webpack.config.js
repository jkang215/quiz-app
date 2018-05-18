const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  devServer: { publicPath: '/', contentBase: './views', hot: true, port: 8080 },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'client/'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
