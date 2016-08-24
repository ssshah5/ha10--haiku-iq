'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');

const path = require('path');

const appEnv = require('./lib/env');
const renderer = require('./lib/render');

const mock_words = require('./mocks/words.json');

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

app.get('/words', (req, res) => {
  res.writeHead(200, {
    'content-type' : 'application/json',
  });
  res.write(JSON.stringify(mock_words));
  res.end();  
});



//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, () => {
  // Mean to console.log out, so disabling
  console.log(`Server starting on ${appEnv.url}`); // eslint-disable-line no-console
});
