const seacrchAndCloneCard = () => {
  return document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
}; //темплейт карточки

const createCard = (cardElement, removeCard, likeImage, openImageCard) => {
  const cardElements = seacrchAndCloneCard();
  cardElements.querySelector('.card__image').src = cardElement.link;
  cardElements.querySelector('.card__image').alt = 'фото местности ' + cardElement.name;
  cardElements.querySelector('.card__title').textContent = cardElement.name;
  const deleteButton = cardElements.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(cardElements));
  cardElements.querySelector('.card__image').addEventListener('click', () => openImageCard(cardElement.link, cardElement.name));
  const likeButton = cardElements.querySelector('.card__like-button');
  likeButton.addEventListener('click',() => likeImage(likeButton));
  return cardElements;
}; //функция создания карточки

const deleteCard = (deleteItem) => deleteItem.remove(); // функция удаления карточки
const likeCard = (likeItem) => likeItem.classList.toggle('card__like-button_is-active'); // функция лайка карточки

export {createCard, deleteCard, likeCard};