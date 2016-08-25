'use strict';

var http = require('http');

//http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=goat
//http://www.dictionaryapi.com/api/v1/references/sd2/xml/test?key=8be4f8a1-d0d9-4808-83be-34bba9ea4708
//const mwKey = "8be4f8a1-d0d9-4808-83be-34bba9ea4708";

// return an array of word objects
const getDefinition = (response, req, word) => {

  // return http.get({
  //   host: 'api.pearson.com',
  //   path: '/v2/dictionaries/wordwise/entries?headword=goat'
  // }, 
  // function(response) {
  //   // Continuously update stream with data
  //   var body = '';
  //   response.on('data', function(d) {
  //       body += d;
  //   });
  //   response.on('end', function() {
  //     var parsed = JSON.parse(body);
  //     console.log(parsed);
      
  //     response.writeHead(200, {
  //       'content-type': 'application/json',
  //     });
  //     response.write(parsed);
  //     response.end();
  //   });
  // });

  return word + " definition";
};

module.exports = {
  getDefinition: getDefinition
}


    // res.writeHead(200, {
    //   'content-type': 'application/json',
    // });
    // // res.write(JSON.stringify(definition));
    // res.end();