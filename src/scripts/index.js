import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import{openPopup, closePopup, handleOverlayClick} from './modal.js';

const placesContainer = document.querySelector('.places__list');
const buttonEditingProfile = document.querySelector('.profile__edit-button');
const popupEditingProfile = document.querySelector('.popup_type_edit'); 
const popupButtonCloseEditingProfile = popupEditingProfile.querySelector('.popup__close');
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupButtonCloseNewCard = popupNewCard.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const popupButtonCloseImage = imagePopup.querySelector('.popup__close');
const formElementProfile = document.querySelectorAll('.popup__form')[0];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const formElementNewCard = document.querySelectorAll('.popup__form')[1];
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

initialCards.forEach(function(item) {
  placesContainer.append(createCard(item, deleteCard, likeCard, openImage));
}); // добавление карточек на страницу

// Добавляем анимацию попапам
popupEditingProfile.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

// ---------------- Попап редактирования профиля ----------------

buttonEditingProfile.addEventListener('click', () => {
  openPopup(popupEditingProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popupButtonCloseEditingProfile.addEventListener('click', () => closePopup(popupEditingProfile));
popupEditingProfile.addEventListener('mousedown', handleOverlayClick);

function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditingProfile);
}

formElementProfile.addEventListener('submit', handleFormSubmitEditProfile);

// ---------------- Попап добавления нового места ----------------

buttonAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
  formElementNewCard.reset();
});

popupButtonCloseNewCard.addEventListener('click', () => closePopup(popupNewCard));
popupNewCard.addEventListener('mousedown', handleOverlayClick);

function handleFormSubmitEditProfileNewCard(evt) {
  evt.preventDefault();
  const newObj = {
    name: cardNameInput.value,
    link: urlInput.value
  };
  placesContainer.prepend(createCard(newObj, deleteCard, likeCard, openImage)); 
  closePopup(popupNewCard);
}

formElementNewCard.addEventListener('submit', handleFormSubmitEditProfileNewCard);

// ---------------- Попап с изображением ----------------

function openImage (cardImageLink, cardCaptionName) {
  popupImage.src = cardImageLink;
  popupImage.alt = 'фото местности ' + cardImageLink;
  popupCaption.textContent = cardCaptionName;
  openPopup(imagePopup);
}

popupButtonCloseImage.addEventListener('click', () => closePopup(imagePopup));
imagePopup.addEventListener('mousedown', handleOverlayClick);