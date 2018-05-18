const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const app = express();
const cookieSession = require('cookie-session');
const { session } = require('./config/keys');
const passport = require('passport');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/dist'));

app.use(cookieSession({
	maxAve: 24 * 60 * 60 * 1000,
	keys: [session.cookieKey]
}));

if(process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
