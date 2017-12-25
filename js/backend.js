'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var ERROR_TEXTS = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    403: 'Доступ запрещен',
    404: 'Ничего не найдено',
    500: 'Внутренняя ошибка сервера'
  };
  var CODE_OK = 200;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status + ' ' + ERROR_TEXTS[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  // Загрузка данных с сервера
  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data', true);
    xhr.send();
  };

  // Отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('POST', SERVER_URL, true);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
