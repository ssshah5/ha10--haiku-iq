'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const exphbs = require('express-handlebars');

const path = require('path');

const appEnv = require('./lib/env');

const mockWords = require('./mocks/words.json');

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home',
    { theme: 'myAwesomeTheme' }
  );
});

app.get('/words', (req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(mockWords));
  res.end();
});

app.get('/words', (req, res) => {
  res.send('Words are here');
});

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
