'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var fieldAddress = document.querySelector('#address');
  var PIN_MAIN_PARAMS = {
    height: 66,
    width: 66,
    arrowHeight: 22
  };

  // Смещение пина
  var pinOffset = {
    x: PIN_MAIN_PARAMS.width / 2,
    y: PIN_MAIN_PARAMS.height / 2 + PIN_MAIN_PARAMS.arrowHeight
  };

  // Ограничения координат
  var MAP_CONTAINER = {
    top: window.data.location.y.min + pinOffset.y,
    bottom: window.data.location.y.max + pinOffset.y,
    left: window.data.location.x.min - pinOffset.x,
    right: window.data.location.x.max + pinOffset.x
  };

  // Реализация перетаскивания
  mapPinMain.addEventListener('mousedown', function (evt) {
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

      var currentCoors = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (currentCoors.x < MAP_CONTAINER.left) {
        currentCoors.x = MAP_CONTAINER.left;
      }
      if (currentCoors.x > MAP_CONTAINER.right) {
        currentCoors.x = MAP_CONTAINER.right;
      }
      if (currentCoors.y < MAP_CONTAINER.top) {
        currentCoors.y = MAP_CONTAINER.top;
      }
      if (currentCoors.y > MAP_CONTAINER.bottom) {
        currentCoors.y = MAP_CONTAINER.bottom;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = currentCoors.y + 'px';
      mapPinMain.style.left = currentCoors.x + 'px';

      fieldAddress.value = 'x: ' + currentCoors.x + 'px, y: ' + currentCoors.y + 'px';
    };
    // Активация карты и формы
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var form = document.querySelector('.notice__form');
      var formFields = document.querySelectorAll('fieldset');

      window.util.removeClass(form, 'notice__form--disabled');
      for (var i = 0; i < formFields.length; i++) {
        formFields[i].disabled = false;
      }
      window.util.removeClass(map, 'map--faded');
      window.pin.drawMapPins();

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

})();
