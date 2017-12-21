'use strict';
(function () {
  var mapPinsField = document.querySelector('.map__pins');

  // Параметры пина
  var PIN_PARAMS = {
    height: 40,
    width: 40,
    arrowHeight: 18
  };

  var MAX_AMOUNT_ADVERTS = 5;

  var pinOffsetY = PIN_PARAMS.height / 2 + PIN_PARAMS.arrowHeight;

  // Удаление пинов на карте
  var hidePins = function (pins) {
    Array.from(pins).forEach(function (pin) {
      mapPinsField.removeChild(pin);
    });
    return mapPinsField;
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
    var fragment = document.createDocumentFragment();
    adverts.length = (adverts.length >= MAX_AMOUNT_ADVERTS) ? MAX_AMOUNT_ADVERTS : adverts.length;

    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(createMapPin(adverts[i]));
    }
    mapPinsField.appendChild(fragment);
  };

  window.pin = {
    drawMapPins: drawMapPins,
    hidePins: hidePins
  };
})();
