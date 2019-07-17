const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev.js');

const startServer = () => {
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(
    compiler,
    webpackConfig.devServer
  ).listen(webpackConfig.devServer.port, '127.0.0.1', () => {
    console.log(
      `Listening at http://127.0.0.1:${webpackConfig.devServer.port}`
    );
  });
  return devServer;
};

module.exports = startServer;
