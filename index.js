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

const generateRandomNumber = (maxNumber) => {
  const number = Math.floor(Math.random() * maxNumber);

  return number;
};

app.get('/', (req, res) => {
  res.render('home',
    { theme: 'myAwesomeTheme' }
  );
});

const getWords = () => {
  const themedNumber = 5;
  const notThemedNumber = 15;
  const themedValues = mockWords.themed;
  const notThemedValues = mockWords.notThemed;
  const returnArray = [];


  for (let i = 0; i < themedNumber; i++) {
    const index = generateRandomNumber(themedValues.length);
    returnArray.push(themedValues[index]);
  }

  for (let i = 0; i < notThemedNumber; i++) {
    const index = generateRandomNumber(notThemedValues.length);
    returnArray.push(notThemedValues[index]);
  }

  return returnArray;
};

app.get('/words', (req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(getWords()));
  res.end();
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
