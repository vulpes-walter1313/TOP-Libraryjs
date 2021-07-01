const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { main } = require('envinfo');

let mode = 'development';

if (process.env.NODE_ENV == 'production') {
  mode = 'production';
}

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js/i,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
    hot: true
  }
}