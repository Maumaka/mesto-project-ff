// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const seacrchAndCloneCard = () => {
  return document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
};

const placesContainer = document.querySelector('.places__list');

const createCard = (cardElement) => {
  const cardElements = seacrchAndCloneCard();
  cardElements.querySelector('.card__image').src = cardElement.link;
  cardElements.querySelector('.card__image').alt = 'фото местности ' + cardElement.name;
  cardElements.querySelector('.card__title').textContent = cardElement.name;
  const deleteButton = cardElements.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElements));
  return cardElements;
};

const deleteCard = (deleteItem) => deleteItem.remove(); 

initialCards.forEach(function(item) {
  placesContainer.append(createCard(item));
});