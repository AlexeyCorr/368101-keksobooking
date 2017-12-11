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
var title = form.querySelector('#title');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var typeHouse = form.querySelector('#type');
var price = form.querySelector('#price');
var roomsNumber = form.querySelector('#room_number');
var guestsNumber = form.querySelector('#capacity');
// var submit = form.querySelector('.form__submit');

// Получить выбранный option1 в зависимости выбранного option2
var getSelectedOption = function (select1, select2) {
  select2.options[select1.selectedIndex].selected = 'selected';
};

// Создает кастомное сообщение об ошибки в цене
var validityPriceValue = function () {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Минимально допустимая цена: ' + price.min + '.');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Максимально допустимая цена: ' + price.max + '.');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Необходимо ввести цену');
  } else {
    price.setCustomValidity('');
  }
};

// Создает кастомное сообщение об ошибки в заголовке
var validityTitleValue = function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Минимально допустимое количество символов: ' + title.minLength + '.');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Мaксимально допустимое количество символов: ' + title.maxLength + '.');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Заполните это поле');
  } else {
    title.setCustomValidity('');
  }
};

//  Добавляет неактивные поля
var disabledGuests = function () {
  Array.prototype.forEach.call(guestsNumber.options, function (guest) {
    if (numbersOfRoom[roomsNumber.value].indexOf(guest.value) >= 0) {
      guest.disabled = false;
    } else {
      guest.disabled = true;
    }
  });
};

var changeEvents = function () {
  //  Изменение типа жилья в зависимости от цены
  typeHouse.addEventListener('change', function () {
    price.min = houseMinPrice[typeHouse.value];
    price.placeholder = price.min;
  });

  // Измерение времени заезда и выезда
  timeOut.addEventListener('change', function () {
    getSelectedOption(timeOut, timeIn);
  });
  timeIn.addEventListener('change', function () {
    getSelectedOption(timeIn, timeOut);
  });

  // Изменение количества гостей в зависимости от количества комнат
  roomsNumber.addEventListener('change', function () {
    getSelectedOption(roomsNumber, guestsNumber);
    disabledGuests();
  });
};

// Окрашивает бордер
var checkValidityField = function (element) {
  for (var i = 0; i < element.length; i++) {
    if (!element[i].validity.valid) {
      element[i].style.border = '2px solid red';
    } else {
      element[i].style.border = '2px solid green';
    }
  }
};
var onBorderInvalid = function () {
  var inputAll = form.querySelector('input');
  var selectAll = form.querySelector('select');
  checkValidityField(inputAll);
  checkValidityField(selectAll);
};

form.addEventListener('invalid', onBorderInvalid);
// Отправка формы
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  price.addEventListener('invalid', function () {
    validityPriceValue();
  });
  title.addEventListener('invalid', function () {
    validityTitleValue();
  });
  onBorderInvalid();
});

changeEvents();
