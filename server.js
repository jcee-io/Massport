const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/dist'));
 
// ========================================
// HOW TO: PRODUCTION FOR DEPLOYMENT
// COMMENT OUT THE MIDDLEWARE AND SIMPLY COMPILE
// TO SWITCH BACK TO DEV SIMPLY UNDO COMMENT OUT
// AND DELETE THE BUNDLE.JS FILE IN DIST FOLDER
// -Justin
// ========================================

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});