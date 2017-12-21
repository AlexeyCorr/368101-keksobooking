'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var arrayCopy = [];

  var DEBOUNCE_INTERVAL = 500;

  var LIMIT_PRICE = {
    min: 10000,
    max: 50000
  };

  var priceRange = {
    low: function (price) {
      return price < LIMIT_PRICE.min;
    },
    middle: function (price) {
      return price >= LIMIT_PRICE.min && price < LIMIT_PRICE.max;
    },
    high: function (price) {
      return price >= LIMIT_PRICE.max;
    }
  };

  // Сортировка по цене
  var filterByPrice = function (adverts, itemValue) {
    return adverts.filter(function (item) {
      return priceRange[itemValue](item.offer.price);
    });
  };
  // Сортировка по значению
  var filterByValue = function (adverts, itemValue, itemType) {
    return adverts.filter(function (item) {
      return item.offer[itemType].toString() === itemValue;
    });
  };

  // Сортировка по особенностям
  var filterByFeatures = function (adverts, itemFeature) {
    return adverts.filter(function (item) {
      return item.offer.features.indexOf(itemFeature) !== -1;
    });
  };

  // Получение отфильтрованного массива данных
  var getFilteredArray = function (originArray) {
    var checkedFuetures = filterForm.querySelectorAll('#housing-features input[type="checkbox"]:checked');
    var filterFields = filterForm.querySelectorAll('.map__filter');

    var activeFilters = Array.from(filterFields).forEach(function (filter) {
      return filter.value !== 'any';
    });

    arrayCopy = originArray.slice();

    activeFilters.forEach(function (filter) {
      var typeFilter = filter.id.split('-')[1];
      arrayCopy = (typeFilter === 'price') ? filterByPrice(arrayCopy, filter.value) : filterByValue(arrayCopy, filter.value, typeFilter);
    });

    checkedFuetures.forEach(function (item) {
      arrayCopy = filterByFeatures(arrayCopy, item.value);
    });
    return arrayCopy;
  };

  filterForm.addEventListener('change', function () {
    window.util.debounce(window.data.updateAdverts, DEBOUNCE_INTERVAL);
  });

  window.filter = getFilteredArray;
})();
