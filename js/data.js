'use strict';

(function () {

  var successHandler = function (advertsData) {
    window.data.adverts = advertsData;
    window.pin.drawMapPins(window.data.adverts);
  };

  var updateAdverts = function () {
    var mapPins = document.querySelector('.map__pins');
    var filterAdvarts = window.filter(window.data.adverts);
    window.util.delElem(mapPins);
    window.pin.drawMapPins(filterAdvarts);
  };

  var errorHandler = function (errorMessage) {
    var errorPopup = window.messagePopup.error(errorMessage);
    document.querySelector('body').appendChild(errorPopup);
  };

  var loadData = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    load: loadData,
    updateAdverts: updateAdverts
  };

})();
