var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("./config/connection")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');
const cors = require('cors');
app.use(cors());
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes générales, renvoies vers des fichiers routes spécifiques
app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;