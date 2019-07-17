const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.config.base');

const outputPath = path.resolve('docs');

const webpackConfig = merge(baseConfig, {
  output: {
    path: outputPath,
    filename: '[name].[hash:8].js',
  },
  mode: 'production',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputPath], {
      root: process.cwd(),
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        autoprefixer: false
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
    }),
  ]
});


module.exports = webpackConfig;
