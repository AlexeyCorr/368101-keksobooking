'use strict';

(function () {
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
    window.data.adverts;
    window.pin.drawMapPin();

    mapPinMain.removeEventListener('mouseup', onButtonMouseUp);
  };

  mapPinMain.addEventListener('mouseup', onButtonMouseUp);
})();
