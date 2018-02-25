'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var form = document.querySelector('.notice__form');
  var startingChildNodesLength = mapPins.childNodes.length;
  var advertsData;
  var mainPin = document.querySelector('.map__pin--main');

  function openAndClosePopup(element) {
    var index = element.id;
    var advertElement = window.card.getCard(advertsData[index]);
    removePopup();
    // вставляем объявление в DOM
    map.insertBefore(advertElement, mapFilter);
    element.classList.add('map__pin--current');
    var buttonClose = document.querySelector('.popup__close');
    buttonClose.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onPopupPressEcs);
    window.card.addScrollPhotoList();
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

  function onButtonCloseClick() {
    removePopup();
  }

  // нажатие ECS закрывает поп-ап
  function onPopupPressEcs(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePopup();
    }
  }

  // проверка что нажатый пин не главный
  function checkPinNotMain(elem) {
    return elem.classList.contains('map__pin--main') ? false : true;
  }

  function onPinClick(evt) {
    var target = evt.target;
    var targetParent = evt.target.parentNode;
    var isTargetButton = target.tagName === 'BUTTON';
    var isTargetImg = target.tagName === 'IMG';

    if (isTargetButton && checkPinNotMain(target)) {
      openAndClosePopup(target);
    }
    if (isTargetImg && checkPinNotMain(targetParent)) {
      openAndClosePopup(targetParent);
    }
  }

  // удаляет со всех пинов класс map__pin--current
  function removePinCurrentClass() {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--current');
    }
  }

  function addPinsOnMap(advertData) {
    removePinsOnMap();
    mapPins.appendChild(window.pin.createPinsFragment(advertData));
  }

  function removePinsOnMap() {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (elem) {
      if (checkPinNotMain(elem)) {
        mapPins.removeChild(elem);
      }
    });
  }

  // перерисовывает пины после фильтрации
  function renderFiltrationPins() {
    removePopup();
    advertsData = window.filter.filtersData();
    addPinsOnMap(advertsData);
  }

  function onFilterInputChange(evt) {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'SELECT') {
      window.util.debounce(renderFiltrationPins);
    }
  }

  // переводим карту и форму в активное состояние
  function switchToActiveMode() {
    advertsData = window.data.adverts;
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    window.form.removeFormDisabled();

    // добавляем пины в DOM
    if (mapPins.childNodes.length <= startingChildNodesLength) {
      addPinsOnMap(advertsData);
    }
    mapFilter.addEventListener('change', onFilterInputChange);
  }

  // переводит карту и форму  неактивное состояние
  function disableActiveMode() {
    map.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
    window.form.addFormDisabled();
    removePopup();
    removePinsOnMap();
    mapFilter.removeEventListener('change', onFilterInputChange);
  }

  function onMainPinPressEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      switchToActiveMode();
    }
    mainPin.removeEventListener('keydown', onMainPinPressEnter);
  }

  // добавляем полям формы атрибут disabled
  window.form.addFormDisabled();

  // навешиваем обработчик кликов на пин
  mapPins.addEventListener('click', onPinClick);

  // перевод в активное состояние какры по нажатию enter
  mainPin.addEventListener('keydown', onMainPinPressEnter);

  window.map = {
    startMap: switchToActiveMode,
    disableActiveMode: disableActiveMode,
    addPinsOnMap: addPinsOnMap,
    removePopup: removePopup
  };
})();
