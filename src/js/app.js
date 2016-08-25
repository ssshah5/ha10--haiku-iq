(function app() {
  'use strict';

  var infoBox = document.getElementById('info-popup'),
      infoButton = document.getElementById('info'),
      closeButton = document.getElementById('close');

  infoButton.onclick = () => {
    infoBox.style.display = 'block';
  };

  closeButton.onclick = () => {
    infoBox.style.display = 'none';
  };

  window.addEventListener('DOMContentLoaded', function appDCL() {
    var generateTable, getWordsAPI, dictionaryButton = document.getElementById('dictionary');

    // Mean to console.log out, so disabling
    console.log('Hello World'); // eslint-disable-line no-console

    getWordsAPI = function getWordsAPIFunc() {
      var wordList = [
        {
          'word': 'hat',
          'syllableCount': 1,
        },
        {
          'word': 'cat',
          'syllableCount': 1,
        },
        {
          'word': 'sat',
          'syllableCount': 1,
        },
        {
          'word': 'kitten',
          'syllableCount': 1,
        },
        {
          'word': 'flowers',
          'syllableCount': 1,
        },
        {
          'word': 'spring',
          'syllableCount': 1,
        },
        {
          'word': 'winter',
          'syllableCount': 1,
        },
        {
          'word': 'cat',
          'syllableCount': 1,
        },
        {
          'word': 'sat',
          'syllableCount': 1,
        },
        {
          'word': 'sat',
          'syllableCount': 1,
        },
        {
          'word': 'hat',
          'syllableCount': 1,
        },
        {
          'word': 'cat',
          'syllableCount': 1,
        },
        {
          'word': 'sat',
          'syllableCount': 1,
        },
        {
          'word': 'kitten',
          'syllableCount': 1,
        },
        {
          'word': 'flowers',
          'syllableCount': 1,
        },
        {
          'word': 'spring',
          'syllableCount': 1,
        },
        {
          'word': 'winter',
          'syllableCount': 1,
        },
        {
          'word': 'cat',
          'syllableCount': 1,
        },
        {
          'word': 'sat',
          'syllableCount': 1,
        },
        {
          'word': 'sat',
          'syllableCount': 1,
        },

      ];

      return wordList;
    };

    generateTable = function generateTableFunc() {
      var rowNum = 4, columnNum = 5, body, tbl, tblBody, row, cell, i, j, apiWords, wordButton;

      apiWords = getWordsAPI();

      body = document.getElementsByTagName('body')[0];

      // creates a <table> element and a <tbody> element
      tbl = document.createElement('table');
      tblBody = document.createElement('tbody');

      // creating all cells
      for (i = 0; i < rowNum; i++) {
        // creates a table row
        row = document.createElement('tr');

        for (j = 0; j < columnNum; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          cell = document.createElement('td');

          wordButton = document.createElement('button');
          wordButton.innerHTML = apiWords[i * rowNum + j].word;
          cell.id = '' + i + j;
          cell.appendChild(wordButton);
          row.appendChild(cell);
        }

      // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);

      // appends <table> into <body>
      body.appendChild(tbl);
    };

    // Add event listeners
    dictionaryButton.addEventListener('click', generateTable);
  });
}());
