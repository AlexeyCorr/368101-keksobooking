'use strict';
(function () {
  // Параметры пина
  var PIN_PARAMS = {
    HEIGHT: 40,
    WIDTH: 40,
    ARROW_HEIGHT: 18
  };
  // Максимальное колическо объявлений на карте
  var MAX_AMOUNT_ADVERTS = 5;
  // Смещение пина относительно его высоты
  var PIN_OFFSET_Y = PIN_PARAMS.HEIGHT / 2 + PIN_PARAMS.ARROW_HEIGHT;

  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  // var mapPinElement = mapPinTemplate.cloneNode(true);
  var drawArea = document.querySelector('.map__pins');

  // Создание маркеров объявлений
  var createMapPin = function (advert) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = advert.location.x + 'px';
    mapPinElement.style.top = advert.location.y - PIN_OFFSET_Y + 'px';
    mapPinElement.querySelector('img').src = advert.author.avatar;
    mapPinElement.dataset.index = window.data.adverts.indexOf(advert);

    return mapPinElement;
  };

  // Отрисовка маркеров на карте
  var insertInMap = function (adverts) {
    var advertsCopy = adverts.slice();
    var fragment = document.createDocumentFragment();

    advertsCopy.length = (advertsCopy.length >= MAX_AMOUNT_ADVERTS) ? MAX_AMOUNT_ADVERTS : advertsCopy.length;

    advertsCopy.forEach(function (item) {
      fragment.appendChild(createMapPin(item));
    });

    drawArea.appendChild(fragment);
  };

  // Удаление пинов на карте
  var removeFromMap = function (pins) {
    Array.from(pins).forEach(function (pin) {
      drawArea.removeChild(pin);
    });
    return drawArea;
  };

  window.pin = {
    insertInMap: insertInMap,
    removeFromMap: removeFromMap
  };
})();
