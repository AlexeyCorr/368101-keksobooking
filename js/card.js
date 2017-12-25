'use strict';

(function () {
  // Создание нового списка особенностей
  var createNewListFeatures = function (features, list) {
    list.innerHTML = '';
    features.forEach(function (feature) {
      var currentFeature = document.createElement('li');
      currentFeature.className = 'feature feature--' + feature;
      list.appendChild(currentFeature);
    });
  };

  // Создание списка с фотографиями
  var createNewListPhoto = function (photos, list) {
    list.innerHTML = '';
    photos.forEach(function (photo) {
      var currentItem = document.createElement('li');
      var currentPhoto = document.createElement('img');

      currentPhoto.src = photo;
      currentPhoto.style.maxWidth = '100%';
      currentPhoto.style.height = '50px';
      currentPhoto.style.padding = '5px';
      list.appendChild(currentItem);
      currentItem.appendChild(currentPhoto);
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
    var numberGuests;
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

    numberGuests = (amountGuests !== 1) ? amountGuests + ' гостей' : 1 + ' гостя';

    amountRoomsAndGuests = amountRooms + ' для ' + numberGuests;

    return amountRoomsAndGuests;
  };

  // Создание доски с объявлением
  var createAdvertBoard = function (advert) {
    var similarAdvertTemplate = document.querySelector('template').content.querySelector('.map__card');
    var similarAdvert = similarAdvertTemplate.cloneNode(true);

    similarAdvert.querySelector('img').src = advert.author.avatar;
    similarAdvert.querySelector('h3').textContent = advert.offer.title;
    similarAdvert.querySelector('p small').textContent = advert.offer.address;
    similarAdvert.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD' + '/ночь';
    similarAdvert.querySelector('h4').textContent = getTypeHouse(advert.offer.type);
    similarAdvert.querySelector('p:nth-of-type(3)').textContent = getRoomsAndGuests(advert);
    similarAdvert.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    createNewListFeatures(advert.offer.features, similarAdvert.querySelector('.popup__features'));
    similarAdvert.querySelector('p:nth-of-type(5)').textContent = advert.offer.description;
    createNewListPhoto(advert.offer.photos, similarAdvert.querySelector('.popup__pictures'));

    return similarAdvert;
  };

  // Показывает объявление при клике на пин
  window.map.addEventListener('click', function (event) {
    var targetPin = event.target.closest('.map__pin:not(.map__pin--main)');

    if (targetPin) {
      window.showCard.createAdvert(targetPin, window.data.adverts[targetPin.dataset.index]);
    }
  }, true);

  window.card = {
    createAdvertBoard: createAdvertBoard
  };
})();
