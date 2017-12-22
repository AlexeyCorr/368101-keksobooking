'use strict';

(function () {
  var colorError = 'rgba(150, 17, 17, 0.7)';
  var colorSuccess = 'rgba(35, 123, 53, 0.7)';

  var createPopup = function (colorBackground, title, text) {
    var popup = document.createElement('div');
    var popupTitle = document.createElement('h3');
    var popupText = document.createElement('p');
    popup.style.className = 'popup-message';
    popup.style.zIndex = 50;
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '500px';
    popup.style.borderRadius = '15px';
    popup.style.padding = '10px';
    popup.style.textAlign = 'center';
    popup.style.backgroundColor = colorBackground;
    popup.className = 'message-popup';

    popupTitle.style.fontSize = '20px';
    popupTitle.style.fontWeight = 'bold';
    popupTitle.style.color = 'white';
    popupTitle.style.margin = 0;
    popupTitle.style.padding = '5px';
    popupTitle.textContent = title;

    popupText.style.fontSize = '16px';
    popupText.style.fontWeight = 'normal';
    popupText.style.color = 'white';
    popupText.style.margin = 0;
    popupText.style.padding = '5px';
    popupText.textContent = text;

    popup.appendChild(popupTitle);
    popup.appendChild(popupText);

    return popup;
  };

  // Создание окна с сообщением об ошибке
  var createErrorMessage = function (errorMessage) {
    return createPopup(colorError, 'Произошла ошибка =(', errorMessage);
  };

  // Создание окна с сообщением об успехе
  var createSuccessMessage = function () {
    return createPopup(colorSuccess, 'Поздравляю!', 'Данные были успешно отравлены.');
  };

  window.messagePopup = {
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };

})();
