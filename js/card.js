'use strict';
(function () {
  var template = document.querySelector('template').content;
  var mapCardTemplate = template.querySelector('.map__card');
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

  // добавляет карточку с данными в DOM
  window.card = function (advertItem) {
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

    // удаляем первый пустой пункт спика
    puctureList.removeChild(advertElement.querySelector('.popup__pictures li'));

    // создаем фрагмент с фото
    for (var j = 0; j < advertData.offer.photos.length; j++) {
      var puctureItemElement = puctureItem.cloneNode(true);
      var puctureItemImg = puctureItemElement.querySelector('img');
      puctureItemImg.src = advertData.offer.photos[j];
      puctureItemImg.width = 90;
      puctureItemImg.height = 90;
      puctureList.appendChild(puctureItemElement);
    }
    return advertElement;
  };
})();
