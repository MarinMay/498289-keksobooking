'use strict';
(function () {
  var propertyType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var address = document.querySelector('#address');
  var submit = document.querySelector('.form__submit');
  var mainPin = document.querySelector('.map__pin--main');

  // изменение минимальной цены в зависимости от типа жилья
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

  // начальное значение адреса - центр главного пина
  address.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

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

  submit.addEventListener('click', function () {
    setMinPrice();
  });

  window.form = {
    address: address
  };
})();
