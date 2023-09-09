const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV } = require('../config/env');

const srcPath = resolve('public/src');

/** @type import('webpack').Configuration */
module.exports = {
  entry: {
    index: `${srcPath}/index.js`,
    game: `${srcPath}/playground.js`,
  },
  output: {
    filename: `${'production' === NODE_ENV ? '' : '[name].'}[contenthash:7].js`,
    publicPath: '/assets/',
    path: resolve('public/dist'),
    assetModuleFilename: `${'production' === NODE_ENV ? '' : '[name].'}[contenthash:7][ext]`,
  },
  module: {
    rules: [{
      test: /\.(s?[ac]ss|less|styl)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.(woff2?|ttf|eot|svg|png|ico|jpe?g)$/,
      type: 'asset/resource',
    },

    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: `${'production' === NODE_ENV ? '' : '[name].'}[contenthash:7].css` }),
  ],
};