'use strict';
(function () {
  var form = document.querySelector('.notice__form');
  var propertyType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var title = document.querySelector('#title');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var address = document.querySelector('#address');
  var submit = document.querySelector('.form__submit');
  var reset = document.querySelector('.form__reset');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinX = mainPin.offsetLeft;
  var mainPinY = mainPin.offsetTop;

  // изменение минимальной цены в зависимости от типа жилья
  /* «Лачуга» — минимальная цена за ночь 0;
    «Квартира» — минимальная цена за ночь 1 000;
    «Дом» — минимальная цена 5 000;
    «Дворец» — минимальная цена 10 000;
  */
  function setMinPrice() {
    switch (propertyType.value) {
      case 'flat':
        price.setAttribute('min', '1000');
        price.placeholder = '1000';
        break;
      case 'bungalo':
        price.setAttribute('min', '0');
        price.placeholder = '0';
        break;
      case 'house':
        price.min = '5000';
        price.placeholder = '5000';
        break;
      case 'palace':
        price.setAttribute('min', '10000');
        price.placeholder = '10000';
        break;
    }
  }

  /* 1 комната — «для 1 гостя»
  2 комнаты — «для 2 гостей» или «для 1 гостя»
  3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»
  100 комнат — «не для гостей»*/
  function setLimitGuests() {
    var capacityThreeGuest = capacity.options[0];
    var capacityTwoGuest = capacity.options[1];
    var capacityOneGuest = capacity.options[2];
    var capacityNoGuest = capacity.options[3];

    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = false;
    }

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

  function setAddress(x, y) {
    var addressX;
    var addressY;

    addressX = x;
    addressY = y + window.pin.heightAdjustment;
    address.value = addressX + ', ' + addressY;
  }

  function validationForm() {
    if (title.value.length < 30 || title.value.length < 30) {
      title.style.border = '3px solid red';
      title.addEventListener('change', function () {
        title.style.border = '';
      });
      return false;
    }
    setMinPrice();
    if (!price.value || price.value < price.min) {
      price.style.border = '3px solid red';
      price.addEventListener('change', function () {
        price.style.border = '';
      });
      return false;
    }
    return true;
  }

  function onFormReset(evt) {
    evt.preventDefault();
    form.reset();
    mainPin.style.left = mainPinX + 'px';
    mainPin.style.top = mainPinY + 'px';
    setAddress(mainPinX, mainPinY);
    window.map.disableActiveMode();
  }

  function onFormSubmit(evt) {
    validationForm();
    if (!validationForm()) {
      return;
    }
    var formData = new FormData(form);
    window.backend.save(onFormReset(evt), window.backend.errorHandler, formData);
  }

  // начальное значение адреса - центр главного пина
  setAddress(mainPinX, mainPinY);

  propertyType.addEventListener('change', setMinPrice);

  // синхрониация времени заезда и выезда
  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });
  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  // валидация числа гостей
  setLimitGuests();
  roomNumber.addEventListener('change', setLimitGuests);

  submit.addEventListener('click', function (evt) {
    onFormSubmit(evt);
  });

  reset.addEventListener('click', function (evt) {
    onFormReset(evt);
  });

  window.form = {
    setAddress: setAddress
  };
})();
