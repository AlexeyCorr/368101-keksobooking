'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var lastTimeout = null;

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
    },
    // debounce
    debounce: function (callback, timeout) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, timeout);
    },
  };
})();
