'use strict';

(function () {

  // Действие при успешной загрузки данных
  var successHandler = function (advertsData) {
    window.data.adverts = advertsData;
    window.pin.insertInMap(window.data.adverts);
  };

  // Обновление массива данных в зависимости от выбранных фильтров
  var updateAdverts = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var filterAdverts = window.filter(window.data.adverts);
    window.pin.removeFromMap(mapPins);
    window.showCard.removeAdvert();
    window.pin.insertInMap(filterAdverts);
  };

  // Действие при возникновении ошибок
  var errorHandler = function (errorMessage) {
    var errorPopup = window.popup.createErrorMessage(errorMessage);
    document.querySelector('body').appendChild(errorPopup);
    window.util.delElemTimeout(errorPopup, 'body', 2000);
  };

  // Загружает данные
  var loadData = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    loadData: loadData,
    updateAdverts: updateAdverts
  };

})();
