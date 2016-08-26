(function app() {
  'use strict';

  var generateTable, wordListener, undoListener, getWords, getWordsGenerateTable, startNewGame, showFinish, showFinishButton, hideFinishButton,
      curLine = 1,
      lines = [[], [], []],

      infoBox = document.getElementById('info-popup'),
      infoButton = document.getElementById('info'),
      closeInfoDialogButton = document.getElementById('close-info'),
      closeFinishButton = document.getElementById('close-finish'),
      wordTable = document.getElementById('word-table'),
      finishBox = document.getElementById('finish-popup'),
      finishButton = document.getElementById('finish-button'),
      finishRestartButton = document.getElementById('finish-restart-img'),
      emojiFinish = document.getElementById('emoji-finish'),
      title = document.getElementById('theme'),
      newWordsButton = document.getElementById('new-words'),
      dictionaryButton = document.getElementById('dictionary'),
      undoButton = document.getElementById('undo'),
      random = Math.random() * 10 - 5;

  title.style.transform = 'rotate(' + random + 'deg)';

  infoButton.onclick = function () {
    infoBox.style.display = 'block';
    infoButton.blur();
    closeInfoDialogButton.focus();
  };

  closeInfoDialogButton.onclick = function () {
    infoBox.style.display = 'none';
  };

  closeFinishButton.onclick = function () {
    finishBox.style.display = 'none';
  };

  finishButton.onclick = function () {
    showFinish();
  };

  startNewGame = function startNewGameFunction() {
    window.location.reload();
  };

  showFinishButton = function showFinishButtonFunc() {
    finishButton.style.display = 'block';
  };

  hideFinishButton = function hideFinishButtonFunc() {
    finishButton.style.display = 'none';
  };

  // Process the completion of a game
  showFinish = function showFinishFunc() {
    // Show a random fun emoji
    var emoji = ['⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽', '(ﾉ^∇^)ﾉﾟ', '⌒°(❛ᴗ❛)°⌒', 'ヽ(^。^)丿', 'ヽ༼>ل͜<༽ﾉ',
      'ヾ(●・◇・●)ノ', '٩(⚙ᴗ⚙)۶', '✧٩(•́⌄•́๑)و ✧', '¡¡¡( •̀ ᴗ •́ )و!!!', '⊂( ・ ̫・)⊃'],
        index = Math.floor(Math.random() * emoji.length),
        finishMsg = document.getElementById('finish-msg');

    emojiFinish.textContent = emoji[index];

    finishMsg.style.display = 'block';
    hideFinishButton();

    // finishBox.style.display = 'block';
    wordTable.style.display = 'none';
  };

  // AJAX call to update words
  getWords = function () {
    return new Promise(function (resolve, reject) { // eslint-disable-line
      var req = new XMLHttpRequest(),
          URL = '/words/' + title.innerText;
      req.open('GET', URL);

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

    wordTable.addEventListener('click', wordListener);

    // wordTable.addEventListener('click', function (e) {
    //  wordListener(e);
    // });

    // put the <tbody> in the <table>
    wordTable.appendChild(tblBody);
  };

  undoListener = function undoListenerFunc() {
    var line, i, allButtons, syl, curSyl, totalSyl, warningDiv;

    if (curLine === lines.length) {
      hideFinishButton();
    }
    if (lines[curLine - 1].length === 1) {
      line = document.getElementById('poemLineWord' + curLine);
      line.style.display = '';
    }

    if (lines[0].length === 0) {
      // nothing else to undo;
      return;
    }

    if (lines[curLine - 1].length === 0 && curLine !== 1) {
      curLine = curLine - 1;
    }
    syl = document.getElementById('syl' + curLine);
    curSyl = lines[curLine - 1][lines[curLine - 1].length - 1].syl;
    syl.innerHTML = parseInt(syl.innerHTML, 10) - curSyl;

    lines[curLine - 1].pop();

    line = document.getElementById('poemLine' + curLine);
    line.removeChild(line.lastChild);

    // for (i = 0; i < lines[curLine - 1].length; i++) {
    //   line.textContent = line.textContent + lines[curLine - 1][i].word + ' ';
    // }

    if (curLine === 1 || curLine === 3) {
      totalSyl = 5;
    }
    else {
      totalSyl = 7;
    }

    if (parseInt(syl.innerHTML, 10) <= totalSyl) {
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
    var poem, button, newButton, test, allButtons, word, i, line, syl, sylAdd, wordObj, totalSyl, warning, warningDiv;

    if (e.target.type === 'submit') {
      button = e.target;
      word = button.innerHTML;

      line = document.getElementById('poemLineWord' + curLine);

      // use tiles in haiku
      newButton = button.cloneNode();
      test = document.getElementById('poemLine' + curLine);
      newButton.innerText = word;
      random = Math.random() * 10 - 5;
      newButton.style.transform = 'rotate(' + random + 'deg)';
      newButton.style.margin = '6px';
      test.appendChild(newButton);

      sylAdd = button.getAttribute('data-syl');
      syl = document.getElementById('syl' + curLine);
      syl.innerHTML = parseInt(syl.innerHTML, 10) + parseInt(sylAdd, 10);

      wordObj = {
        'word': word,
        'syl': sylAdd,
      };

      lines[curLine - 1].push(wordObj);
      line.style.display = 'none';

      // for (i = 0; i < lines[curLine - 1].length; i++) {
      //   line.textContent = line.textContent + lines[curLine - 1][i].word + ' ';
      // }

      if (curLine === 1 || curLine === 3) {
        totalSyl = 5;
      }
      else {
        totalSyl = 7;
      }

      if (parseInt(syl.innerHTML, 10) > totalSyl) {
        poem = document.getElementById('poem-container');

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

      if (parseInt(syl.innerHTML, 10) === totalSyl) {
        if (curLine !== 3) {
          curLine = curLine + 1;
        }
        else {
          showFinishButton();
        }
      }
    }
  };

  // begin execution
  getWordsGenerateTable();

  window.addEventListener('DOMContentLoaded', function appDCL() {
    // Add event listeners
    dictionaryButton.addEventListener('click', startNewGame);
    undoButton.addEventListener('click', undoListener);
    newWordsButton.addEventListener('click', getWordsGenerateTable);
    finishRestartButton.addEventListener('click', startNewGame);
  });
}());
