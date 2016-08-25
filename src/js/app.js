(function app() {
  'use strict';

  var infoBox = document.getElementById('info-popup'),
      infoButton = document.getElementById('info'),
      closeButton = document.getElementById('close');

  infoButton.onclick = function () {
    infoBox.style.display = 'block';
  };

  closeButton.onclick = function () {
    infoBox.style.display = 'none';
  };

  window.addEventListener('DOMContentLoaded', function appDCL() {
    var generateTable, getWordsAPI, curLine, lines, line1, line2, line3, wordListener, undoListener, dictionaryButton, undoButton;

    dictionaryButton = document.getElementById('dictionary');
    undoButton = document.getElementById('undo');

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
          'syllableCount': 2,
        },
        {
          'word': 'flowers',
          'syllableCount': 2,
        },
        {
          'word': 'spring',
          'syllableCount': 1,
        },
        {
          'word': 'winter',
          'syllableCount': 2,
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
          'syllableCount': 2,
        },
        {
          'word': 'flowers',
          'syllableCount': 2,
        },
        {
          'word': 'spring',
          'syllableCount': 1,
        },
        {
          'word': 'winter',
          'syllableCount': 2,
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

    curLine = 1;
    line1 = new Array();
    line2 = new Array();
    line3 = new Array();
    lines = [line1, line2, line3];

    wordListener = function wordListenerFunc(e) {
      var button, word, i, line, syl, sylAdd, wordObj, totalSyl;

      if (e.target.type === 'submit') {
        button = e.target;
        word = button.innerHTML;

        line = document.getElementById('poemLine' + curLine);

        sylAdd = button.getAttribute('data-syl');
        syl = document.getElementById('syl' + curLine);
        syl.innerHTML = parseInt(syl.innerHTML, 10) + parseInt(sylAdd, 10);

        wordObj = {
          'word': word,
          'syl': sylAdd,
        };

        lines[curLine - 1].push(wordObj);
        line.value = '';
        for (i = 0; i < lines[curLine - 1].length; i++) {
          line.value = line.value + lines[curLine - 1][i].word + ' ';
        }

        if (curLine === 1 || curLine === 3) {
          totalSyl = '5';
        }
        else {
          totalSyl = '7';
        }

        if (syl.innerHTML === totalSyl) {
          if (curLine !== 3) {
            curLine = curLine + 1;
          }
          else {
            alert('Haiku Complete!');
          }
        }
      }
    };

    undoListener = function undoListenerFunc() {
      var line, i, syl, curSyl;

      if (lines[curLine - 1].length === 0 && curLine !== 1) {
        curLine = curLine - 1;
      }

      syl = document.getElementById('syl' + curLine);
      curSyl = lines[curLine - 1][lines[curLine - 1].length - 1].syl;
      syl.innerHTML = parseInt(syl.innerHTML, 10) - curSyl;

      lines[curLine - 1].pop();
      line = document.getElementById('poemLine' + curLine);
      line.value = '';

      for (i = 0; i < lines[curLine - 1].length; i++) {
        line.value = line.value + lines[curLine - 1][i].word + ' ';
      }
    };

    generateTable = function generateTableFunc() {
      var rowNum = 4, columnNum = 5, body, tbl, tblBody, row, cell, i, j, apiWords, wordButton;

      apiWords = getWordsAPI();

      body = document.getElementById('body-container');

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
          wordButton.setAttribute('data-syl', apiWords[i * rowNum + j].syllableCount);

          cell.id = '' + i + j;
          cell.appendChild(wordButton);
          row.appendChild(cell);
        }

      // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      tbl.addEventListener('click', function (e) {
        wordListener(e);
      });

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);

      // appends <table> into <body>
      body.appendChild(tbl);
    };

    // Add event listeners
    dictionaryButton.addEventListener('click', generateTable);
    undoButton.addEventListener('click', undoListener);
  });
}());
