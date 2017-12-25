'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var lastTimeout = null;

  window.util = {
    // Выполняет определенное действие при нажатии на escape
    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    // Удаляет класс у элемента
    removeClass: function (element, className) {
      element.classList.remove(className);
    },
    // debounce
    debounce: function (callback, timeout) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, timeout);
    },
    // Удаляет элемент из данного поля с заданной задержкой
    delElemTimeout: function (element, field, time) {
      setTimeout(function () {
        if (element) {
          document.querySelector(field).removeChild(element);
        }
      }, time);
    }
  };
})();
