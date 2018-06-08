const express = require('express');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const path = require('path');

const cookieSession = require('cookie-session');
const { session, mongodb } = require('./config/keys');
const passport = require('passport');
//const LocalStrategy = require('./passport/local');
const GoogleStrategy = require('./passport/google');
const FacebookStrategy = require('./passport/facebook');
const GithubStrategy = require('./passport/github');
const LocalStrategy = require('./passport/local');
const compiler = webpack(webpackConfig);

const mongoose = require('mongoose');


const app = express();

mongoose.connect(mongodb.dbURI, () => {
	console.log('connected to mongodb');
});


/*******************************************
**************** ROUTERS *******************
*******************************************/

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.static(__dirname + '/dist'));

app.use(cookieSession({
	maxAve: 24 * 60 * 60 * 1000,
	keys: [session.cookieKey]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

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
