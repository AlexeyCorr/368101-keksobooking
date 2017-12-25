'use strict';

(function () {
  var PIN_MAIN_PARAMS = {
    HEIGHT: 66,
    WIDTH: 66,
    ARROW_HEIGHT: 22
  };
  var LOCATION_LIMITATIONS = {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 100,
      MAX: 500
    }
  };
  // Смещение пина
  var PIN_OFFSET_Y = PIN_MAIN_PARAMS.HEIGHT / 2 + PIN_MAIN_PARAMS.ARROW_HEIGHT;
  // Ограничения координат
  var MAP_CONTAINER = {
    TOP: LOCATION_LIMITATIONS.Y.MIN + PIN_OFFSET_Y,
    BOTTOM: LOCATION_LIMITATIONS.Y.MAX + PIN_OFFSET_Y,
    LEFT: LOCATION_LIMITATIONS.X.MIN,
    RIGHT: LOCATION_LIMITATIONS.X.MAX
  };

  window.map = document.querySelector('.map');
  var mapPinMain = window.map.querySelector('.map__pin--main');
  var fieldAddress = document.querySelector('#address');
  var form = document.querySelector('.notice__form');
  var formFields = form.querySelectorAll('fieldset');
  var mapUnlocked = false;

  // Разблокирование карты
  var unlockMap = function () {
    window.util.removeClass(window.map, 'map--faded');
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

      if (currentCoors.x < MAP_CONTAINER.LEFT) {
        currentCoors.x = MAP_CONTAINER.LEFT;
      }
      if (currentCoors.x > MAP_CONTAINER.RIGHT) {
        currentCoors.x = MAP_CONTAINER.RIGHT;
      }
      if (currentCoors.y < MAP_CONTAINER.TOP) {
        currentCoors.y = MAP_CONTAINER.TOP;
      }
      if (currentCoors.y > MAP_CONTAINER.BOTTOM) {
        currentCoors.y = MAP_CONTAINER.BOTTOM;
      }

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      mapPinMain.style.top = currentCoors.y + 'px';
      mapPinMain.style.left = currentCoors.x + 'px';

      fieldAddress.value = 'x: ' + currentCoors.x + 'px, y: ' + (currentCoors.y - PIN_OFFSET_Y) + 'px';
    };

    // Активация карты и формы
    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      if (!mapUnlocked) {
        unlockMap();
        window.data.loadData();
      }

      window.map.removeEventListener('mousemove', onMouseMove);
      window.map.removeEventListener('mouseup', onMouseUp);
    };

    window.map.addEventListener('mousemove', onMouseMove);
    window.map.addEventListener('mouseup', onMouseUp);
  });

})();
