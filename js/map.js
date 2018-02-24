'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('.form__element');
  var startingChildNodesLength = mapPins.childNodes.length;
  var advertsData;

  // добавляет прокрутку если фото не влазят в карточку
  function addScrollPhotoList() {
    var photoList = document.querySelector('.popup__pictures');
    var popup = document.querySelector('.popup');
    var img = popup.querySelectorAll('.popup__pictures img');
    var isPhotoListScroll = false;

    img.forEach(function (element) {
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

  function openAndClosePopup(element) {
    var index = element.id;
    var advertElement = window.card(advertsData[index]);
    removePopup();
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
    if (card) {
      map.removeChild(card);
      removePinCurrentClass();
      document.removeEventListener('keydown', onPopupPressEcs);
    }
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
    var isTargetButton = target.tagName === 'BUTTON';
    var isTargetImg = target.tagName === 'IMG';

    if (isTargetButton && isNotMainPin(target)) {
      openAndClosePopup(target);
      addScrollPhotoList();
    }
    if (isTargetImg && isNotMainPin(targetParent)) {
      openAndClosePopup(targetParent);
      addScrollPhotoList();
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

  // переводим карту и форму в активное состояние
  function switchToActiveMode() {
    advertsData = window.data.adverts;
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    removeFormDisabled();

    // добавляем пины в DOM
    if (mapPins.childNodes.length <= startingChildNodesLength) {
      addPinsOnMap(advertsData);
    }
    // находим все input фильтрации и навешиваем обработчик событий
    var filterInput = mapFilter.querySelectorAll('input');
    var filterSelect = mapFilter.querySelectorAll('select');

    filterInput.forEach(function (input) {
      input.addEventListener('change', filtrationPins);
    });
    filterSelect.forEach(function (select) {
      select.addEventListener('change', filtrationPins);
    });
  }

  function filtrationPins() {
    removePopup();
    advertsData = window.filter.filteredData();
    addPinsOnMap(advertsData);
  }

  function addPinsOnMap(advertData) {
    removePinsOnMap();
    mapPins.appendChild(window.pin.createPinsFragment(advertData));
  }

  function removePinsOnMap() {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (elem) {
      if (isNotMainPin(elem)) {
        mapPins.removeChild(elem);
      }
    });
  }

  // переводит карту и форму  неактивное состояние
  function disableActiveMode() {
    map.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
    addFormDisabled();
    removePopup();
    removePinsOnMap();
  }

  // добавляем полям формы атрибут disabled
  addFormDisabled();

  // навешиваем обработчик кликов на пин
  mapPins.addEventListener('click', onPinClick);

  window.map = {
    startMap: switchToActiveMode,
    disableActiveMode: disableActiveMode,
    addPinsOnMap: addPinsOnMap,
    removePopup: removePopup
  };
})();
