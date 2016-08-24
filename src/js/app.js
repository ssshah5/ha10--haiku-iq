(function app() {
  'use strict';

  var infoBox = document.getElementById('info-popup');
  var infoButton = document.getElementById('info');
  var closeButton = document.getElementById('close');

  infoButton.onclick = function() {
    infoBox.style.display = 'block';
  }

  closeButton.onclick = function() {
    infoBox.style.display = 'none';
  }
/*
  window.onclick = function(e) {
    if(e.target == info-box) {
      infoBox.style.display = 'none';
    }
  }
*/
  window.addEventListener('DOMContentLoaded', function appDCL() {
    // Mean to console.log out, so disabling
    console.log('Hello World'); // eslint-disable-line no-console
  });
}());
