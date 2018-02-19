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

  function onFormSubmit(evt) {
    onFormReset();
    evt.preventDefault();
  }

  function onFormReset() {
    form.reset();
    mainPin.style.left = mainPinX + 'px';
    mainPin.style.top = mainPinY + 'px';
    setAddress(mainPinX, mainPinY);
  }

  function validationForm() {
    if (title.value.length < 30 || title.value.length < 30) {
      title.style.outline = '2px solid red';
      return;
    }
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

  setLimitGuests();

  roomNumber.addEventListener('change', setLimitGuests);

  submit.addEventListener('click', function (evt) {
    validationForm();
    setMinPrice();
    window.backend.save(onFormSubmit(evt), window.backend.errorHandler, new FormData(form));
  });

  window.form = {
    setAddress: setAddress
  };
})();
