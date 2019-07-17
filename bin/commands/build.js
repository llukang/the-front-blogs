const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const chalk = require('chalk');
const webpackConfig = require('../webpack/webpack.config.prod.js');

const buildSite = (options) => {
  if (options && options.analyze) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: 8100,
    }));
  }

  webpack(webpackConfig).run((err, stats) => {
    if (err || stats.hasErrors()) {
      if (err) { console.log(err); }

      if (stats.hasErrors()) { console.log(stats.toJson('minimal').errors); }

      if (stats.hasWarnings()) { console.log(stats.toJson('minimal').warnings); }
    } else {
      console.log(chalk.green('build successful!'));
    }
  });
};

module.exports = buildSite;
