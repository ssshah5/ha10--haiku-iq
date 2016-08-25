'use strict';

const http = require('http');

// return an array of word objects
const getDefinition = (req, response, word) => {
  const url = `http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=${word}&limit=1`;

  http.get(url, (res) => {
    res.on('data', (d) => {
      // callback(JSON.parse(d));
      const obj = JSON.parse(d);
      const defString = obj.results[0].senses[0].definition;

      const outputObj = {};
      outputObj[word] = defString;

      response.writeHead(200, {
        'content-type': 'application/json',
      });
      response.write(JSON.stringify(outputObj));
      response.end();
    });
    res.on('error', (e) => {
      response.writeHead(404, {
        'content-type': 'application/text',
      });
      response.write(e.toString());
      response.end();
    });
  });
};

module.exports.getDefinition = getDefinition;
