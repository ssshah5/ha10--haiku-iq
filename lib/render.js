'use strict';

var fs = require('fs');

module.exports = function (path, options, cb) {
  fs.readFile(path, function (err, content) {
    var rendered;

    if (err) {
      return cb(new Error(err));
    }

    rendered = content.toString();

    return cb(null, rendered);
  });
}
