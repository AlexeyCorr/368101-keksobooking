'use strict';

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

var removeClass = function (className) {
  var map = document.querySelector('.map');
  map.classList.remove(className);

  return map;
};

var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomTitle = function () {
  var title = ADVERT_OPTIONS.title;

  return title[getRandomValue(0, title.length - 1)];
};

var getAddressX = function () {
  var xMin = ADVERT_OPTIONS.location.x.min;
  var xMax = ADVERT_OPTIONS.location.x.max;
  var addressX = getRandomValue(xMin, xMax);
  return addressX;
};

var getAddressY = function () {
  var yMin = ADVERT_OPTIONS.location.y.min;
  var yMax = ADVERT_OPTIONS.location.y.max;
  var addressY = getRandomValue(yMin, yMax);
  return addressY;
};

var getRandomPrice = function (priceMin, priceMax) {
  return getRandomValue(priceMin, priceMax);
};

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

var getAmountRooms = function (roomsMin, roomsMax) {
  var amountRooms = getRandomValue(roomsMin, roomsMax);
  return amountRooms;
};

var getAmountGuests = function (guestsMin, guestsMax) {
  var amountGuests = getRandomValue(guestsMin, guestsMax);
  return amountGuests;
};

var getTimeCheckIn = function (times) {
  return times[getRandomValue(0, times.length - 1)];
};

var getTimeCheckOut = function (times) {
  return times[getRandomValue(0, times.length - 1)];
};

var getListFeatures = function () {
  var featuresList = ADVERT_OPTIONS.features;
  featuresList.length = getRandomValue(1, featuresList.length);

  return featuresList;
};

var avatarIndex = [];
var getAvatarIndex = function (length) {
  for (var i = 0; i < length; i++) {
    avatarIndex[i] = '0' + (i + 1);
  }
  return avatarIndex;
};

var gatArrayItem = function (array) {
  var currentIndex = getRandomValue(0, array.length - 1);
  var arrayItem = array[currentIndex];
  array.splice(currentIndex, 1);
  return arrayItem;
};

getAvatarIndex(ADVERT_OPTIONS.amount);
var getAvatarLink = function (array) {
  return 'img/avatars/user' + gatArrayItem(array) + '.png';
};

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

var advertArray = [];
var getAdvertArray = function () {
  for (var i = 0; i < ADVERT_OPTIONS.amount; i++) {
    advertArray[i] = createAdvert();
  }
  return advertArray;
};

// var getRoomsAndGuests = function () {
//   var amountRooms = getAmountRooms(ADVERT_OPTIONS.rooms.min, ADVERT_OPTIONS.rooms.max);
//   var amountGuests = getAmountGuests(ADVERT_OPTIONS.guests.min, ADVERT_OPTIONS.guests.max);
//   var amountRoomsAndGuests = '';
//   switch (amountRooms) {
//     case (2, 3, 4):
//       amountRooms = amountRooms + ' комнаты';
//       break;
//     case 5:
//       amountRooms = 5 + ' комнат';
//       break;
//     default:
//       amountRooms = 1 + ' комната';
//       break;
//   }
//   if (amountGuests !== 1) {
//     amountGuests = amountGuests + ' гостей';
//   } else {
//     amountGuests = 1 + ' гостей';
//   }
//   amountRoomsAndGuests = amountRooms + ' для ' + amountGuests;
//
//   return amountRoomsAndGuests;
// };

var createMapPin = function (advert) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  for (var i = 0; i < advertArray.length; i++) {
    mapPinElement.style.left = advert.location.x + 'px;';
    mapPinElement.style.top = advert.location.y + 'px;';
    mapPinElement.querySelector('img').src = advert.author.avatar;
  }
  return mapPinElement;
};

var drawMapPin = function () {
  var fragment = document.createDocumentFragment();
  var mapPin = document.querySelector('.map__pins');

  for (var i = 0; i < advertArray.length; i++) {
    fragment.appendChild(createMapPin(advertArray[i]));
  }
  return mapPin.appendChild(fragment);
};

removeClass('map--faded');

getAdvertArray();

drawMapPin();
