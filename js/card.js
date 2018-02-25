'use strict';
(function () {
  var BEGINNING_OF_THOUSAND = 3;
  var BEGINNING_OF_MILLION = 7;
  var WIDTH_IMG_HOUSE = 95;
  var template = document.querySelector('template').content;
  var mapCardTemplate = template.querySelector('.map__card');

  var houseTypeObj = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  // выводит тип жилья
  function getHouseType(type) {
    var houseType = houseTypeObj[type];
    return houseType;
  }

  // разделяет цену по разрядам
  function slicePrice(price) {
    var priceString = price + '';
    var priceArray = priceString.split('');
    var housePrice;

    priceArray.reverse();
    priceArray.splice(BEGINNING_OF_THOUSAND, 0, ' ');
    priceArray.splice(BEGINNING_OF_MILLION, 0, ' ');
    priceArray.reverse();
    housePrice = priceArray.join('');
    return housePrice;
  }

  // добавляет фото в объявление
  function createFragmentPhoto(advertElement, advertData) {
    var puctureList = advertElement.querySelector('.popup__pictures');
    var puctureItem = advertElement.querySelector('.popup__pictures li');
    var photoArray = advertData.offer.photos;

    // удаляем первый пустой пункт спика
    puctureList.removeChild(puctureItem);
    puctureList.style.opacity = 0;
    photoArray.forEach(function (itemPhoto) {
      var puctureItemElement = puctureItem.cloneNode(true);
      var puctureItemImg = puctureItemElement.querySelector('img');

      puctureItemImg.src = itemPhoto;
      puctureItemImg.width = WIDTH_IMG_HOUSE;
      puctureList.appendChild(puctureItemElement);
    });
  }

  // добавляет иконки в блок features
  function setFuturesList(parent, data) {
    var featuresList = parent.querySelector('.popup__features');
    var dataFeatures = data.offer.features;
    // удаляет лишние иконки features
    featuresList.innerHTML = '';
    dataFeatures.forEach(function (featuresItem) {
      var itemFeature = document.createElement('li');
      var classNameItemFeature = 'feature--' + featuresItem;

      itemFeature.classList.add('feature');
      itemFeature.classList.add(classNameItemFeature);
      featuresList.appendChild(itemFeature);
    });
  }

  // добавляет прокрутку если фото не влазят в карточку
  function addScrollPhotoList() {
    var photoList = document.querySelector('.popup__pictures');
    var popup = document.querySelector('.popup');
    var images = popup.querySelectorAll('.popup__pictures img');
    var isPhotoListScroll = false;

    images.forEach(function (element) {
      element.addEventListener('load', function () {
        if (!isPhotoListScroll) {
          if (photoList.offsetTop + photoList.offsetHeight >= popup.offsetHeight) {
            photoList.style.overflowY = 'auto';
            isPhotoListScroll = true;
            photoList.style.height = popup.offsetHeight - photoList.offsetTop + 'px';
          }
          photoList.style.opacity = 1;
        }
      });
    });
  }

  // добавляет карточку с данными в DOM
  function getCard(advertItem) {
    // создаем фрагмент с объявлением
    var advertData = advertItem;
    var card = mapCardTemplate.cloneNode(true);

    // подставляем нужную информацию в шаблон
    card.querySelector('h3').textContent = advertData.offer.title;
    card.querySelector('small').textContent = advertData.offer.address;
    card.querySelector('.popup__price').innerHTML = slicePrice(advertData.offer.price) + ' &#x20bd;' + ' /ночь';
    card.querySelector('h4').textContent = getHouseType(advertData.offer.type);
    card.querySelectorAll('p')[2].textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
    card.querySelectorAll('p')[3].textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
    card.querySelector('h4').textContent = getHouseType(advertData.offer.type);
    card.querySelectorAll('p')[4].textContent = advertData.offer.description;
    card.querySelector('.popup__avatar').src = advertData.author.avatar;

    setFuturesList(card, advertData);
    createFragmentPhoto(card, advertData);

    return card;
  }

  window.card = {
    getCard: getCard,
    addScrollPhotoList: addScrollPhotoList
  };
})();
