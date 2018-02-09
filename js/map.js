'use strict';

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
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
var ESC_KEYCODE = 27;

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
}

function renderPin(advertObj, advertId) {
  var pin = pinTemplate.cloneNode(true);
  var leftCoordinate = advertObj.location.x - WIDTH_PIN / 2;
  var topCoordinate = advertObj.location.y - HEIGHT_PIN;
  pin.style.left = leftCoordinate + 'px';
  pin.style.top = topCoordinate + 'px';
  pin.id = advertId;
  pin.querySelector('img').src = advertObj.autor.avatar;
  return pin;
}

// выводит тип жилья
function getHouseType(type) {
  var houseType = '';
  switch (type) {
    case 'flat':
      houseType = 'Квартира';
      break;
    case 'bungalo':
      houseType = 'Бунгало';
      break;
    case 'house':
      houseType = 'Дом';
      break;
  }
  return houseType;
}

// разделяет цену по разрядам
function slicePrice(price) {
  var housePrice = 0;
  var priseString = price + '';
  var hundred;
  var thousand;
  var millions;
  if (priseString.length <= 3) {
    housePrice = priseString;
  } else if (priseString.length <= 6) {
    thousand = priseString.slice(-6, -3);
    hundred = priseString.slice(-3);
    housePrice = thousand + ' ' + hundred;
  } else if (priseString.length > 6) {
    millions = priseString.slice(-7, -6);
    thousand = priseString.slice(-6, -3);
    hundred = priseString.slice(-3);
    housePrice = millions + ' ' + thousand + ' ' + hundred;
  }
  return housePrice;
}

// добавляет атрибут disabled полям формы
function addFormDisabled() {
  for (var i = 0; i < fieldets.length; i++) {
    fieldets[i].disabled = true;
  }
}

// удаляет атрибут disabled полям формы
function removeFormDisabled() {
  for (var i = 0; i < fieldets.length; i++) {
    fieldets[i].disabled = false;
  }
}

// добавляет карточку с данными в DOM
function addCardOnMap(advertItem) {
  // создаем фрагмент с объявлением
  var advertData = advertItem;
  var advertElement = mapCardTemplate.cloneNode(true);
  var puctureList = advertElement.querySelector('.popup__pictures');
  var puctureItem = advertElement.querySelector('.popup__pictures li');

  // подставляем нужную информацию в шаблон
  advertElement.querySelector('h3').textContent = advertData.offer.title;
  advertElement.querySelector('small').textContent = advertData.offer.address;
  advertElement.querySelector('.popup__price').innerHTML = slicePrice(advertData.offer.price) + ' &#x20bd;' + ' /ночь';
  advertElement.querySelector('h4').textContent = getHouseType(advertData.offer.type);
  advertElement.querySelectorAll('p')[2].textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
  advertElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
  advertElement.querySelector('h4').textContent = getHouseType(advertData.offer.type);
  var featuresList = advertElement.querySelector('.popup__features');
  // удаляет лишние иконки features
  for (var i = 5; i >= advertData.offer.features.length; i--) {
    featuresList.removeChild(featuresList.children[i]);
  }
  advertElement.querySelectorAll('p')[4].textContent = advertData.offer.description;
  advertElement.querySelector('.popup__avatar').src = advertData.autor.avatar;

  // создаем фрагмент с фото
  for (var j = 0; j < advertData.offer.photos.length; j++) {
    var puctureItemElement = puctureItem.cloneNode(true);
    var puctureItemImg = puctureItemElement.querySelector('img');
    puctureItemImg.src = advertData.offer.photos[j];
    puctureItemImg.width = 90;
    puctureItemImg.height = 90;
    puctureList.appendChild(puctureItemElement);
  }

  // удаляем первый пустой пункт спика
  puctureList.removeChild(advertElement.querySelector('.popup__pictures li'));

  // вставляем объявление в DOM
  map.insertBefore(advertElement, mapFilter);
}

// удаляет поп-ап
function removePopup() {
  var card = document.querySelector('.map__card');
  map.removeChild(card);
  document.removeEventListener('keydown', onPopupPressEcs);
}

// нажатие ECS закрывает поп-ап
function onPopupPressEcs(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopup();
  }
}

// создаем массив с объявлениями
var adverts = [];
createAdverts(ADVERT_COUNT);

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var template = document.querySelector('template').content;
var pinTemplate = template.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapCardTemplate = template.querySelector('.map__card');
var mapFilter = document.querySelector('.map__filters-container');
var form = document.querySelector('.notice__form');
var fieldets = document.querySelectorAll('.form__element');

// добавляем полям формы атрибут disabled
addFormDisabled();

// создаем фрагмент для пинов
var fragment = document.createDocumentFragment();

// добавляет пины во фрагмент
for (var i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderPin(adverts[i], i));
}

// переводим карту и форму в активное состояние
mainPin.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  removeFormDisabled();

  // добавляем пины в DOM
  mapPins.appendChild(fragment);

  // находим все пины
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  // навешиваем обработчик кликов на пин
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', function (evt) {
      if (evt.currentTarget.tagName === 'BUTTON') {
        // если карточка открыта - закрываем
        var card = document.querySelector('.map__card');
        if (card) {
          removePopup();
        }

        // добавляем объявление
        var index = evt.currentTarget.id;
        addCardOnMap(adverts[index]);

        var buttonClose = document.querySelector('.popup__close');
        buttonClose.addEventListener('click', function () {
          removePopup();
        });
        document.addEventListener('keydown', onPopupPressEcs);
      }
    });
  }
});
