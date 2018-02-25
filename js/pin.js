'use strict';
(function () {
  var HEIGHT_PIN = 70;
  var ADVERT_COUNT = 5;
  var heightAdjustment = HEIGHT_PIN / 2;
  var template = document.querySelector('template').content;
  var pinTemplate = template.querySelector('.map__pin');

  // создает пин из шаблона
  function renderPin(advertObj, advertId) {
    var pin = pinTemplate.cloneNode(true);
    var leftCoordinate = advertObj.location.x;
    var topCoordinate = advertObj.location.y - heightAdjustment;

    pin.style.left = leftCoordinate + 'px';
    pin.style.top = topCoordinate + 'px';
    pin.id = advertId;
    pin.querySelector('img').src = advertObj.author.avatar;
    return pin;
  }

  // добавляет пины во фрагмент
  function createPinsFragment(advertData) {
    // создаем фрагмент для пинов
    var fragment = document.createDocumentFragment();
    var takeNumber = advertData.length > ADVERT_COUNT ? ADVERT_COUNT : advertData.length;

    window.util.sortArray(advertData);
    // добавляет пины во фрагмент
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(advertData[i], i));
    }
    return fragment;
  }

  window.pin = {
    createPinsFragment: createPinsFragment,
    heightAdjustment: heightAdjustment
  };
})();
