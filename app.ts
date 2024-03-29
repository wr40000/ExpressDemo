var createError = require('http-errors');
var express = require('express');
var cors = require('cors'); // 导入 cors 模块
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.ts');
var usersRouter = require('./routes/users.ts');
var imgRouter = require('./routes/images.ts');
var sqlRouter = require('./routes/mysql.ts');
var visRouter = require('./routes/vis.ts');
var terrariaRouter = require('./routes/terraria.ts');
var noteRouter = require("./routes/note.ts");

var app = express();
// 使用 cors 中间件
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/images', imgRouter);
app.use('/mysql', sqlRouter);
app.use('/vis', visRouter);
app.use('/terraria', terrariaRouter);
app.use("/notes", noteRouter);

app.use(express.static(path.join(__dirname, 'public')));
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

app.listen(3000, ()=>{
  console.log("3000端口监听中...");
})

module.exports = app;
