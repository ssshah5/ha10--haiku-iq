(function app() {
  'use strict';

  var infoBox = document.getElementById('info-popup'),
      infoButton = document.getElementById('info'),
      closeButton = document.getElementById('close'),
      wordTable = document.getElementById('word-table');

  infoButton.onclick = function () {
    infoBox.style.display = 'block';
  };

  closeButton.onclick = function () {
    infoBox.style.display = 'none';
  };

  window.addEventListener('DOMContentLoaded', function appDCL() {
    var generateTable, getWordsAPI, curLine, dictionaryButton = document.getElementById('dictionary');

    // Mean to console.log out, so disabling
    console.log('Hello World'); // eslint-disable-line no-console

    getWordsAPI = function getWordsAPIFunc() {
      var wordList = [
        {
          'word': 'squirrel',
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
          'word': 'butterfly',
          'syllableCount': 1,
        },
        {
          'word': 'complicated',
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
      var tableBody = document.getElementById('table-body'), rowNum = 4, columnNum = 5, tblBody, row, cell, i, j, apiWords, wordButton;

      if (tableBody) {
        tableBody.remove();

        return;
      }

      apiWords = getWordsAPI();

      tblBody = document.createElement('tbody');
      tblBody.id = 'table-body';

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
          wordButton.className = 'word-button';
          wordButton.innerHTML = apiWords[i * rowNum + j].word;
          wordButton.setAttribute('data-syl', apiWords[i * rowNum + j].syllableCount);

          cell.id = '' + i + j;
          cell.appendChild(wordButton);
          row.appendChild(cell);
        }

      // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      curLine = 1;

      wordTable.addEventListener('click', function (e) {
        var button, word, line, syl, sylAdd, totalSyl;

        if (e.target.type === 'submit') {
          button = e.target;
          word = button.innerHTML;
          line = document.getElementById('poemLine' + curLine);
          line.value = line.value + word + ' ';

          sylAdd = button.getAttribute('data-syl');
          syl = document.getElementById('syl' + curLine);
          syl.innerHTML = parseInt(syl.innerHTML, 10) + parseInt(sylAdd, 10);

          if (curLine === 1 || curLine === 3) {
            totalSyl = '5';
          }
          else {
            totalSyl = '7';
          }

          if (syl.innerHTML === totalSyl) {
            syl.style.color = 'green';
            syl.style.fontWeight = 'bold';
            curLine = curLine + 1;
          }
          else if (syl.innerHTML > totalSyl) {
            syl.style.color = 'red';
          }
        }
      });

      // put the <tbody> in the <table>
      wordTable.appendChild(tblBody);

      // appends <table> into <body>
      // body.appendChild(tbl);
    };

    // Add event listeners
    dictionaryButton.addEventListener('click', generateTable);
  });
}());
