'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');

const path = require('path');

const appEnv = require('./lib/env');
const renderer = require('./lib/render');

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();

app.engine('html', renderer);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

//Route for fetching words
app.get('/words', (req, res) => {
  res.send('Words are here');
});

//Route for fetching images
app.get('/image', (req, res) => {
  res.send('Image is here');
});


//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, () => {
  // Mean to console.log out, so disabling
  console.log(`Server starting on ${appEnv.url}`); // eslint-disable-line no-console
});
