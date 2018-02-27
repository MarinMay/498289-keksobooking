'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  // сортирует массив в случайном порядке
  function sortArray(array) {
    var resultIndex = array.length;
    var currentIndex;
    var valueResultIndex;

    while (resultIndex) {
      currentIndex = Math.floor(Math.random() * resultIndex--);
      valueResultIndex = array[resultIndex];
      array[resultIndex] = array[currentIndex];
      array[currentIndex] = valueResultIndex;
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

