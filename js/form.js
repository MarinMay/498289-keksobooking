'use strict';
(function () {
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var form = document.querySelector('.notice__form');
  var fieldsets = document.querySelectorAll('.notice__form fieldset');
  var propertyType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var title = document.querySelector('#title');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var address = document.querySelector('#address');
  var submitButton = document.querySelector('.form__submit');
  var resetButton = document.querySelector('.form__reset');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinX = mainPin.offsetLeft;
  var mainPinY = mainPin.offsetTop;
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoHousePreview = document.querySelector('.form__photo-container');

  // добавляет табиндекс лейблам чекбоксов
  function addTabindexLabel(selector) {
    var labels = document.querySelectorAll(selector);
    labels.forEach(function (label) {
      label.tabIndex = '0';
    });
  }

  // добавляет атрибут disabled полям формы
  function addFormDisabled() {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  }

  // удаляет атрибут disabled полям формы
  function removeFormDisabled() {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  }

  // изменение минимальной цены в зависимости от типа жилья
  /* «Лачуга» — минимальная цена за ночь 0;
    «Квартира» — минимальная цена за ночь 1 000;
    «Дом» — минимальная цена 5 000;
    «Дворец» — минимальная цена 10 000;
  */
  var housePrice = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '10000'
  };

  function setMinPrice() {
    price.setAttribute('min', housePrice[propertyType.value]);
    price.placeholder = housePrice[propertyType.value];
  }

  /* 1 комната — «для 1 гостя»
  2 комнаты — «для 2 гостей» или «для 1 гостя»
  3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»
  100 комнат — «не для гостей»*/
  function setLimitGuests() {
    var options = capacity.options;
    var capacityThreeGuest = options[0];
    var capacityTwoGuest = options[1];
    var capacityOneGuest = options[2];
    var capacityNoGuest = options[3];

    [].forEach.call(options, (function (option) {
      option.disabled = false;
    }));

    switch (roomNumber.value) {
      case '1':
        capacity.value = '1';
        capacityTwoGuest.disabled = true;
        capacityThreeGuest.disabled = true;
        capacityNoGuest.disabled = true;
        break;
      case '2':
        capacity.value = '2';
        capacityThreeGuest.disabled = true;
        capacityNoGuest.disabled = true;
        break;
      case '3':
        capacity.value = '3';
        capacityNoGuest.disabled = true;
        break;
      case '100':
        capacity.value = '0';
        capacityOneGuest.disabled = true;
        capacityTwoGuest.disabled = true;
        capacityThreeGuest.disabled = true;
        break;
    }
  }

  // устанавливает значение адреса в форму
  function setAddress(x, y) {
    var addressX;
    var addressY;

    addressX = x;
    addressY = y + window.pin.heightAdjustment;
    address.value = addressX + ', ' + addressY;
  }

  function validatesForm() {
    if (title.value.length < MIN_LENGTH_TITLE || title.value.length > MAX_LENGTH_TITLE) {
      title.style.border = '3px solid red';
      title.addEventListener('change', function () {
        title.style.border = '';
      });
      return false;
    }
    setMinPrice();
    if (!price.value || Number(price.value) < Number(price.min) || Number(price.value) > Number(price.max)) {
      price.style.border = '3px solid red';
      price.addEventListener('change', function () {
        price.style.border = '';
      });
      return false;
    }
    return true;
  }

  function formReset() {
    var photoHouse = photoHousePreview.querySelectorAll('img');
    avatarPreview.src = 'img/muffin.png';
    photoHouse.forEach(function (image) {
      photoHousePreview.removeChild(image);
    });
    form.reset();
    mainPin.style.left = mainPinX + 'px';
    mainPin.style.top = mainPinY + 'px';
    setAddress(mainPinX, mainPinY);
    setMinPrice();
    window.map.disableActiveMode();
  }

  function onClickFormReset(evt) {
    evt.preventDefault();
    formReset();
  }

  function onFormSubmit(evt) {
    validatesForm();
    if (!validatesForm()) {
      return;
    }
    var formData = new FormData(form);
    window.backend.saveForm(formReset, window.backend.onRequestError, formData);
    evt.preventDefault();
  }

  // синхрониация времени заезда и выезда
  function onTimeinChange() {
    timeout.value = timein.value;
  }

  function onTimeoutChange() {
    timein.value = timeout.value;
  }

  // начальное значение адреса - центр главного пина
  setAddress(mainPinX, mainPinY);

  propertyType.addEventListener('change', setMinPrice);

  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);

  setLimitGuests();
  addTabindexLabel('label.feature');
  addTabindexLabel('label.drop-zone');

  roomNumber.addEventListener('change', setLimitGuests);
  submitButton.addEventListener('click', onFormSubmit);
  resetButton.addEventListener('click', onClickFormReset);

  window.form = {
    setAddress: setAddress,
    addFormDisabled: addFormDisabled,
    removeFormDisabled: removeFormDisabled
  };
})();
