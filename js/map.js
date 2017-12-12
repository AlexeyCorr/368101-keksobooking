'use strict';

// Параметры объявлений
var ADVERT_OPTIONS = {
  amount: 8,
  title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  price: {
    min: 1000,
    max: 1000000
  },
  type: ['flat', 'house', 'bungalo'],
  rooms: {
    min: 1,
    max: 5
  },
  guests: {
    min: 1,
    max: 10
  },
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  location: {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  }
};

var KEY_CODES = {
  enter: 13,
  escape: 27
};

var advertCard = null;
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
var similarAdvert = similarAdvertTemplate.cloneNode(true);
var buttonClose = similarAdvert.querySelector('.popup__close');

// Показывает поле карты
var removeClass = function (element, className) {
  element.classList.remove(className);

  return element;
};

// Получение случайного значения
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Получение случайного заголовка
var getRandomTitle = function () {
  var title = ADVERT_OPTIONS.title;

  return title[getRandomValue(0, title.length - 1)];
};

// Получение координаты по оси Х
var getAddressX = function () {
  var xMin = ADVERT_OPTIONS.location.x.min;
  var xMax = ADVERT_OPTIONS.location.x.max;
  var addressX = getRandomValue(xMin, xMax);
  return addressX;
};

// Получение координаты по оси У
var getAddressY = function () {
  var pinHeight = 43;
  var yMin = ADVERT_OPTIONS.location.y.min;
  var yMax = ADVERT_OPTIONS.location.y.max;
  var addressY = getRandomValue(yMin, yMax) + pinHeight;
  return addressY;
};

// Получение случайной цены
var getRandomPrice = function (priceMin, priceMax) {
  return getRandomValue(priceMin, priceMax);
};

// Получение типа помещения
var getTypeHouse = function () {
  var typeHouse = ADVERT_OPTIONS.type[getRandomValue(0, ADVERT_OPTIONS.type.length - 1)];

  return typeHouse;
};

// Получение случайного числа комнат
var getAmountRooms = function (roomsMin, roomsMax) {
  var amountRooms = getRandomValue(roomsMin, roomsMax);
  return amountRooms;
};

// Получение случайного числа гостей
var getAmountGuests = function (guestsMin, guestsMax) {
  var amountGuests = getRandomValue(guestsMin, guestsMax);
  return amountGuests;
};

// Получение времени заезда
var getTimeCheckIn = function (times) {
  return times[getRandomValue(0, times.length - 1)];
};

// Получение времени выезда
var getTimeCheckOut = function (times) {
  return times[getRandomValue(0, times.length - 1)];
};

// Получение массива особенностей случайной длины
var getListFeatures = function () {
  var featuresList = [];
  var randomLength = getRandomValue(1, ADVERT_OPTIONS.features.length);

  for (var i = 0; i < randomLength; i++) {
    featuresList.push(ADVERT_OPTIONS.features[i]);
  }

  return featuresList;
};

// Получение массива с индексами аватара
var avatarIndex = [];
var getAvatarIndex = function (length) {
  for (var i = 0; i < length; i++) {
    avatarIndex[i] = i + 1;
  }
};

// Получение случайного НЕ повторяющегося индекса аватара
var getArrayItem = function (array) {
  var currentIndex = getRandomValue(0, array.length - 1);
  var arrayItem = array[currentIndex];
  array.splice(currentIndex, 1);

  return arrayItem;
};

// Получение адреса изображения
getAvatarIndex(ADVERT_OPTIONS.amount);
var getAvatarLink = function (array) {
  return 'img/avatars/user0' + getArrayItem(array) + '.png';
};

// Получение предложения с количеством комнат и гостей
var getRoomsAndGuests = function () {
  var amountRooms = getAmountRooms(ADVERT_OPTIONS.rooms.min, ADVERT_OPTIONS.rooms.max);
  var amountGuests = getAmountGuests(ADVERT_OPTIONS.guests.min, ADVERT_OPTIONS.guests.max);
  var amountRoomsAndGuests = '';
  switch (amountRooms) {
    case (2, 3, 4):
      amountRooms = amountRooms + ' комнаты';
      break;
    case 5:
      amountRooms = 5 + ' комнат';
      break;
    default:
      amountRooms = 1 + ' комната';
      break;
  }
  if (amountGuests !== 1) {
    amountGuests = amountGuests + ' гостей';
  } else {
    amountGuests = 1 + ' гостей';
  }
  amountRoomsAndGuests = amountRooms + ' для ' + amountGuests;

  return amountRoomsAndGuests;
};

