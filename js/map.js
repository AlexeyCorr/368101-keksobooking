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

// Показывает поле карты
var removeClass = function (className) {
  var map = document.querySelector('.map');
  map.classList.remove(className);

  return map;
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
  var type = ADVERT_OPTIONS.type;
  var typeHouse = type[getRandomValue(0, type.length - 1)];
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
  var featuresList = ADVERT_OPTIONS.features;
  featuresList.length = getRandomValue(1, featuresList.length);

  return featuresList;
};

// Получение массива с индексами аватара
var avatarIndex = [];
var getAvatarIndex = function (length) {
  for (var i = 0; i < length; i++) {
    avatarIndex[i] = '0' + (i + 1);
  }
  return avatarIndex;
};

// Получение случайного НЕ повторяющегося индекса аватара
var gatArrayItem = function (array) {
  var currentIndex = getRandomValue(0, array.length - 1);
  var arrayItem = array[currentIndex];
  array.splice(currentIndex, 1);
  return arrayItem;
};

// Получение адреса изображения
getAvatarIndex(ADVERT_OPTIONS.amount);
var getAvatarLink = function (array) {
  return 'img/avatars/user' + gatArrayItem(array) + '.png';
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

// Получение массива с объявлениями
var advertArray = [];
var getAdvertArray = function () {
  for (var i = 0; i < ADVERT_OPTIONS.amount; i++) {
    advertArray[i] = createAdvert();
  }
  return advertArray;
};

// Создание маркеров объявлений
var createMapPin = function (advert) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  for (var i = 0; i < advertArray.length; i++) {
    // mapPinElement.style.left = advert.location.x + 'px;';
    // mapPinElement.style.top = advert.location.y + 'px;';
    mapPinElement.setAttribute('style', 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;');
    mapPinElement.querySelector('img').src = advert.author.avatar;
  }
  // console.log(mapPinElement);
  return mapPinElement;
};

// Отрисовка маркеров на карте
var drawMapPin = function () {
  var fragment = document.createDocumentFragment();
  var mapPin = document.querySelector('.map__pins');

  for (var i = 0; i < advertArray.length; i++) {
    fragment.appendChild(createMapPin(advertArray[i]));
  }
  return mapPin.appendChild(fragment);
};

// Создание доски с объявлением
var createAdvertBoard = function (array) {
  var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
  var similarAdvert = similarAdvertTemplate.cloneNode(true);

  similarAdvert.querySelector('h3').textContent = array.offer.title;
  similarAdvert.querySelector('p small').textContent = array.offer.address;
  similarAdvert.querySelector('.popup__price').textContent = array.offer.price + ' \u20BD' + '/ночь';
  similarAdvert.querySelector('h4').textContent = array.offer.type;
  similarAdvert.querySelector('p:nth-of-type(3)').textContent = array.offer.roomsAndGuests;
  similarAdvert.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
  // features
  similarAdvert.querySelector('p:nth-of-type(5)').textContent = array.offer.description;

  return similarAdvert;
};

// Отрисовка объявлений
var drawAdvert = function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  // var mapContainer = document.querySelector('.map__filters-container');

  for (var i = 0; i < advertArray.length; i++) {
    fragment.appendChild(createAdvertBoard(advertArray[i]));
  }

  return map.appendChild(fragment);
};

removeClass('map--faded');

getAdvertArray();

drawMapPin();

drawAdvert();
