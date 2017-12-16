'use strict';

(function () {
  var advertCard = null;
  var map = document.querySelector('.map');
  // var buttonClose = similarAdvert.querySelector('.popup__close');

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

  // Функция показа объявления
  var selectedPin;
  var showAdvert = function (target, buttonClose) {
    var targetIndex = target.dataset.index;

    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
      hideAdvert();
    }
    selectedPin = target;
    advertCard = window.card.createAdvertBoard(window.data.adverts[targetIndex]);
    map.insertBefore(advertCard, map.querySelector('.map__filters-container'));
    selectedPin.classList.add('map__pin--active');
    buttonClose.addEventListener('click', function () {
      popupClose();
    });
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, popupClose);
    });
  };

  window.showCard = {
    showAdvert: showAdvert
  };
})();
