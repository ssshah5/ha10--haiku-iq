'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const exphbs = require('express-handlebars');

const path = require('path');

const appEnv = require('./lib/env');

const wordsAPI = require('./lib/wordsAPI');
const definitionAPI = require('./lib/definitionAPI');

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();

// Create `ExpressHandlebars` instance with a default layout.
const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
});

app.engine('handlebars', hbs.engine);
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
  res.write(JSON.stringify(wordsAPI.getWords()));
  res.end();
});


app.get('/words/:theme', (req, res) => {
  const list = wordsAPI.getThemedList(req.params.theme);

  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(list));
  res.end();
});

app.get('/themes', (req, res) => {
  const list = wordsAPI.getThemeList();

  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(list));
  res.end();
});

app.get('/theme', (req, res) => {
  const themeObj = wordsAPI.getSingleTheme();

  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(themeObj));
  res.end();
});

app.get('/theme/:requestedTheme', (req, res) => {
  const themeObj = wordsAPI.getSingleTheme(req.params.requestedTheme);

  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(themeObj));
  res.end();
});

app.get('/definition/:word', (req, res) => {
  definitionAPI.getDefinition(req, res, req.params.word);
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
