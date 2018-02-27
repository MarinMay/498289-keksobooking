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
  // проверка в каком состоянии карта
  var isMapActive = false;

  function openAndClosePopup(element) {
    var index = element.id;
    var advertItem = window.card.getCard(advertsData[index]);
    removePopup();
    // вставляем объявление в DOM
    map.insertBefore(advertItem, mapFilter);
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
      var currentPin = document.querySelector('.map__pin--current');
      currentPin.classList.remove('map__pin--current');
      map.removeChild(card);
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

  function onPinClick(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      openAndClosePopup(pin);
    }
  }

  function addPinsOnMap(advertData) {
    // проверка, что пины на карте есть
    if (mapPins.childNodes.length > startingChildNodesLength) {
      removePinsOnMap();
    }
    mapPins.appendChild(window.pin.createPinsFragment(advertData));
  }

  function removePinsOnMap() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (elem) {
      mapPins.removeChild(elem);
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
    if (!isMapActive) {
      isMapActive = true;
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
  }

  // переводит карту и форму  неактивное состояние
  function disableActiveMode() {
    isMapActive = false;
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
    switchToActiveMode: switchToActiveMode,
    disableActiveMode: disableActiveMode,
    addPinsOnMap: addPinsOnMap,
    removePopup: removePopup
  };
})();
