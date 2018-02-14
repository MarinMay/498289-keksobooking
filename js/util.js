'use strict';
(function () {
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

  // выбирает случайный пункт из массива
  function getElem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // выбирает массив случайной длины
  function getaRandomLengthArray(array) {
    var newArray = [];
    var newLength = Math.floor(Math.random() * (array.length));
    for (var i = 0; i < newLength; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

  // выбирает число в заданном диапазоне
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.util = {
    sortArray: sortArray,
    getElem: getElem,
    getaRandomLengthArray: getaRandomLengthArray,
    randomNumber: randomNumber
  };
})();

