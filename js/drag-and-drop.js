'use strict';
var mainPin = document.querySelector('.map__pin--main');
var minCoordsY = 150;
var maxCoordsY = 500;
var minCoordsX = 0;
var maxCoordsX = document.querySelector('.map__pins').offsetWidth;


function constraintsY(Ycoord) {
  if (Ycoord < minCoordsY) {
    Ycoord = minCoordsY;
  }
  if (Ycoord > maxCoordsY) {
    Ycoord = maxCoordsY;
  }
  return Ycoord;
}

function constraintsX(Xcoord) {
  if (Xcoord < minCoordsX) {
    Xcoord = minCoordsX;
  }
  if (Xcoord > maxCoordsX) {
    Xcoord = maxCoordsX;
  }
  return Xcoord;
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
    var newX = mainPin.offsetLeft - shift.x;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (constraintsY(newY)) + 'px';
    mainPin.style.left = (constraintsX(newX)) + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
