'use strict';
(function () {
  var HEIGHT_PIN = 70;
  var heightAdjustment = HEIGHT_PIN / 2;
  var template = document.querySelector('template').content;
  var pinTemplate = template.querySelector('.map__pin');

  function renderPin(advertObj, advertId) {
    var pin = pinTemplate.cloneNode(true);
    var leftCoordinate = advertObj.location.x;
    var topCoordinate = advertObj.location.y - heightAdjustment;

    pin.style.left = leftCoordinate + 'px';
    pin.style.top = topCoordinate + 'px';
    pin.id = advertId;
    pin.querySelector('img').src = advertObj.autor.avatar;
    return pin;
  }

  function createPin() {
    // создаем фрагмент для пинов
    var fragment = document.createDocumentFragment();

    // добавляет пины во фрагмент
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(renderPin(window.data.adverts[i], i));
    }
    return fragment;
  }

  window.pin = {
    createPin: createPin,
    heightAdjustment: heightAdjustment
  };
})();
