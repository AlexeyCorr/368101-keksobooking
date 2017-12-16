'use strict';

(function () {
  var houseMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var numbersOfRoom = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
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

  // Получить выбранный option1 в зависимости выбранного option2
  var getSelectedOption = function (select1, select2) {
    select2.options[select1.selectedIndex].selected = 'selected';
  };

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
      if (numbersOfRoom[fieldNumberOfRooms.value].indexOf(option[i].value) >= 0) {
        option[i].disabled = false;
      } else {
        option[i].disabled = true;
      }
    }
  };

  //
  var changeValueOfFields = function () {
    //  Изменение типа жилья в зависимости от цены
    fieldTypeOfHouse.addEventListener('change', function () {
      fieldPrice.min = houseMinPrice[fieldTypeOfHouse.value];
      fieldPrice.placeholder = fieldPrice.min;
    });

    // Измерение времени заезда и выезда
    fieldTimeOut.addEventListener('change', function () {
      getSelectedOption(fieldTimeOut, fieldTimeIn);
    });
    fieldTimeIn.addEventListener('change', function () {
      getSelectedOption(fieldTimeIn, fieldTimeOut);
    });

    // Изменение количества гостей в зависимости от количества комнат
    fieldNumberOfRooms.addEventListener('change', function () {
      getSelectedOption(fieldNumberOfRooms, fieldNumberOfGuests);
      disableGuests();
    });
  };

  // Проверка валидации
  var checkFieldValidity = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].validity.valid) {
        getCustomMessage(fields[i]);
      } else {
        fields[i].style.borderColor = '#d9d9d3';
      }
    }
  };

  changeValueOfFields();

  // Отправка формы
  submitButton.addEventListener('click', function () {
    checkFieldValidity(fieldsForValidity);
  });
})();
