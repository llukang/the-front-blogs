const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const PORT = 8030;
const outputPath = path.resolve(__dirname, '../dist');

const webpackConfig = merge(baseConfig, {
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    // 关闭输出信息
    // quiet: true,
    // 每次构建时候自动打开浏览器并访问网址
    // open: true,
    // 开启热更新
    stats: 'errors-only',
    hot: true,
    // 设置端口号
    port: PORT,
    historyApiFallback: true,
  }
});

module.exports = webpackConfig;
