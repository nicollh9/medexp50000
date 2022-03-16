var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var whiteList = (process.env.CORS_ORIGIN || '').split(',');
console.log('whiteList', whiteList);
var corsOptions = {
    origin: (origin, callback) =>{
        console.log('Origin Value:', origin);
        if(whiteList.indexOf(origin) >= 0){
            callback(null,true);
        }else{
            callback(new Error('CORS  not allowed'));
        }
    }
}

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api/api');
const { callbackify } = require('util');

var app = express();

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;