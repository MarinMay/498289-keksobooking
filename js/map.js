'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('.form__element');

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

  function openAndClosePopup(element) {
    // если карточка открыта - закрываем
    var card = document.querySelector('.map__card');
    if (card) {
      removePopup();
    }

    // добавляем объявление
    var index = element.id;
    var advertElement = window.card(window.data.adverts[index]);
    // вставляем объявление в DOM
    map.insertBefore(advertElement, mapFilter);

    var buttonClose = document.querySelector('.popup__close');
    buttonClose.addEventListener('click', function () {
      removePopup();
    });
    document.addEventListener('keydown', onPopupPressEcs);
  }

  // добавляет атрибут disabled полям формы
  function addFormDisabled() {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
    }
  }

  // удаляет атрибут disabled полям формы
  function removeFormDisabled() {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  }

  // добавляем полям формы атрибут disabled
  addFormDisabled();

  // переводим карту и форму в активное состояние
  mainPin.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    removeFormDisabled();

    // добавляем пины в DOM
    mapPins.appendChild(window.pin());

    // навешиваем обработчик кликов на пин
    mapPins.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON' && !evt.target.classList.contains('map__pin--main')) {
        openAndClosePopup(evt.target);
      }
      if (evt.target.tagName === 'IMG' && !evt.target.parentNode.classList.contains('map__pin--main')) {
        openAndClosePopup(evt.target.parentNode);
      }
      return;
    }, true);
  });
})();
