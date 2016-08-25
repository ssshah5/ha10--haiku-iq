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
  res.write(JSON.stringify(getWords()));
  res.end();
});

app.get('/image', (req, res) => {
  res.send('Image is here');
});

function getWords(){
    var themedNumber = 5;
    var notThemedNumber = 15;

    var themedValues = mockWords.themed;
    var notThemedValues = mockWords.notThemed;

    var returnArray = [];


    for (var i=0; i<themedNumber; i++){
        var index = generateRandomNumber(themedValues.length);
        returnArray.push(themedValues[index]);
    }

        for (var i=0; i<notThemedNumber; i++){
        var index = generateRandomNumber(notThemedValues.length);
        returnArray.push(notThemedValues[index]);
    }
    return returnArray;
}

function generateRandomNumber(max_number){
    var number = Math.floor(Math.random() * max_number);
    return number;
}

//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, () => {
  // Mean to console.log out, so disabling
  console.log(`Server starting on ${appEnv.url}`); // eslint-disable-line no-console
});
