'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, values1, values2, syncValues) {
    var selectedIndex = values1.indexOf(field1.value);
    syncValues(field2, values2[selectedIndex]);
  };
})();
