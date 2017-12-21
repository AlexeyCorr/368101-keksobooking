'use strict';

(function () {

  var successHandler = function (advertsData) {
    window.data.adverts = advertsData;
    window.pin.drawMapPins(window.data.adverts);
  };

  var updateAdverts = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var filterAdvarts = window.filter(window.data.adverts);
    window.pin.removePins(mapPins);
    window.showCard.hideAdvert();
    window.pin.drawMapPins(filterAdvarts);
  };

  var errorHandler = function (errorMessage) {
    var errorPopup = window.messagePopup.createErrorMessage(errorMessage);
    document.querySelector('body').appendChild(errorPopup);
  };

  var loadData = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    loadData: loadData,
    updateAdverts: updateAdverts
  };

})();
