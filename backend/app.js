const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const functionRoutes = require('./routes/MIfunction');
const adminRoutes = require('./routes/admin');

const app = express(); 
//webcube
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/function', functionRoutes);
app.use('/api/admin', adminRoutes);

// const mysql = require('mysql2/promise');
// const config = require('./config/db_config');


module.exports = app;
