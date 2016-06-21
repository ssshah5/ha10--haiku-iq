'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var express = require('express'),
    path = require('path');

var appEnv = require('./lib/env'),
    renderer = require('./lib/render');

//////////////////////////////
// App Variables
//////////////////////////////
var app = express();

app.engine('html', renderer);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, function () {
  console.log('Server starting on ' + appEnv.url);
});
