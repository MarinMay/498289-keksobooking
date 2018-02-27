'use strict';
(function () {
  // создаем массив данных с объявлениями для пинов
  var adverts = [];

  function createAdverts(data) {
    adverts = data.slice();
    window.data = {
      adverts: adverts
    };
  }

  window.backend.loadData(createAdverts, window.backend.onRequestError);
})();
