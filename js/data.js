'use strict';
(function () {
  var AVATAR_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08'];

  var OFFER_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var TYPE = ['flat', 'house', 'bungalo'];

  var TIME = ['12:00', '13:00', '14:00'];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var ADVERT_COUNT = 8;

  // конструктор объявления
  function Advert(avatar, title, type, time, features, photo) {
    this.autor = {
      avatar: 'img/avatars/user' + avatar + '.png'
    };
    this.location = {
      x: window.util.randomNumber(300, 900),
      y: window.util.randomNumber(220, 570)
    };
    this.offer = {
      title: title,
      address: this.location.x + ', ' + this.location.y,
      price: window.util.randomNumber(1000, 1000000),
      type: window.util.getElem(type),
      rooms: window.util.randomNumber(1, 5),
      guests: window.util.randomNumber(1, 100),
      checkin: window.util.getElem(time),
      checkout: window.util.getElem(time),
      features: window.util.getaRandomLengthArray(features),
      description: '',
      photos: photo
    };
  }

  // создает массив объявлений
  function createAdverts(count) {
    window.util.sortArray(AVATAR_NUMBER);
    window.util.sortArray(OFFER_TITLE);
    for (var i = 0; i < count; i++) {
      adverts[i] = new Advert(AVATAR_NUMBER[i], OFFER_TITLE[i], TYPE, TIME, FEATURES, PHOTOS);
    }
    return adverts;
  }

  // создаем массив данных с объявлениями для пинов
  var adverts = [];
  // экспорт данных
  window.data = {
    adverts: createAdverts(ADVERT_COUNT)
  };
})();
