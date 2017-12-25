'use strict';

(function () {
  var NUMBER_OF_ROOMS = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };
  var VALUE_FIELDS = {
    TIMES: ['12:00', '13:00', '14:00'],
    TYPES: ['bungalo', 'flat', 'house', 'palace'],
    ROOMS: ['1', '2', '3', '100'],
    GUESTS: ['1', '2', '3', '0'],
    PRICES: ['0', '1000', '5000', '10000']
  };

  var form = document.querySelector('.notice__form');
  var fieldTitle = form.querySelector('#title');
  var fieldTimeIn = form.querySelector('#timein');
  var fieldTimeOut = form.querySelector('#timeout');
  var fieldTypeOfHouse = form.querySelector('#type');
  var fieldPrice = form.querySelector('#price');
  var fieldNumberOfRooms = form.querySelector('#room_number');
  var fieldNumberOfGuests = form.querySelector('#capacity');
  var submitButton = form.querySelector('.form__submit');
  var fieldsForValidity = [fieldTitle, fieldPrice];

  // Создает кастомное сообщение об ошибки
  var getCustomMessage = function (element) {
    if (element.validity.rangeUnderflow) {
      element.setCustomValidity('Минимально допустимая цена: ' + element.min + '.');
    } else if (element.validity.rangeOverflow) {
      element.setCustomValidity('Максимально допустимая цена: ' + element.max + '.');
    } else if (element.validity.tooShort) {
      element.setCustomValidity('Минимально допустимое количество символов: ' + element.minLength + '.');
    } else if (element.validity.tooLong) {
      element.setCustomValidity('Мaксимально допустимое количество символов: ' + element.maxLength + '.');
    } else if (element.validity.valueMissing) {
      element.setCustomValidity('Заполните это поле');
    } else {
      element.setCustomValidity('');
    }
    element.style.borderColor = 'red';
  };

  //  Добавляет неактивные поля
  var disableGuests = function () {
    var option = fieldNumberOfGuests.options;
    for (var i = 0; i < option.length; i++) {
      option[i].disabled = NUMBER_OF_ROOMS[fieldNumberOfRooms.value].indexOf(option[i].value) < 0;
    }
  };

  // Фунукции для синхронизации значений
  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
    if (element.placeholder) {
      element.placeholder = value;
    }
  };

  // Изменение полей формы
  var changeValueOfFields = function () {

    //  Изменение типа жилья в зависимости от цены
    fieldTypeOfHouse.addEventListener('change', function () {
      window.synchronizeFields(fieldTypeOfHouse, fieldPrice, VALUE_FIELDS.TYPES, VALUE_FIELDS.PRICES, syncValueWithMin);
    });

    // Измерение времени заезда и выезда
    fieldTimeOut.addEventListener('change', function () {
      window.synchronizeFields(fieldTimeOut, fieldTimeIn, VALUE_FIELDS.TIMES, VALUE_FIELDS.TIMES, syncValues);
    });

    fieldTimeIn.addEventListener('change', function () {
      window.synchronizeFields(fieldTimeIn, fieldTimeOut, VALUE_FIELDS.TIMES, VALUE_FIELDS.TIMES, syncValues);
    });

    // Изменение количества гостей в зависимости от количества комнат
    fieldNumberOfRooms.addEventListener('change', function () {
      window.synchronizeFields(fieldNumberOfRooms, fieldNumberOfGuests, VALUE_FIELDS.ROOMS, VALUE_FIELDS.GUESTS, syncValues);
      disableGuests();
    });

  };

  // Проверка валидации
  var checkFieldValidity = function (fields) {
    fields.forEach(function (field) {
      if (!field.validity.valid) {
        getCustomMessage(field);
      } else {
        field.style.borderColor = '#d9d9d3';
      }
    });
  };

  // Создание сообщения об ошибки
  var errorHandler = function (errorMessage) {
    var errorPopup = window.popup.createErrorMessage(errorMessage);
    document.querySelector('body').appendChild(errorPopup);
    window.util.delElemTimeout(errorPopup, 'body', 2000);
  };

  // Сброс значений формы
  var resetForm = function () {
    form.reset();
    syncValueWithMin(fieldPrice, VALUE_FIELDS.PRICES[VALUE_FIELDS.TYPES.indexOf('flat')]);
  };

  // Создание сообщения об успешной отправки данных
  var successHandler = function () {
    var successPopup = window.popup.createSuccessMessage();
    document.querySelector('body').appendChild(successPopup);
    window.util.delElemTimeout(successPopup, 'body', 2000);
    resetForm();
  };

  disableGuests();
  changeValueOfFields();

  // Проверка валидации формы
  submitButton.addEventListener('click', function () {
    checkFieldValidity(fieldsForValidity);
  });

  // Отправка формы
  form.addEventListener('submit', function (event) {
    checkFieldValidity(fieldsForValidity);
    window.backend.save(new FormData(form), successHandler, errorHandler);
    event.preventDefault();
  });
})();
