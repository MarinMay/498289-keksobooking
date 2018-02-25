'use strict';
(function () {
  var MIN_COORDS_Y = 115;
  var MAX_COORDS_Y = 465;
  var MIN_COORDS_X = 0;
  var mainPin = document.querySelector('.map__pin--main');
  var maxCoordsX = document.querySelector('.map__pins').offsetWidth;

  // проверка ограничения координат
  function setLimitsY(Ycoord) {
    if (Ycoord < MIN_COORDS_Y) {
      Ycoord = MIN_COORDS_Y;
    }
    if (Ycoord > MAX_COORDS_Y) {
      Ycoord = MAX_COORDS_Y;
    }
    return Ycoord;
  }

  function setLimitsX(Xcoord) {
    if (Xcoord < MIN_COORDS_X) {
      Xcoord = MIN_COORDS_X;
    }
    if (Xcoord > maxCoordsX) {
      Xcoord = maxCoordsX;
    }
    return Xcoord;
  }

  function onMainPinMouseDown(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      var newY = mainPin.offsetTop - shift.y;
      var newX = mainPin.offsetLeft - shift.x;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (setLimitsY(newY)) + 'px';
      mainPin.style.left = (setLimitsX(newX)) + 'px';

      window.form.setAddress(setLimitsX(newX), setLimitsY(newY));
    }

    function onMouseUp(upEvt) {
      window.map.startMap();
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  mainPin.addEventListener('mousedown', onMainPinMouseDown);
})();
