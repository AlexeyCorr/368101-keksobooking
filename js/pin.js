'use strict';
(function () {
  // Создание маркеров объявлений
  var createMapPin = function (advert) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = advert.location.x + 'px';
    mapPinElement.style.top = advert.location.y + 'px';
    mapPinElement.querySelector('img').src = advert.author.avatar;
    mapPinElement.dataset.index = window.map.advertArray.indexOf(advert);

    return mapPinElement;
  };

  window.pin = {
    // Отрисовка маркеров на карте
    drawMapPin: function () {
      var fragment = document.createDocumentFragment();
      var mapPin = document.querySelector('.map__pins');

      for (var i = 0; i < window.map.advertArray.length; i++) {
        fragment.appendChild(createMapPin(window.map.advertArray[i]));
      }
      mapPin.appendChild(fragment);
    }
  };
})();
