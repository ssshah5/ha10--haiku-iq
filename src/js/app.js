(function app() {
  'use strict';

  var generateTable, wordListener, undoListener, dictionaryButton, undoButton, getWords,
      curLine = 1,
      line1 = new Array(),
      line2 = new Array(),
      line3 = new Array(),
      lines = [line1, line2, line3],

      infoBox = document.getElementById('info-popup'),
      infoButton = document.getElementById('info'),
      closeButton = document.getElementById('close'),
      wordTable = document.getElementById('word-table');

  infoButton.onclick = function () {
    infoBox.style.display = 'block';
  };

  closeButton.onclick = function () {
    infoBox.style.display = 'none';
  };

  // AJAX call to update words
  getWords = function () {
    return new Promise(function (resolve, reject) { // eslint-disable-line
      var req = new XMLHttpRequest();
      req.open('GET', '/words');

      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          resolve(req.response);
        }
        else if (req.readyState === 4 && req.status !== 200) {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function () {
        reject(Error('Network Error'));
      };
      req.send();
    });
  };

  generateTable = function generateTableFunc() {
    var tableBody = document.getElementById('table-body'), rowNum = 4, columnNum = 5, tblBody, row, cell, i, j, wordButton;

    if (tableBody) {
      tableBody.remove();

      return;
    }

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
        wordButton.innerHTML = window.apiWords[i * rowNum + j].word;
        wordButton.setAttribute('data-syl', window.apiWords[i * rowNum + j].syllableCount);

        cell.id = '' + i + j;
        cell.appendChild(wordButton);
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    wordTable.addEventListener('click', function (e) {
      wordListener(e);
    });

    // put the <tbody> in the <table>
    wordTable.appendChild(tblBody);

    // appends <table> into <body>
    // body.appendChild(tbl);
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

  // being execution
  getWords().then(
    function (response) {
      window.apiWords = JSON.parse(response);
      generateTable();
    },
    function (error) {
      console.error('Failed!', error);
    }
  );

  window.addEventListener('DOMContentLoaded', function appDCL() {
    dictionaryButton = document.getElementById('dictionary');
    undoButton = document.getElementById('undo');

    // Add event listeners
    dictionaryButton.addEventListener('click', generateTable);
    undoButton.addEventListener('click', undoListener);
  });
}());
