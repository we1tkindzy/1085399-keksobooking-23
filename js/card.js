const TRANSLATION_OF_TYPES = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const translateType = (type) => {
  const translations = [];

  Object.entries(TRANSLATION_OF_TYPES).forEach((arr) => {
    if (arr[0] === String(type)) {
      translations.push(arr[1]);
    }
  });

  return translations;
};

export const renderCard = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const cardOffersTemplate = document.querySelector('#card').content.querySelector('.popup');

  const offerElement = cardOffersTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = title;
  offerElement.querySelector('.popup__text--address').textContent = address;
  offerElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = translateType(type);
  offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresListElement = offerElement.querySelector('.popup__features');
  if(features !== undefined) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featuresListElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];

      if(!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    featuresListElement.remove();
  }

  offerElement.querySelector('.popup__description').textContent = description;

  const photosListElement = offerElement.querySelector('.popup__photos');
  if(photos !== undefined) {

    const photoElement = photosListElement.querySelector('.popup__photo');
    photos.map((src) => {
      const photo = photoElement.cloneNode(true);
      photo.src = src;
      photosListElement.appendChild(photo);
    });
    photoElement.parentNode.removeChild(photoElement);
  } else {
    photosListElement.remove();
  }

  offerElement.querySelector('.popup__avatar').src = avatar;

  return offerElement;
};
