'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filteredAdverts = [];

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
  var getFilteredAdverts = function (originAdverts) {
    var checkedFeatures = filterForm.querySelectorAll('#housing-features input[type="checkbox"]:checked');
    var filterFields = filterForm.querySelectorAll('.map__filter');

    var activeFilters = Array.from(filterFields).filter(function (filter) {
      return filter.value !== 'any';
    });

    filteredAdverts = originAdverts.slice();

    activeFilters.forEach(function (filter) {
      var typeFilter = filter.id.split('-')[1];
      filteredAdverts = (typeFilter === 'price') ? filterByPrice(filteredAdverts, filter.value) : filterByValue(filteredAdverts, filter.value, typeFilter);
    });

    checkedFeatures.forEach(function (item) {
      filteredAdverts = filterByFeatures(filteredAdverts, item.value);
    });
    return filteredAdverts;
  };

  filterForm.addEventListener('change', function () {
    window.util.debounce(window.data.updateAdverts, DEBOUNCE_INTERVAL);
  });

  window.filter = getFilteredAdverts;
})();
