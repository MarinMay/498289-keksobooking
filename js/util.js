'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  // сортирует массив в случайном порядке
  function sortArray(array) {
    var m = array.length;
    var t;
    var i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  }

  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  window.util = {
    sortArray: sortArray,
    debounce: debounce
  };
})();

