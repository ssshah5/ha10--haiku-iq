'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const exphbs = require('express-handlebars');

const path = require('path');

const appEnv = require('./lib/env');

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

//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, () => {
  // Mean to console.log out, so disabling
  console.log(`Server starting on ${appEnv.url}`); // eslint-disable-line no-console
});
