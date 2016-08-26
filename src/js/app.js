(function app() {
  'use strict';

  var generateTable, wordListener, undoListener, getWords, getWordsGenerateTable, startNewGame,
      curLine = 1,
      line1 = new Array(),
      line2 = new Array(),
      line3 = new Array(),
      lines = [line1, line2, line3],

      infoBox = document.getElementById('info-popup'),
      infoButton = document.getElementById('info'),
      closeButton = document.getElementById('close'),
      wordTable = document.getElementById('word-table'),
      title = document.getElementById('theme'),
      newWordsButton = document.getElementById('new-words'),
      dictionaryButton = document.getElementById('dictionary'),
      undoButton = document.getElementById('undo'),
      random = Math.random() * 10 - 5;

  title.style.transform = 'rotate(' + random + 'deg)';

  infoButton.onclick = function () {
    infoBox.style.display = 'block';
  };

  closeButton.onclick = function () {
    infoBox.style.display = 'none';
  };

  startNewGame = function startNewGameFunction() {
    window.location.reload();
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

  getWordsGenerateTable = function getWordsGenerateTableFunction() {
    getWords().then(
      function (response) {
        window.apiWords = JSON.parse(response);
        generateTable();
      },
      function (error) {
        console.error('Failed!', error);
      }
    );
  };

  generateTable = function generateTableFunc() {
    var tableBody = document.getElementById('table-body'), rowNum = 5, columnNum = 4, tblBody, row, cell, i, j, wordButton;

    if (tableBody) {
      tableBody.remove();
    }

    getWords();

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
        wordButton.innerHTML = window.apiWords[i * columnNum + j].word;
        wordButton.setAttribute('data-syl', window.apiWords[i * columnNum + j].syllableCount);

        cell.id = '' + i + j;
        random = Math.random() * 10 - 5;
        cell.style.transform = 'rotate(' + random + 'deg)';
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
  };

  undoListener = function undoListenerFunc() {
    var line, i, allButtons, syl, curSyl, totalSyl, warningDiv;

    if (lines[curLine - 1].length === 0 && curLine !== 1) {
      curLine = curLine - 1;
    }

    syl = document.getElementById('syl' + curLine);
    curSyl = lines[curLine - 1][lines[curLine - 1].length - 1].syl;
    syl.innerHTML = parseInt(syl.innerHTML, 10) - curSyl;

    lines[curLine - 1].pop();
    line = document.getElementById('poemLineWord' + curLine);
    line.textContent = '';

    for (i = 0; i < lines[curLine - 1].length; i++) {
      line.textContent = line.textContent + lines[curLine - 1][i].word + ' ';
    }

    if (curLine === 1 || curLine === 3) {
      totalSyl = '5';
    }
    else {
      totalSyl = '7';
    }

    if (syl.innerHTML < totalSyl) {
      warningDiv = document.getElementById('warning-div');
      warningDiv.style.display = 'none';

      wordTable = document.getElementById('word-table');
      wordTable.style.pointerEvents = 'auto';

      undoButton = document.getElementById('undo');
      undoButton.style.backgroundColor = '';
      undoButton.style.boxShadow = '';
      undoButton.style.transform = 'rotate(0deg)';


      allButtons = document.getElementsByClassName('word-button');
      for (i = 0; i < allButtons.length; i++) {
        allButtons[i].style.backgroundColor = '#fdfbfb';
      }
    }
  };

  wordListener = function wordListenerFunc(e) {
    var poem, button, allButtons, word, i, line, syl, sylAdd, wordObj, totalSyl, warning, warningDiv;

    if (e.target.type === 'submit') {
      button = e.target;
      word = button.innerHTML;

      line = document.getElementById('poemLineWord' + curLine);

      sylAdd = button.getAttribute('data-syl');
      syl = document.getElementById('syl' + curLine);
      syl.innerHTML = parseInt(syl.innerHTML, 10) + parseInt(sylAdd, 10);

      wordObj = {
        'word': word,
        'syl': sylAdd,
      };

      lines[curLine - 1].push(wordObj);
      line.textContent = '';
      for (i = 0; i < lines[curLine - 1].length; i++) {
        line.textContent = line.textContent + lines[curLine - 1][i].word + ' ';
      }

      if (curLine === 1 || curLine === 3) {
        totalSyl = '5';
      }
      else {
        totalSyl = '7';
      }

      if (syl.innerHTML > totalSyl) {
        poem = document.getElementById('fs');

        if (!document.getElementById('warning-div')) {
          warningDiv = document.createElement('div');
          warningDiv.id = 'warning-div';
          warningDiv.style.transform = 'rotate(-8deg)';

          warning = document.createElement('span');
          warning.innerHTML = 'Uh oh! That\'s too many syllables!';
          warning.style.backgroundColor = '#fdfbfb';
          warning.style.boxShadow = '2px 2px 2px black';
          warning.style.fontWeight = 'bold';
          warning.style.padding = '3px';

          warningDiv.appendChild(warning);
          poem.appendChild(warningDiv);
        }
        else {
          warningDiv = document.getElementById('warning-div');
          warningDiv.style.display = 'block';
        }

        allButtons = document.getElementsByClassName('word-button');
        for (i = 0; i < allButtons.length; i++) {
          allButtons[i].style.backgroundColor = 'gray';
        }

        undoButton = document.getElementById('undo');
        undoButton.style.backgroundColor = '#fdfbfb';
        undoButton.style.boxShadow = '2px 2px 2px black';
        undoButton.style.transform = 'rotate(15deg)';

        wordTable = document.getElementById('word-table');
        wordTable.style.pointerEvents = 'none';
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
  getWordsGenerateTable();

  window.addEventListener('DOMContentLoaded', function appDCL() {
    // Add event listeners
    dictionaryButton.addEventListener('click', startNewGame);
    undoButton.addEventListener('click', undoListener);
    newWordsButton.addEventListener('click', getWordsGenerateTable);
  });
}());
