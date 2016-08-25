'use strict';

// const http = require('http');

// http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=goat
// http://www.dictionaryapi.com/api/v1/references/sd2/xml/test?key=8be4f8a1-d0d9-4808-83be-34bba9ea4708
// const mwKey = "8be4f8a1-d0d9-4808-83be-34bba9ea4708";
// return an array of word objects

const getDefinition = (response, req, word) => {
  return word;
};

module.exports.getDefinition = getDefinition;
