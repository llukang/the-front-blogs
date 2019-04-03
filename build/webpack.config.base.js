const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
  entry: {
    index: './site/index.js',
  },
  optimization: {
    // 包清单
    runtimeChunk: {
      name: 'manifest'
    },
    // 拆分公共包
    splitChunks: {
      cacheGroups: {
        // 第三方组件
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/font/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    modules: ['site', 'node_modules'],
    alias: {
      routes: path.resolve(__dirname, '../site/routes'),
      pages: path.resolve(__dirname, '../site/pages'),
      components: path.resolve(__dirname, '../site/components'),
      configs: path.resolve(__dirname, '../site/configs'),
      utils: path.resolve(__dirname, '../site/utils')
    }
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: 'docs/**/*.md' },
        { from: 'docs/**/*.+(png|jpg|jpg)', to: 'images/[name].[ext]' },
        { from: 'config.toml' }
      ],
      {}
    ),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ]
};

module.exports = webpackConfig;
