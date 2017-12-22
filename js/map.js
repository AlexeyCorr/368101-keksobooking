'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var fieldAddress = document.querySelector('#address');
  var mapUnlocked = false;

  var PIN_MAIN_PARAMS = {
    height: 66,
    width: 66,
    arrowHeight: 22
  };
  var LOCATION_LIMITATIONS = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };

  // Смещение пина
  var pinOffsetY = PIN_MAIN_PARAMS.height / 2 + PIN_MAIN_PARAMS.arrowHeight;

  // Ограничения координат
  var MAP_CONTAINER = {
    top: LOCATION_LIMITATIONS.y.min + pinOffsetY,
    bottom: LOCATION_LIMITATIONS.y.max + pinOffsetY,
    left: LOCATION_LIMITATIONS.x.min,
    right: LOCATION_LIMITATIONS.x.max
  };

  // Разблокирование карты
  var unlockMap = function () {
    var form = document.querySelector('.notice__form');
    var formFields = form.querySelectorAll('fieldset');

    window.util.removeClass(map, 'map--faded');
    window.util.removeClass(form, 'notice__form--disabled');
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = false;
    }
    mapUnlocked = true;
  };

  // Реализация перетаскивания
  mapPinMain.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      var currentCoors = {
        x: mapPinMain.offsetLeft - shift.x,
        y: (mapPinMain.offsetTop - shift.y)
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
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      mapPinMain.style.top = currentCoors.y + 'px';
      mapPinMain.style.left = currentCoors.x + 'px';

      fieldAddress.value = 'x: ' + currentCoors.x + 'px, y: ' + (currentCoors.y - pinOffsetY) + 'px';
    };

    // Активация карты и формы
    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      if (!mapUnlocked) {
        unlockMap();
        window.data.loadData();
      }

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

})();
