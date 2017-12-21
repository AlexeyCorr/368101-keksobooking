'use strict';
(function () {

  // Параметры пина
  var PIN_PARAMS = {
    height: 40,
    width: 40,
    arrowHeight: 18
  };

  var MAX_AMOUNT_PINS = 5;

  var pinOffsetY = PIN_PARAMS.height / 2 + PIN_PARAMS.arrowHeight;

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
    var mapPin = document.querySelector('.map__pins');

    for (var i = 0; i < MAX_AMOUNT_PINS; i++) {
      fragment.appendChild(createMapPin(adverts[i]));
    }
    mapPin.appendChild(fragment);
  };

  window.pin = {
    drawMapPins: drawMapPins
  };
})();
