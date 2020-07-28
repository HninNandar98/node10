var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var apiUsersRouter = require('./api/routes/users');
var apiAdminsRouter = require('./api/routes/admins');
var apiPostsRouter = require('./api/routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret:"A&B01",
    resave:false,
    saveUninitialized:true,
  })
);

mongoose.connect('mongodb+srv://hninwai98:hnin1998@node10.e16mf.mongodb.net/node10db?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoseDB connection error:'));

app.use('/api/posts',apiPostsRouter);
app.use('/api/users',apiUsersRouter);
app.use('/api/',apiAdminsRouter);
app.use('/', indexRouter);
app.use(function(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.redirect("/signin");
  }
})
app.use('/users',usersRouter);
app.use('/posts',postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
