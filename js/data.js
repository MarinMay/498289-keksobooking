'use strict';
(function () {
  var ADVERT_COUNT = 8;
  // создаем массив данных с объявлениями для пинов
  var adverts = [];
  function createAdverts(data) {
    for (var i = 0; i < ADVERT_COUNT; i++) {
      adverts[i] = data[i];
    }
    return adverts;
  }
  window.backend.load(createAdverts, window.backend.errorHandler);

  // экспорт данных
  window.data = {
    adverts: adverts
  };
})();
