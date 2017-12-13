'use strict';

(function () {
  var advertCard = null;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Активация карты и формы
  var onButtonMouseUp = function () {
    var form = document.querySelector('.notice__form');
    var formFields = document.querySelectorAll('fieldset');

    window.util.removeClass(form, 'notice__form--disabled');
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = false;
    }
    window.util.removeClass(map, 'map--faded');
    window.data.getAdvertArray();
    window.pin.drawMapPin();

    mapPinMain.removeEventListener('mouseup', onButtonMouseUp);
  };

  mapPinMain.addEventListener('mouseup', onButtonMouseUp);

  var hideAdvert = function () {
    if (advertCard) {
      map.removeChild(advertCard);
      advertCard = null;
    }
  };

  var popupClose = function () {
    hideAdvert();
    selectedPin.classList.remove('map__pin--active');
    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, popupClose);
    });
  };

  // Переключение пинов
  var selectedPin;
  var changeTargetPin = function (target) {
    var targetIndex = target.dataset.index;

    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
      hideAdvert();
    }
    selectedPin = target;
    advertCard = window.card.createAdvertBoard(window.data.advertArray[targetIndex]);
    map.insertBefore(advertCard, map.querySelector('.map__filters-container'));
    selectedPin.classList.add('map__pin--active');
    window.card.buttonClose.addEventListener('click', function () {
      popupClose();
    });
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, popupClose);
    });
  };

  map.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== map) {
      if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
        changeTargetPin(target);
        return;
      }
      target = target.parentNode;
    }
  });
})();
