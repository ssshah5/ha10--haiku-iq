'use strict';

const http = require('http');

const dictionary = 'lasde';  // Longman Active Study Dictionary
const errorString = 'Error connecting to definition API';

// return an array of word objects
const getDefinition = (req, response, word) => {
  const url = `http://api.pearson.com/v2/dictionaries/${dictionary}/entries?headword=${word}&limit=1`;
  http.get(url, (res) => {
    res.on('data', (d) => {
      // callback(JSON.parse(d));
      const obj = JSON.parse(d);
      let defString = 'Unable to find a definition';
      try {
        defString = obj.results[0].senses[0].definition[0];
      }
      catch (e) {
        // do nothing
      }
      const outputObj = {};
      outputObj[word] = defString;

      response.writeHead(200, {
        'content-type': 'application/json',
      });
      response.write(JSON.stringify(outputObj));
      response.end();
    });
    res.on('error', () => {
      response.writeHead(404, {
        'content-type': 'application/text',
      });
      response.write(JSON.stringify({ error: errorString }));
      response.end();
    });
  }).on('error', () => {
    response.writeHead(404, {
      'content-type': 'application/json',
    });
    response.write(JSON.stringify({ error: errorString }));
    response.end();
  });
};

module.exports.getDefinition = getDefinition;
