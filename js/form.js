'use strict';
(function () {
  var propertyType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var submit = document.querySelector('.form__submit');

  // изменение минимальной цены в зависимости от типа жилья
  var setMinPrice = function () {
    if (propertyType.value === 'flat') {
      price.setAttribute('min', '1000');
      price.placeholder = '1000';
    }
    if (propertyType.value === 'bungalo') {
      price.setAttribute('min', '0');
      price.placeholder = '0';
    }
    if (propertyType.value === 'house') {
      price.min = '5000';
      price.placeholder = '5000';
    }
    if (propertyType.value === 'palace') {
      price.setAttribute('min', '10000');
      price.placeholder = '10000';
    }
  };

  /* 1 комната — «для 1 гостя»
  2 комнаты — «для 2 гостей» или «для 1 гостя»
  3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»
  100 комнат — «не для гостей»*/

  // добавляет сообщение ошибки
  function sendMessage(valid, message) {
    if (valid) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity(message);
    }
  }

  // проверка количества гостей в зависимости от комнат
  function checkValidityCapacity() {
    var isValid = capacity.validity.valid;
    if (roomNumber.value === '1') {
      isValid = capacity.value === '1';
      sendMessage(isValid, 'Для одной комнаты один гость');
    }
    if (roomNumber.value === '2') {
      isValid = capacity.value === '1' || capacity.value === '2';
      sendMessage(isValid, 'Для двух комнат один или два гостя');
    }
    if (roomNumber.value === '3') {
      isValid = capacity.value === '1' || capacity.value === '2' || capacity.value === '3';
      sendMessage(isValid, 'Для трех комнат один, два или гостя');
    }
    if (roomNumber.value === '100') {
      isValid = capacity.value === '0';
      sendMessage(isValid, 'Сто комнат не для гостей');
    }
    return false;
  }

  propertyType.addEventListener('change', function () {
    setMinPrice();
  });

  // синхрониация времени заезда и выезда
  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  roomNumber.addEventListener('change', checkValidityCapacity);

  capacity.addEventListener('change', checkValidityCapacity);

  submit.addEventListener('click', function () {
    checkValidityCapacity();
    setMinPrice();
  });
})();
