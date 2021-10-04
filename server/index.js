const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-healthcaresystem',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

require('./models/Client'); 
require('./models/Mail'); 

const index = require('./routes/index');

// Express App Setup
const app = express();
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'thisisasecretkey',
  resave: false, 
  saveUninitialized: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 

app.listen(5000, err => {
  console.log('Listening');
});
