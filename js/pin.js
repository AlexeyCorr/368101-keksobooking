'use strict';
(function () {
  var drawArea = document.querySelector('.map__pins');

  // Параметры пина
  var PIN_PARAMS = {
    height: 40,
    width: 40,
    arrowHeight: 18
  };

  // Максимальное колическо объявлений на карте
  var MAX_AMOUNT_ADVERTS = 5;

  // Смещение пина относительно его высоты
  var pinOffsetY = PIN_PARAMS.height / 2 + PIN_PARAMS.arrowHeight;

  // Удаление пинов на карте
  var removePins = function (pins) {
    Array.from(pins).forEach(function (pin) {
      drawArea.removeChild(pin);
    });
    return drawArea;
  };

  // Создание маркеров объявлений
  var createMapPin = function (advert) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = advert.location.x + 'px';
    mapPinElement.style.top = advert.location.y - pinOffsetY + 'px';
    mapPinElement.querySelector('img').src = advert.author.avatar;
    mapPinElement.dataset.index = window.data.adverts.indexOf(advert);

    return mapPinElement;
  };

  // Отрисовка маркеров на карте
  var drawMapPins = function (adverts) {
    var advertsCopy = adverts.slice();
    var fragment = document.createDocumentFragment();
    advertsCopy.length = (advertsCopy.length >= MAX_AMOUNT_ADVERTS) ? MAX_AMOUNT_ADVERTS : advertsCopy.length;

    for (var i = 0; i < advertsCopy.length; i++) {
      fragment.appendChild(createMapPin(advertsCopy[i]));
    }
    drawArea.appendChild(fragment);
  };

  window.pin = {
    drawMapPins: drawMapPins,
    removePins: removePins
  };
})();
