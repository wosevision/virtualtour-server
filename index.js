const express = require('express');
const http = require('http');
const io = require('socket.io')(http);

// const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const env = require('node-env-file');

// init app
const app = express();
// our routes will be contained in api/index.js
const api = require('./api');
const socket = require('./socket');

io.on('connection', socket);

// ENABLE ALL CORS (all domains)
//app.use(cors());

// PREFLIGHT COMPLEX REQUESTS (specific domain)
// app.options('/location/:id', cors());
// app.del('/products/:id', cors(), function(req, res, next){
//   res.json({msg: 'This is CORS-enabled for all origins!'});
// });

// ENABLE ALL CORS (all domains)
// app.get('/location/:id', cors({origin: 'http://uoit.ca'}), function(req, res, next){
//   res.json({msg: 'This is CORS-enabled for only example.com.'});
// });

// if in development mode, load .env variables
if (app.get("env") === "development") {
    env(__dirname + '/.env');
}

// connect to database
app.db = mongoose.connect(process.env.MONGOLAB_URI);

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, '../build'));
app.set('view engine', 'html');
app.set('layout','layout');

// view engine setup - this app uses Hogan-Express
// https://github.com/vol4ok/hogan-express
app.engine('html', require('hogan-express'));;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../', 'favicon.ico')));
app.use(logger('dev'));

app.use('/api', api); // API ROUTES
//app.use('/panoramas', express.static(path.join(__dirname, '../build/images/panoramas'))); // PANO SERVE
// app.use('/panoramas', panoramas);
app.use(express.static(path.join(__dirname, '../build'))); // DEFAULT RENDER

// app.get('*', function(req, res) {
//   res.render('../build');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.all(/.*\.(js|css|js\.map)$/i, function(req, res, next){
  res.status(404).send('Not Found');
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});

module.exports = app;
