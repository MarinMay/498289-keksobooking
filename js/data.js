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

  // конструктор объявления
  function Advert(avatar, title, type, time, features, photo) {
    this.autor = {
      avatar: 'img/avatars/user' + avatar + '.png'
    };
    this.location = {
      x: randomNumber(300, 900),
      y: randomNumber(150, 500)
    };
    this.offer = {
      title: title,
      address: this.location.x + ', ' + this.location.y,
      price: randomNumber(1000, 1000000),
      type: getElem(type),
      rooms: randomNumber(1, 5),
      guests: randomNumber(1, 100),
      checkin: getElem(time),
      checkout: getElem(time),
      features: getaRandomLengthArray(features),
      description: '',
      photos: photo
    };
  }

  // создает массив объявлений
  function createAdverts(count) {
    sortArray(AVATAR_NUMBER);
    sortArray(OFFER_TITLE);
    sortArray(PHOTOS);
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
