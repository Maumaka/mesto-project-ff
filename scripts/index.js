// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = () => {
  return document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
};

const placesContainer = document.querySelector('.places__list');

const insertCards = (cardElement) => {
  const cardTemplates = cardTemplate();
  cardTemplates.querySelector('.card__image').src = cardElement.link;
  cardTemplates.querySelector('.card__image').alt = 'фото местности ' + cardElement.name;
  cardTemplates.querySelector('.card__title').textContent = cardElement.name;
  const deleteButton = cardTemplates.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardTemplates));
  return cardTemplates;
};

const deleteCard = (deleteItem) => deleteItem.remove(); 

initialCards.forEach(function(item) {
  placesContainer.append(insertCards(item));
});

let element = document.querySelector('.my-element');

element.addEventListener('click', function () {
  console.log('Мы кликнули по элементу');
}); 