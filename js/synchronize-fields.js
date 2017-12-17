'use strict';

(function () {
  window.synchronizeFields = function (fieldOne, fieldTwo, valuesOneField, valuesTwoField, syncValues) {
    var selectedIndex = valuesOneField.indexOf(fieldOne.value);
    syncValues(fieldTwo, valuesTwoField[selectedIndex]);
  };
})();
