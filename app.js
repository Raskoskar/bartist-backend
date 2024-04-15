require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("./config/connection")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');
var artistsRouter = require('./routes/artistRoute');
var venuesRouter = require('./routes/venueRoute');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes générales, renvoies vers des fichiers routes spécifiques
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/venues', venuesRouter);


module.exports = app;