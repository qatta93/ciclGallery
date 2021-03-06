const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  
  mode: 'development',

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public"},
      ],
    }),
    new Dotenv(),
    new webpack.EnvironmentPlugin(['ACCESS_KEY']),
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
