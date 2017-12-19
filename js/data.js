// 'use strict';
//
// (function () {
//   // Параметры объявлений
//   var ADVERT_OPTIONS = {
//     amount: 8,
//     title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
//     price: {
//       min: 1000,
//       max: 1000000
//     },
//     type: ['flat', 'house', 'bungalo'],
//     rooms: {
//       min: 1,
//       max: 5
//     },
//     guests: {
//       min: 1,
//       max: 10
//     },
//     checkin: ['12:00', '13:00', '14:00'],
//     checkout: ['12:00', '13:00', '14:00'],
//     features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//     location: {
//       x: {
//         min: 300,
//         max: 900
//       },
//       y: {
//         min: 100,
//         max: 500
//       }
//     }
//   };
//
//   // Получение случайного значения
//   var getRandomValue = function (min, max) {
//     return Math.round(Math.random() * (max - min) + min);
//   };
//
//   // Получение случайного заголовка
//   var getRandomTitle = function () {
//     var title = ADVERT_OPTIONS.title;
//
//     return title[getRandomValue(0, title.length - 1)];
//   };
//
//   // Получение координаты по оси Х
//   var getAddressX = function () {
//     var xMin = ADVERT_OPTIONS.location.x.min;
//     var xMax = ADVERT_OPTIONS.location.x.max;
//     var addressX = getRandomValue(xMin, xMax);
//     return addressX;
//   };
//
//   // Получение координаты по оси У
//   var getAddressY = function () {
//     var pinHeight = 43;
//     var yMin = ADVERT_OPTIONS.location.y.min;
//     var yMax = ADVERT_OPTIONS.location.y.max;
//     var addressY = getRandomValue(yMin, yMax) + pinHeight;
//     return addressY;
//   };
//
//   // Получение случайной цены
//   var getRandomPrice = function (priceMin, priceMax) {
//     return getRandomValue(priceMin, priceMax);
//   };
//
//   // Получение типа помещения
//   var getTypeHouse = function () {
//     var typeHouse = ADVERT_OPTIONS.type[getRandomValue(0, ADVERT_OPTIONS.type.length - 1)];
//
//     return typeHouse;
//   };
//
//   // Получение случайного числа комнат
//   var getAmountRooms = function (roomsMin, roomsMax) {
//     var amountRooms = getRandomValue(roomsMin, roomsMax);
//     return amountRooms;
//   };
//
//   // Получение случайного числа гостей
//   var getAmountGuests = function (guestsMin, guestsMax) {
//     var amountGuests = getRandomValue(guestsMin, guestsMax);
//     return amountGuests;
//   };
//
//   // Получение времени заезда
//   var getTimeCheckIn = function (times) {
//     return times[getRandomValue(0, times.length - 1)];
//   };
//
//   // Получение времени выезда
//   var getTimeCheckOut = function (times) {
//     return times[getRandomValue(0, times.length - 1)];
//   };
//
//   // Получение массива особенностей случайной длины
//   var getListFeatures = function () {
//     var featuresList = [];
//     var randomLength = getRandomValue(1, ADVERT_OPTIONS.features.length);
//
//     for (var i = 0; i < randomLength; i++) {
//       featuresList.push(ADVERT_OPTIONS.features[i]);
//     }
//
//     return featuresList;
//   };
//
//   // Получение массива с индексами аватара
//   var avatarIndex = [];
//   var getAvatarIndex = function (length) {
//     for (var i = 0; i < length; i++) {
//       avatarIndex[i] = i + 1;
//     }
//   };
//
//   // Получение случайного НЕ повторяющегося индекса аватара
//   var getArrayItem = function (array) {
//     var currentIndex = getRandomValue(0, array.length - 1);
//     var arrayItem = array[currentIndex];
//     array.splice(currentIndex, 1);
//
//     return arrayItem;
//   };
//
//   // Получение адреса изображения
//   getAvatarIndex(ADVERT_OPTIONS.amount);
//   var getAvatarLink = function (array) {
//     return 'img/avatars/user0' + getArrayItem(array) + '.png';
//   };
//
//   // Получение предложения с количеством комнат и гостей
//   var getRoomsAndGuests = function () {
//     var amountRooms = getAmountRooms(ADVERT_OPTIONS.rooms.min, ADVERT_OPTIONS.rooms.max);
//     var amountGuests = getAmountGuests(ADVERT_OPTIONS.guests.min, ADVERT_OPTIONS.guests.max);
//     var amountRoomsAndGuests = '';
//     switch (amountRooms) {
//       case (2, 3, 4):
//         amountRooms = amountRooms + ' комнаты';
//         break;
//       case 5:
//         amountRooms = 5 + ' комнат';
//         break;
//       default:
//         amountRooms = 1 + ' комната';
//         break;
//     }
//     if (amountGuests !== 1) {
//       amountGuests = amountGuests + ' гостей';
//     } else {
//       amountGuests = 1 + ' гостей';
//     }
//     amountRoomsAndGuests = amountRooms + ' для ' + amountGuests;
//
//     return amountRoomsAndGuests;
//   };
//
//   // Получение Одного объявления
//   var createAdvert = function () {
//     var advert = {
//       author: {
//         avatar: getAvatarLink(avatarIndex)
//       },
//       offer: {
//         title: getRandomTitle(),
//         address: getAddressX() + ', ' + getAddressY(),
//         price: getRandomPrice(ADVERT_OPTIONS.price.min, ADVERT_OPTIONS.price.max),
//         type: getTypeHouse(),
//         rooms: getAmountRooms(ADVERT_OPTIONS.rooms.min, ADVERT_OPTIONS.rooms.max),
//         guests: getAmountGuests(ADVERT_OPTIONS.guests.min, ADVERT_OPTIONS.guests.max),
//         roomsAndGuests: getRoomsAndGuests(),
//         checkin: getTimeCheckIn(ADVERT_OPTIONS.checkin),
//         checkout: getTimeCheckOut(ADVERT_OPTIONS.checkout),
//         features: getListFeatures(),
//         description: '',
//         photos: []
//       },
//       location: {
//         x: getAddressX(),
//         y: getAddressY()
//       }
//     };
//     return advert;
//   };
//
//
//   // Получение массива с объявлениями
//   var getAdverts = function () {
//     var adverts = [];
//     for (var i = 0; i < ADVERT_OPTIONS.amount; i++) {
//       adverts[i] = createAdvert();
//     }
//     return adverts;
//   };
//
// // Получение массива с объявлениями
// var successHandler = function (advertsData) {
//   var adverts = [];
//   for (var i = 0; i < advertsData.length; i++) {
//     adverts.push(advertsData[i]);
//   }
//   return adverts;
// };
//
// var errorHandler = function (errorMessage) {
//   var node = document.createElement('div');
//   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//   node.style.position = 'absolute';
//   node.style.left = 0;
//   node.style.right = 0;
//   node.style.fontSize = '30px';
//   node.textContent = errorMessage;
//   document.body.insertAdjacentElement('afterbegin', node);
// };
//
// window.backend.load(successHandler, errorHandler);
//
// window.data = {
//   adverts: successHandler()
// };
//
// })();
