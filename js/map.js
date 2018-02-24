'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var form = document.querySelector('.notice__form');
  var startingChildNodesLength = mapPins.childNodes.length;
  var advertsData;

  function openAndClosePopup(element) {
    var index = element.id;
    var advertElement = window.card.getCard(advertsData[index]);
    removePopup();
    // вставляем объявление в DOM
    map.insertBefore(advertElement, mapFilter);
    element.classList.add('map__pin--current');
    var buttonClose = document.querySelector('.popup__close');
    buttonClose.addEventListener('click', removePopup);
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
    }
    if (isTargetImg && isNotMainPin(targetParent)) {
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
      if (isNotMainPin(elem)) {
        mapPins.removeChild(elem);
      }
    });
  }

  // перерисовывает пины после фильтрации
  function filtrationPins() {
    removePopup();
    advertsData = window.filter.filteredData();
    addPinsOnMap(advertsData);
  }

  function onfilterInputChange() {
    window.util.debounce(filtrationPins);
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
    // находим все input фильтрации и навешиваем обработчик событий
    var filterInput = mapFilter.querySelectorAll('input');
    var filterSelect = mapFilter.querySelectorAll('select');

    filterInput.forEach(function (input) {
      input.addEventListener('change', onfilterInputChange);
    });
    filterSelect.forEach(function (select) {
      select.addEventListener('change', onfilterInputChange);
    });
    window.form.addTabindexLabel('label.feature');
    window.form.addTabindexLabel('label.drop-zone');
  }

  // переводит карту и форму  неактивное состояние
  function disableActiveMode() {
    map.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
    window.form.addFormDisabled();
    removePopup();
    removePinsOnMap();
  }

  // добавляем полям формы атрибут disabled
  window.form.addFormDisabled();

  // навешиваем обработчик кликов на пин
  mapPins.addEventListener('click', onPinClick);

  window.map = {
    startMap: switchToActiveMode,
    disableActiveMode: disableActiveMode,
    addPinsOnMap: addPinsOnMap,
    removePopup: removePopup
  };
})();
