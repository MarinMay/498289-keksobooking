'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  // проверяет цену по диапазону
  function checkPrice(priceValue, inputValue) {
    var priceRangeOnInput = {
      middle: function (price) {
        return price > LOW_PRICE && price < HIGH_PRICE;
      },
      low: function (price) {
        return price < LOW_PRICE;
      },
      high: function (price) {
        return price > HIGH_PRICE;
      }
    };
    return priceRangeOnInput[inputValue](priceValue);
  }

  // фильтреут по типу жилья
  function filtersByHouse(elem) {
    return housingType.value === 'any' ? true : elem.offer.type === housingType.value;
  }

  // фильтрует по цене
  function filtersByPrice(elem) {
    return housingPrice.value === 'any' ? true : checkPrice(elem.offer.price, housingPrice.value);
  }

  // фильтрует по количеству комнат
  function filtersByRooms(elem) {
    return housingRooms.value === 'any' ? true : (elem.offer.rooms + '') === housingRooms.value;
  }

  // фильтрует по количеству гостей
  function filtersByGuest(elem) {
    return housingGuests.value === 'any' ? true : (elem.offer.guests + '') === housingGuests.value;
  }

  // фильтрует по выбранным чекбоксам features
  function filtersByFeatures(elem, inputsChecked) {
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
    var filteredArray = data.filter(filtersByHouse)
        .filter(filtersByPrice)
        .filter(filtersByRooms)
        .filter(filtersByGuest)
        .filter(function (elem) {
          return filtersByFeatures(elem, inputsChecked);
        });

    return filteredArray;
  }

  // фильтрует данные объявлений
  function filtersData() {
    var advertsData = window.data.adverts.slice();
    var inputsFeaturesChecked = getFeaturesChecked();
    var filteredArrayAdverts = getFilteredArray(advertsData, inputsFeaturesChecked);

    return filteredArrayAdverts;
  }

  window.filter = {
    filtersData: filtersData
  };
})();
