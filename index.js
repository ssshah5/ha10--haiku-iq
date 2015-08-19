'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var express = require('express'),
    cfenv = require('cfenv'),
    // watson = require('watson-developer-cloud'),
    path = require('path');

//////////////////////////////
// App Variables
//////////////////////////////
var app = express(),
    appEnv = cfenv.getAppEnv();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello</title></head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="css/style.css" /><body><h1>Welcome to Hack Academy</h1><p><img src="images/bee.svg" alt="IBM Bee" /></p><script src="js/app.js"></script></body></html>');
});

//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, function () {
  console.log('Server starting on ' + appEnv.url);
});
