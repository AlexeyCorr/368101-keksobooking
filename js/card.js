'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
  var similarAdvert = similarAdvertTemplate.cloneNode(true);

  // Создание нового списка особенностей
  var createNewListFeatures = function (features, list) {
    list.innerHTML = '';
    features.forEach(function (feature) {
      var currentFeature = document.createElement('li');
      currentFeature.className = 'feature feature--' + feature;
      list.appendChild(currentFeature);
    });
  };

  // Получение типа помещения
  var getTypeHouse = function (typeHouse) {
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

  // Получение предложения с количеством комнат и гостей
  var getRoomsAndGuests = function (advert) {
    var amountRooms = advert.offer.rooms;
    var amountGuests = advert.offer.guests;
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
      amountGuests = 1 + ' гостя';
    }
    amountRoomsAndGuests = amountRooms + ' для ' + amountGuests;

    return amountRoomsAndGuests;
  };

  // Создание доски с объявлением
  var createAdvertBoard = function (advert) {
    similarAdvert.querySelector('img').src = advert.author.avatar;
    similarAdvert.querySelector('h3').textContent = advert.offer.title;
    similarAdvert.querySelector('p small').textContent = advert.offer.address;
    similarAdvert.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD' + '/ночь';
    similarAdvert.querySelector('h4').textContent = getTypeHouse(advert.offer.type);
    similarAdvert.querySelector('p:nth-of-type(3)').textContent = getRoomsAndGuests(advert);
    similarAdvert.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    createNewListFeatures(advert.offer.features, similarAdvert.querySelector('.popup__features'));
    similarAdvert.querySelector('p:nth-of-type(5)').textContent = advert.offer.description;

    return similarAdvert;
  };

  // Показывает объявление при клике на пин
  map.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== map) {
      if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
        window.showCard.showAdvert(target, window.data.adverts[target.dataset.index]);
        return;
      }
      target = target.parentNode;
    }
  }, true);

  window.card = {
    createAdvertBoard: createAdvertBoard
  };
})();
