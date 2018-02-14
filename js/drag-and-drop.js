'use strict';
var mainPin = document.querySelector('.map__pin--main');
var minCoords = 150;
var maxCoords = 500;

function constraintsY(Ycoord) {
  if (Ycoord < minCoords) {
    Ycoord = minCoords;
  }
  if (Ycoord > maxCoords) {
    Ycoord = maxCoords;
  }
  return Ycoord;
}

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();


    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    var newY = mainPin.offsetTop - shift.y;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (constraintsY(newY)) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
