'use strict';

(function () {
  var colorError = 'rgba(150, 17, 17, 0.7)';
  var colorSuccess = 'rgba(35, 123, 53, 0.7)';
  var popupTimeout = 4000;
  var popup = document.createElement('div');
  var popupTitle = document.createElement('h3');
  var popupText = document.createElement('p');

  var createPopup = function () {
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

    popupTitle.style.fontSize = '20px';
    popupTitle.style.fontWeight = 'bold';
    popupTitle.style.color = 'white';
    popupTitle.style.margin = 0;
    popupTitle.style.padding = '5px';

    popupText.style.fontSize = '16px';
    popupText.style.fontWeight = 'normal';
    popupText.style.color = 'white';
    popupText.style.margin = 0;
    popupText.style.padding = '5px';

    popup.appendChild(popupTitle);
    popup.appendChild(popupText);
  };

  var createErrorMessage = function (errorMessage) {
    createPopup();
    popup.style.backgroundColor = colorError;
    popupTitle.textContent = 'Произошла ошибка =(';
    popupText.textContent = errorMessage;

    setTimeout(function () {
      if (popup) {
        popup.parentNode.removeChild(popup);
      }
    }, popupTimeout);

    return popup;
  };

  var createSuccessMessage = function () {
    createPopup();
    popup.style.backgroundColor = colorSuccess;
    popupTitle.textContent = 'Поздравляю!';
    popupText.textContent = 'Данные были успешно отравлены.';

    setTimeout(function () {
      if (popup) {
        popup.parentNode.removeChild(popup);
      }
    }, popupTimeout);

    return popup;
  };

  window.messagePopup = {
    error: createErrorMessage,
    success: createSuccessMessage
  };

})();
