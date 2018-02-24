'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  // проверяет цену по диапазону
  function checkPrice(priceValue, inputValue) {
    var priceRangeOnInput = {
      'middle': function (price) {
        return price > 10000 && price < 50000;
      },
      'low': function (price) {
        return price < 10000;
      },
      'high': function (price) {
        return price > 50000;
      }
    };
    return priceRangeOnInput[inputValue](priceValue);
  }

  // фильтреут по типу жилья
  function filterHouse(elem) {
    return housingType.value === 'any' ? true : elem.offer.type === housingType.value;
  }

  // фильтрует по цене
  function filterPrice(elem) {
    return housingPrice.value === 'any' ? true : checkPrice(elem.offer.price, housingPrice.value);
  }

  // фильтрует по количеству комнат
  function filterRooms(elem) {
    return housingRooms.value === 'any' ? true : (elem.offer.rooms + '') === housingRooms.value;
  }

  // фильтрует по количеству гостей
  function filterGuest(elem) {
    return housingGuests.value === 'any' ? true : (elem.offer.guests + '') === housingGuests.value;
  }

  // фильтрует по выбранным чекбоксам features
  function filterFeatures(elem, inputsChecked) {
    var features = elem.offer.features;
    var isDataTrueOnFeatures = inputsChecked.every(function (elemFeatures) {
      return features.indexOf(elemFeatures) !== -1;
    });
    return isDataTrueOnFeatures;
  }

  // получает checked input
  function getFeaturesChecked() {
    var inputsFeatures = document.querySelectorAll('#housing-features input');
    var inputsFeaturesArray = Array.prototype.slice.call(inputsFeatures);
    var inputsChecked = [];

    inputsFeaturesArray.reduce(function (previousData, item) {
      var valueInput = item.value;
      if (item.checked) {
        inputsChecked.push(valueInput);
      }
    }, 0);
    return inputsChecked;
  }

  // получает отфильтрованный массив
  function getFilteredArray(data, inputsChecked) {
    var filteredArray = data.filter(filterHouse)
        .filter(filterPrice)
        .filter(filterRooms)
        .filter(filterGuest)
        .filter(function (elem) {
          return filterFeatures(elem, inputsChecked);
        });

    return filteredArray;
  }

  // фильтрует данные объявлений
  function filtration() {
    var advertsData = window.data.adverts.slice();
    var inputsFeaturesChecked = getFeaturesChecked();
    var filteredArrayAdverts = getFilteredArray(advertsData, inputsFeaturesChecked);

    return filteredArrayAdverts;
  }

  window.filter = {
    filteredData: filtration
  };
})();
