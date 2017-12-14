'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    // Выполняет определенное действие при нажатии на escape
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    // Удаляет класс у элемента
    removeClass: function (element, className) {
      element.classList.remove(className);

      return element;
    }
  };
})();
