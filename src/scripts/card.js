import {putLike, deleteLike} from './api.js';

// Получаем шаблон и клонируем карточку
const seacrchAndCloneCard = () => {
  return document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
};

// Создание карточки
const createCard = (cardData, removeCard, likeCard, openImageCard, user, delCard) => {
  const card = seacrchAndCloneCard();
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.likes-score');
  const deleteButton = card.querySelector('.card__delete-button');
  // Заполняем карточку
  cardImage.src = cardData.link;
  cardImage.alt = 'фото местности ' + cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  // Слушатели
  cardImage.addEventListener('click', () => openImageCard(cardData.link, cardData.name));
  likeButton.addEventListener('click', () => likeCard(likeButton, cardData._id, likeCounter));
  
  if (cardData.owner._id === user._id) {
    deleteButton.addEventListener('click', () => removeCard(card, delCard, cardData._id));
  } else {
    deleteButton.style.visibility = 'hidden';
  }
   cardData.likes.forEach((like) => {
    if (like._id === user._id) {
      likeCard(likeButton, cardData._id, likeCounter)
    }})

  return card;
};

// Удаление карточки
const deleteCard = (cardElement, delCard, cardId) => {
  delCard(cardId);
  cardElement.remove();
};

// лайк ставим или убираем
const likeCard = (likeButton, cardId, likeCounter) => {
  const liked = likeButton.classList.contains('card__like-button_is-active');

  // если лайк уже есть — удаляем
  if (liked) {
    deleteLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log('Ошибка при снятии лайка:', err));
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log('Ошибка при добавлении лайка:', err));
  }
};

export { createCard, deleteCard, likeCard };