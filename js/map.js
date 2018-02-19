'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('.form__element');
  var startingChildNodesLength = mapPins.childNodes.length;

  function addScrollPhotoList() {
    var photoList = document.querySelector('.popup__pictures');
    var popup = document.querySelector('.popup');

    console.log(photoList.offsetTop);
    console.log(photoList.offsetHeight);
    if (photoList.offsetTop + photoList.offsetHeight > popup.offsetHeight) {
      photoList.style.overflowY = 'auto';
      photoList.style.height = popup.offsetHeight - photoList.offsetTop + 'px';
    }
  }

  function openAndClosePopup(element) {
    // если карточка открыта - закрываем
    var index = element.id;
    var advertElement = window.card(window.data.adverts[index]);
    var card = document.querySelector('.map__card');

    if (card) {
      removePopup();
    }
    // вставляем объявление в DOM
    map.insertBefore(advertElement, mapFilter);
    element.classList.add('map__pin--current');
    var buttonClose = document.querySelector('.popup__close');
    buttonClose.addEventListener('click', removePopup);
    document.addEventListener('keydown', onPopupPressEcs);
  }

  // удаляет поп-ап
  function removePopup() {
    var card = document.querySelector('.map__card');
    map.removeChild(card);
    removePinCurrentClass();
    document.removeEventListener('keydown', onPopupPressEcs);
  }

  // нажатие ECS закрывает поп-ап
  function onPopupPressEcs(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePopup();
    }
  }

  // проверка что нажатый пин не главный
  function isNotMainPin(elem) {
    return elem.classList.contains('map__pin--main') ? false : true;
  }

  function onPinClick(evt) {
    var target = evt.target;
    var targetParent = evt.target.parentNode;
    var isButton = target.tagName === 'BUTTON';
    var isImg = target.tagName === 'IMG';

    if (isButton && isNotMainPin(target)) {
      openAndClosePopup(target);
      setTimeout(addScrollPhotoList, 100);
    }
    if (isImg && isNotMainPin(targetParent)) {
      openAndClosePopup(targetParent);
      setTimeout(addScrollPhotoList, 100);
    }
  }

  // удаляет со всех пинов класс map__pin--current
  function removePinCurrentClass() {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--current');
    }
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
  function switchToActiveMode() {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    removeFormDisabled();

    // добавляем пины в DOM
    if (mapPins.childNodes.length <= startingChildNodesLength) {
      mapPins.appendChild(window.pin.createPin());
    }
  }

  // навешиваем обработчик кликов на пин
  mapPins.addEventListener('click', onPinClick);

  window.map = {
    startMap: switchToActiveMode
  };
})();