// Получение Одного объявления
var createAdvert = function () {
  var advert = {
    author: {
      avatar: getAvatarLink(avatarIndex)
    },
    offer: {
      title: getRandomTitle(),
      address: getAddressX() + ', ' + getAddressY(),
      price: getRandomPrice(ADVERT_OPTIONS.price.min, ADVERT_OPTIONS.price.max),
      type: getTypeHouse(),
      rooms: getAmountRooms(ADVERT_OPTIONS.rooms.min, ADVERT_OPTIONS.rooms.max),
      guests: getAmountGuests(ADVERT_OPTIONS.guests.min, ADVERT_OPTIONS.guests.max),
      roomsAndGuests: getRoomsAndGuests(),
      checkin: getTimeCheckIn(ADVERT_OPTIONS.checkin),
      checkout: getTimeCheckOut(ADVERT_OPTIONS.checkout),
      features: getListFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: getAddressX(),
      y: getAddressY()
    }
  };
  return advert;
};

// Создание нового списка особенностей
var createNewListFeatures = function (features, list) {
  list.innerHTML = '';
  features.forEach(function (feature) {
    var currentFeature = document.createElement('li');
    currentFeature.className = 'feature feature--' + feature;
    list.appendChild(currentFeature);
  });
};

// Получение массива с объявлениями
var advertArray = [];
var getAdvertArray = function () {
  for (var i = 0; i < ADVERT_OPTIONS.amount; i++) {
    advertArray[i] = createAdvert();
  }
};

// Создание маркеров объявлений
var createMapPin = function (advert) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = advert.location.x + 'px';
  mapPinElement.style.top = advert.location.y + 'px';
  mapPinElement.querySelector('img').src = advert.author.avatar;
  mapPinElement.dataset.index = advertArray.indexOf(advert);


  return mapPinElement;
};

// Отрисовка маркеров на карте
var drawMapPin = function () {
  var fragment = document.createDocumentFragment();
  var mapPin = document.querySelector('.map__pins');

  for (var i = 0; i < advertArray.length; i++) {
    fragment.appendChild(createMapPin(advertArray[i]));
  }
  mapPin.appendChild(fragment);
};

// Получение типа помещения
var drawTypeHouse = function (typeHouse) {
  switch (typeHouse) {
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
  }
  return typeHouse;
};

// Создание доски с объявлением
var createAdvertBoard = function (advert) {
  similarAdvert.querySelector('img').src = advert.author.avatar;
  similarAdvert.querySelector('h3').textContent = advert.offer.title;
  similarAdvert.querySelector('p small').textContent = advert.offer.address;
  similarAdvert.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD' + '/ночь';
  similarAdvert.querySelector('h4').textContent = drawTypeHouse(advert.offer.type);
  similarAdvert.querySelector('p:nth-of-type(3)').textContent = advert.offer.roomsAndGuests;
  similarAdvert.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  createNewListFeatures(advert.offer.features, similarAdvert.querySelector('.popup__features'));
  similarAdvert.querySelector('p:nth-of-type(5)').textContent = advert.offer.description;

  return similarAdvert;
};

// ------------ ОБРАБОТКА СОБЫТИЙ ----------------

// Активация карты и формы
var onButtonMouseUp = function () {
  var form = document.querySelector('.notice__form');
  var formFields = document.querySelectorAll('fieldset');

  removeClass(form, 'notice__form--disabled');
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = false;
  }
  removeClass(map, 'map--faded');
  getAdvertArray();
  drawMapPin();

  mapPinMain.removeEventListener('mouseup', onButtonMouseUp);
};

mapPinMain.addEventListener('mouseup', onButtonMouseUp);

var hideAdvert = function () {
  if (advertCard) {
    map.removeChild(advertCard);
    advertCard = null;
  }
};

// Переключение пинов
var selectedPin;
var changeTargetPin = function (target) {
  var targetIndex = target.dataset.index;

  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
    hideAdvert();
  }
  selectedPin = target;
  advertCard = createAdvertBoard(advertArray[targetIndex]);
  map.insertBefore(advertCard, map.querySelector('.map__filters-container'));
  selectedPin.classList.add('map__pin--active');
  buttonClose.addEventListener('click', function () {
    popupClose();
  });
  document.addEventListener('keydown', onButtonClosePress);
};

map.addEventListener('click', function (evt) {
  var target = evt.target;

  while (target !== map) {
    if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
      changeTargetPin(target);
      return;
    }
    target = target.parentNode;
  }
});

var popupClose = function () {
  hideAdvert();
  selectedPin.classList.remove('map__pin--active');
  document.removeEventListener('keydown', onButtonClosePress);
};

var onButtonClosePress = function (evt) {
  if (evt.keyCode === KEY_CODES.escape) {
    popupClose();
  }
};

// -------ВАЛИДАЦИЯ
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
      fields[i].setCustomValidity('');
      fields[i].style.borderColor = '#d9d9d3';
    }
  }
};

changeValueOfFields();

// Отправка формы
submitButton.addEventListener('click', function () {
  checkFieldValidity(fieldsForValidity);
});
